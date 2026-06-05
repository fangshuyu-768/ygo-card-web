#!/usr/bin/env python3
import argparse
import json
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
RAW_PATH = DATA_DIR / "raw-cards.json"
OUTPUT_PATH = DATA_DIR / "cards.local.json"
IMAGES_DIR = ROOT / "assets" / "cards_small"


EXACT_TRANSLATIONS = {
    "Target 1 monster in either GY; Special Summon it.": "以任意一方墓地中的 1 只怪兽为对象发动；将那只怪兽特殊召唤。",
    "When an opponent's monster declares an attack: Destroy all your opponent's Attack Position monsters.": "对手怪兽宣言攻击时发动；破坏对手场上所有攻击表示怪兽。",
    "During your opponent's turn, at damage calculation: You can discard this card; you take no battle damage from that battle.": "对手回合的伤害计算时，你可以丢弃这张卡；那次战斗你受到的战斗伤害变成 0。",
    "The ultimate wizard in terms of attack and defense.": "以攻击和守备能力而言，这是最强的魔法师。",
    "This legendary dragon is a powerful engine of destruction.": "这只传说之龙拥有强大的破坏力。",
    "A ferocious dragon with a deadly attack.": "拥有凶猛攻击力的黑龙。",
}


def card_set_count(card: dict) -> int:
    return len(card.get("card_sets") or [])


def common_card_sort_key(card: dict) -> tuple:
    type_line = str(card.get("type") or "")
    category_weight = 0
    if "Spell" in type_line or "Trap" in type_line:
        category_weight = 1

    return (
        -card_set_count(card),
        -category_weight,
        str(card.get("name") or ""),
        int(card.get("id") or 0),
    )


def infer_category(type_line: str) -> str:
    normalized = (type_line or "").lower()
    if "spell" in normalized:
        return "魔法"
    if "trap" in normalized:
        return "陷阱"
    return "怪兽"


def translate_effect_text(effect_text: str) -> str:
    effect = re.sub(r"\s+", " ", (effect_text or "").replace("\r", " ").replace("\n", " ")).strip()
    if not effect:
        return ""
    if effect in EXACT_TRANSLATIONS:
        return EXACT_TRANSLATIONS[effect]

    translated = effect
    replacements = [
        (r"Cannot be Normal Summoned/Set\.", "不能通常召唤/盖放。"),
        (r"Must be Ritual Summoned\.", "必须通过仪式召唤。"),
        (r"Must first be Special Summoned", "必须先特殊召唤"),
        (r"You can only use each effect of", "以下各效果各回合只能使用 1 次："),
        (r"You can only use this effect of", "这个效果每回合只能使用 1 次："),
        (r"You can only activate 1", "每回合只能发动 1 张"),
        (r"When this card is activated", "这张卡发动时"),
        (r"During your opponent's turn", "对手回合中"),
        (r"During your Main Phase", "在你的主要阶段"),
        (r"During your Standby Phase", "在你的准备阶段"),
        (r"During the Main Phase", "在主要阶段"),
        (r"During the Standby Phase", "在准备阶段"),
        (r"During your End Phase", "在结束阶段"),
        (r"At the start of the Damage Step", "在伤害步骤开始时"),
        (r"at damage calculation", "在伤害计算时"),
        (r"During each Battle Phase", "在每次战斗阶段"),
        (r"While this card is equipped to a monster", "这张卡装备给怪兽期间"),
        (r"If this card is sent to the GY because the equipped monster is sent to the GY", "如果装备怪兽被送去墓地而使这张卡被送去墓地"),
        (r"If this card in the Spell & Trap Zone is destroyed by card effect", "如果魔法与陷阱区域的这张卡被卡的效果破坏"),
        (r"When an opponent's monster declares an attack", "对手怪兽宣言攻击时"),
        (r"When your opponent Normal or Flip Summons 1 monster with 1000 or more ATK", "对手通常召唤或反转召唤 1 只攻击力 1000 以上的怪兽时"),
        (r"Target 1 monster in either GY", "以任意一方墓地中的 1 只怪兽为对象"),
        (r"Target 1 face-up monster on the field", "以场上 1 只表侧表示怪兽为对象"),
        (r"target 1 face-up monster you control", "以你控制的 1 只表侧表示怪兽为对象"),
        (r"target 1 of your .*? monsters that is banished or in your GY", "以你被除外或在墓地的 1 只对应怪兽为对象"),
        (r"target 1 .*? monster in your GY", "以你墓地中的 1 只对应怪兽为对象"),
        (r"target 1 card in your GY", "以你墓地中的 1 张卡为对象"),
        (r"target 1 card on the field", "以场上 1 张卡为对象"),
        (r"Target that monster", "以那只怪兽为对象"),
        (r"Your opponent chooses 1 random card from your hand", "对手从你的手牌随机选 1 张卡"),
        (r"then if it is a monster that can be Special Summoned", "如果那张卡是可以特殊召唤的怪兽"),
        (r"Otherwise, send it to the Graveyard", "否则将其送去墓地"),
        (r"activate 1 of these effects", "发动以下 1 个效果"),
        (r"draw cards equal to the number of different Monster Types in your GY", "抽出数量等同于你墓地中不同种族怪兽数量的卡"),
        (r"place cards from your hand on the bottom of the Deck in any order, equal to the number of cards you drew", "将与抽出数量相同的手牌按任意顺序放回卡组底"),
        (r"destroy that target", "破坏那只怪兽"),
        (r"Destroy all your opponent's Attack Position monsters", "破坏对手场上所有攻击表示怪兽"),
        (r"Special Summon it", "将那只怪兽特殊召唤"),
        (r"Special Summon this card", "将这张卡特殊召唤"),
        (r"Special Summon 1", "特殊召唤 1 只"),
        (r"add 1", "把 1 张"),
        (r"from your Deck to your hand", "从卡组加入手牌"),
        (r"from your Deck or GY", "从卡组或墓地"),
        (r"from your hand or Deck", "从手牌或卡组"),
        (r"draw 1 card", "抽 1 张卡"),
        (r"draw 3 cards from your Deck", "从卡组抽 3 张卡"),
        (r"return it to the hand", "将其返回手牌"),
        (r"return that target to the hand", "将那张卡返回手牌"),
        (r"return that target to the top of your Deck", "将那张卡放回卡组最上方"),
        (r"banish this card", "将这张卡除外"),
        (r"send 1 .*? monster from your Deck to the Graveyard", "从卡组把 1 只对应怪兽送去墓地"),
        (r"place A-Counters on that monster equal to the Level of the sent monster", "在那只怪兽上放置与送去墓地怪兽等级相同数量的 A 指示物"),
        (r"make a second attack during each Battle Phase", "在每次战斗阶段可以再攻击 1 次"),
        (r"GY", "墓地"),
        (r"Graveyard", "墓地"),
        (r"battle damage", "战斗伤害"),
        (r"cannot declare an attack", "不能宣言攻击"),
        (r"cannot declare attacks", "不能宣言攻击"),
        (r"cannot be destroyed", "不会被破坏"),
        (r"cannot target", "不能作为对象"),
        (r"negate the activation", "那次发动无效"),
        (r"negate that effect", "那个效果无效"),
        (r"Once per turn", "1 回合 1 次"),
        (r"If this card is Special Summoned", "这张卡特殊召唤成功时"),
        (r"If this card battles", "这张卡进行战斗时"),
        (r"If this card attacks a Defense Position monster", "这张卡攻击守备表示怪兽时"),
        (r"You can target 1 card your opponent controls", "可以以对手场上 1 张卡为对象"),
        (r"your opponent cannot target this card with card effects", "对手不能用卡的效果以这张卡为对象"),
        (r"also it cannot be destroyed by your opponent's card effects", "并且不会被对手的卡的效果破坏"),
    ]
    for pattern, replacement in replacements:
        translated = re.sub(pattern, replacement, translated, flags=re.IGNORECASE)

    term_replacements = [
        (r"\bYou can\b", "你可以"),
        (r"\byour opponent\b", "对手"),
        (r"\byour side of the field\b", "你场上"),
        (r"\bunder your control\b", "你控制的"),
        (r"\byou control\b", "你控制的"),
        (r"\byour hand\b", "你的手牌"),
        (r"\byour Deck\b", "你的卡组"),
        (r"\byour GY\b", "你的墓地"),
        (r"\byour Graveyard\b", "你的墓地"),
        (r"\bon the field\b", "场上"),
        (r"\bface-up\b", "表侧表示"),
        (r"\bface-down\b", "里侧表示"),
        (r"\bmonsters\b", "怪兽"),
        (r"\bmonster\b", "怪兽"),
        (r"\bSpell & Trap Zone\b", "魔法与陷阱区域"),
        (r"\bAttack Position\b", "攻击表示"),
        (r"\bDefense Position\b", "守备表示"),
        (r"\bQuick-Play Spell\b", "速攻魔法"),
        (r"\bQuick Effect\b", "快速效果"),
        (r"\bMain Phase\b", "主要阶段"),
        (r"\bStandby Phase\b", "准备阶段"),
        (r"\bBattle Phase\b", "战斗阶段"),
        (r"\bEnd Phase\b", "结束阶段"),
        (r"\bNormal Summon(?:ed)?\b", "通常召唤"),
        (r"\bFlip Summon(?:ed)?\b", "反转召唤"),
        (r"\bSpecial Summon(?:ed)?\b", "特殊召唤"),
        (r"\bSet\b", "盖放"),
        (r"\bATK\b", "攻击力"),
        (r"\bLevel\b", "等级"),
        (r"\bFIRE\b", "炎属性"),
        (r"\bDARK\b", "暗属性"),
        (r"\bLIGHT\b", "光属性"),
        (r"\bWarrior\b", "战士族"),
        (r"\bFiend\b", "恶魔族"),
        (r"\bDeck\b", "卡组"),
        (r"\bGraveyard\b", "墓地"),
        (r"\bGY\b", "墓地"),
    ]
    for pattern, replacement in term_replacements:
        translated = re.sub(pattern, replacement, translated, flags=re.IGNORECASE)

    translated = (
        translated.replace(";", "；")
        .replace(":", "：")
        .replace(",", "，")
        .replace(".", "。")
    )
    translated = re.sub(r"\s+", " ", translated).strip()
    return translated if re.search(r"[\u4e00-\u9fff]", translated) else effect


def summarize_effect_points(category: str, type_line: str, effect_text: str) -> str:
    lowered = (effect_text or "").lower()
    parts = []
    if "special summon" in lowered:
        parts.append("可以特殊召唤怪兽")
    if "add 1" in lowered:
        parts.append("可以从卡组把指定卡加入手牌")
    if "destroy" in lowered:
        parts.append("会破坏场上的卡")
    if "send 1" in lowered and ("graveyard" in lowered or "gy" in lowered):
        parts.append("可以从卡组把怪兽送去墓地")
    if "negate" in lowered:
        parts.append("可以无效对手的效果或发动")
    if "draw" in lowered:
        parts.append("可以补充手牌")
    if "return it to the hand" in lowered or "return that target" in lowered:
        parts.append("可以把卡返回手牌")
    if "return that target to the top of your deck" in lowered:
        parts.append("会把卡放回卡组最上方")
    if "cannot attack" in lowered:
        parts.append("会限制怪兽攻击")
    if "cannot special summon monsters for the rest of the turn" in lowered:
        parts.append("发动后会限制后续特殊召唤")
    if "battle damage" in lowered:
        parts.append("会影响战斗伤害")
    if "banish" in lowered:
        parts.append("会除外卡牌")
    if "gy" in lowered or "graveyard" in lowered:
        parts.append("效果与墓地资源有关")
    if "target" in lowered:
        parts.append("发动时需要选择目标")
    if "gain" in lowered and "atk" in lowered:
        parts.append("会提升怪兽攻击力")
    if "set 1" in lowered:
        parts.append("可以直接盖放指定卡")
    if "equipped to a monster" in lowered:
        parts.append("效果和装备状态有关")
    if "place a-counter" in lowered:
        parts.append("会放置 A 指示物")
    if "random card from your hand" in lowered:
        parts.append("会从手牌随机选卡并处理")
    if "flip this card into face-down defense position" in lowered:
        parts.append("可以把自己变成里侧守备表示")
    if "second attack" in lowered:
        parts.append("可以在战斗阶段再次攻击")
    if "cannot be destroyed" in lowered or "cannot target" in lowered:
        parts.append("自身不容易被效果处理")
    if not parts:
        if category == "怪兽" and "normal" in (type_line or "").lower():
            return "通常怪兽，没有额外效果，主要依靠攻击力、守备力和召唤条件。"
        return "这张卡的效果描述比较偏规则文本，建议结合中文说明逐句查看。"
    uniq = list(dict.fromkeys(parts))[:4]
    return f"效果重点：{'；'.join(uniq)}。"


def summarize_recommended_usage(category: str, type_line: str, effect_text: str) -> str:
    lowered = (effect_text or "").lower()
    normalized = (type_line or "").lower()
    if "special summon" in lowered:
        return "推荐在需要补充场面、延续展开，或把关键怪兽重新利用时使用。"
    if "destroy" in lowered and category == "陷阱":
        return "推荐先盖放，等对手做出关键动作后再发动，用来打断展开或解掉威胁。"
    if "destroy" in lowered:
        return "推荐在对手场上出现关键卡时使用，优先处理高威胁目标。"
    if "negate" in lowered:
        return "推荐保留到关键时点再用，优先无效对手最重要的效果或发动。"
    if "add 1" in lowered:
        return "推荐在回合前段使用，先把需要的资源加入手牌，再安排后续展开。"
    if "cannot attack" in lowered:
        return "推荐在自己需要争取回合时使用，用来拖慢对手进攻节奏。"
    if "battle damage" in lowered:
        return "推荐在战斗阶段保留，等需要防守或减少伤害时再用。"
    if "normal monster" in normalized:
        return "推荐作为基础战斗怪兽、素材，或与对应系列支援卡配合使用。"
    if category == "魔法":
        return "推荐在最能扩大收益的时点使用，优先服务自己当前回合的关键动作。"
    if category == "陷阱":
        return "推荐先盖放，等对手进入关键步骤时再发动。"
    return "推荐结合当前场面决定时机，优先在能改变场面交换结果时使用。"


def summarize_usage_tags(category: str, type_line: str, effect_text: str) -> list[str]:
    lowered = (effect_text or "").lower()
    normalized = (type_line or "").lower()
    tags = []
    if "when an opponent" in lowered or category == "陷阱":
        tags.append("偏先手")
    if "special summon" in lowered or "add 1" in lowered:
        tags.append("偏展开")
    if "destroy" in lowered or "banish" in lowered or "return" in lowered:
        tags.append("偏解场")
    if "battle damage" in lowered or "cannot attack" in lowered:
        tags.append("偏防守")
    if "normal monster" in normalized or "attack" in lowered:
        tags.append("偏进攻")
    if not tags:
        tags.append("先后手都可")
    return list(dict.fromkeys(tags))[:3]


def summarize_synergy_notes(category: str, type_line: str, effect_text: str) -> str:
    lowered = (effect_text or "").lower()
    normalized = (type_line or "").lower()
    if "graveyard" in lowered or "gy" in lowered or "special summon" in lowered:
        return "适合与墓地利用、复活展开，或需要反复回收怪兽资源的卡配合。"
    if "add 1" in lowered:
        return "适合与需要稳定检索关键卡、围绕固定核心组件展开的策略配合。"
    if "destroy" in lowered or "negate" in lowered:
        return "适合与其他干扰卡搭配，形成连续压制或多段打断。"
    if category == "陷阱":
        return "适合与其他盖放陷阱一起使用，增强对手回合的干扰密度。"
    if "normal monster" in normalized:
        return "适合与通常怪兽支援、素材需求，或对应系列专属卡配合。"
    return "适合结合当前卡组核心思路使用，优先与能放大这张卡收益的资源配合。"


def build_record(card: dict, image_size: str) -> dict:
    type_line = card.get("type", "")
    category = infer_category(type_line)
    effect_text = card.get("desc", "")
    image_info = (card.get("card_images") or [{}])[0]
    image_url = image_info.get(f"image_url_{image_size}") if image_size else image_info.get("image_url")
    image_url = image_url or image_info.get("image_url") or ""
    card_id = int(card.get("id", 0) or 0)

    return {
        "id": card_id,
        "name": card.get("name", ""),
        "localizedName": card.get("name", ""),
        "category": category,
        "typeLine": type_line,
        "effectText": effect_text,
        "translatedEffectText": translate_effect_text(effect_text),
        "childFriendlySummary": summarize_effect_points(category, type_line, effect_text),
        "recommendedUsage": summarize_recommended_usage(category, type_line, effect_text),
        "usageTags": summarize_usage_tags(category, type_line, effect_text),
        "synergyNotes": summarize_synergy_notes(category, type_line, effect_text),
        "imageURL": image_url,
        "imageLocalPath": f"./assets/cards_small/{card_id}.jpg",
        "source": "local",
    }


def download_image(url: str, target: Path, timeout: float, retries: int, sleep_s: float) -> bool:
    if target.exists():
        return True

    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    attempt = 0
    while attempt <= retries:
        attempt += 1
        try:
            with urllib.request.urlopen(req, timeout=timeout) as response:
                target.write_bytes(response.read())
            return True
        except (urllib.error.URLError, TimeoutError, ConnectionResetError, OSError):
            if target.exists():
                try:
                    target.unlink()
                except OSError:
                    pass
            if attempt > retries:
                return False
            time.sleep(sleep_s)
    return False


def main() -> int:
    parser = argparse.ArgumentParser(description="Build local Yu-Gi-Oh card library and optionally download images.")
    parser.add_argument("--limit", type=int, default=0, help="Only process the first N cards.")
    parser.add_argument("--selection", choices=["raw-order", "common"], default="raw-order", help="Choose cards in API order or prefer widely reprinted common cards.")
    parser.add_argument("--skip-images", action="store_true", help="Do not download images.")
    parser.add_argument("--prune-images", action="store_true", help="Delete local card images that are not part of the selected library.")
    parser.add_argument("--image-size", choices=["small", "cropped", "full"], default="small")
    parser.add_argument("--timeout", type=float, default=20.0)
    parser.add_argument("--retries", type=int, default=1)
    parser.add_argument("--sleep", type=float, default=0.1)
    args = parser.parse_args()

    if not RAW_PATH.exists():
        print(f"Missing raw source: {RAW_PATH}", file=sys.stderr)
        return 1

    raw = json.loads(RAW_PATH.read_text())
    cards = raw.get("data", [])
    if args.selection == "common":
        cards = sorted(cards, key=common_card_sort_key)
    if args.limit > 0:
        cards = cards[: args.limit]

    image_size = "small" if args.image_size == "small" else ("cropped" if args.image_size == "cropped" else "")
    records = [build_record(card, image_size) for card in cards]
    OUTPUT_PATH.write_text(json.dumps(records, ensure_ascii=False))
    print(f"wrote {len(records)} records to {OUTPUT_PATH}")

    if args.skip_images:
        return 0

    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    selected_ids = {record["id"] for record in records}
    ok = 0
    failed = 0
    for idx, record in enumerate(records, start=1):
        target = IMAGES_DIR / f"{record['id']}.jpg"
        success = download_image(record["imageURL"], target, args.timeout, args.retries, args.sleep)
        if success:
            ok += 1
        else:
            failed += 1
        if idx % 200 == 0:
            print(f"downloaded {idx}/{len(records)} (ok={ok}, failed={failed})")

    if failed == 0:
        for record in records:
            record["imageURL"] = record["imageLocalPath"]
        OUTPUT_PATH.write_text(json.dumps(records, ensure_ascii=False))

    if args.prune_images:
        removed = 0
        for image_path in IMAGES_DIR.glob("*.jpg"):
            try:
                image_id = int(image_path.stem)
            except ValueError:
                continue
            if image_id not in selected_ids:
                image_path.unlink()
                removed += 1
        print(f"pruned {removed} images not in the selected library")

    print(f"image download finished: ok={ok}, failed={failed}")
    return 0 if failed == 0 else 2


if __name__ == "__main__":
    raise SystemExit(main())
