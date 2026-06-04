const sampleCards = [
  {
    id: 89631139,
    name: "Blue-Eyes White Dragon",
    localizedName: "青眼白龙",
    category: "怪兽",
    typeLine: "Normal Monster",
    imageURL: "https://images.ygoprodeck.com/images/cards/89631139.jpg",
    effectText: "This legendary dragon is a powerful engine of destruction.",
    translatedEffectText: "这只传说之龙拥有强大的破坏力。",
    childFriendlySummary: "通常怪兽，没有效果，主要依靠 3000 攻击力和 2500 守备力进行战斗。",
    recommendedUsage: "适合作为高攻击力主力怪兽使用，通常在能够稳定上场时用来压制对手场面。",
    usageTags: ["偏后手", "偏进攻", "主力打点"],
    synergyNotes: "适合与能够检索、特殊召唤或保护高星通常龙族怪兽的卡配合。"
  },
  {
    id: 46986414,
    name: "Dark Magician",
    localizedName: "黑魔导",
    category: "怪兽",
    typeLine: "Normal Monster",
    imageURL: "https://images.ygoprodeck.com/images/cards/46986414.jpg",
    effectText: "The ultimate wizard in terms of attack and defense.",
    translatedEffectText: "以攻击和守备能力而言，这是最强的魔法师。",
    childFriendlySummary: "通常怪兽，没有效果，主要作为高攻击力的经典怪兽使用。",
    recommendedUsage: "适合作为基础打点怪兽使用，通常用于配合以黑魔导为核心的相关支援卡。",
    usageTags: ["偏中盘", "偏进攻", "系列核心"],
    synergyNotes: "适合和黑魔导相关的检索、特殊召唤、装备或专属魔法陷阱配合。"
  },
  {
    id: 83764718,
    name: "Monster Reborn",
    localizedName: "死者苏生",
    category: "魔法",
    typeLine: "Normal Spell Card",
    imageURL: "https://images.ygoprodeck.com/images/cards/83764718.jpg",
    effectText: "Target 1 monster in either GY; Special Summon it.",
    translatedEffectText: "以任意一方墓地中的 1 只怪兽为对象发动；将那只怪兽特殊召唤。",
    childFriendlySummary: "选择任意一方墓地中的 1 只怪兽，将其特殊召唤到场上。",
    recommendedUsage: "适合在关键回合复活强力怪兽、补充展开资源，或者利用对手墓地中的怪兽反打。",
    usageTags: ["先后手都可", "偏展开", "墓地利用"],
    synergyNotes: "适合与高价值墓地怪兽、需要复活素材的展开路线，或能反复利用墓地资源的卡配合。"
  },
  {
    id: 44095762,
    name: "Mirror Force",
    localizedName: "神圣防护罩-反射镜力-",
    category: "陷阱",
    typeLine: "Normal Trap Card",
    imageURL: "https://images.ygoprodeck.com/images/cards/44095762.jpg",
    effectText: "When an opponent's monster declares an attack: Destroy all your opponent's Attack Position monsters.",
    translatedEffectText: "对手怪兽宣言攻击时发动；破坏对手场上所有攻击表示怪兽。",
    childFriendlySummary: "当对手怪兽宣言攻击时发动，破坏对手场上所有攻击表示怪兽。",
    recommendedUsage: "适合先盖放等待对手进攻时再发动，用来清掉对手攻击表示怪兽并扭转战斗阶段。",
    usageTags: ["偏先手", "偏防守", "反打"],
    synergyNotes: "适合和需要拖回合的防守策略、诱导对手进入战斗阶段的布置一起使用。"
  },
  {
    id: 74677422,
    name: "Red-Eyes Black Dragon",
    localizedName: "真红眼黑龙",
    category: "怪兽",
    typeLine: "Normal Monster",
    imageURL: "https://images.ygoprodeck.com/images/cards/74677422.jpg",
    effectText: "A ferocious dragon with a deadly attack.",
    translatedEffectText: "拥有凶猛攻击力的黑龙。",
    childFriendlySummary: "通常怪兽，没有效果，主要依靠 2400 攻击力进行战斗。",
    recommendedUsage: "适合作为中高打点怪兽使用，常用于需要龙族通常怪兽素材或配合真红眼相关卡组。",
    usageTags: ["偏中盘", "偏进攻", "系列素材"],
    synergyNotes: "适合与真红眼系列的复活、融合、装备或龙族支援卡配合。"
  },
  {
    id: 40640057,
    name: "Kuriboh",
    localizedName: "栗子球",
    category: "怪兽",
    typeLine: "Effect Monster",
    imageURL: "https://images.ygoprodeck.com/images/cards/40640057.jpg",
    effectText: "During your opponent's turn, at damage calculation: You can discard this card; you take no battle damage from that battle.",
    translatedEffectText: "对手回合的伤害计算时，你可以丢弃这张卡；那次战斗你受到的战斗伤害变成 0。",
    childFriendlySummary: "在对手回合的伤害计算时，可以丢弃这张卡，使那次战斗造成的战斗伤害变成 0。",
    recommendedUsage: "适合留在手牌中防守，遇到危险攻击时再丢弃，减少战斗伤害并保护自己的生命值。",
    usageTags: ["偏后手", "偏防守", "手坑式防护"],
    synergyNotes: "适合和需要保护生命值、延缓战斗伤害，或依赖手牌资源进行防守的卡一起使用。"
  },
  {
    id: 72302403,
    name: "Swords of Revealing Light",
    localizedName: "光之护封剑",
    category: "魔法",
    typeLine: "Normal Spell Card",
    imageURL: "https://images.ygoprodeck.com/images/cards/72302403.jpg",
    effectText: "After this card's activation, it remains on the field, but destroy it during the End Phase of your opponent's 3rd turn. While this card is face-up on the field, your opponent's monsters cannot declare an attack.",
    translatedEffectText: "这张卡发动后留在场上，并在对手第 3 个回合的结束阶段破坏。只要这张卡在场上表侧表示存在，对手怪兽不能宣言攻击。",
    childFriendlySummary: "发动后会在场上停留到对手第 3 个回合结束阶段破坏；存在期间，对手怪兽不能宣言攻击。",
    recommendedUsage: "适合在自己需要争取时间时使用，用来拖慢对手进攻节奏，给自己留下准备资源的回合。",
    usageTags: ["先后手都可", "偏防守", "拖回合"],
    synergyNotes: "适合与需要多回合准备资源、布置场面或等待关键卡上手的策略配合。"
  },
  {
    id: 4206964,
    name: "Trap Hole",
    localizedName: "落穴",
    category: "陷阱",
    typeLine: "Normal Trap Card",
    imageURL: "https://images.ygoprodeck.com/images/cards/4206964.jpg",
    effectText: "When your opponent Normal or Flip Summons 1 monster with 1000 or more ATK: Target that monster; destroy that target.",
    translatedEffectText: "对手通常召唤或反转召唤 1 只攻击力 1000 以上的怪兽时，以那只怪兽为对象发动；破坏那只怪兽。",
    childFriendlySummary: "当对手通常召唤或反转召唤 1 只攻击力 1000 以上的怪兽时发动，破坏那只怪兽。",
    recommendedUsage: "适合提前盖放，等对手召出关键怪兽时立刻处理，打断对手正常展开。",
    usageTags: ["偏先手", "偏解场", "打断召唤"],
    synergyNotes: "适合和其他盖放陷阱一起形成连续干扰，优先处理依赖通常召唤起步的对手。"
  }
].map((card) => ({ ...card, source: "sample" }));

const categories = ["全部", "怪兽", "魔法", "陷阱"];
const favoritesKey = "ygo-card-web-favorites";
const remoteCacheKey = "ygo-card-web-remote-cache-v1";
const remoteCacheTTL = 1000 * 60 * 60 * 24 * 2;
const remoteSearchMinimumLength = 2;
const remoteSearchEndpoint = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
const initialVisibleCardCount = 14;
const visibleCardStep = 12;

const state = {
  searchText: "",
  selectedCategory: "全部",
  favoritesOnly: false,
  selectedCardId: sampleCards[0]?.id ?? null,
  spotlightCardId: sampleCards[0]?.id ?? null,
  favoriteIds: loadFavorites(),
  remoteCards: [],
  remoteStatus: "还没开始在线搜索。输入 2 个以上字符后，会去线上卡牌库补充结果。",
  remoteError: "",
  isRemoteLoading: false,
  visibleCardCount: initialVisibleCardCount
};

const elements = {
  searchInput: document.querySelector("#search-input"),
  voiceSearchButton: document.querySelector("#voice-search-button"),
  favoritesOnlyCheckbox: document.querySelector("#favorites-only-checkbox"),
  categoryFilters: document.querySelector("#category-filters"),
  cardList: document.querySelector("#card-list"),
  detailPanel: document.querySelector("#detail-panel"),
  spotlightCard: document.querySelector("#spotlight-card"),
  resultCount: document.querySelector("#result-count"),
  clearFiltersButton: document.querySelector("#clear-filters-button"),
  randomCardButton: document.querySelector("#random-card-button"),
  speakSpotlightButton: document.querySelector("#speak-spotlight-button"),
  remoteStatus: document.querySelector("#remote-status"),
  loadMoreWrap: document.querySelector("#load-more-wrap")
};

let recognition = null;
let remoteSearchTimer = null;
let activeRemoteRequestToken = 0;
let loadMoreObserver = null;
const remoteCache = loadRemoteCache();

setup();

function setup() {
  renderCategoryFilters();
  attachEvents();
  setupVoiceRecognition();
  syncControls();
  render();
}

function attachEvents() {
  elements.searchInput.addEventListener("input", (event) => {
    state.searchText = event.target.value;
    state.visibleCardCount = initialVisibleCardCount;
    scheduleRemoteSearch();
    keepSelectionVisible();
    render();
  });

  elements.favoritesOnlyCheckbox.addEventListener("change", (event) => {
    state.favoritesOnly = event.target.checked;
    state.visibleCardCount = initialVisibleCardCount;
    keepSelectionVisible();
    render();
  });

  elements.clearFiltersButton.addEventListener("click", () => {
    window.clearTimeout(remoteSearchTimer);
    state.searchText = "";
    state.selectedCategory = "全部";
    state.favoritesOnly = false;
    state.remoteCards = [];
    state.remoteError = "";
    state.remoteStatus = "当前展示的是内置示例卡牌。";
    state.visibleCardCount = initialVisibleCardCount;
    syncControls();
    keepSelectionVisible();
    render();
  });

  elements.randomCardButton.addEventListener("click", () => {
    chooseRandomSpotlight();
    render();
  });

  elements.speakSpotlightButton.addEventListener("click", () => {
    const spotlightCard = getSpotlightCard();
    if (spotlightCard) {
      speakCard(spotlightCard);
    }
  });
}

function setupVoiceRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    elements.voiceSearchButton.disabled = true;
    elements.voiceSearchButton.title = "当前浏览器不支持内置语音识别";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "zh-CN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.addEventListener("result", (event) => {
    const transcript = event.results?.[0]?.[0]?.transcript?.trim() ?? "";
    if (!transcript) return;
    state.searchText = transcript;
    elements.searchInput.value = transcript;
    scheduleRemoteSearch();
    keepSelectionVisible();
    render();
    showToast(`已识别：${transcript}`);
  });

  recognition.addEventListener("error", () => {
    showToast("语音输入暂时不可用，可以直接用系统语音输入。");
  });

  elements.voiceSearchButton.addEventListener("click", () => {
    recognition.start();
  });
}

function renderCategoryFilters() {
  elements.categoryFilters.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-pill${state.selectedCategory === category ? " active" : ""}`;
    button.textContent = category;
    button.addEventListener("click", () => {
      state.selectedCategory = category;
      state.visibleCardCount = initialVisibleCardCount;
      renderCategoryFilters();
      keepSelectionVisible();
      render();
    });
    elements.categoryFilters.appendChild(button);
  });
}

function render() {
  renderCategoryFilters();
  renderRemoteStatus();
  renderSpotlight();
  renderList();
  renderDetail();
}

function renderRemoteStatus() {
  const query = state.searchText.trim();
  const helpText = query.length < remoteSearchMinimumLength
    ? `输入 ${remoteSearchMinimumLength} 个以上字符后，会去线上卡牌库补充结果。`
    : "当前会优先展示本地示例卡，同时补充线上检索结果。";

  const loadingText = state.isRemoteLoading ? "正在搜索线上卡牌库..." : "";
  const errorText = state.remoteError ? ` ${state.remoteError}` : "";

  elements.remoteStatus.innerHTML = `
    <strong>线上卡牌库：</strong>${escapeHtml(state.remoteStatus)}
    ${loadingText ? `<div>${escapeHtml(loadingText)}</div>` : ""}
    ${errorText ? `<div>${escapeHtml(errorText)}</div>` : ""}
    <div>${escapeHtml(helpText)}</div>
  `;
}

function renderSpotlight() {
  const card = getSpotlightCard();
  if (!card) {
    elements.spotlightCard.innerHTML = `
      <div class="empty-detail">
        <h2>还没有合适的卡牌</h2>
        <p>换个搜索词，或者取消“只看收藏”试试看。</p>
      </div>
    `;
    return;
  }

  elements.spotlightCard.innerHTML = `
    <article class="spotlight-content">
      <img class="spotlight-image" src="${escapeHtml(card.imageURL)}" alt="${escapeHtml(card.localizedName)}" />
      <div>
        <p class="spotlight-kicker">Spotlight Card</p>
        <h2 class="spotlight-title">${escapeHtml(card.localizedName)}</h2>
        <p class="detail-subtitle">${escapeHtml(card.name)}</p>
        <p class="spotlight-summary">${escapeHtml(card.translatedEffectText || card.effectText)}</p>
        <div class="tag-row">
          <span class="tag">${escapeHtml(card.category)} · ${escapeHtml(card.typeLine)}</span>
          <span class="tag tag-soft">${escapeHtml(getSourceLabel(card))}</span>
        </div>
        <div class="spotlight-actions">
          <button class="secondary-button" data-action="select-spotlight">查看详情</button>
          <button class="secondary-button" data-action="favorite-spotlight">${isFavorite(card.id) ? "取消收藏" : "收藏这张卡"}</button>
        </div>
      </div>
    </article>
  `;

  elements.spotlightCard.querySelector('[data-action="select-spotlight"]')?.addEventListener("click", () => {
    state.selectedCardId = card.id;
    render();
  });

  elements.spotlightCard.querySelector('[data-action="favorite-spotlight"]')?.addEventListener("click", () => {
    toggleFavorite(card.id);
  });
}

function renderList() {
  const filteredCards = getFilteredCards();
  const onlineCount = filteredCards.filter((card) => card.source === "remote").length;
  const sampleCount = filteredCards.length - onlineCount;
  elements.resultCount.textContent = `共找到 ${filteredCards.length} 张卡牌，其中内置 ${sampleCount} 张，线上 ${onlineCount} 张`;
  const visibleCards = filteredCards.slice(0, state.visibleCardCount);

  if (state.isRemoteLoading) {
    elements.cardList.innerHTML = `
      <div class="list-loading">
        <strong>正在补充线上结果...</strong>
        <div class="list-subtext">本地示例卡已经能用，线上卡牌会在搜索完成后自动出现。</div>
      </div>
    `;
  } else {
    elements.cardList.innerHTML = "";
  }

  if (!filteredCards.length) {
    elements.cardList.innerHTML += `
      <div class="empty-list">
        <h3>没有找到卡牌</h3>
        <p>试试更短的名称、不同类型，或者取消收藏筛选。</p>
      </div>
    `;
    return;
  }

  elements.cardList.innerHTML += visibleCards
    .map((card) => {
      const activeClass = card.id === state.selectedCardId ? " active" : "";
      const matchBadges = buildMatchBadges(card)
        .map((badge) => `<span class="mini-badge">${escapeHtml(badge)}</span>`)
        .join("");
      return `
        <article class="list-card${activeClass}" data-card-id="${card.id}">
          <img class="list-card-image" src="${escapeHtml(card.imageURL)}" alt="${escapeHtml(card.localizedName)}" />
          <div>
            <div class="list-card-head">
              <div>
                <h3 class="list-card-title">${escapeHtml(card.localizedName)}</h3>
                <p class="detail-subtitle">${escapeHtml(card.name)}</p>
              </div>
              ${isFavorite(card.id) ? '<span class="star" aria-label="已收藏">★</span>' : ""}
            </div>
            <p class="card-meta">${escapeHtml(card.category)} · ${escapeHtml(card.typeLine)}</p>
            <p class="card-meta">${escapeHtml(getSourceLabel(card))}</p>
            <p class="card-summary">${escapeHtml(card.translatedEffectText || card.effectText)}</p>
            ${matchBadges ? `<div class="match-badges">${matchBadges}</div>` : ""}
          </div>
        </article>
      `;
    })
    .join("");

  elements.cardList.querySelectorAll(".list-card").forEach((node) => {
    node.addEventListener("click", () => {
      state.selectedCardId = Number(node.dataset.cardId);
      render();
    });
  });

  renderLoadMore(filteredCards, visibleCards.length);
}

function renderDetail() {
  const card = getSelectedCard();
  if (!card) {
    elements.detailPanel.innerHTML = `
      <div class="empty-detail">
        <h2>选择一张卡牌</h2>
        <p>点开左边列表后，这里会显示大图、功能介绍和朗读按钮。</p>
      </div>
    `;
    return;
  }

  elements.detailPanel.innerHTML = `
    <article class="detail-card">
      <div class="detail-image-wrap">
        <img class="detail-image" src="${escapeHtml(card.imageURL)}" alt="${escapeHtml(card.localizedName)}" />
      </div>
      <div class="detail-title-row">
        <div>
          <h2 class="detail-title">${escapeHtml(card.localizedName)}</h2>
          <p class="detail-subtitle">${escapeHtml(card.name)}</p>
          <div class="tag-row">
            <span class="tag">${escapeHtml(card.category)} · ${escapeHtml(card.typeLine)}</span>
            <span class="tag tag-soft">${escapeHtml(getSourceLabel(card))}</span>
          </div>
        </div>
        <button class="favorite-button" id="favorite-button">${isFavorite(card.id) ? "取消收藏" : "收藏"}</button>
      </div>
      <div class="detail-actions">
        <button class="read-button" id="read-button">朗读名称和介绍</button>
        <button class="secondary-button" id="random-from-detail-button">换一张随机卡</button>
      </div>
      <section class="info-block">
        <h3>中文说明</h3>
        <p>${escapeHtml(card.translatedEffectText || card.effectText)}</p>
      </section>
      <section class="info-block">
        <h3>英文原文</h3>
        <p>${escapeHtml(card.effectText)}</p>
      </section>
      <section class="info-block">
        <h3>效果要点</h3>
        <p>${escapeHtml(card.childFriendlySummary)}</p>
      </section>
      <section class="info-block">
        <h3>推荐用法</h3>
        <p>${escapeHtml(card.recommendedUsage)}</p>
      </section>
      <section class="info-block">
        <h3>使用定位</h3>
        <div class="tag-row">
          ${card.usageTags.map((tag) => `<span class="tag tag-soft">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </section>
      <section class="info-block">
        <h3>常见配合方向</h3>
        <p>${escapeHtml(card.synergyNotes)}</p>
      </section>
    </article>
  `;

  document.querySelector("#favorite-button")?.addEventListener("click", () => {
    toggleFavorite(card.id);
  });

  document.querySelector("#read-button")?.addEventListener("click", () => {
    speakCard(card);
  });

  document.querySelector("#random-from-detail-button")?.addEventListener("click", () => {
    chooseRandomSpotlight();
    state.selectedCardId = state.spotlightCardId;
    render();
  });
}

function getFilteredCards() {
  const query = state.searchText.trim().toLowerCase();

  return getAllCards().filter((card) => {
    const matchesCategory = state.selectedCategory === "全部" || card.category === state.selectedCategory;
    const matchesFavorites = !state.favoritesOnly || isFavorite(card.id);
    const matchesText =
      !query ||
      [
        card.name,
        card.localizedName,
        card.category,
        card.typeLine,
        card.effectText,
        card.translatedEffectText,
        card.childFriendlySummary
      ].some((field) => field.toLowerCase().includes(query));

    return matchesCategory && matchesFavorites && matchesText;
  });
}

function getSelectedCard() {
  const filteredCards = getFilteredCards();
  return filteredCards.find((card) => card.id === state.selectedCardId) ?? filteredCards[0] ?? null;
}

function getSpotlightCard() {
  const filteredCards = getFilteredCards();
  return getAllCards().find((card) => card.id === state.spotlightCardId && filteredCards.some((item) => item.id === card.id)) ?? filteredCards[0] ?? null;
}

function keepSelectionVisible() {
  const filteredCards = getFilteredCards();
  if (!filteredCards.some((card) => card.id === state.selectedCardId)) {
    state.selectedCardId = filteredCards[0]?.id ?? null;
  }

  if (!filteredCards.some((card) => card.id === state.spotlightCardId)) {
    state.spotlightCardId = filteredCards[0]?.id ?? null;
  }
}

function chooseRandomSpotlight() {
  const filteredCards = getFilteredCards();
  if (!filteredCards.length) return;
  const randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];
  state.spotlightCardId = randomCard.id;
}

function renderLoadMore(filteredCards, visibleCount) {
  teardownLoadMoreObserver();

  if (visibleCount >= filteredCards.length) {
    elements.loadMoreWrap.innerHTML = "";
    return;
  }

  const remaining = filteredCards.length - visibleCount;
  elements.loadMoreWrap.innerHTML = `
    <div class="load-more-card">
      <strong>还有 ${remaining} 张卡牌可以继续看</strong>
      <p class="list-subtext">继续往下滚动时会自动显示更多结果，也可以手动点按钮。</p>
      <button class="secondary-button" id="load-more-button">再加载 ${Math.min(visibleCardStep, remaining)} 张</button>
      <div id="load-more-sentinel"></div>
    </div>
  `;

  document.querySelector("#load-more-button")?.addEventListener("click", () => {
    loadMoreCards();
  });

  const sentinel = document.querySelector("#load-more-sentinel");
  if (!sentinel || !("IntersectionObserver" in window)) return;

  loadMoreObserver = new IntersectionObserver((entries) => {
    const isVisible = entries.some((entry) => entry.isIntersecting);
    if (isVisible) {
      loadMoreCards();
    }
  }, { rootMargin: "220px 0px" });

  loadMoreObserver.observe(sentinel);
}

function teardownLoadMoreObserver() {
  if (loadMoreObserver) {
    loadMoreObserver.disconnect();
    loadMoreObserver = null;
  }
}

function loadMoreCards() {
  const filteredCards = getFilteredCards();
  if (state.visibleCardCount >= filteredCards.length) return;
  state.visibleCardCount = Math.min(filteredCards.length, state.visibleCardCount + visibleCardStep);
  render();
}

function getAllCards() {
  const merged = new Map();
  [...sampleCards, ...state.remoteCards].forEach((card) => {
    merged.set(card.id, card);
  });
  return [...merged.values()];
}

function getSourceLabel(card) {
  return card.source === "remote" ? "在线卡库" : "内置示例";
}

function buildMatchBadges(card) {
  const badges = [];
  const summary = `${card.effectText} ${card.childFriendlySummary}`.toLowerCase();

  if (summary.includes("destroy")) badges.push("偏破坏");
  if (summary.includes("special summon")) badges.push("会召回伙伴");
  if (summary.includes("add 1")) badges.push("会找卡");
  if (summary.includes("negate")) badges.push("会打断效果");
  if (summary.includes("cannot attack")) badges.push("偏限制对手");
  if (summary.includes("draw")) badges.push("会补手牌");
  if (summary.includes("gy") || summary.includes("graveyard")) badges.push("和墓地有关");
  if (summary.includes("banish")) badges.push("会除外卡牌");
  if (summary.includes("target")) badges.push("需要选定目标");

  return badges.slice(0, 3);
}

function loadFavorites() {
  try {
    const raw = localStorage.getItem(favoritesKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function isFavorite(cardId) {
  return state.favoriteIds.has(cardId);
}

function toggleFavorite(cardId) {
  if (state.favoriteIds.has(cardId)) {
    state.favoriteIds.delete(cardId);
    showToast("已取消收藏");
  } else {
    state.favoriteIds.add(cardId);
    showToast("已加入收藏");
  }

  localStorage.setItem(favoritesKey, JSON.stringify([...state.favoriteIds]));
  render();
}

function loadRemoteCache() {
  try {
    const raw = localStorage.getItem(remoteCacheKey);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveRemoteCache() {
  localStorage.setItem(remoteCacheKey, JSON.stringify(remoteCache));
}

function scheduleRemoteSearch() {
  window.clearTimeout(remoteSearchTimer);
  const trimmedQuery = state.searchText.trim();

  if (trimmedQuery.length < remoteSearchMinimumLength) {
    state.remoteCards = [];
    state.isRemoteLoading = false;
    state.remoteError = "";
    state.remoteStatus = "当前展示的是内置示例卡牌。";
    return;
  }

  remoteSearchTimer = window.setTimeout(() => {
    performRemoteSearch(trimmedQuery);
  }, 350);
}

async function performRemoteSearch(query) {
  const requestToken = ++activeRemoteRequestToken;
  state.isRemoteLoading = true;
  state.remoteError = "";
  state.remoteStatus = `正在为“${query}”搜索线上卡牌...`;
  render();

  const cacheKey = buildRemoteCacheKey(query);
  const cachedEntry = remoteCache[cacheKey];
  if (cachedEntry && Date.now() - cachedEntry.timestamp < remoteCacheTTL) {
    if (requestToken !== activeRemoteRequestToken) return;
    state.remoteCards = cachedEntry.cards;
    state.isRemoteLoading = false;
    state.remoteStatus = `已从本地缓存恢复 ${cachedEntry.cards.length} 张线上卡牌。`;
    state.visibleCardCount = initialVisibleCardCount;
    keepSelectionVisible();
    render();
    return;
  }

  try {
    const url = new URL(remoteSearchEndpoint);
    url.searchParams.set("fname", query);
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    const remoteCards = Array.isArray(payload.data)
      ? payload.data.slice(0, 40).map(mapRemoteCard).filter(Boolean)
      : [];

    remoteCache[cacheKey] = {
      timestamp: Date.now(),
      cards: remoteCards
    };
    saveRemoteCache();

    if (requestToken !== activeRemoteRequestToken) return;
    state.remoteCards = remoteCards;
    state.isRemoteLoading = false;
    state.visibleCardCount = initialVisibleCardCount;
    state.remoteStatus = remoteCards.length
      ? `线上卡牌库补充了 ${remoteCards.length} 张相关卡牌。`
      : "线上卡牌库没有返回更多结果，当前只显示本地示例卡。";
    keepSelectionVisible();
    render();
  } catch (error) {
    if (requestToken !== activeRemoteRequestToken) return;
    state.remoteCards = [];
    state.isRemoteLoading = false;
    state.visibleCardCount = initialVisibleCardCount;
    state.remoteError = "线上搜索暂时失败，先继续用内置卡牌。";
    state.remoteStatus = "没能连上线上卡牌库。";
    keepSelectionVisible();
    render();
  }
}

function buildRemoteCacheKey(query) {
  return query.trim().toLowerCase();
}

function mapRemoteCard(apiCard) {
  if (!apiCard || typeof apiCard !== "object") return null;

  const typeLine = apiCard.type ?? "";
  const category = inferCategory(typeLine);
  const effectText = apiCard.desc ?? "";
  const imageURL = apiCard.card_images?.[0]?.image_url ?? "";
  const name = apiCard.name ?? "未知卡牌";
  const localizedName = name;

  return {
    id: Number(apiCard.id),
    name,
    localizedName,
    category,
    typeLine,
    imageURL,
    effectText,
    translatedEffectText: translateEffectTextToChinese(effectText),
    childFriendlySummary: summarizeEffectPoints({ name, category, typeLine, effectText }),
    recommendedUsage: summarizeRecommendedUsage({ category, typeLine, effectText }),
    usageTags: summarizeUsageTags({ category, typeLine, effectText }),
    synergyNotes: summarizeSynergyNotes({ category, typeLine, effectText }),
    source: "remote"
  };
}

function inferCategory(typeLine) {
  const normalized = String(typeLine).toLowerCase();
  if (normalized.includes("spell")) return "魔法";
  if (normalized.includes("trap")) return "陷阱";
  return "怪兽";
}

function summarizeEffectPoints({ name, category, typeLine, effectText }) {
  const effect = String(effectText).replace(/\s+/g, " ").trim();
  const lowered = effect.toLowerCase();
  const effectParts = [];

  if (lowered.includes("special summon")) effectParts.push("可以特殊召唤怪兽");
  if (lowered.includes("add 1")) effectParts.push("可以从卡组把指定卡加入手牌");
  if (lowered.includes("destroy")) effectParts.push("会破坏场上的卡");
  if (lowered.includes("negate")) effectParts.push("可以无效对手的效果或发动");
  if (lowered.includes("draw")) effectParts.push("可以补充手牌");
  if (lowered.includes("return it to the hand") || lowered.includes("return 1") || lowered.includes("return that target")) effectParts.push("可以把卡返回手牌");
  if (lowered.includes("cannot attack")) effectParts.push("会限制怪兽攻击");
  if (lowered.includes("battle damage")) effectParts.push("会影响战斗伤害");
  if (lowered.includes("banish")) effectParts.push("会除外卡牌");
  if (lowered.includes("gy") || lowered.includes("graveyard")) effectParts.push("效果与墓地资源有关");
  if (lowered.includes("target")) effectParts.push("发动时需要选择目标");
  if (lowered.includes("cannot be destroyed") || lowered.includes("cannot target")) effectParts.push("自身不容易被效果处理");

  if (!effectParts.length) {
    if (category === "怪兽" && String(typeLine).toLowerCase().includes("normal")) {
      return "通常怪兽，没有额外效果，主要依靠攻击力、守备力和召唤条件。";
    }

    return "这张卡的效果描述比较偏规则文本，建议结合原始介绍逐句查看。";
  }

  return `效果重点：${[...new Set(effectParts)].slice(0, 4).join("；")}。`;
}

function translateEffectTextToChinese(effectText) {
  const effect = String(effectText).replace(/\r?\n+/g, " ").replace(/\s+/g, " ").trim();
  if (!effect) return "";

  const exactMap = new Map([
    ["Target 1 monster in either GY; Special Summon it.", "以任意一方墓地中的 1 只怪兽为对象发动；将那只怪兽特殊召唤。"],
    ["When an opponent's monster declares an attack: Destroy all your opponent's Attack Position monsters.", "对手怪兽宣言攻击时发动；破坏对手场上所有攻击表示怪兽。"],
    ["During your opponent's turn, at damage calculation: You can discard this card; you take no battle damage from that battle.", "对手回合的伤害计算时，你可以丢弃这张卡；那次战斗你受到的战斗伤害变成 0。"],
    ["The ultimate wizard in terms of attack and defense.", "以攻击和守备能力而言，这是最强的魔法师。"],
    ["This legendary dragon is a powerful engine of destruction.", "这只传说之龙拥有强大的破坏力。"],
    ["A ferocious dragon with a deadly attack.", "拥有凶猛攻击力的黑龙。"]
  ]);

  if (exactMap.has(effect)) {
    return exactMap.get(effect);
  }

  let translated = effect;
  const replacements = [
    [/Cannot be Normal Summoned\/Set\./gi, "不能通常召唤/盖放。"],
    [/Must be Ritual Summoned\./gi, "必须通过仪式召唤。"],
    [/Must first be Special Summoned/gi, "必须先特殊召唤"],
    [/You can only use each effect of/gi, "以下各效果各回合只能使用 1 次："],
    [/You can only use this effect of/gi, "这个效果每回合只能使用 1 次："],
    [/During your opponent's turn/gi, "对手回合中"],
    [/During your End Phase/gi, "在结束阶段"],
    [/At the start of the Damage Step/gi, "在伤害步骤开始时"],
    [/at damage calculation/gi, "在伤害计算时"],
    [/When an opponent's monster declares an attack/gi, "对手怪兽宣言攻击时"],
    [/When your opponent Normal or Flip Summons 1 monster with 1000 or more ATK/gi, "对手通常召唤或反转召唤 1 只攻击力 1000 以上的怪兽时"],
    [/Target 1 monster in either GY/gi, "以任意一方墓地中的 1 只怪兽为对象"],
    [/Target that monster/gi, "以那只怪兽为对象"],
    [/destroy that target/gi, "破坏那只怪兽"],
    [/Destroy all your opponent's Attack Position monsters/gi, "破坏对手场上所有攻击表示怪兽"],
    [/Special Summon it/gi, "将那只怪兽特殊召唤"],
    [/Special Summon this card/gi, "将这张卡特殊召唤"],
    [/add 1/gi, "把 1 张"],
    [/from your Deck to your hand/gi, "从卡组加入手牌"],
    [/draw 1 card/gi, "抽 1 张卡"],
    [/return it to the hand/gi, "将其返回手牌"],
    [/return that target to the hand/gi, "将那张卡返回手牌"],
    [/banish this card/gi, "将这张卡除外"],
    [/GY/gi, "墓地"],
    [/Graveyard/gi, "墓地"],
    [/battle damage/gi, "战斗伤害"],
    [/cannot declare an attack/gi, "不能宣言攻击"],
    [/cannot be destroyed/gi, "不会被破坏"],
    [/cannot target/gi, "不能作为对象"],
    [/negate the activation/gi, "那次发动无效"],
    [/negate that effect/gi, "那个效果无效"],
    [/Once per turn/gi, "1 回合 1 次"],
    [/If this card is Special Summoned/gi, "这张卡特殊召唤成功时"],
    [/If this card battles/gi, "这张卡进行战斗时"],
    [/If this card attacks a Defense Position monster/gi, "这张卡攻击守备表示怪兽时"],
    [/You can target 1 card your opponent controls/gi, "可以以对手场上 1 张卡为对象"],
    [/all Level 8 or higher Dragon monsters you control gain 1000 ATK/gi, "自己场上全部 8 星以上龙族怪兽攻击力上升 1000"],
    [/your opponent cannot target this card with card effects/gi, "对手不能用卡的效果以这张卡为对象"],
    [/also it cannot be destroyed by your opponent's card effects/gi, "并且不会被对手的卡的效果破坏"]
  ];

  replacements.forEach(([pattern, replacement]) => {
    translated = translated.replace(pattern, replacement);
  });

  translated = translated
    .replace(/;/g, "；")
    .replace(/:/g, "：")
    .replace(/,/g, "，")
    .replace(/\./g, "。");

  if (!/[一-龥]/.test(translated)) {
    return effect;
  }

  return translated;
}

function summarizeRecommendedUsage({ category, typeLine, effectText }) {
  const effect = String(effectText).replace(/\s+/g, " ").trim();
  const lowered = effect.toLowerCase();
  const normalizedType = String(typeLine).toLowerCase();

  if (lowered.includes("special summon")) {
    return "推荐在需要补充场面、延续展开，或把关键怪兽重新利用时使用。";
  }

  if (lowered.includes("destroy") && category === "陷阱") {
    return "推荐先盖放，等对手做出关键动作后再发动，用来打断展开或解掉威胁。";
  }

  if (lowered.includes("destroy")) {
    return "推荐在对手场上出现关键卡时使用，优先处理高威胁目标。";
  }

  if (lowered.includes("negate")) {
    return "推荐保留到关键时点再用，优先无效对手最重要的效果或发动。";
  }

  if (lowered.includes("add 1")) {
    return "推荐在回合前段使用，先把需要的资源加入手牌，再安排后续展开。";
  }

  if (lowered.includes("cannot attack")) {
    return "推荐在自己需要争取回合时使用，用来拖慢对手进攻节奏。";
  }

  if (lowered.includes("battle damage")) {
    return "推荐在战斗阶段保留，等需要防守或减少伤害时再用。";
  }

  if (normalizedType.includes("normal monster")) {
    return "推荐作为基础战斗怪兽、素材，或与对应系列支援卡配合使用。";
  }

  if (category === "魔法") {
    return "推荐在最能扩大收益的时点使用，优先服务自己当前回合的关键动作。";
  }

  if (category === "陷阱") {
    return "推荐先盖放，等对手进入关键步骤时再发动。";
  }

  return "推荐结合当前场面决定时机，优先在能改变场面交换结果时使用。";
}

function summarizeUsageTags({ category, typeLine, effectText }) {
  const lowered = String(effectText).toLowerCase();
  const normalizedType = String(typeLine).toLowerCase();
  const tags = [];

  if (lowered.includes("when an opponent") || category === "陷阱") {
    tags.push("偏先手");
  }

  if (lowered.includes("special summon") || lowered.includes("add 1")) {
    tags.push("偏展开");
  }

  if (lowered.includes("destroy") || lowered.includes("banish") || lowered.includes("return")) {
    tags.push("偏解场");
  }

  if (lowered.includes("battle damage") || lowered.includes("cannot attack")) {
    tags.push("偏防守");
  }

  if (normalizedType.includes("normal monster") || lowered.includes("attack")) {
    tags.push("偏进攻");
  }

  if (!tags.length) {
    tags.push("先后手都可");
  }

  return [...new Set(tags)].slice(0, 3);
}

function summarizeSynergyNotes({ category, typeLine, effectText }) {
  const lowered = String(effectText).toLowerCase();
  const normalizedType = String(typeLine).toLowerCase();

  if (lowered.includes("graveyard") || lowered.includes("gy") || lowered.includes("special summon")) {
    return "适合与墓地利用、复活展开，或需要反复回收怪兽资源的卡配合。";
  }

  if (lowered.includes("add 1")) {
    return "适合与需要稳定检索关键卡、围绕固定核心组件展开的策略配合。";
  }

  if (lowered.includes("destroy") || lowered.includes("negate")) {
    return "适合与其他干扰卡搭配，形成连续压制或多段打断。";
  }

  if (category === "陷阱") {
    return "适合与其他盖放陷阱一起使用，增强对手回合的干扰密度。";
  }

  if (normalizedType.includes("normal monster")) {
    return "适合与通常怪兽支援、素材需求，或对应系列专属卡配合。";
  }

  return "适合结合当前卡组核心思路使用，优先与能放大这张卡收益的资源配合。";
}

function speakCard(card) {
  if (!("speechSynthesis" in window)) {
    showToast("当前浏览器不支持朗读。");
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(`${card.localizedName}。中文说明：${card.translatedEffectText || card.effectText}。推荐用法：${card.recommendedUsage}。使用定位：${card.usageTags.join("，")}。常见配合方向：${card.synergyNotes}`);
  utterance.lang = "zh-CN";
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

function syncControls() {
  elements.searchInput.value = state.searchText;
  elements.favoritesOnlyCheckbox.checked = state.favoritesOnly;
}

function showToast(message) {
  showToastWithTone(message, "default");
}

function showToastWithTone(message, tone) {
  const existing = document.querySelector(".status-toast");
  existing?.remove();

  const toast = document.createElement("div");
  toast.className = `status-toast${tone === "error" ? " is-error" : ""}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 2200);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
