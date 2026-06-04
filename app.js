const sampleCards = [
  {
    id: 89631139,
    name: "Blue-Eyes White Dragon",
    localizedName: "青眼白龙",
    category: "怪兽",
    typeLine: "Normal Monster",
    imageURL: "https://images.ygoprodeck.com/images/cards/89631139.jpg",
    effectText: "This legendary dragon is a powerful engine of destruction.",
    childFriendlySummary: "这是一只很厉害的大龙，攻击力很高，适合给小朋友介绍什么叫强力怪兽。"
  },
  {
    id: 46986414,
    name: "Dark Magician",
    localizedName: "黑魔导",
    category: "怪兽",
    typeLine: "Normal Monster",
    imageURL: "https://images.ygoprodeck.com/images/cards/46986414.jpg",
    effectText: "The ultimate wizard in terms of attack and defense.",
    childFriendlySummary: "这是经典魔法师怪兽，像会施法的勇士，适合讲解魔法师风格的卡牌。"
  },
  {
    id: 83764718,
    name: "Monster Reborn",
    localizedName: "死者苏生",
    category: "魔法",
    typeLine: "Normal Spell Card",
    imageURL: "https://images.ygoprodeck.com/images/cards/83764718.jpg",
    effectText: "Target 1 monster in either GY; Special Summon it.",
    childFriendlySummary: "这张魔法卡可以把已经退场的怪兽重新叫回来，就像把队友请回战场。"
  },
  {
    id: 44095762,
    name: "Mirror Force",
    localizedName: "神圣防护罩-反射镜力-",
    category: "陷阱",
    typeLine: "Normal Trap Card",
    imageURL: "https://images.ygoprodeck.com/images/cards/44095762.jpg",
    effectText: "When an opponent's monster declares an attack: Destroy all your opponent's Attack Position monsters.",
    childFriendlySummary: "这张陷阱卡会在对手冲过来时发动，把对面正在攻击的怪兽一起挡回去。"
  },
  {
    id: 74677422,
    name: "Red-Eyes Black Dragon",
    localizedName: "真红眼黑龙",
    category: "怪兽",
    typeLine: "Normal Monster",
    imageURL: "https://images.ygoprodeck.com/images/cards/74677422.jpg",
    effectText: "A ferocious dragon with a deadly attack.",
    childFriendlySummary: "这是一只很帅的黑龙，适合给小朋友介绍不同龙族怪兽的风格。"
  },
  {
    id: 40640057,
    name: "Kuriboh",
    localizedName: "栗子球",
    category: "怪兽",
    typeLine: "Effect Monster",
    imageURL: "https://images.ygoprodeck.com/images/cards/40640057.jpg",
    effectText: "During your opponent's turn, at damage calculation: You can discard this card; you take no battle damage from that battle.",
    childFriendlySummary: "这只小怪兽很可爱，虽然不大，但能在危险时帮你挡一下，是保护型卡牌。"
  },
  {
    id: 72302403,
    name: "Swords of Revealing Light",
    localizedName: "光之护封剑",
    category: "魔法",
    typeLine: "Normal Spell Card",
    imageURL: "https://images.ygoprodeck.com/images/cards/72302403.jpg",
    effectText: "After this card's activation, it remains on the field, but destroy it during the End Phase of your opponent's 3rd turn. While this card is face-up on the field, your opponent's monsters cannot declare an attack.",
    childFriendlySummary: "这张魔法卡像三把发光的剑站在前面，让对手先别打过来，帮自己争取时间。"
  },
  {
    id: 4206964,
    name: "Trap Hole",
    localizedName: "落穴",
    category: "陷阱",
    typeLine: "Normal Trap Card",
    imageURL: "https://images.ygoprodeck.com/images/cards/4206964.jpg",
    effectText: "When your opponent Normal or Flip Summons 1 monster with 1000 or more ATK: Target that monster; destroy that target.",
    childFriendlySummary: "这张陷阱卡像地上突然开了个坑，对手一放出厉害怪兽，就可能掉进去。"
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
    showToast("语音输入暂时不可用，可以直接用系统键盘听写。");
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
        <p class="spotlight-summary">${escapeHtml(card.childFriendlySummary)}</p>
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
            <p class="card-summary">${escapeHtml(card.childFriendlySummary)}</p>
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
        <h3>这张卡是做什么的</h3>
        <p>${escapeHtml(card.childFriendlySummary)}</p>
      </section>
      <section class="info-block">
        <h3>原始效果说明</h3>
        <p>${escapeHtml(card.effectText)}</p>
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
  const summary = `${card.childFriendlySummary} ${card.effectText}`.toLowerCase();

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
    childFriendlySummary: summarizeCardForKids({ name, category, typeLine, effectText }),
    source: "remote"
  };
}

function inferCategory(typeLine) {
  const normalized = String(typeLine).toLowerCase();
  if (normalized.includes("spell")) return "魔法";
  if (normalized.includes("trap")) return "陷阱";
  return "怪兽";
}

function summarizeCardForKids({ name, category, typeLine, effectText }) {
  const effect = String(effectText).replace(/\s+/g, " ").trim();
  const lowered = effect.toLowerCase();
  const effectParts = [];

  if (lowered.includes("special summon")) effectParts.push("能把怪兽特别叫上场");
  if (lowered.includes("add 1")) effectParts.push("能从卡组找来需要的卡");
  if (lowered.includes("destroy")) effectParts.push("会破坏场上的卡");
  if (lowered.includes("negate")) effectParts.push("能打断或无效化对手动作");
  if (lowered.includes("draw")) effectParts.push("能帮自己多抽卡");
  if (lowered.includes("return it to the hand") || lowered.includes("return 1") || lowered.includes("return that target")) effectParts.push("会把卡弹回手上");
  if (lowered.includes("cannot attack")) effectParts.push("会限制对手进攻");
  if (lowered.includes("battle damage")) effectParts.push("和战斗伤害有关");
  if (lowered.includes("banish")) effectParts.push("会把卡直接除外");
  if (lowered.includes("gy") || lowered.includes("graveyard")) effectParts.push("会和墓地资源互动");
  if (lowered.includes("target")) effectParts.push("发动时通常要先选目标");
  if (lowered.includes("cannot be destroyed") || lowered.includes("cannot target")) effectParts.push("自己比较不容易被处理掉");

  const uniqueParts = [...new Set(effectParts)].slice(0, 3);
  const summaryCore = uniqueParts.length
    ? `它大致可以理解成：${uniqueParts.join("，")}。`
    : "它主要是用来帮助自己推进战局，或者阻止对手顺利出招。";

  const flavor = buildKidFriendlyFlavor(name, category, typeLine, lowered);
  return `${flavor}${summaryCore}`;
}

function buildKidFriendlyFlavor(name, category, typeLine, loweredEffect) {
  const loweredName = String(name).toLowerCase();

  if (loweredName.includes("dragon")) {
    return `${name} 给人的感觉像一条很能打的大龙，适合当作场上的主力角色。`;
  }

  if (loweredName.includes("magician") || loweredName.includes("wizard") || loweredName.includes("spell")) {
    return `${name} 比较像会施法的角色，重点常常不是硬碰硬，而是靠效果改变局面。`;
  }

  if (loweredName.includes("kuriboh")) {
    return `${name} 看起来像小帮手类型的卡，往往是在关键时刻出来保护自己。`;
  }

  if (category === "怪兽") {
    if (loweredEffect.includes("fusion") || String(typeLine).toLowerCase().includes("fusion")) {
      return `${name} 是一张合体后更强的怪兽卡，像把几个角色力量合在一起。`;
    }

    return `${name} 是一张怪兽卡，可以把它想成站在前线战斗或帮忙出招的角色。`;
  }

  if (category === "魔法") {
    return `${name} 是一张魔法卡，比较像突然施展出来的法术，用来帮助自己或限制对手。`;
  }

  return `${name} 是一张陷阱卡，通常会先埋伏起来，等到合适时机再跳出来影响战斗。`;
}

function speakCard(card) {
  if (!("speechSynthesis" in window)) {
    showToast("当前浏览器不支持朗读。");
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(`${card.localizedName}。${card.childFriendlySummary}`);
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
