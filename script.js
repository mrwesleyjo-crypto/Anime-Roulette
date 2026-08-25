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
        isStarter: STARTER_NAMES.includes(entry.name)
      });
    });
  });
  return pool;
}

const CHARACTER_POOL = buildCharacterPool();
const STARTER_POOL = CHARACTER_POOL.filter(c => c.isStarter).map(c => ({ ...c, weight: 1 }));

// ---------------------------------------------------------------------------
// Tournament map: each league is its own bracket of 4 named opponents.
// Win Round 1 -> Round 2 -> Semifinal -> Final to claim the league's Trophy
// and unlock the next league.
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

const ACTION_META = {
  scout: { name: 'Scout', icon: '🧭', color: '#2ecc71' },
  train: { name: 'Train', icon: '🏋️', color: '#f1c40f' },
  trade: { name: 'Trade', icon: '🔄', color: '#3498db' },
  match: { name: 'Match', icon: '⚔️', color: '#e67e22' }
};

const PHASE_LABELS = {
  starter: 'Draft your first fighter!',
  action: 'Spin for the next event!',
  scout: 'Scout a fighter!',
  train: 'Start training!',
  trade: 'Start a trade!',
  match: 'Fight the next match!',
  victory: 'Start a new tournament'
};

const PHASE_TITLES = {
  starter: 'Spin to draft your first fighter!',
  action: 'What happens next?',
  scout: 'Spin to scout a new fighter!',
  train: 'Who goes to training camp?',
  trade: 'Spin to make a trade!',
  victory: 'You are the Multiverse Champion! 🏆'
};

const MAX_ROSTER = 6;
const POWER_CAP = 130;

// ---------------------------------------------------------------------------
// Game state
// ---------------------------------------------------------------------------

function createInitialState() {
  return {
    phase: 'starter',
    roster: [],
    tierIndex: 0,
    roundIndex: 0,
    finaleWon: false
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
const trophyCase = document.getElementById('trophy-case');
const bracketTitle = document.getElementById('bracket-title');
const bracketPath = document.getElementById('bracket-path');

const celebrationOverlay = document.getElementById('celebration-overlay');
const celebrationTrophy = document.getElementById('celebration-trophy');
const celebrationTitle = document.getElementById('celebration-title');
const celebrationSubtitle = document.getElementById('celebration-subtitle');
const celebrationClose = document.getElementById('celebration-close');
const confettiLayer = document.getElementById('confetti-layer');

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

// ---------------------------------------------------------------------------
// Win chance: total team power (with a team-size synergy bonus) vs opponent,
// mapped through a sigmoid so the odds swing smoothly instead of linearly,
// and never feel "stuck" near a fixed value.
// ---------------------------------------------------------------------------

function computeWinChance(opponentPower) {
  const rosterSize = game.roster.length;
  if (rosterSize === 0) return 0.05;
  const avgPower = game.roster.reduce((s, c) => s + c.power, 0) / rosterSize;
  const synergyBonus = (rosterSize - 1) * 4; // a fuller roster fights better as a team
  const effectivePower = avgPower + synergyBonus;
  const diff = effectivePower - opponentPower;
  const steepness = 18;
  const raw = 1 / (1 + Math.exp(-diff / steepness));
  return clamp(raw, 0.05, 0.95);
}

// ---------------------------------------------------------------------------
// Strip rendering (generic: characters, actions, outcomes all share the shape)
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

    // Placeholder for a future character image — swap this div for an
    // <img src="..."> once artwork is added, the rarity-colored frame stays.
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
    card.append(image, body);
    rosterList.appendChild(card);
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

function refreshUI() {
  renderRosterSidebar();
  renderTrophyCase();
  renderBracket();

  mainBtn.textContent = PHASE_LABELS[game.phase];
  mainBtn.disabled = isSpinning;
  rouletteTitle.textContent = PHASE_TITLES[game.phase] || PHASE_TITLES.action;
}

// ---------------------------------------------------------------------------
// Celebration modal
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

function showCelebration(title, subtitle, isFinal) {
  celebrationTrophy.textContent = isFinal ? '👑' : '🏆';
  celebrationTitle.textContent = title;
  celebrationSubtitle.textContent = subtitle;
  spawnConfetti(isFinal ? 70 : 40);
  celebrationOverlay.classList.remove('hidden');
  mainBtn.disabled = true;
}

function hideCelebration() {
  celebrationOverlay.classList.add('hidden');
  confettiLayer.innerHTML = '';
  refreshUI();
}

celebrationClose.addEventListener('click', hideCelebration);

// ---------------------------------------------------------------------------
// Roster management
// ---------------------------------------------------------------------------

function addToRoster(character) {
  const c = { ...character };
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
  const entries = [{ value: 'scout', weight: 30 }];
  if (game.roster.length > 0) {
    entries.push({ value: 'train', weight: 20 });
    entries.push({ value: 'trade', weight: 10 });
  }
  if (!game.finaleWon) {
    entries.push({ value: 'match', weight: 40 });
  }
  return entries.map(e => ({ ...ACTION_META[e.value], value: e.value, weight: e.weight, sub: 'Event' }));
}

// ---------------------------------------------------------------------------
// Spin flows
// ---------------------------------------------------------------------------

function startStarterSpin() {
  runRoulette(STARTER_POOL, PHASE_TITLES.starter, winner => {
    game.roster.push({ ...winner });
    logEvent(`🎉 Your tournament begins with ${winner.name} (${winner.universe})!`);
    showEventPanel('success', `Your first fighter is <b>${winner.name}</b> from <b>${winner.universe}</b>!`);
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
  runRoulette(CHARACTER_POOL, PHASE_TITLES.scout, winner => {
    addToRoster(winner);
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
      game.roster[idx] = { ...winner };
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
    const boost = rand(4, 9);
    target.power = Math.min(POWER_CAP, target.power + boost);
    logEvent(`🏋️ Training camp: ${target.name} gained +${boost} power (${target.power})`);
    showEventPanel('success', `<b>${target.name}</b> completed an intense training camp and is now <b>${target.power}</b> power strong!`);
    game.phase = 'action';
    refreshUI();
  });
}

function resolveMatch(opponent) {
  const winChance = computeWinChance(opponent.power);
  const pool = [
    { name: 'Victory', icon: '🏆', color: '#2ecc71', win: true, weight: winChance * 100, sub: 'Result' },
    { name: 'Defeat', icon: '💀', color: '#e74c3c', win: false, weight: (1 - winChance) * 100, sub: 'Result' }
  ];
  runRoulette(pool, `Match: vs ${opponent.name}!`, outcome => handleMatchResult(opponent, outcome));
}

function handleMatchResult(opponent, outcome) {
  const tier = currentTier();

  if (outcome.win) {
    logEvent(`⚔️ Defeated ${opponent.name}!`);
    game.roundIndex++;
    if (game.roundIndex >= tier.bracket.length) {
      // Tier complete: award trophy, boost the whole roster, advance.
      game.roster.forEach(c => { c.power = Math.min(POWER_CAP, c.power + 5); });
      logEvent(`🏆 Won the ${tier.name} Trophy! Whole roster +5 power.`);
      game.tierIndex++;
      game.roundIndex = 0;

      if (game.tierIndex >= TIERS.length) {
        game.finaleWon = true;
        logEvent('🏆 THE ARCHITECT DEFEATED! You are the Multiverse Champion!');
        showEventPanel('victory', `You defeated <b>${opponent.name}</b> and became the <b>Multiverse Champion</b>! 🎉`);
        refreshUI();
        showCelebration('MULTIVERSE CHAMPION!', `You conquered every league and defeated ${opponent.name}. Legends will speak of this run.`, true);
        return;
      }

      showEventPanel('success', `You won the <b>${tier.name} Trophy</b>! Your whole roster grew stronger, and the <b>${currentTier().name}</b> is now open.`);
      refreshUI();
      showCelebration(`${tier.name} Champion!`, `You swept the bracket and earned the ${tier.name} Trophy! Onward to the ${currentTier().name}.`, false);
      return;
    }

    showEventPanel('success', `You defeated <b>${opponent.name}</b>! Next up: <b>${tier.bracket[game.roundIndex].name}</b>.`);
  } else {
    logEvent(`❌ Lost to ${opponent.name}`);
    showEventPanel('fail', `You lost to <b>${opponent.name}</b>. Train up your roster and try that match again.`);
  }
  game.phase = 'action';
  refreshUI();
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
  game = createInitialState();
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
    case 'victory': resetGame(); break;
  }
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

renderStrip(Array.from({ length: 20 }, () => weightedPick(CHARACTER_POOL)));
mainBtn.addEventListener('click', handleMainButtonClick);
refreshUI();
