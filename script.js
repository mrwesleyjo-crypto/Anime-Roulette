// ---------------------------------------------------------------------------
// Data: rarities + character roster (with source universe)
// ---------------------------------------------------------------------------

const RARITIES = {
  Common: { weight: 50, color: '#9aa5b1', minPower: 55, maxPower: 70 },
  Rare: { weight: 32, color: '#3498db', minPower: 71, maxPower: 82 },
  Epic: { weight: 14, color: '#a855f7', minPower: 83, maxPower: 92 },
  Legendary: { weight: 4, color: '#ffd24d', minPower: 93, maxPower: 100 }
};

const RARITY_ORDER = ['Common', 'Rare', 'Epic', 'Legendary'];

const ROSTER_BY_RARITY = {
  Common: [
    { name: 'Naruto Uzumaki', universe: 'Naruto' },
    { name: 'Ichigo Kurosaki', universe: 'Bleach' },
    { name: 'Tanjiro Kamado', universe: 'Demon Slayer' },
    { name: 'Izuku Midoriya', universe: 'My Hero Academia' },
    { name: 'Asta', universe: 'Black Clover' },
    { name: 'Natsu Dragneel', universe: 'Fairy Tail' },
    { name: 'Eren Yeager', universe: 'Attack on Titan' },
    { name: 'Edward Elric', universe: 'Fullmetal Alchemist' },
    { name: 'Light Yagami', universe: 'Death Note' },
    { name: 'Killua Zoldyck', universe: 'Hunter x Hunter' },
    { name: 'Yusuke Urameshi', universe: 'Yu Yu Hakusho' },
    { name: 'Gon Freecss', universe: 'Hunter x Hunter' },
    { name: 'Denji', universe: 'Chainsaw Man' },
    { name: 'Ash Ketchum', universe: 'Pokémon' }
  ],
  Rare: [
    { name: 'Monkey D. Luffy', universe: 'One Piece' },
    { name: 'Sasuke Uchiha', universe: 'Naruto' },
    { name: 'Levi Ackerman', universe: 'Attack on Titan' },
    { name: 'Roronoa Zoro', universe: 'One Piece' },
    { name: 'Itachi Uchiha', universe: 'Naruto' },
    { name: 'Kakashi Hatake', universe: 'Naruto' },
    { name: 'Vegeta', universe: 'Dragon Ball' },
    { name: 'Meliodas', universe: 'The Seven Deadly Sins' },
    { name: 'Erza Scarlet', universe: 'Fairy Tail' },
    { name: 'Rimuru Tempest', universe: 'That Time I Got Reincarnated as a Slime' },
    { name: 'All Might', universe: 'My Hero Academia' },
    { name: 'Shanks', universe: 'One Piece' }
  ],
  Epic: [
    { name: 'Goku', universe: 'Dragon Ball' },
    { name: 'Gojo Satoru', universe: 'Jujutsu Kaisen' },
    { name: 'Madara Uchiha', universe: 'Naruto' },
    { name: 'Aizen Sosuke', universe: 'Bleach' },
    { name: 'Whitebeard', universe: 'One Piece' },
    { name: 'Sung Jin-Woo', universe: 'Solo Leveling' },
    { name: 'Alucard', universe: 'Hellsing' },
    { name: 'Guts', universe: 'Berserk' }
  ],
  Legendary: [
    { name: 'Saitama', universe: 'One Punch Man' },
    { name: 'Zeno', universe: 'Dragon Ball Super' },
    { name: 'Yhwach', universe: 'Bleach' }
  ]
};

const STARTER_NAMES = ['Naruto Uzumaki', 'Ichigo Kurosaki', 'Tanjiro Kamado', 'Izuku Midoriya', 'Natsu Dragneel', 'Ash Ketchum'];

function buildCharacterPool() {
  const pool = [];
  RARITY_ORDER.forEach(rarity => {
    const cfg = RARITIES[rarity];
    const list = ROSTER_BY_RARITY[rarity];
    list.forEach(entry => {
      const power = Math.floor(cfg.minPower + Math.random() * (cfg.maxPower - cfg.minPower));
      pool.push({
        name: entry.name,
        universe: entry.universe,
        rarity,
        color: cfg.color,
        power,
        weight: cfg.weight / list.length,
        sub: `${entry.universe} · ${rarity}`,
        isStarter: STARTER_NAMES.includes(entry.name),
        awakenPhase: 0
      });
    });
  });
  return pool;
}

const CHARACTER_POOL = buildCharacterPool();
const STARTER_POOL = CHARACTER_POOL.filter(c => c.isStarter).map(c => ({ ...c, weight: 1 }));

// ---------------------------------------------------------------------------
// Awakenings
// ---------------------------------------------------------------------------

const AWAKENING_UNLOCK_TIER = 2; // Gold League (index 2) or later

const AWAKENING_CHAINS = {
  'Naruto Uzumaki': [
    { label: 'Nine-Tails Chakra Mode', multiplier: 2.5, newRarity: 'Rare', icon: '🦊', flavor: 'Kurama lends his power — the Nine-Tails Chakra Mode erupts!' },
    { label: 'Six Paths Sage Mode', multiplier: 1.8, newRarity: 'Legendary', icon: '☯️', flavor: 'Six Paths Sage Mode awakens — a power beyond mortal limits!' }
  ],
  'Goku': [
    { label: 'Super Saiyan', multiplier: 3, newRarity: 'Legendary', icon: '⚡', flavor: 'Golden light erupts — Goku ascends to Super Saiyan!' },
    { label: 'Super Saiyan Blue', multiplier: 2, newRarity: 'Legendary', icon: '🔵', flavor: 'A godly blue aura ignites — Super Saiyan Blue!' },
    { label: 'Ultra Instinct', multiplier: 1.7, newRarity: 'Legendary', icon: '⬜', flavor: 'Instinct takes over — Ultra Instinct engaged!' }
  ],
  'Vegeta': [
    { label: 'Super Saiyan', multiplier: 3, newRarity: 'Epic', icon: '⚡', flavor: "Vegeta's pride ignites into golden flame — Super Saiyan!" },
    { label: 'Super Saiyan Blue', multiplier: 2.2, newRarity: 'Legendary', icon: '🔵', flavor: 'The Prince of Saiyans ascends further — Super Saiyan Blue!' }
  ],
  'Ichigo Kurosaki': [
    { label: 'Bankai', multiplier: 2.5, newRarity: 'Rare', icon: '⚔️', flavor: '"Bankai!" — Ichigo\'s Zanpakuto reveals its true form!' },
    { label: 'Final Getsuga Tensho', multiplier: 1.8, newRarity: 'Legendary', icon: '🌑', flavor: 'Final Getsuga Tensho — a power that costs everything!' }
  ],
  'Sasuke Uchiha': [
    { label: 'Susanoo', multiplier: 3, newRarity: 'Epic', icon: '👹', flavor: 'Ribs of chakra rise around him — Susanoo manifests!' },
    { label: 'Rinnegan Susanoo', multiplier: 1.7, newRarity: 'Legendary', icon: '👁️', flavor: 'The Rinnegan awakens fully — a titan of chakra towers over the arena!' }
  ],
  'Monkey D. Luffy': [
    { label: 'Gear Second', multiplier: 2, newRarity: 'Epic', icon: '💨', flavor: 'Steam rises from his skin — Gear Second!' },
    { label: 'Gear Fourth', multiplier: 1.8, newRarity: 'Epic', icon: '🥊', flavor: 'Boundman rises — Gear Fourth!' },
    { label: 'Gear Fifth', multiplier: 1.7, newRarity: 'Legendary', icon: '☀️', flavor: 'The laughter of legend echoes out — Gear Fifth!' }
  ],
  'Izuku Midoriya': [
    { label: 'Full Cowl 100%', multiplier: 2.2, newRarity: 'Rare', icon: '💚', flavor: 'One For All surges to its limit — Full Cowl 100%!' }
  ],
  'Saitama': [
    { label: 'Serious Series', multiplier: 1.05, newRarity: 'Legendary', icon: '👊', flavor: 'Saitama decides to take this one seriously... his power barely changes. He was already holding back 0%.' }
  ]
};

// ---------------------------------------------------------------------------
// Support items
// ---------------------------------------------------------------------------

const ITEM_DEFS = {
  phoenixEmber: { name: 'Phoenix Ember', icon: '🔥', color: '#ff6b3d', desc: 'Revives you once when you would be eliminated.' },
  chakraDraft: { name: 'Chakra Draft', icon: '🍵', color: '#2ecc71', desc: '+20 power for your next match.' },
  twinMoon: { name: 'Twin Moon Talisman', icon: '🌙', color: '#a855f7', desc: 'Guarantees victory in your next match.' },
  spiritWhistle: { name: 'Spirit Whistle', icon: '🎐', color: '#3498db', desc: 'Doubles your next training boost.' },
  luckyDango: { name: 'Lucky Dango Skewer', icon: '🍡', color: '#ffd24d', desc: 'Your next scout is guaranteed Rare or better.' }
};

const ITEM_DROP_POOL = [
  { key: 'chakraDraft', weight: 32 },
  { key: 'spiritWhistle', weight: 28 },
  { key: 'luckyDango', weight: 22 },
  { key: 'twinMoon', weight: 10 },
  { key: 'phoenixEmber', weight: 8 }
].map(e => ({ ...ITEM_DEFS[e.key], key: e.key, weight: e.weight, sub: 'Item' }));

// ---------------------------------------------------------------------------
// Tournament map
// ---------------------------------------------------------------------------

const ROUND_LABELS = ['Round 1', 'Round 2', 'Semifinal', 'Final'];

const TIERS = [
  {
    name: 'Bronze League',
    icon: '🥉',
    bracket: [
      { name: 'Kael the Reckless', power: 40 },
      { name: 'Yumi Stormfist', power: 48 },
      { name: 'Draxo the Wall', power: 54 },
      { name: 'Sir Orlan, Bronze Champion', power: 62 }
    ]
  },
  {
    name: 'Silver League',
    icon: '🥈',
    bracket: [
      { name: 'Senna Swift', power: 54 },
      { name: 'Roku Ember', power: 62 },
      { name: 'Nadia Frostblade', power: 69 },
      { name: 'Lady Vael, Silver Champion', power: 76 }
    ]
  },
  {
    name: 'Gold League',
    icon: '🥇',
    bracket: [
      { name: 'Vesper Nightshade', power: 68 },
      { name: 'Thane Ironclad', power: 76 },
      { name: 'Amara Stormcaller', power: 83 },
      { name: 'General Korrath, Gold Champion', power: 90 }
    ]
  },
  {
    name: 'Platinum League',
    icon: '🏆',
    bracket: [
      { name: 'Coda Voidwalker', power: 82 },
      { name: 'Ozel the Silent', power: 89 },
      { name: 'Brin Hollowmane', power: 95 },
      { name: 'Sister Ishtar, Platinum Champion', power: 101 }
    ]
  },
  {
    name: 'Diamond League',
    icon: '💎',
    bracket: [
      { name: 'Kestrel Dawnbringer', power: 95 },
      { name: 'Marrow the Unbound', power: 101 },
      { name: 'Solstice Vane', power: 107 },
      { name: 'The Undying Vaun, Diamond Champion', power: 112 }
    ]
  },
  {
    name: 'Multiverse Final',
    icon: '👑',
    bracket: [
      { name: 'Echo Fractal', power: 106 },
      { name: 'Nyx Convergence', power: 112 },
      { name: 'Prime Sentinel', power: 117 },
      { name: 'The Architect, Ruler of the Multiverse', power: 124 }
    ]
  }
];

const TOTAL_MATCHES = TIERS.length * 4; // 24 — the full-clear score

const ACTION_META = {
  scout: { name: 'Scout', icon: '🧭', color: '#2ecc71' },
  train: { name: 'Train', icon: '🏋️', color: '#f1c40f' },
  trade: { name: 'Trade', icon: '🔄', color: '#3498db' },
  match: { name: 'Match', icon: '⚔️', color: '#e67e22' },
  item: { name: 'Treasure', icon: '🎁', color: '#ff9f43' },
  awaken: { name: 'Awakening', icon: '✨', color: '#ff6b81' }
};

const PHASE_LABELS = {
  starter: 'Draft your first fighter!',
  action: 'Spin for the next event!',
  scout: 'Scout a fighter!',
  train: 'Start training!',
  trade: 'Start a trade!',
  match: 'Fight the next match!',
  item: 'Open the treasure!',
  awaken: 'Trigger an awakening!',
  victory: 'Start a new tournament'
};

const PHASE_TITLES = {
  starter: 'Spin to draft your first fighter!',
  action: 'What happens next?',
  scout: 'Spin to scout a new fighter!',
  train: 'Who goes to training camp?',
  trade: 'Spin to make a trade!',
  item: 'Spin to find a support item!',
  awaken: 'Which fighter awakens?!',
  victory: 'You are the Multiverse Champion! 🏆'
};

const MAX_ROSTER = 6;
const MAX_POWER = 999;

// ---------------------------------------------------------------------------
// Local persistence: player name, stats, leaderboard (device-local only)
// ---------------------------------------------------------------------------

const STORAGE_KEYS = {
  playerName: 'mat_playerName',
  usedNames: 'mat_usedNames',
  stats: 'mat_stats',
  leaderboard: 'mat_leaderboard'
};

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // localStorage unavailable (private mode, etc.) — fail silently, game still works
  }
}

function getUsedNames() {
  return loadJSON(STORAGE_KEYS.usedNames, []);
}

function isNameTaken(name, excludeName) {
  const lower = name.trim().toLowerCase();
  return getUsedNames().some(n => n.toLowerCase() === lower && n.toLowerCase() !== (excludeName || '').toLowerCase());
}

function reserveName(name) {
  const used = getUsedNames();
  if (!used.some(n => n.toLowerCase() === name.toLowerCase())) {
    used.push(name);
    saveJSON(STORAGE_KEYS.usedNames, used);
  }
}

function getStats() {
  return loadJSON(STORAGE_KEYS.stats, { totalRuns: 0, bestScore: 0, bestLabel: '—', currentStreak: 0, bestStreak: 0 });
}

function saveStats(stats) {
  saveJSON(STORAGE_KEYS.stats, stats);
}

function getLeaderboard() {
  return loadJSON(STORAGE_KEYS.leaderboard, []);
}

function saveLeaderboard(list) {
  saveJSON(STORAGE_KEYS.leaderboard, list);
}

// ---------------------------------------------------------------------------
// Game state
// ---------------------------------------------------------------------------

function createInitialState() {
  return {
    phase: 'starter',
    roster: [],
    tierIndex: 0,
    roundIndex: 0,
    finaleWon: false,
    items: { phoenixEmber: 1, chakraDraft: 0, twinMoon: 0, spiritWhistle: 0, luckyDango: 0 },
    lastWinChance: null
  };
}

let game = createInitialState();
let isSpinning = false;

// ---------------------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------------------

const track = document.getElementById('strip-track');
const viewport = document.querySelector('.roulette-viewport');
const mainBtn = document.getElementById('main-btn');
const rouletteTitle = document.getElementById('roulette-title');
const eventPanel = document.getElementById('event-panel');
const logList = document.getElementById('log-list');
const rosterList = document.getElementById('roster-list');
const itemsList = document.getElementById('items-list');
const trophyCase = document.getElementById('trophy-case');
const bracketTitle = document.getElementById('bracket-title');
const bracketPath = document.getElementById('bracket-path');

const playerNameDisplay = document.getElementById('player-name-display');
const changeNameBtn = document.getElementById('change-name-btn');
const statBest = document.getElementById('stat-best');
const statRuns = document.getElementById('stat-runs');
const statStreak = document.getElementById('stat-streak');
const statLive = document.getElementById('stat-live');
const liveStatBox = document.querySelector('.live-stat');
const leaderboardList = document.getElementById('leaderboard-list');

const celebrationOverlay = document.getElementById('celebration-overlay');
const celebrationTrophy = document.getElementById('celebration-trophy');
const celebrationTitle = document.getElementById('celebration-title');
const celebrationSubtitle = document.getElementById('celebration-subtitle');
const celebrationExtra = document.getElementById('celebration-extra');
const celebrationClose = document.getElementById('celebration-close');
const confettiLayer = document.getElementById('confetti-layer');

const gameoverOverlay = document.getElementById('gameover-overlay');
const gameoverSubtitle = document.getElementById('gameover-subtitle');
const gameoverExtra = document.getElementById('gameover-extra');
const gameoverClose = document.getElementById('gameover-close');

const nameOverlay = document.getElementById('name-overlay');
const nameInput = document.getElementById('name-input');
const nameError = document.getElementById('name-error');
const nameSubmit = document.getElementById('name-submit');

// ---------------------------------------------------------------------------
// Generic helpers
// ---------------------------------------------------------------------------

function rand(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function weightedPick(entries) {
  const total = entries.reduce((sum, e) => sum + e.weight, 0);
  let roll = Math.random() * total;
  for (const entry of entries) {
    roll -= entry.weight;
    if (roll <= 0) return entry;
  }
  return entries[entries.length - 1];
}

function initials(text) {
  return text
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function currentTier() {
  return TIERS[Math.min(game.tierIndex, TIERS.length - 1)];
}

function currentOpponent() {
  if (game.finaleWon) return null;
  return currentTier().bracket[game.roundIndex];
}

function awakenableRoster() {
  return game.roster.filter(c => {
    const chain = AWAKENING_CHAINS[c.name];
    return chain && c.awakenPhase < chain.length;
  });
}

function liveScore() {
  return game.tierIndex * 4 + (game.finaleWon ? 0 : game.roundIndex);
}

function scoreLabel(score) {
  if (score >= TOTAL_MATCHES) return 'Multiverse Champion';
  const tierIdx = Math.min(Math.floor(score / 4), TIERS.length - 1);
  const roundIdx = score % 4;
  return `${TIERS[tierIdx].name}, ${roundIdx === 0 ? 'Round 1' : ROUND_LABELS[roundIdx] || `Round ${roundIdx + 1}`}`;
}

// ---------------------------------------------------------------------------
// Win chance
// ---------------------------------------------------------------------------

function computeWinChance(opponentPower, bonus) {
  const rosterSize = game.roster.length;
  if (rosterSize === 0) return 0.05;
  const avgPower = game.roster.reduce((s, c) => s + c.power, 0) / rosterSize;
  const synergyBonus = (rosterSize - 1) * 4;
  const effectivePower = avgPower + synergyBonus + (bonus || 0);
  const diff = effectivePower - opponentPower;
  const steepness = 18;
  const raw = 1 / (1 + Math.exp(-diff / steepness));
  return clamp(raw, 0.05, 0.95);
}

// ---------------------------------------------------------------------------
// Strip rendering
// ---------------------------------------------------------------------------

const ITEM_WIDTH = 150;
const ITEM_MARGIN = 12;
const ITEM_FULL_WIDTH = ITEM_WIDTH + ITEM_MARGIN;
const TOTAL_ITEMS = 60;
const WINNER_INDEX = 52;
const MIN_DURATION = 3200;
const MAX_DURATION = 4200;
const EASING = 'cubic-bezier(0.12, 0.85, 0.28, 1)';

function createItemEl(entry) {
  const el = document.createElement('div');
  el.className = 'strip-item';
  el.style.setProperty('--rarity-color', entry.color);

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = entry.icon || initials(entry.name);

  const name = document.createElement('div');
  name.className = 'name';
  name.textContent = entry.name;

  const sub = document.createElement('div');
  sub.className = 'sub-tag';
  sub.textContent = entry.sub || '';

  el.append(avatar, name, sub);
  return el;
}

function renderStrip(items) {
  track.innerHTML = '';
  const fragment = document.createDocumentFragment();
  items.forEach(entry => fragment.appendChild(createItemEl(entry)));
  track.appendChild(fragment);
}

function targetTranslateX() {
  const containerWidth = viewport.clientWidth;
  const winnerCenter = WINNER_INDEX * ITEM_FULL_WIDTH + ITEM_WIDTH / 2;
  const jitter = (Math.random() - 0.5) * 80;
  return containerWidth / 2 - winnerCenter + jitter;
}

function runRoulette(pool, titleText, onComplete) {
  if (isSpinning) return;
  isSpinning = true;
  mainBtn.disabled = true;
  rouletteTitle.textContent = titleText;

  const winner = weightedPick(pool);
  const items = [];
  for (let i = 0; i < TOTAL_ITEMS; i++) {
    items.push(i === WINNER_INDEX ? winner : weightedPick(pool));
  }
  renderStrip(items);

  track.style.transition = 'none';
  track.style.transform = 'translateX(0px)';
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
    const winnerEl = track.children[WINNER_INDEX];
    if (winnerEl) winnerEl.classList.add('winner');
    isSpinning = false;
    onComplete(winner);
  };

  track.addEventListener('transitionend', finish, { once: true });
  setTimeout(finish, duration + 150);
}

// ---------------------------------------------------------------------------
// UI updates
// ---------------------------------------------------------------------------

function logEvent(text) {
  const row = document.createElement('div');
  row.textContent = text;
  logList.prepend(row);
  while (logList.children.length > 20) {
    logList.removeChild(logList.lastChild);
  }
}

function showEventPanel(kind, html) {
  eventPanel.className = `event-panel event-${kind}`;
  eventPanel.innerHTML = html;
}

function renderRosterSidebar() {
  rosterList.innerHTML = '';
  if (game.roster.length === 0) {
    const empty = document.createElement('span');
    empty.className = 'roster-empty';
    empty.textContent = 'No fighters yet — spin to draft your first one!';
    rosterList.appendChild(empty);
    return;
  }
  game.roster.forEach(c => {
    const card = document.createElement('div');
    card.className = 'roster-card';
    card.style.setProperty('--rarity-color', c.color);

    const image = document.createElement('div');
    image.className = 'roster-card-image';
    image.textContent = initials(c.name);

    const body = document.createElement('div');
    body.className = 'roster-card-body';

    const name = document.createElement('div');
    name.className = 'roster-card-name';
    name.textContent = c.name;

    const power = document.createElement('div');
    power.className = 'roster-card-power';
    power.textContent = `Power ${c.power} · ${c.universe}`;

    const rarity = document.createElement('span');
    rarity.className = 'roster-card-rarity';
    rarity.textContent = c.rarity;

    body.append(name, power, rarity);

    const chain = AWAKENING_CHAINS[c.name];
    if (chain) {
      const awaken = document.createElement('span');
      awaken.className = 'roster-card-awaken';
      if (c.awakenPhase >= chain.length) {
        awaken.textContent = '✨ Max awakening reached';
      } else if (game.tierIndex >= AWAKENING_UNLOCK_TIER) {
        awaken.textContent = `✨ Ready: ${chain[c.awakenPhase].label}`;
      } else {
        awaken.textContent = '✨ Awakens later in the run';
      }
      body.appendChild(awaken);
    }

    card.append(image, body);
    rosterList.appendChild(card);
  });
}

function renderItemsSidebar() {
  itemsList.innerHTML = '';
  Object.keys(ITEM_DEFS).forEach(key => {
    const def = ITEM_DEFS[key];
    const count = game.items[key] || 0;
    const chip = document.createElement('div');
    chip.className = 'item-chip' + (count > 0 ? ' owned' : '');
    chip.style.setProperty('--item-color', def.color);
    chip.title = def.desc;

    const icon = document.createElement('span');
    icon.className = 'item-icon';
    icon.textContent = def.icon;

    const countEl = document.createElement('span');
    countEl.className = 'item-count';
    countEl.textContent = `×${count}`;

    chip.append(icon, countEl);
    itemsList.appendChild(chip);
  });
}

function renderTrophyCase() {
  trophyCase.innerHTML = '';
  TIERS.forEach((tier, i) => {
    const slot = document.createElement('div');
    let cls = 'trophy-slot';
    if (i < game.tierIndex || game.finaleWon) cls += ' earned';
    else if (i === game.tierIndex) cls += ' current';
    slot.className = cls;

    const icon = document.createElement('span');
    icon.className = 'trophy-icon';
    icon.textContent = tier.icon;

    const label = document.createElement('span');
    label.className = 'trophy-league';
    label.textContent = tier.name;

    slot.append(icon, label);
    trophyCase.appendChild(slot);
  });
}

function renderBracket() {
  const tier = currentTier();
  bracketTitle.textContent = game.finaleWon
    ? 'Tournament Complete — Multiverse Champion!'
    : `${tier.name} — Bracket`;

  bracketPath.innerHTML = '';
  tier.bracket.forEach((opponent, i) => {
    if (i > 0) {
      const arrow = document.createElement('span');
      arrow.className = 'bracket-arrow';
      arrow.textContent = '→';
      bracketPath.appendChild(arrow);
    }
    const node = document.createElement('div');
    let cls = 'bracket-node';
    if (i < game.roundIndex || game.finaleWon) cls += ' done';
    else if (i === game.roundIndex) cls += ' current';
    if (i === tier.bracket.length - 1) cls += ' trophy';
    node.className = cls;

    const roundLabel = document.createElement('span');
    roundLabel.className = 'round-label';
    roundLabel.textContent = i === tier.bracket.length - 1 ? 'Final' : ROUND_LABELS[i];

    const oppName = document.createElement('span');
    oppName.className = 'opponent-name';
    oppName.textContent = opponent.name;

    const oppPower = document.createElement('span');
    oppPower.className = 'opponent-power';
    oppPower.textContent = `Power ${opponent.power}`;

    node.append(roundLabel, oppName, oppPower);
    bracketPath.appendChild(node);
  });
}

function renderProgressPanel() {
  const stats = getStats();
  statBest.textContent = `${stats.bestScore} / ${TOTAL_MATCHES} wins`;
  statRuns.textContent = stats.totalRuns;
  statStreak.textContent = `${stats.currentStreak} 🔥`;

  const live = liveScore();
  statLive.textContent = `${live} / ${TOTAL_MATCHES} wins`;
  if (live > stats.bestScore) {
    liveStatBox.classList.add('pb-beat');
  } else {
    liveStatBox.classList.remove('pb-beat');
  }
}

function renderLeaderboard() {
  const list = getLeaderboard();
  leaderboardList.innerHTML = '';
  if (list.length === 0) {
    const empty = document.createElement('span');
    empty.className = 'leaderboard-empty';
    empty.textContent = 'No runs recorded yet on this device — finish a run to appear here!';
    leaderboardList.appendChild(empty);
    return;
  }
  const medals = ['🥇', '🥈', '🥉'];
  list.slice(0, 10).forEach((entry, i) => {
    const row = document.createElement('div');
    row.className = 'leaderboard-row' + (entry.name === game.playerName ? ' you' : '');

    const rank = document.createElement('span');
    rank.className = 'leaderboard-rank';
    rank.textContent = medals[i] || `${i + 1}`;

    const name = document.createElement('span');
    name.className = 'leaderboard-name';
    name.textContent = entry.name;

    const result = document.createElement('span');
    result.className = 'leaderboard-result';
    result.textContent = entry.result === 'champion' ? '👑 Champion' : `💀 ${entry.label}`;

    const score = document.createElement('span');
    score.className = 'leaderboard-score';
    score.textContent = `${entry.score}/${TOTAL_MATCHES}`;

    row.append(rank, name, result, score);
    leaderboardList.appendChild(row);
  });
}

function refreshUI() {
  renderRosterSidebar();
  renderItemsSidebar();
  renderTrophyCase();
  renderBracket();
  renderProgressPanel();
  renderLeaderboard();

  mainBtn.textContent = PHASE_LABELS[game.phase];
  mainBtn.disabled = isSpinning;
  rouletteTitle.textContent = PHASE_TITLES[game.phase] || PHASE_TITLES.action;
}

// ---------------------------------------------------------------------------
// Name entry
// ---------------------------------------------------------------------------

function openNameOverlay(prefill) {
  nameInput.value = prefill || '';
  nameError.classList.add('hidden');
  nameOverlay.classList.remove('hidden');
  mainBtn.disabled = true;
  setTimeout(() => nameInput.focus(), 50);
}

function closeNameOverlay() {
  nameOverlay.classList.add('hidden');
  refreshUI();
}

function submitName() {
  const raw = nameInput.value.trim();
  if (!raw) {
    nameError.textContent = 'Enter a name to continue.';
    nameError.classList.remove('hidden');
    return;
  }
  if (raw.length > 20) {
    nameError.textContent = 'Keep it under 20 characters.';
    nameError.classList.remove('hidden');
    return;
  }
  if (isNameTaken(raw, game.playerName)) {
    nameError.textContent = 'That name is already taken on this device — try another.';
    nameError.classList.remove('hidden');
    return;
  }
  reserveName(raw);
  game.playerName = raw;
  saveJSON(STORAGE_KEYS.playerName, raw);
  playerNameDisplay.textContent = raw;
  closeNameOverlay();
}

nameSubmit.addEventListener('click', submitName);
nameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') submitName();
});
changeNameBtn.addEventListener('click', () => openNameOverlay(game.playerName));

// ---------------------------------------------------------------------------
// Celebration / Game Over modals
// ---------------------------------------------------------------------------

const CONFETTI_COLORS = ['#ffd24d', '#ff4757', '#2ecc71', '#3498db', '#a855f7', '#ff9f43'];

function spawnConfetti(count) {
  confettiLayer.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    piece.style.animationDuration = `${1.4 + Math.random() * 1.4}s`;
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiLayer.appendChild(piece);
  }
}

function showCelebration(title, subtitle, icon, extraText) {
  celebrationTrophy.textContent = icon || '🏆';
  celebrationTitle.textContent = title;
  celebrationSubtitle.textContent = subtitle;
  if (extraText) {
    celebrationExtra.textContent = extraText;
    celebrationExtra.classList.remove('hidden-line');
  } else {
    celebrationExtra.classList.add('hidden-line');
  }
  spawnConfetti(icon === '👑' ? 70 : 40);
  celebrationOverlay.classList.remove('hidden');
  mainBtn.disabled = true;
}

function hideCelebration() {
  celebrationOverlay.classList.add('hidden');
  confettiLayer.innerHTML = '';
  refreshUI();
}

celebrationClose.addEventListener('click', hideCelebration);

function showGameOver(opponent, extraText) {
  gameoverSubtitle.textContent = `You made it to the ${currentTier().name} before falling to ${opponent.name}. Every legend has a beginning — try again!`;
  gameoverExtra.textContent = extraText || '';
  gameoverOverlay.classList.remove('hidden');
  mainBtn.disabled = true;
}

function hideGameOverAndRestart() {
  gameoverOverlay.classList.add('hidden');
  resetGame();
}

gameoverClose.addEventListener('click', hideGameOverAndRestart);

// ---------------------------------------------------------------------------
// Run-end bookkeeping: stats + leaderboard (local to this device)
// ---------------------------------------------------------------------------

function recordRunEnd(isChampion, opponentName) {
  const score = liveScore();
  const stats = getStats();
  const isNewBest = score > stats.bestScore;

  stats.totalRuns += 1;
  if (isNewBest) {
    stats.bestScore = score;
    stats.bestLabel = isChampion ? 'Multiverse Champion' : scoreLabel(score);
  }
  if (isChampion) {
    stats.currentStreak += 1;
    stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
  } else {
    stats.currentStreak = 0;
  }
  saveStats(stats);

  const leaderboard = getLeaderboard();
  leaderboard.push({
    name: game.playerName || 'Anonymous',
    result: isChampion ? 'champion' : 'eliminated',
    label: isChampion ? 'Multiverse Champion' : scoreLabel(score),
    opponent: opponentName,
    score,
    date: new Date().toLocaleDateString()
  });
  leaderboard.sort((a, b) => b.score - a.score);
  saveLeaderboard(leaderboard.slice(0, 20));

  return isNewBest;
}

// ---------------------------------------------------------------------------
// Roster management
// ---------------------------------------------------------------------------

function addToRoster(character) {
  const c = { ...character, awakenPhase: 0 };
  if (game.roster.length < MAX_ROSTER) {
    game.roster.push(c);
    logEvent(`✅ Scouted: ${c.name} (${c.universe})`);
    showEventPanel('success', `You scouted <b>${c.name}</b>! (${c.universe} · ${c.rarity})`);
    return;
  }
  const weakestIdx = game.roster.reduce((minI, t, i, arr) => (t.power < arr[minI].power ? i : minI), 0);
  const weakest = game.roster[weakestIdx];
  if (c.power > weakest.power) {
    game.roster[weakestIdx] = c;
    logEvent(`🔁 ${weakest.name} replaced by ${c.name}`);
    showEventPanel('success', `Your roster was full: <b>${weakest.name}</b> made way for <b>${c.name}</b> (${c.universe})!`);
  } else {
    logEvent(`↩️ ${c.name} walked away, your roster was already strong enough`);
    showEventPanel('info', `Your roster was full and already stronger than <b>${c.name}</b> — they moved on.`);
  }
}

function buildEventPool() {
  const entries = [{ value: 'scout', weight: 26 }];
  if (game.roster.length > 0) {
    entries.push({ value: 'train', weight: 16 });
    entries.push({ value: 'trade', weight: 8 });
  }
  if (!game.finaleWon) {
    entries.push({ value: 'match', weight: 34 });
  }
  entries.push({ value: 'item', weight: 10 });
  if (game.tierIndex >= AWAKENING_UNLOCK_TIER && awakenableRoster().length > 0) {
    entries.push({ value: 'awaken', weight: 8 });
  }
  return entries.map(e => ({ ...ACTION_META[e.value], value: e.value, weight: e.weight, sub: 'Event' }));
}

// ---------------------------------------------------------------------------
// Spin flows
// ---------------------------------------------------------------------------

function startStarterSpin() {
  runRoulette(STARTER_POOL, PHASE_TITLES.starter, winner => {
    game.roster.push({ ...winner, awakenPhase: 0 });
    logEvent(`🎉 Your tournament begins with ${winner.name} (${winner.universe})!`);
    showEventPanel('success', `Your first fighter is <b>${winner.name}</b> from <b>${winner.universe}</b>! You also start with a 🔥 <b>Phoenix Ember</b> — it will save you from your first elimination.`);
    game.phase = 'action';
    refreshUI();
  });
}

function startActionSpin() {
  const pool = buildEventPool();
  runRoulette(pool, PHASE_TITLES.action, winner => {
    logEvent(`🎲 Event: ${winner.name}`);
    showEventPanel('info', `Coming up: <b>${winner.name}</b>`);
    game.phase = winner.value;
    refreshUI();
  });
}

function startScoutSpin() {
  let pool = CHARACTER_POOL;
  let usedDango = false;
  if (game.items.luckyDango > 0) {
    game.items.luckyDango--;
    pool = CHARACTER_POOL.filter(c => c.rarity !== 'Common');
    usedDango = true;
  }
  runRoulette(pool, PHASE_TITLES.scout, winner => {
    addToRoster(winner);
    if (usedDango) {
      logEvent('🍡 Lucky Dango Skewer guaranteed a Rare-or-better scout!');
    }
    game.phase = 'action';
    refreshUI();
  });
}

function startTradeSpin() {
  runRoulette(CHARACTER_POOL, PHASE_TITLES.trade, winner => {
    if (game.roster.length === 0) {
      addToRoster(winner);
    } else {
      const idx = Math.floor(Math.random() * game.roster.length);
      const old = game.roster[idx];
      game.roster[idx] = { ...winner, awakenPhase: 0 };
      logEvent(`🔄 Traded: ${old.name} → ${winner.name}`);
      showEventPanel('info', `You traded <b>${old.name}</b> for <b>${winner.name}</b> (${winner.universe})!`);
    }
    game.phase = 'action';
    refreshUI();
  });
}

function startTrainingSpin() {
  if (game.roster.length === 0) {
    game.phase = 'action';
    refreshUI();
    return;
  }
  const pool = game.roster.map(c => ({ ...c, weight: 1 }));
  runRoulette(pool, PHASE_TITLES.train, winner => {
    const idx = game.roster.findIndex(c => c.name === winner.name && c.power === winner.power);
    const target = idx >= 0 ? game.roster[idx] : game.roster[0];
    let boost = rand(4, 9);
    let usedWhistle = false;
    if (game.items.spiritWhistle > 0) {
      game.items.spiritWhistle--;
      boost *= 2;
      usedWhistle = true;
    }
    target.power = Math.min(MAX_POWER, target.power + boost);
    logEvent(`🏋️ Training camp: ${target.name} gained +${boost} power (${target.power})`);
    showEventPanel('success', `<b>${target.name}</b> completed an intense training camp${usedWhistle ? ' (boosted by a Spirit Whistle!)' : ''} and is now <b>${target.power}</b> power strong!`);
    game.phase = 'action';
    refreshUI();
  });
}

function startItemSpin() {
  runRoulette(ITEM_DROP_POOL, PHASE_TITLES.item, winner => {
    game.items[winner.key] = (game.items[winner.key] || 0) + 1;
    logEvent(`🎁 Found: ${winner.name}`);
    showEventPanel('success', `You found a <b>${winner.name}</b>! ${winner.desc}`);
    game.phase = 'action';
    refreshUI();
  });
}

function startAwakenSpin() {
  const eligible = awakenableRoster();
  if (eligible.length === 0) {
    game.phase = 'action';
    refreshUI();
    return;
  }
  const pool = eligible.map(c => ({ ...c, weight: 1 }));
  runRoulette(pool, PHASE_TITLES.awaken, winner => {
    const target = game.roster.find(c => c.name === winner.name && c.awakenPhase < (AWAKENING_CHAINS[c.name] || []).length);
    if (!target) {
      game.phase = 'action';
      refreshUI();
      return;
    }
    const chain = AWAKENING_CHAINS[target.name];
    const phaseData = chain[target.awakenPhase];
    target.power = Math.min(MAX_POWER, Math.round(target.power * phaseData.multiplier));
    target.rarity = phaseData.newRarity;
    target.color = RARITIES[phaseData.newRarity].color;
    target.sub = `${target.universe} · ${target.rarity}`;
    target.awakenPhase++;
    logEvent(`✨ ${target.name} awakened: ${phaseData.label}! (Power ${target.power})`);
    game.phase = 'action';
    refreshUI();
    showCelebration(`${target.name}: ${phaseData.label}!`, phaseData.flavor, phaseData.icon);
  });
}

function resolveMatch(opponent) {
  let bonus = 0;
  let forcedWin = false;
  let note = '';
  if (game.items.twinMoon > 0) {
    game.items.twinMoon--;
    forcedWin = true;
    note = ' Your Twin Moon Talisman guarantees the outcome!';
  } else if (game.items.chakraDraft > 0) {
    game.items.chakraDraft--;
    bonus = 20;
    note = ' Your Chakra Draft surges through your team (+20 power)!';
  }

  const winChance = forcedWin ? 0.99 : computeWinChance(opponent.power, bonus);
  game.lastWinChance = winChance;
  const pool = [
    { name: 'Victory', icon: '🏆', color: '#2ecc71', win: true, weight: winChance * 100, sub: 'Result' },
    { name: 'Defeat', icon: '💀', color: '#e74c3c', win: false, weight: (1 - winChance) * 100, sub: 'Result' }
  ];
  runRoulette(pool, `Match: vs ${opponent.name}!${note}`, outcome => handleMatchResult(opponent, outcome));
}

function handleMatchResult(opponent, outcome) {
  const tier = currentTier();

  if (outcome.win) {
    logEvent(`⚔️ Defeated ${opponent.name}!`);
    game.roundIndex++;
    if (game.roundIndex >= tier.bracket.length) {
      game.roster.forEach(c => { c.power = Math.min(MAX_POWER, c.power + 5); });
      logEvent(`🏆 Won the ${tier.name} Trophy! Whole roster +5 power.`);
      game.tierIndex++;
      game.roundIndex = 0;

      if (game.tierIndex >= TIERS.length) {
        game.finaleWon = true;
        logEvent('🏆 THE ARCHITECT DEFEATED! You are the Multiverse Champion!');
        showEventPanel('victory', `You defeated <b>${opponent.name}</b> and became the <b>Multiverse Champion</b>! 🎉`);
        const isNewBest = recordRunEnd(true, opponent.name);
        refreshUI();
        showCelebration(
          'MULTIVERSE CHAMPION!',
          `You conquered every league and defeated ${opponent.name}. Legends will speak of this run.`,
          '👑',
          isNewBest ? '🌟 New Personal Best!' : ''
        );
        return;
      }

      showEventPanel('success', `You won the <b>${tier.name} Trophy</b>! Your whole roster grew stronger, and the <b>${currentTier().name}</b> is now open.`);
      refreshUI();
      showCelebration(`${tier.name} Champion!`, `You swept the bracket and earned the ${tier.name} Trophy! Onward to the ${currentTier().name}.`, '🏆');
      return;
    }

    showEventPanel('success', `You defeated <b>${opponent.name}</b>! Next up: <b>${tier.bracket[game.roundIndex].name}</b>.`);
    game.phase = 'action';
    refreshUI();
    return;
  }

  // Defeat: Phoenix Ember saves you if you have one, otherwise it's game over.
  logEvent(`❌ Lost to ${opponent.name}`);
  if (game.items.phoenixEmber > 0) {
    game.items.phoenixEmber--;
    logEvent(`🔥 Your Phoenix Ember flares — defeat averted against ${opponent.name}!`);
    showEventPanel('info', `You were about to fall to <b>${opponent.name}</b>, but your <b>Phoenix Ember</b> flared with the will to fight on! (Consumed)`);
    game.phase = 'action';
    refreshUI();
    return;
  }

  const chancePct = Math.round((game.lastWinChance || 0) * 100);
  logEvent(`💀 Eliminated by ${opponent.name}`);
  showEventPanel('fail', `You were eliminated by <b>${opponent.name}</b>. You had a <b>${chancePct}%</b> chance to win that fight — the roulette wasn't on your side today.`);
  const isNewBest = recordRunEnd(false, opponent.name);
  game.phase = 'gameover';
  refreshUI();
  showGameOver(opponent, isNewBest ? '🌟 New Personal Best for this run!' : `You had a ${chancePct}% chance to win that fight — so close!`);
}

function startMatchSpin() {
  const opponent = currentOpponent();
  if (!opponent) {
    game.phase = 'victory';
    refreshUI();
    return;
  }
  resolveMatch(opponent);
}

function resetGame() {
  const keepName = game.playerName;
  game = createInitialState();
  game.playerName = keepName;
  logList.innerHTML = '';
  eventPanel.className = 'event-panel hidden';
  eventPanel.innerHTML = '';
  renderStrip(Array.from({ length: 20 }, () => weightedPick(CHARACTER_POOL)));
  refreshUI();
}

// ---------------------------------------------------------------------------
// Main button dispatch
// ---------------------------------------------------------------------------

function handleMainButtonClick() {
  if (isSpinning) return;
  switch (game.phase) {
    case 'starter': startStarterSpin(); break;
    case 'action': startActionSpin(); break;
    case 'scout': startScoutSpin(); break;
    case 'train': startTrainingSpin(); break;
    case 'trade': startTradeSpin(); break;
    case 'match': startMatchSpin(); break;
    case 'item': startItemSpin(); break;
    case 'awaken': startAwakenSpin(); break;
    case 'victory': resetGame(); break;
    case 'gameover': break;
  }
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

renderStrip(Array.from({ length: 20 }, () => weightedPick(CHARACTER_POOL)));
mainBtn.addEventListener('click', handleMainButtonClick);

const savedName = loadJSON(STORAGE_KEYS.playerName, null);
if (savedName) {
  game.playerName = savedName;
  playerNameDisplay.textContent = savedName;
  refreshUI();
} else {
  playerNameDisplay.textContent = '—';
  refreshUI();
  openNameOverlay('');
}
