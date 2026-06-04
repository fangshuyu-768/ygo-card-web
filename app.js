const cards = [
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
];

const categories = ["全部", "怪兽", "魔法", "陷阱"];
const favoritesKey = "ygo-card-web-favorites";

const state = {
  searchText: "",
  selectedCategory: "全部",
  favoritesOnly: false,
  selectedCardId: cards[0]?.id ?? null,
  spotlightCardId: cards[0]?.id ?? null,
  favoriteIds: loadFavorites()
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
  speakSpotlightButton: document.querySelector("#speak-spotlight-button")
};

let recognition = null;

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
    keepSelectionVisible();
    render();
  });

  elements.favoritesOnlyCheckbox.addEventListener("change", (event) => {
    state.favoritesOnly = event.target.checked;
    keepSelectionVisible();
    render();
  });

  elements.clearFiltersButton.addEventListener("click", () => {
    state.searchText = "";
    state.selectedCategory = "全部";
    state.favoritesOnly = false;
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
      renderCategoryFilters();
      keepSelectionVisible();
      render();
    });
    elements.categoryFilters.appendChild(button);
  });
}

function render() {
  renderCategoryFilters();
  renderSpotlight();
  renderList();
  renderDetail();
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
        <span class="tag">${escapeHtml(card.category)} · ${escapeHtml(card.typeLine)}</span>
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
  elements.resultCount.textContent = `共找到 ${filteredCards.length} 张卡牌`;

  if (!filteredCards.length) {
    elements.cardList.innerHTML = `
      <div class="empty-list">
        <h3>没有找到卡牌</h3>
        <p>试试更短的名称、不同类型，或者取消收藏筛选。</p>
      </div>
    `;
    return;
  }

  elements.cardList.innerHTML = filteredCards
    .map((card) => {
      const activeClass = card.id === state.selectedCardId ? " active" : "";
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
            <p class="card-summary">${escapeHtml(card.childFriendlySummary)}</p>
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
          <span class="tag">${escapeHtml(card.category)} · ${escapeHtml(card.typeLine)}</span>
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

  return cards.filter((card) => {
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
  return cards.find((card) => card.id === state.spotlightCardId && filteredCards.some((item) => item.id === card.id)) ?? filteredCards[0] ?? null;
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
  const existing = document.querySelector(".status-toast");
  existing?.remove();

  const toast = document.createElement("div");
  toast.className = "status-toast";
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
