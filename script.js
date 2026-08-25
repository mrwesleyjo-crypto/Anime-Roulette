// ---------------------------------------------------------------------------
// Data: rarities + character roster
// ---------------------------------------------------------------------------

const RARITIES = {
  Common: { weight: 50, color: '#9aa5b1', minPower: 60, maxPower: 75 },
  Rare: { weight: 32, color: '#3498db', minPower: 76, maxPower: 85 },
  Epic: { weight: 14, color: '#a855f7', minPower: 86, maxPower: 93 },
  Legendary: { weight: 4, color: '#ffd24d', minPower: 94, maxPower: 100 }
};

const RARITY_ORDER = ['Common', 'Rare', 'Epic', 'Legendary'];

const NAMES_BY_RARITY = {
  Common: [
    'Naruto Uzumaki', 'Ichigo Kurosaki', 'Tanjiro Kamado', 'Izuku Midoriya',
    'Asta', 'Natsu Dragneel', 'Eren Yeager', 'Edward Elric',
    'Light Yagami', 'Killua Zoldyck', 'Yusuke Urameshi', 'Gon Freecss',
    'Denji', 'Ash Ketchum'
  ],
  Rare: [
    'Monkey D. Luffy', 'Sasuke Uchiha', 'Levi Ackerman', 'Roronoa Zoro',
    'Itachi Uchiha', 'Kakashi Hatake', 'Vegeta', 'Meliodas',
    'Erza Scarlet', 'Rimuru Tempest', 'All Might', 'Shanks'
  ],
  Epic: [
    'Goku', 'Gojo Satoru', 'Madara Uchiha', 'Aizen Sosuke',
    'Whitebeard', 'Sung Jin-Woo', 'Alucard', 'Guts'
  ],
  Legendary: [
    'Saitama', 'Zeno', 'Yhwach'
  ]
};

function buildCharacterPool() {
  const pool = [];
  RARITY_ORDER.forEach(rarity => {
    const cfg = RARITIES[rarity];
    NAMES_BY_RARITY[rarity].forEach(name => {
      const power = Math.floor(cfg.minPower + Math.random() * (cfg.maxPower - cfg.minPower));
      pool.push({ name, rarity, color: cfg.color, power });
    });
  });
  return pool;
}

const CHARACTER_POOL = buildCharacterPool();
const CHARACTERS_BY_RARITY = RARITY_ORDER.reduce((acc, rarity) => {
  acc[rarity] = CHARACTER_POOL.filter(c => c.rarity === rarity);
  return acc;
}, {});

// ---------------------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------------------

const track = document.getElementById('strip-track');
const viewport = document.querySelector('.roulette-viewport');
const spinBtn = document.getElementById('spin-btn');
const resultEl = document.getElementById('result');
const nameEl = document.getElementById('character-name');
const rarityEl = document.getElementById('character-rarity');
const powerEl = document.getElementById('stat-power');
const statSpinsEl = document.getElementById('stat-spins');
const statBestEl = document.getElementById('stat-best');
const historyListEl = document.getElementById('history-list');

// ---------------------------------------------------------------------------
// Constants for the strip animation
// ---------------------------------------------------------------------------

const ITEM_WIDTH = 150;
const ITEM_MARGIN = 12;
const ITEM_FULL_WIDTH = ITEM_WIDTH + ITEM_MARGIN;
const TOTAL_ITEMS = 60;      // how many cards make up one spin strip
const WINNER_INDEX = 52;     // fixed position of the winning card in the strip
const MIN_DURATION = 5500;
const MAX_DURATION = 7000;
const EASING = 'cubic-bezier(0.12, 0.85, 0.28, 1)';

let spinCount = 0;
let bestPull = null; // {name, rarity}
let isSpinning = false;

// ---------------------------------------------------------------------------
// Weighted random helpers
// ---------------------------------------------------------------------------

function pickRandomRarity() {
  const totalWeight = RARITY_ORDER.reduce((sum, r) => sum + RARITIES[r].weight, 0);
  let roll = Math.random() * totalWeight;
  for (const rarity of RARITY_ORDER) {
    roll -= RARITIES[rarity].weight;
    if (roll <= 0) return rarity;
  }
  return RARITY_ORDER[0];
}

function pickWinner() {
  const rarity = pickRandomRarity();
  const options = CHARACTERS_BY_RARITY[rarity];
  return options[Math.floor(Math.random() * options.length)];
}

function randomCharacter() {
  return CHARACTER_POOL[Math.floor(Math.random() * CHARACTER_POOL.length)];
}

// ---------------------------------------------------------------------------
// Strip rendering
// ---------------------------------------------------------------------------

function initials(name) {
  return name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function createItemEl(character) {
  const el = document.createElement('div');
  el.className = 'strip-item';
  el.style.setProperty('--rarity-color', character.color);

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = initials(character.name);

  const name = document.createElement('div');
  name.className = 'name';
  name.textContent = character.name;

  const tag = document.createElement('div');
  tag.className = 'rarity-tag';
  tag.textContent = character.rarity;

  el.appendChild(avatar);
  el.appendChild(name);
  el.appendChild(tag);
  return el;
}

function buildStrip(winner) {
  const items = [];
  for (let i = 0; i < TOTAL_ITEMS; i++) {
    items.push(i === WINNER_INDEX ? winner : randomCharacter());
  }
  return items;
}

function renderStrip(items) {
  track.innerHTML = '';
  const fragment = document.createDocumentFragment();
  items.forEach(character => fragment.appendChild(createItemEl(character)));
  track.appendChild(fragment);
}

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------

function targetTranslateX() {
  const containerWidth = viewport.clientWidth;
  const winnerCenter = WINNER_INDEX * ITEM_FULL_WIDTH + ITEM_WIDTH / 2;
  const jitter = (Math.random() - 0.5) * 80; // stay safely inside the card
  return containerWidth / 2 - winnerCenter + jitter;
}

function spin() {
  if (isSpinning) return;
  isSpinning = true;

  spinBtn.disabled = true;
  resultEl.classList.add('hidden');

  const winner = pickWinner();
  const items = buildStrip(winner);
  renderStrip(items);

  // Snap the track back to a starting position with no transition.
  track.style.transition = 'none';
  track.style.transform = 'translateX(0px)';
  // Force reflow so the browser registers the reset before animating.
  void track.offsetHeight;

  const duration = MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);
  const finalX = targetTranslateX();

  requestAnimationFrame(() => {
    track.style.transition = `transform ${duration}ms ${EASING}`;
    track.style.transform = `translateX(${finalX}px)`;
  });

  let settled = false;
  const finish = () => {
    if (settled) return;
    settled = true;
    onSpinComplete(winner);
  };

  track.addEventListener('transitionend', finish, { once: true });
  // Safety net in case transitionend doesn't fire for any reason.
  setTimeout(finish, duration + 150);
}

function onSpinComplete(winner) {
  isSpinning = false;
  spinBtn.disabled = false;

  const winnerEl = track.children[WINNER_INDEX];
  if (winnerEl) winnerEl.classList.add('winner');

  nameEl.textContent = winner.name;
  rarityEl.textContent = `Zeldzaamheid: ${winner.rarity}`;
  rarityEl.style.color = winner.color;
  powerEl.textContent = winner.power;
  resultEl.classList.remove('hidden');

  spinCount += 1;
  statSpinsEl.textContent = spinCount;

  if (!bestPull || rarityRank(winner.rarity) > rarityRank(bestPull.rarity)) {
    bestPull = winner;
    statBestEl.textContent = `${winner.name} (${winner.rarity})`;
  }

  addToHistory(winner);
}

function rarityRank(rarity) {
  return RARITY_ORDER.indexOf(rarity);
}

function addToHistory(character) {
  const chip = document.createElement('span');
  chip.className = 'history-chip';
  chip.style.setProperty('--rarity-color', character.color);
  chip.textContent = character.name;
  historyListEl.prepend(chip);

  while (historyListEl.children.length > 10) {
    historyListEl.removeChild(historyListEl.lastChild);
  }
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

renderStrip(buildStrip(randomCharacter()));
spinBtn.addEventListener('click', spin);
