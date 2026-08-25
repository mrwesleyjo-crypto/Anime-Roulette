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
// Tournament ladder: leagues, each with a rank-point threshold and a Gatekeeper boss
// ---------------------------------------------------------------------------

const TIERS = [
  { name: 'Bronzen Liga', threshold: 150, rankedPower: 45, gatekeeper: { name: 'Ridder Orlan, Bronzen Kampioen', power: 60 } },
  { name: 'Zilveren Liga', threshold: 350, rankedPower: 58, gatekeeper: { name: 'Meesteres Vael, Zilveren Kampioen', power: 72 } },
  { name: 'Gouden Liga', threshold: 600, rankedPower: 70, gatekeeper: { name: 'Generaal Korrath, Gouden Kampioen', power: 84 } },
  { name: 'Platina Liga', threshold: 900, rankedPower: 80, gatekeeper: { name: 'Zuster Ishtar, Platina Kampioen', power: 94 } },
  { name: 'Diamanten Liga', threshold: 1250, rankedPower: 90, gatekeeper: { name: 'De Onsterfelijke Vaun, Diamanten Kampioen', power: 104 } },
  { name: 'Multiversum Finale', threshold: 1600, rankedPower: 100, gatekeeper: { name: 'De Architect, Heerser van het Multiversum', power: 114 } }
];

const RIVAL_NAMES = ['Kael', 'Yumi', 'Draxo', 'Senna', 'Roku', 'Nadia', 'Vesper', 'Thane', 'Amara', 'Coda', 'Ozel', 'Brin'];

const ACTION_META = {
  scout: { name: 'Scouten', icon: '🧭', color: '#2ecc71' },
  ranked: { name: 'Rangduel', icon: '⚔️', color: '#e67e22' },
  training: { name: 'Trainingskamp', icon: '🏋️', color: '#f1c40f' },
  trade: { name: 'Ruilen', icon: '🔄', color: '#3498db' },
  gatekeeper: { name: 'Gatekeeper Duel', icon: '👑', color: '#e84393' }
};

const PHASE_LABELS = {
  starter: 'Scout je eerste vechter!',
  action: 'Draai gebeurtenis!',
  scout: 'Scout een vechter!',
  ranked: 'Start rangduel!',
  training: 'Start trainingskamp!',
  trade: 'Start ruil!',
  gatekeeper: 'Daag de Gatekeeper uit!',
  victory: 'Nieuw toernooi starten'
};

const PHASE_TITLES = {
  starter: 'Draai om je eerste vechter te scouten!',
  action: 'Wat gebeurt er nu?',
  scout: 'Draai om een nieuwe vechter te scouten!',
  training: 'Wie gaat er trainen?',
  trade: 'Draai om te ruilen!',
  victory: 'Je bent Multiversum Kampioen! 🏆'
};

const MAX_ROSTER = 6;

// ---------------------------------------------------------------------------
// Game state
// ---------------------------------------------------------------------------

function createInitialState() {
  return {
    phase: 'starter',
    roster: [],
    rankPoints: 0,
    tierIndex: 0,
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
const tierLadder = document.getElementById('tier-ladder');
const pointsFill = document.getElementById('points-fill');
const pointsLabel = document.getElementById('points-label');

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

function randomRivalName() {
  return RIVAL_NAMES[Math.floor(Math.random() * RIVAL_NAMES.length)];
}

function currentTier() {
  return TIERS[Math.min(game.tierIndex, TIERS.length - 1)];
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

function refreshUI() {
  // Roster chips
  rosterList.innerHTML = '';
  if (game.roster.length === 0) {
    const empty = document.createElement('span');
    empty.className = 'roster-empty';
    empty.textContent = 'Nog geen vechters — draai om je eerste te scouten!';
    rosterList.appendChild(empty);
  } else {
    game.roster.forEach(c => {
      const chip = document.createElement('div');
      chip.className = 'roster-chip';
      chip.style.setProperty('--rarity-color', c.color);
      const avatar = document.createElement('div');
      avatar.className = 'chip-avatar';
      avatar.textContent = initials(c.name);
      const text = document.createElement('span');
      text.className = 'chip-text';
      text.textContent = `${c.name} (${c.power})`;
      chip.append(avatar, text);
      rosterList.appendChild(chip);
    });
  }

  // Tier ladder
  tierLadder.innerHTML = '';
  TIERS.forEach((tier, i) => {
    const chip = document.createElement('span');
    let cls = 'tier-chip';
    if (i < game.tierIndex) cls += ' done';
    else if (i === game.tierIndex && !game.finaleWon) cls += ' current';
    chip.className = cls;
    chip.textContent = tier.name.replace(' Liga', '').replace(' Finale', '');
    tierLadder.appendChild(chip);
  });

  // Points bar
  const tier = currentTier();
  const pct = game.finaleWon ? 100 : clamp((game.rankPoints / tier.threshold) * 100, 0, 100);
  pointsFill.style.width = `${pct}%`;
  pointsLabel.textContent = game.finaleWon
    ? 'Multiversum Kampioen! 🏆'
    : `${tier.name}: ${game.rankPoints} / ${tier.threshold} rangpunten`;

  // Button + idle title
  mainBtn.textContent = PHASE_LABELS[game.phase];
  mainBtn.disabled = isSpinning;
  rouletteTitle.textContent = PHASE_TITLES[game.phase] || PHASE_TITLES.action;
}

// ---------------------------------------------------------------------------
// Roster management
// ---------------------------------------------------------------------------

function addToRoster(character) {
  const c = { ...character };
  if (game.roster.length < MAX_ROSTER) {
    game.roster.push(c);
    logEvent(`✅ Gescout: ${c.name} (${c.universe})`);
    showEventPanel('success', `Je hebt <b>${c.name}</b> gescout! (${c.universe} · ${c.rarity})`);
    return;
  }
  const weakestIdx = game.roster.reduce((minI, t, i, arr) => (t.power < arr[minI].power ? i : minI), 0);
  const weakest = game.roster[weakestIdx];
  if (c.power > weakest.power) {
    game.roster[weakestIdx] = c;
    logEvent(`🔁 ${weakest.name} vervangen door ${c.name}`);
    showEventPanel('success', `Je roster was vol: <b>${weakest.name}</b> moest plaats maken voor <b>${c.name}</b> (${c.universe})!`);
  } else {
    logEvent(`↩️ ${c.name} bedankte voor de eer, je roster was al sterk genoeg`);
    showEventPanel('info', `Je roster was vol en al sterker dan <b>${c.name}</b> — die ging elders zijn geluk beproeven.`);
  }
}

function buildEventPool() {
  const entries = [
    { value: 'scout', weight: 30 },
    { value: 'ranked', weight: 30 }
  ];
  if (game.roster.length > 0) {
    entries.push({ value: 'training', weight: 20 });
    entries.push({ value: 'trade', weight: 10 });
  }
  if (!game.finaleWon && game.rankPoints >= currentTier().threshold) {
    entries.push({ value: 'gatekeeper', weight: 15 });
  }
  return entries.map(e => ({ ...ACTION_META[e.value], value: e.value, weight: e.weight, sub: 'Gebeurtenis' }));
}

// ---------------------------------------------------------------------------
// Spin flows
// ---------------------------------------------------------------------------

function startStarterSpin() {
  runRoulette(STARTER_POOL, PHASE_TITLES.starter, winner => {
    game.roster.push({ ...winner });
    logEvent(`🎉 Je toernooi begint met ${winner.name} (${winner.universe})!`);
    showEventPanel('success', `Je eerste vechter is <b>${winner.name}</b> uit <b>${winner.universe}</b>!`);
    game.phase = 'action';
    refreshUI();
  });
}

function startActionSpin() {
  const pool = buildEventPool();
  runRoulette(pool, PHASE_TITLES.action, winner => {
    logEvent(`🎲 Gebeurtenis: ${winner.name}`);
    showEventPanel('info', `Er staat te gebeuren: <b>${winner.name}</b>`);
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
      logEvent(`🔄 Geruild: ${old.name} → ${winner.name}`);
      showEventPanel('info', `Je hebt <b>${old.name}</b> geruild voor <b>${winner.name}</b> (${winner.universe})!`);
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
  runRoulette(pool, PHASE_TITLES.training, winner => {
    const idx = game.roster.findIndex(c => c.name === winner.name && c.power === winner.power);
    const target = idx >= 0 ? game.roster[idx] : game.roster[0];
    const boost = rand(4, 9);
    target.power = Math.min(105, target.power + boost);
    logEvent(`🏋️ Trainingskamp: ${target.name} is +${boost} power gegroeid (${target.power})`);
    showEventPanel('success', `<b>${target.name}</b> heeft een intensief trainingskamp doorstaan en is nu <b>${target.power}</b> power sterk!`);
    game.phase = 'action';
    refreshUI();
  });
}

function resolveDuel(kind, opponent, titleText) {
  const avgPower = game.roster.length ? game.roster.reduce((s, c) => s + c.power, 0) / game.roster.length : 50;
  const winChance = clamp(0.55 + (avgPower - opponent.power) / 45, 0.15, 0.92);
  const pool = [
    { name: 'Overwinning', icon: '🏆', color: '#2ecc71', win: true, weight: winChance * 100, sub: 'Resultaat' },
    { name: 'Nederlaag', icon: '💀', color: '#e74c3c', win: false, weight: (1 - winChance) * 100, sub: 'Resultaat' }
  ];
  runRoulette(pool, titleText, outcome => handleDuelResult(kind, opponent, outcome));
}

function handleDuelResult(kind, opponent, outcome) {
  if (outcome.win) {
    if (kind === 'ranked') {
      const gained = 35 + rand(0, 10);
      game.rankPoints += gained;
      logEvent(`⚔️ Gewonnen van rivaal ${opponent.name}! (+${gained} rangpunten)`);
      showEventPanel('success', `Je versloeg rivaal <b>${opponent.name}</b> en verdiende <b>${gained} rangpunten</b>!`);
    } else if (kind === 'gatekeeper') {
      game.tierIndex++;
      if (game.tierIndex >= TIERS.length) {
        game.finaleWon = true;
        logEvent('🏆 DE ARCHITECT VERSLAGEN! Je bent Multiversum Kampioen!');
        showEventPanel('victory', `Je hebt <b>${opponent.name}</b> verslagen en bent de nieuwe <b>Multiversum Kampioen</b>! 🎉`);
      } else {
        logEvent(`👑 Gatekeeper verslagen: ${opponent.name} — welkom in de ${currentTier().name}!`);
        showEventPanel('success', `Je hebt <b>${opponent.name}</b> verslagen! Je stroomt door naar de <b>${currentTier().name}</b>.`);
      }
    }
  } else {
    if (kind === 'ranked') {
      logEvent(`❌ Verloren van rivaal ${opponent.name}`);
      showEventPanel('fail', `Helaas, je verloor van rivaal <b>${opponent.name}</b>. Geen rangpunten dit keer.`);
    } else {
      logEvent(`❌ Verloren van Gatekeeper ${opponent.name}`);
      showEventPanel('fail', `Helaas, <b>${opponent.name}</b> was te sterk. Train je roster verder en probeer het opnieuw.`);
    }
  }
  game.phase = game.finaleWon ? 'victory' : 'action';
  refreshUI();
}

function startRankedSpin() {
  const tier = currentTier();
  const opponent = { name: `${randomRivalName()} (${tier.name})`, power: tier.rankedPower + rand(-8, 8) };
  resolveDuel('ranked', opponent, `Rangduel tegen ${opponent.name}!`);
}

function startGatekeeperSpin() {
  const opponent = currentTier().gatekeeper;
  resolveDuel('gatekeeper', opponent, `Gatekeeper Duel: ${opponent.name}!`);
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
    case 'ranked': startRankedSpin(); break;
    case 'training': startTrainingSpin(); break;
    case 'trade': startTradeSpin(); break;
    case 'gatekeeper': startGatekeeperSpin(); break;
    case 'victory': resetGame(); break;
  }
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

renderStrip(Array.from({ length: 20 }, () => weightedPick(CHARACTER_POOL)));
mainBtn.addEventListener('click', handleMainButtonClick);
refreshUI();
