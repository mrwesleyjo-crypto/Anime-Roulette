// =============================================================================
// data.js — static game data. No logic here, just definitions.
// Loaded first; everything below is available as globals to systems.js/main.js.
// =============================================================================

const RARITIES = {
  Common: { weight: 50, color: '#9aa5b1', minPower: 55, maxPower: 70 },
  Rare: { weight: 32, color: '#3498db', minPower: 71, maxPower: 82 },
  Epic: { weight: 14, color: '#a855f7', minPower: 83, maxPower: 92 },
  Legendary: { weight: 4, color: '#ffd24d', minPower: 93, maxPower: 100 },
  Mythic: { weight: 2, color: '#00ffcc', minPower: 105, maxPower: 115 }
};

const RARITY_ORDER = ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic'];
const RARITY_RANK = { Common: 0, Rare: 1, Epic: 2, Legendary: 3, Mythic: 4 };

// ---------------------------------------------------------------------------
// Core roster (always available)
// ---------------------------------------------------------------------------

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
    { name: 'Ash Ketchum', universe: 'Pokémon' },
    { name: 'Zenitsu Agatsuma', universe: 'Demon Slayer' },
    { name: 'Inosuke Hashibira', universe: 'Demon Slayer' },
    { name: 'Bakugo Katsuki', universe: 'My Hero Academia' },
    { name: 'Yuji Itadori', universe: 'Jujutsu Kaisen' },
    { name: 'Megumi Fushiguro', universe: 'Jujutsu Kaisen' },
    { name: 'Gray Fullbuster', universe: 'Fairy Tail' },
    { name: 'Mikasa Ackerman', universe: 'Attack on Titan' },
    { name: 'Armin Arlert', universe: 'Attack on Titan' },
    { name: 'Power', universe: 'Chainsaw Man' },
    { name: 'Aki Hayakawa', universe: 'Chainsaw Man' },
    { name: 'Genos', universe: 'One Punch Man' },
    { name: 'Mob (Shigeo Kageyama)', universe: 'Mob Psycho 100' },
    { name: 'Sung Jin-Woo (E-Rank Hunter)', universe: 'Solo Leveling' },
    { name: 'Gohan (Kid Gohan)', universe: 'Dragon Ball' }
  ],
  Rare: [
    { name: 'Monkey D. Luffy', universe: 'One Piece' },
    { name: 'Sasuke Uchiha', universe: 'Naruto' },
    { name: 'Levi Ackerman', universe: 'Attack on Titan' },
    { name: 'Roronoa Zoro', universe: 'One Piece' },
    { name: 'Itachi Uchiha', universe: 'Naruto' },
    { name: 'Kakashi Hatake', universe: 'Naruto' },
    { name: 'Vegeta', universe: 'Dragon Ball' },
    { name: 'Meliodas (Fairy King\'s Forest)', universe: 'The Seven Deadly Sins' },
    { name: 'Erza Scarlet (Heart Kreuz Armor)', universe: 'Fairy Tail' },
    { name: 'Rimuru Tempest', universe: 'That Time I Got Reincarnated as a Slime' },
    { name: 'Shanks', universe: 'One Piece' },
    { name: 'Todoroki Shoto', universe: 'My Hero Academia' },
    { name: 'Trafalgar Law', universe: 'One Piece' },
    { name: 'Nobara Kugisaki', universe: 'Jujutsu Kaisen' },
    { name: 'Rukia Kuchiki', universe: 'Bleach' },
    { name: 'Toshiro Hitsugaya', universe: 'Bleach' },
    { name: 'Might Guy', universe: 'Naruto' },
    { name: 'Giyu Tomioka', universe: 'Demon Slayer' },
    { name: 'Shinobu Kocho', universe: 'Demon Slayer' },
    { name: 'Jotaro Kujo', universe: "JoJo's Bizarre Adventure" },
    { name: 'Portgas D. Ace', universe: 'One Piece' },
    { name: 'Piccolo', universe: 'Dragon Ball' },
    { name: 'Yoruichi Shihoin', universe: 'Bleach' },
    { name: 'Guts (Band of the Hawk)', universe: 'Berserk' },
    { name: 'Kaneki Ken (Half-Ghoul)', universe: 'Tokyo Ghoul' },
    { name: 'L', universe: 'Death Note' }
  ],
  Epic: [
    { name: 'Goku', universe: 'Dragon Ball' },
    { name: 'Gojo Satoru', universe: 'Jujutsu Kaisen' },
    { name: 'Madara Uchiha', universe: 'Naruto' },
    { name: 'Aizen Sosuke', universe: 'Bleach' },
    { name: 'Alucard', universe: 'Hellsing' },
    { name: 'Jiraiya', universe: 'Naruto' },
    { name: 'Tsunade', universe: 'Naruto' },
    { name: 'Roy Mustang', universe: 'Fullmetal Alchemist' },
    { name: 'Lelouch Lamperouge', universe: 'Code Geass' },
    { name: 'All Might', universe: 'My Hero Academia' },
    { name: 'Guts (Berserker Armor)', universe: 'Berserk' },
    { name: 'Erza Scarlet (Nakagami Armor)', universe: 'Fairy Tail' }
  ],
  Legendary: [
    { name: 'Saitama', universe: 'One Punch Man' },
    { name: 'Zeno', universe: 'Dragon Ball Super' },
    { name: 'Yhwach', universe: 'Bleach' },
    { name: 'Dio Brando', universe: "JoJo's Bizarre Adventure" },
    { name: 'Escanor', universe: 'The Seven Deadly Sins' },
    { name: 'Anos Voldigoad', universe: 'The Misfit of Demon King Academy' },
    { name: 'Ainz Ooal Gown', universe: 'Overlord' },
    { name: 'Whitebeard', universe: 'One Piece' },
    { name: 'Sung Jin-Woo (Shadow Monarch)', universe: 'Solo Leveling' },
    { name: 'Gohan (Beast Gohan)', universe: 'Dragon Ball' },
    { name: 'Meliodas (Demon King)', universe: 'The Seven Deadly Sins' },
    { name: 'Kaneki Ken (One-Eyed King)', universe: 'Tokyo Ghoul' }
  ]
};

// ---------------------------------------------------------------------------
// Unlockable bonus pack — merged into the scout pool after 5 completed runs
// ---------------------------------------------------------------------------

const BONUS_PACK_ROSTER = {
  Common: [
    { name: 'Yami Sukehiro', universe: 'Black Clover' },
    { name: 'Reigen Arataka', universe: 'Mob Psycho 100' }
  ],
  Rare: [
    { name: 'Isagi Yoichi', universe: 'Blue Lock' },
    { name: 'Thorfinn', universe: 'Vinland Saga' }
  ],
  Epic: [
    { name: 'Spike Spiegel', universe: 'Cowboy Bebop' },
    { name: 'Ging Freecss', universe: 'Hunter x Hunter' }
  ],
  Legendary: [
    { name: 'Alucard (No Life King)', universe: 'Hellsing' },
    { name: 'Ban', universe: 'The Seven Deadly Sins' }
  ]
};

// ---------------------------------------------------------------------------
// Mythic tier — unlocked permanently after becoming Multiverse Champion once
// ---------------------------------------------------------------------------

const MYTHIC_ROSTER = [
  { name: 'Whis', universe: 'Dragon Ball Super' },
  { name: 'Grand Priest', universe: 'Dragon Ball Super' }
];

const STARTER_NAMES = ['Naruto Uzumaki', 'Ichigo Kurosaki', 'Tanjiro Kamado', 'Izuku Midoriya', 'Natsu Dragneel', 'Ash Ketchum'];

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

// Shard shop — spend career currency on items usable in the current run
const SHOP_ITEMS = [
  { key: 'chakraDraft', price: 15 },
  { key: 'luckyDango', price: 20 },
  { key: 'phoenixEmber', price: 40 },
  { key: 'twinMoon', price: 60 }
].map(e => ({ ...ITEM_DEFS[e.key], key: e.key, price: e.price }));

// Premium shop items — instantly recruit a fighter of a guaranteed rarity.
// Deliberately expensive: these are a long-term shard sink, not a shortcut.
const SHOP_CHARACTER_ITEMS = [
  { key: 'buyRare', name: 'Recruit a Rare Fighter', icon: '💠', color: '#3498db', desc: 'Instantly adds a random Rare fighter to your roster.', price: 150, rarity: 'Rare' },
  { key: 'buyEpic', name: 'Recruit an Epic Fighter', icon: '🌟', color: '#a855f7', desc: 'Instantly adds a random Epic fighter to your roster.', price: 400, rarity: 'Epic' },
  { key: 'buyLegendary', name: 'Recruit a Legendary Fighter', icon: '👑', color: '#ffd24d', desc: 'Instantly adds a random Legendary fighter to your roster.', price: 900, rarity: 'Legendary' }
];

// ---------------------------------------------------------------------------
// Tournament map: real anime villains, scaled from early-arc threats up to
// universe-ending final bosses. Quotes are original flavor lines written
// in-character, not verbatim dialogue from the source material.
// ---------------------------------------------------------------------------

const ROUND_LABELS = ['Round 1', 'Round 2', 'Semifinal', 'Final'];

const TIERS = [
  {
    name: 'Bronze League',
    icon: '🥉',
    bracket: [
      { name: 'Zabuza Momochi', universe: 'Naruto', power: 40, icon: '🗡️', color: '#6b7f8c', quote: "A blade doesn't hesitate. Neither will I." },
      { name: 'Kabuto Yakushi', universe: 'Naruto', power: 48, icon: '🐍', color: '#5d8c5a', quote: "I've already analyzed your every move. This ends before it begins." },
      { name: 'Captain Ginyu', universe: 'Dragon Ball', power: 54, icon: '🟣', color: '#8e5ba8', quote: "Strike a pose — you're about to meet the strongest fighter in the universe!" },
      { name: 'Orochimaru', universe: 'Naruto', power: 62, icon: '🐍', color: '#5a6b4f', quote: 'Power is the only truth worth chasing. Let me have a taste of yours.' }
    ]
  },
  {
    name: 'Silver League',
    icon: '🥈',
    bracket: [
      { name: 'Grimmjow Jaegerjaquez', universe: 'Bleach', power: 54, icon: '🐆', color: '#3a7bd5', quote: 'I only fight opponents who can push me to my limit. Try not to disappoint me.' },
      { name: 'Hidan', universe: 'Naruto', power: 62, icon: '🔺', color: '#8c1c2b', quote: "Pain is a gift! Let's see how much of it you can take." },
      { name: 'Enel', universe: 'One Piece', power: 69, icon: '⚡', color: '#e0b93c', quote: 'Mortals like you were never meant to challenge a god of thunder.' },
      { name: 'Donquixote Doflamingo', universe: 'One Piece', power: 76, icon: '🧷', color: '#d162a4', quote: 'Everything and everyone is a string for me to pull, fufufu.' }
    ]
  },
  {
    name: 'Gold League',
    icon: '🥇',
    bracket: [
      { name: 'Ulquiorra Cifer', universe: 'Bleach', power: 68, icon: '🦇', color: '#4a4a52', quote: "Despair is the only truth. I'll show you yours." },
      { name: 'Cell', universe: 'Dragon Ball', power: 76, icon: '🟢', color: '#4caf6a', quote: 'I am the perfect being. You are simply another cell for me to absorb.' },
      { name: 'Akaza', universe: 'Demon Slayer', power: 83, icon: '👊', color: '#c94f6d', quote: 'Only the strong deserve to keep living. Prove that you belong.' },
      { name: 'Frieza (Final Form)', universe: 'Dragon Ball', power: 90, icon: '❄️', color: '#b073d1', quote: "I do hope you're prepared. I so rarely have to use more than one finger." }
    ]
  },
  {
    name: 'Platinum League',
    icon: '🏆',
    bracket: [
      { name: 'Muzan Kibutsuji', universe: 'Demon Slayer', power: 82, icon: '🌑', color: '#5b2a86', quote: 'Perfection is my birthright. Everything beneath me is disposable.' },
      { name: 'Kaido', universe: 'One Piece', power: 89, icon: '🐉', color: '#3d6b8c', quote: 'Call me the strongest creature alive — then try to prove me wrong.' },
      { name: 'Big Mom', universe: 'One Piece', power: 95, icon: '🍰', color: '#d43f6a', quote: "Give me your soul, and maybe I'll let you leave in one piece." },
      { name: 'Majin Buu', universe: 'Dragon Ball', power: 101, icon: '💗', color: '#e879b8', quote: "Buu doesn't understand strategy. Buu just doesn't stop." }
    ]
  },
  {
    name: 'Diamond League',
    icon: '💎',
    bracket: [
      { name: 'All For One', universe: 'My Hero Academia', power: 95, icon: '🌫️', color: '#4a4358', quote: 'Whatever power you have, I can simply take it for myself.' },
      { name: 'Griffith', universe: 'Berserk', power: 101, icon: '🦅', color: '#e8e4f0', quote: 'Dreams are worth any sacrifice. Even yours.' },
      { name: 'Meruem', universe: 'Hunter x Hunter', power: 107, icon: '👑', color: '#3a3a42', quote: 'I was born to be the strongest. You are merely a data point.' },
      { name: 'Frieza (Golden Form)', universe: 'Dragon Ball', power: 112, icon: '✨', color: '#e8c34a', quote: "This form cost me years of training I never wanted to do. You'd better be worth it." }
    ]
  },
  {
    name: 'Multiverse Final',
    icon: '👑',
    bracket: [
      { name: 'Beerus', universe: 'Dragon Ball Super', power: 106, icon: '🐱', color: '#8e5ba8', quote: "Amuse me, or I'll erase this whole arena from existence." },
      { name: 'Kaguya Otsutsuki', universe: 'Naruto', power: 112, icon: '🌙', color: '#c2a8e8', quote: 'Dimensions bend to my will. Yours is next.' },
      { name: 'Kars', universe: "JoJo's Bizarre Adventure", power: 117, icon: '💎', color: '#7ac9d4', quote: 'I am the pinnacle of all life. Perfection does not lose.' },
      { name: 'Fused Zamasu', universe: 'Dragon Ball Super', power: 124, icon: '♾️', color: '#4ce88a', quote: 'Mortals are a mistake I intend to erase — starting with you.' }
    ]
  }
];

// Secret bonus opponent — only fightable after the "Two Absurd Powers" secret
// achievement unlocks it. Not part of the normal bracket progression.
const SECRET_OPPONENT = {
  name: 'The Watcher', universe: '???', power: 130, icon: '👁️', color: '#ffffff',
  quote: 'I have observed every roulette spin across every universe. Show me something new.',
  shardReward: 75
};

const TOTAL_MATCHES = TIERS.length * 4; // 24 — the full-clear score

const ACTION_META = {
  scout: { name: 'Scout', icon: '🧭', color: '#2ecc71' },
  train: { name: 'Train', icon: '🏋️', color: '#f1c40f' },
  trade: { name: 'Trade', icon: '🔄', color: '#3498db' },
  match: { name: 'Match', icon: '⚔️', color: '#e67e22' },
  item: { name: 'Treasure', icon: '🎁', color: '#ff9f43' },
  awaken: { name: 'Awakening', icon: '✨', color: '#ff6b81' },
  fusion: { name: 'Fusion', icon: '🌀', color: '#00e5ff' }
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
  fusion: 'Fuse your fighters!',
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
  fusion: 'Which two fighters fuse?!',
  victory: 'You are the Multiverse Champion! 🏆'
};

const MAX_ROSTER = 6;
const MAX_POWER = 999;

// ---------------------------------------------------------------------------
// Achievements — id, category, name, desc (or '???' if secret), check(career),
// reward in shards. `secret: true` hides name/desc until unlocked.
// ---------------------------------------------------------------------------

const ACHIEVEMENT_DEFS = [
  // Spins
  { id: 'first-spin', category: 'Spins', name: 'First Spin', desc: 'Spin the roulette for the first time.', reward: 10, check: c => c.totalSpins >= 1 },
  { id: 'spins-100', category: 'Spins', name: 'Getting the Hang of It', desc: 'Spin the roulette 100 times.', reward: 25, check: c => c.totalSpins >= 100 },
  { id: 'spins-1000', category: 'Spins', name: 'Roulette Addict', desc: 'Spin the roulette 1,000 times.', reward: 100, check: c => c.totalSpins >= 1000 },
  { id: 'lucky-streak', category: 'Spins', name: 'Hot Streak', desc: 'Scout 3 Epic-or-better fighters in a row.', reward: 30, check: c => c.bestLuckyStreak >= 3 },
  { id: 'unlucky-streak', category: 'Spins', name: '???', secretName: 'Cursed', secretDesc: 'Scout 10 Commons in a row.', desc: '???', reward: 20, secret: true, check: c => c.bestUnluckyStreak >= 10 },

  // Collection
  { id: 'collect-10', category: 'Collection', name: 'Budding Roster', desc: 'Collect 10 unique fighters (career total).', reward: 20, check: c => c.uniqueCharacters.length >= 10 },
  { id: 'collect-40', category: 'Collection', name: 'Seasoned Collector', desc: 'Collect 40 unique fighters (career total).', reward: 50, check: c => c.uniqueCharacters.length >= 40 },
  { id: 'collect-all', category: 'Collection', name: 'Completionist', desc: 'Collect every fighter in the core roster.', reward: 200, check: c => c.uniqueCharacters.length >= Object.values(ROSTER_BY_RARITY).reduce((s, l) => s + l.length, 0) },
  { id: 'villain-5', category: 'Collection', name: 'Villain Hunter', desc: 'Defeat 5 different villains (career total).', reward: 25, check: c => c.villainsDefeated.length >= 5 },
  { id: 'villain-all', category: 'Collection', name: 'Multiverse Exterminator', desc: 'Defeat every villain in the tournament.', reward: 150, check: c => c.villainsDefeated.length >= TIERS.reduce((s, t) => s + t.bracket.length, 0) },
  { id: 'anime-15', category: 'Collection', name: 'World Traveler', desc: 'Scout fighters from 15 different anime.', reward: 40, check: c => c.universesCollected.length >= 15 },

  // Power
  { id: 'power-100', category: 'Power', name: 'Triple Digits', desc: 'Reach 100 power on a single fighter.', reward: 15, check: c => c.highestPower >= 100 },
  { id: 'power-250', category: 'Power', name: 'Breaking the Scale', desc: 'Reach 250 power on a single fighter.', reward: 40, check: c => c.highestPower >= 250 },
  { id: 'power-500', category: 'Power', name: 'Power Level: Unmeasurable', desc: 'Reach 500 power on a single fighter.', reward: 80, check: c => c.highestPower >= 500 },

  // Combat / progress
  { id: 'first-win', category: 'Combat', name: 'First Blood', desc: 'Win your first match.', reward: 10, check: c => c.battlesWon >= 1 },
  { id: 'battles-50', category: 'Combat', name: 'Veteran Fighter', desc: 'Win 50 matches (career total).', reward: 50, check: c => c.battlesWon >= 50 },
  { id: 'bronze-champion', category: 'Combat', name: 'Bronze Champion', desc: 'Clear the Bronze League.', reward: 20, check: c => c.leaguesCleared.Bronze >= 1 },
  { id: 'multiverse-champion', category: 'Combat', name: 'Multiverse Champion', desc: 'Become Multiverse Champion.', reward: 300, check: c => c.championWins >= 1 },
  { id: 'phoenix-save', category: 'Combat', name: 'Cheating Death', desc: 'Get saved by a Phoenix Ember.', reward: 15, check: c => c.phoenixSaves >= 1 },
  { id: 'streak-3', category: 'Combat', name: 'Unstoppable', desc: 'Win 3 tournaments in a row.', reward: 100, check: c => c.bestChampionStreak >= 3 },

  // Secret
  { id: 'secret-saitama-escanor', category: 'Secret', name: '???', secretName: 'Two Absurd Powers', secretDesc: 'Have both Saitama and Escanor in your roster at once.', desc: '???', reward: 50, secret: true, check: c => c.hadSaitamaEscanor },
  { id: 'secret-exact-100', category: 'Secret', name: '???', secretName: 'Precisely Perfect', secretDesc: 'Train a Common-rarity fighter to exactly 100 power.', desc: '???', reward: 30, secret: true, check: c => c.hadExact100Common },
  { id: 'secret-lose-beerus-3', category: 'Secret', name: '???', secretName: 'The God Remembers You', secretDesc: 'Lose to Beerus 3 times (career total).', desc: '???', reward: 25, secret: true, check: c => (c.lossesByOpponent['Beerus'] || 0) >= 3 }
];

// ---------------------------------------------------------------------------
// Quests
// ---------------------------------------------------------------------------

const DAILY_QUEST_POOL = [
  { id: 'd-win-3', name: 'Win 3 matches today', target: 3, statKey: 'dailyMatchWins', reward: 20 },
  { id: 'd-scout-5', name: 'Scout 5 fighters today', target: 5, statKey: 'dailyScouts', reward: 15 },
  { id: 'd-epic-1', name: 'Scout 1 Epic-or-better fighter today', target: 1, statKey: 'dailyEpicPlus', reward: 20 },
  { id: 'd-train-2', name: 'Train a fighter 2 times today', target: 2, statKey: 'dailyTrainings', reward: 15 },
  { id: 'd-item-1', name: 'Use 1 support item today', target: 1, statKey: 'dailyItemsUsed', reward: 15 },
  { id: 'd-silver', name: 'Reach the Silver League today', target: 1, statKey: 'dailySilverReached', reward: 25 }
];

const PERMANENT_QUEST_DEFS = [
  { id: 'p-scout-10', name: 'Scout 10 fighters (career)', target: 10, statKey: 'totalScouts', reward: 20 },
  { id: 'p-win-5', name: 'Win 5 matches (career)', target: 5, statKey: 'battlesWon', reward: 20 },
  { id: 'p-power-150', name: 'Reach 150 power on any fighter', target: 150, statKey: 'highestPower', reward: 25 },
  { id: 'p-anime-5', name: 'Collect fighters from 5 different anime', target: 5, statKey: 'universesCollected', isArrayLength: true, reward: 20 },
  { id: 'p-villains-3', name: 'Defeat 3 different villains', target: 3, statKey: 'villainsDefeated', isArrayLength: true, reward: 20 }
];

// ---------------------------------------------------------------------------
// Titles — mostly unlocked automatically as a side effect of achievements
// and collection completions, checked in checkTitles().
// ---------------------------------------------------------------------------

const TITLE_DEFS = [
  { id: 'Rookie Spinner', check: () => true },
  { id: 'Legend Hunter', check: c => c.unlockedAchievements.includes('collect-40') },
  { id: 'The Lucky One', check: c => c.unlockedAchievements.includes('lucky-streak') },
  { id: 'The Unlucky One', check: c => c.unlockedAchievements.includes('unlucky-streak') },
  { id: 'Professional Gambler', check: c => c.unlockedAchievements.includes('spins-1000') },
  { id: 'Anime Master', check: c => c.animesCompleted.length >= 1 },
  { id: 'Multiverse Historian', check: c => c.animesCompleted.length >= 5 },
  { id: 'Multiverse Champion', check: c => c.championWins >= 1 }
];

// =============================================================================
// systems.js — persistence + achievement/quest/pity/shop engines.
// Depends on data.js. Loaded second. Exposes functions used by main.js.
// =============================================================================

const CAREER_KEY = 'mat_career_v1';

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

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
    // localStorage unavailable — fail silently, game still works this session
  }
}

function createDefaultCareer() {
  return {
    // legacy-compatible run stats (kept for the existing leaderboard panel)
    totalRuns: 0,
    bestScore: 0,
    bestLabel: '—',
    currentStreak: 0,
    bestStreak: 0,

    // shards + achievements
    shards: 0,
    unlockedAchievements: [],

    // spin / collection tracking
    totalSpins: 0,
    totalScouts: 0,
    rarityCounts: { Common: 0, Rare: 0, Epic: 0, Legendary: 0, Mythic: 0 },
    uniqueCharacters: [],
    universesCollected: [],
    highestPower: 0,
    rarestObtained: null,
    currentLuckyStreak: 0,
    bestLuckyStreak: 0,
    currentUnluckyStreak: 0,
    bestUnluckyStreak: 0,
    pityCounter: 0,

    // combat tracking
    battlesWon: 0,
    battlesLost: 0,
    lossesByOpponent: {},
    villainsDefeated: [],
    leaguesCleared: { Bronze: 0, Silver: 0, Gold: 0, Platinum: 0, Diamond: 0 },
    championWins: 0,
    currentChampionStreak: 0,
    bestChampionStreak: 0,
    phoenixSaves: 0,

    // secret triggers
    hadSaitamaEscanor: false,
    hadExact100Common: false,

    // unlocks
    unlockedBonusPack: false,
    unlockedMythic: false,
    unlockedFusion: false,
    unlockedSecretOpponent: false,

    // quests
    dailyQuestDate: '',
    dailyQuestIds: [],
    dailyQuestProgress: {},
    dailyCompletedToday: [],
    permanentQuestProgress: {},
    permanentQuestCompleted: [],

    // mastery (repeat pulls of a character you've already discovered before)
    masteryXP: {},

    // collection index
    animesCompleted: [],

    // titles
    unlockedTitles: ['Rookie Spinner'],
    equippedTitle: 'Rookie Spinner',

    // playtime
    playtimeSeconds: 0
  };
}

let career = loadJSON(CAREER_KEY, null) || createDefaultCareer();
// Backfill any new fields for players with an older save
career = Object.assign(createDefaultCareer(), career);

function saveCareer() {
  saveJSON(CAREER_KEY, career);
}

// ---------------------------------------------------------------------------
// Playtime
// ---------------------------------------------------------------------------

let sessionStartTs = Date.now();

function flushPlaytime() {
  const now = Date.now();
  const elapsed = Math.floor((now - sessionStartTs) / 1000);
  if (elapsed > 0) {
    career.playtimeSeconds += elapsed;
    sessionStartTs = now;
  }
}

function formatPlaytime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

// ---------------------------------------------------------------------------
// Daily quest rotation — deterministic per calendar day
// ---------------------------------------------------------------------------

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function pickDailyQuestIds(dateStr) {
  const seed = hashString(dateStr);
  const pool = [...DAILY_QUEST_POOL];
  const picked = [];
  let s = seed;
  while (picked.length < 3 && pool.length > 0) {
    s = (s * 1103515245 + 12345) >>> 0;
    const idx = s % pool.length;
    picked.push(pool.splice(idx, 1)[0].id);
  }
  return picked;
}

function ensureDailyQuestsFresh() {
  const today = todayString();
  if (career.dailyQuestDate !== today) {
    career.dailyQuestDate = today;
    career.dailyQuestIds = pickDailyQuestIds(today);
    career.dailyQuestProgress = {};
    career.dailyCompletedToday = [];
    saveCareer();
  }
}

// ---------------------------------------------------------------------------
// Toast notifications (achievements + quests) — non-blocking, stacking
// ---------------------------------------------------------------------------

let toastContainer = null;

function ensureToastContainer() {
  if (!toastContainer) {
    toastContainer = document.getElementById('toast-container');
  }
  return toastContainer;
}

function showToast(kind, title, subtitle) {
  const container = ensureToastContainer();
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${kind}`;
  const titleEl = document.createElement('div');
  titleEl.className = 'toast-title';
  titleEl.textContent = title;
  const subEl = document.createElement('div');
  subEl.className = 'toast-sub';
  subEl.textContent = subtitle;
  toast.append(titleEl, subEl);
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4200);
}

// ---------------------------------------------------------------------------
// Achievement engine
// ---------------------------------------------------------------------------

function checkAchievements() {
  const newlyUnlocked = [];
  ACHIEVEMENT_DEFS.forEach(def => {
    if (career.unlockedAchievements.includes(def.id)) return;
    if (def.check(career)) {
      career.unlockedAchievements.push(def.id);
      career.shards += def.reward;
      newlyUnlocked.push(def);
    }
  });
  if (newlyUnlocked.length > 0) {
    saveCareer();
    newlyUnlocked.forEach(def => {
      const name = def.secret ? def.secretName : def.name;
      showToast('achievement', `🏅 Achievement: ${name}`, `+${def.reward} shards`);
    });
  }
  return newlyUnlocked;
}

// ---------------------------------------------------------------------------
// Collection Index — characters grouped by anime, with completion rewards
// ---------------------------------------------------------------------------

function getUniverseGroups() {
  const merged = buildActiveRosterByRarity();
  const byUniverse = {};
  Object.keys(merged).forEach(rarity => {
    merged[rarity].forEach(entry => {
      if (!byUniverse[entry.universe]) byUniverse[entry.universe] = [];
      byUniverse[entry.universe].push({ name: entry.name, rarity });
    });
  });
  return byUniverse;
}

function checkCollectionCompletions() {
  const groups = getUniverseGroups();
  let changed = false;
  Object.keys(groups).forEach(universe => {
    if (career.animesCompleted.includes(universe)) return;
    const chars = groups[universe];
    const allOwned = chars.length > 0 && chars.every(c => career.uniqueCharacters.includes(c.name));
    if (allOwned) {
      career.animesCompleted.push(universe);
      const reward = chars.length * 8;
      career.shards += reward;
      changed = true;
      showToast('unlock', `📖 Collection Complete: ${universe}`, `+${reward} shards!`);
    }
  });
  if (changed) saveCareer();
}

// ---------------------------------------------------------------------------
// Titles — unlocked as a side effect of achievements / collection progress
// ---------------------------------------------------------------------------

function checkTitles() {
  let changed = false;
  TITLE_DEFS.forEach(def => {
    if (career.unlockedTitles.includes(def.id)) return;
    if (def.check(career)) {
      career.unlockedTitles.push(def.id);
      changed = true;
      showToast('unlock', `🎖️ Title Unlocked: ${def.id}`, 'Equip it from the Stats page!');
    }
  });
  if (changed) saveCareer();
}

// ---------------------------------------------------------------------------
// Mastery — repeat pulls of an already-discovered character grant small,
// capped bonuses instead of being "wasted". Duplicates still can't sit in
// your live roster at once (that stays blocked) — this is a career-wide
// reward for scouting/trading into a character you've met before.
// ---------------------------------------------------------------------------

const MASTERY_XP_PER_REPEAT = 10;
const MASTERY_XP_PER_LEVEL = 50;
const MASTERY_MAX_BONUS_POWER = 5;

function masteryLevelFor(name) {
  const xp = (career.masteryXP && career.masteryXP[name]) || 0;
  return Math.min(MASTERY_MAX_BONUS_POWER, Math.floor(xp / MASTERY_XP_PER_LEVEL));
}

function grantMasteryXP(name) {
  if (!career.masteryXP) career.masteryXP = {};
  career.masteryXP[name] = (career.masteryXP[name] || 0) + MASTERY_XP_PER_REPEAT;
}

// ---------------------------------------------------------------------------
// Quest engine
// ---------------------------------------------------------------------------

function bumpDailyStat(statKey, amount) {
  ensureDailyQuestsFresh();
  career.dailyQuestProgress[statKey] = (career.dailyQuestProgress[statKey] || 0) + (amount || 1);
}

function setDailyFlag(statKey) {
  ensureDailyQuestsFresh();
  career.dailyQuestProgress[statKey] = 1;
}

function checkQuests() {
  ensureDailyQuestsFresh();
  let changed = false;

  // Daily quests
  career.dailyQuestIds.forEach(id => {
    if (career.dailyCompletedToday.includes(id)) return;
    const def = DAILY_QUEST_POOL.find(q => q.id === id);
    if (!def) return;
    const progress = career.dailyQuestProgress[def.statKey] || 0;
    if (progress >= def.target) {
      career.dailyCompletedToday.push(id);
      career.shards += def.reward;
      changed = true;
      showToast('quest', `✅ Daily Quest: ${def.name}`, `+${def.reward} shards`);
    }
  });

  // Permanent quests
  PERMANENT_QUEST_DEFS.forEach(def => {
    if (career.permanentQuestCompleted.includes(def.id)) return;
    const raw = career[def.statKey];
    const progress = def.isArrayLength ? (Array.isArray(raw) ? raw.length : 0) : (raw || 0);
    if (progress >= def.target) {
      career.permanentQuestCompleted.push(def.id);
      career.shards += def.reward;
      changed = true;
      showToast('quest', `✅ Quest: ${def.name}`, `+${def.reward} shards`);
    }
  });

  if (changed) saveCareer();
}

function dailyQuestProgressValue(def) {
  return career.dailyQuestProgress[def.statKey] || 0;
}

function permanentQuestProgressValue(def) {
  const raw = career[def.statKey];
  return def.isArrayLength ? (Array.isArray(raw) ? raw.length : 0) : (raw || 0);
}

// ---------------------------------------------------------------------------
// Pity system (soft ramp + hard guarantee), applied only to Scout spins.
// Kept subtle: no exact counter shown to the player.
// ---------------------------------------------------------------------------

const PITY_SOFT_START = 6;
const PITY_HARD_CAP = 10;

function getPityAdjustedPool(basePool) {
  const counter = career.pityCounter;
  if (counter < PITY_SOFT_START) return basePool;

  if (counter >= PITY_HARD_CAP) {
    // Hard pity: guarantee Rare or better for this pull
    return basePool.filter(c => RARITY_RANK[c.rarity] >= RARITY_RANK.Rare);
  }

  // Soft pity: progressively boost Rare+ weights the longer the drought runs
  const rampFactor = 1 + (counter - PITY_SOFT_START + 1) * 0.6;
  return basePool.map(c => {
    if (RARITY_RANK[c.rarity] >= RARITY_RANK.Rare) {
      return { ...c, weight: c.weight * rampFactor };
    }
    return c;
  });
}

function recordScoutPityResult(rarity) {
  if (RARITY_RANK[rarity] >= RARITY_RANK.Rare) {
    career.pityCounter = 0;
  } else {
    career.pityCounter += 1;
  }
}
// =============================================================================
// main.js — game loop + UI. Depends on data.js and systems.js (loaded first).
// =============================================================================

// ---------------------------------------------------------------------------
// Active character pool (core + unlocked packs), rebuilt only when unlocks change
// ---------------------------------------------------------------------------

function buildCharacterPool(rosterBySource) {
  const pool = [];
  Object.keys(rosterBySource).forEach(rarity => {
    const cfg = RARITIES[rarity];
    const list = rosterBySource[rarity];
    if (!cfg || !list || list.length === 0) return;
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

function buildActiveRosterByRarity() {
  const merged = {};
  RARITY_ORDER.forEach(r => { merged[r] = []; });
  Object.keys(ROSTER_BY_RARITY).forEach(r => { merged[r] = merged[r].concat(ROSTER_BY_RARITY[r]); });
  if (career.unlockedBonusPack) {
    Object.keys(BONUS_PACK_ROSTER).forEach(r => { merged[r] = merged[r].concat(BONUS_PACK_ROSTER[r]); });
  }
  if (career.unlockedMythic) {
    merged.Mythic = merged.Mythic.concat(MYTHIC_ROSTER);
  }
  return merged;
}

let ACTIVE_POOL = buildCharacterPool(buildActiveRosterByRarity());
const STARTER_POOL = buildCharacterPool(ROSTER_BY_RARITY).filter(c => c.isStarter).map(c => ({ ...c, weight: 1 }));

function refreshActivePool() {
  ACTIVE_POOL = buildCharacterPool(buildActiveRosterByRarity());
}

const CORE_CHARACTER_COUNT = Object.values(ROSTER_BY_RARITY).reduce((s, l) => s + l.length, 0);
const TOTAL_VILLAIN_COUNT = TIERS.reduce((s, t) => s + t.bracket.length, 0);

// ---------------------------------------------------------------------------
// Game state (per-run, resets each attempt — career persists across runs)
// ---------------------------------------------------------------------------

function createInitialState() {
  return {
    phase: 'starter',
    roster: [],
    tierIndex: 0,
    roundIndex: 0,
    finaleWon: false,
    items: { phoenixEmber: 1, chakraDraft: 0, twinMoon: 0, spiritWhistle: 0, luckyDango: 0 },
    lastWinChance: null,
    tempFusionBonus: 0,
    actionsSinceMatch: 0,
    riftActive: false
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
const rosterPowerSummary = document.getElementById('roster-power-summary');
const itemsList = document.getElementById('items-list');
const dailyQuestList = document.getElementById('daily-quest-list');
const trophyCase = document.getElementById('trophy-case');
const bracketTitle = document.getElementById('bracket-title');
const bracketPath = document.getElementById('bracket-path');
const shardBalanceInline = document.getElementById('shard-balance-inline');

const playerNameDisplay = document.getElementById('player-name-display');
const changeNameBtn = document.getElementById('change-name-btn');
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

const battleOverlay = document.getElementById('battle-intro-overlay');
const battleYourPower = document.getElementById('battle-your-power');
const battleEnemyAvatar = document.getElementById('battle-enemy-avatar');
const battleEnemyName = document.getElementById('battle-enemy-name');
const battleEnemyPower = document.getElementById('battle-enemy-power');
const battleEnemyQuote = document.getElementById('battle-enemy-quote');
const battleEngageBtn = document.getElementById('battle-engage-btn');

const statsOverlay = document.getElementById('stats-overlay');
const statsGrid = document.getElementById('stats-grid');
const titleList = document.getElementById('title-list');
const achievementsList = document.getElementById('achievements-list');
const achievementsProgress = document.getElementById('achievements-progress');
const permanentQuestList = document.getElementById('permanent-quest-list');
const openStatsBtn = document.getElementById('open-stats-btn');
const statsCloseX = document.getElementById('stats-close-x');
const titleDisplay = document.getElementById('title-display');

const shopOverlay = document.getElementById('shop-overlay');
const shopList = document.getElementById('shop-list');
const shopCharacterList = document.getElementById('shop-character-list');
const shardBalance = document.getElementById('shard-balance');
const shopNote = document.getElementById('shop-note');
const openShopBtn = document.getElementById('open-shop-btn');
const shopCloseX = document.getElementById('shop-close-x');

const collectionOverlay = document.getElementById('collection-overlay');
const collectionList = document.getElementById('collection-list');
const openCollectionBtn = document.getElementById('open-collection-btn');
const collectionCloseX = document.getElementById('collection-close-x');

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
  return text.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

// ---------------------------------------------------------------------------
// Character/villain artwork
//
// Drop transparent PNGs into these folders next to index.html, named after
// the character (lowercase, spaces/apostrophes/parentheses become hyphens):
//   images/characters/naruto-uzumaki.png
//   images/characters/meliodas-demon-kings-forest.png   (matches "Meliodas (Fairy King's Forest)")
//   images/villains/frieza-final-form.png                (matches "Frieza (Final Form)")
// If a file is missing, the existing colored-initials avatar is shown
// instead — nothing breaks, art can be added gradually.
// ---------------------------------------------------------------------------

const CHARACTER_IMAGE_DIR = 'images/characters/';
const VILLAIN_IMAGE_DIR = 'images/villains/';

function slugifyName(name) {
  return name
    .toLowerCase()
    .replace(/[().'"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '');
}

function imagePathFor(name, kind) {
  const dir = kind === 'villain' ? VILLAIN_IMAGE_DIR : CHARACTER_IMAGE_DIR;
  return `${dir}${slugifyName(name)}.png`;
}

// Renders into `container`: a fallback text/icon (shown by default) plus an
// <img> that, if it loads successfully, covers the fallback. If the image
// 404s, it silently removes itself and the fallback stays visible.
function attachAvatarImage(container, name, kind, fallbackText) {
  const fallback = document.createElement('span');
  fallback.className = 'avatar-fallback-text';
  fallback.textContent = fallbackText;
  container.appendChild(fallback);

  const img = document.createElement('img');
  img.className = 'char-img';
  img.alt = name;
  img.loading = 'lazy';
  img.onload = () => container.classList.add('has-image');
  img.onerror = () => img.remove();
  img.src = imagePathFor(name, kind);
  container.appendChild(img);
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

function averageRosterPower() {
  if (game.roster.length === 0) return 0;
  return Math.round(game.roster.reduce((s, c) => s + c.power, 0) / game.roster.length);
}

const LEAGUE_STAT_KEY = { 'Bronze League': 'Bronze', 'Silver League': 'Silver', 'Gold League': 'Gold', 'Platinum League': 'Platinum', 'Diamond League': 'Diamond' };

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
  if (entry.universe) {
    attachAvatarImage(avatar, entry.name, 'character', initials(entry.name));
  } else {
    avatar.textContent = entry.icon || initials(entry.name);
  }
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

  career.totalSpins += 1;

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
// Progression checks — run after any state-changing action
// ---------------------------------------------------------------------------

function checkSecretTriggers() {
  const names = game.roster.map(c => c.name);
  if (names.includes('Saitama') && names.includes('Escanor')) career.hadSaitamaEscanor = true;
  game.roster.forEach(c => {
    if (c.rarity === 'Common' && c.power === 100) career.hadExact100Common = true;
  });
}

function checkUnlocks() {
  let changed = false;
  if (!career.unlockedBonusPack && career.totalRuns >= 5) {
    career.unlockedBonusPack = true;
    changed = true;
    showToast('unlock', '🔓 Unlocked: Bonus Character Pack', '8 new fighters added to your scout pool!');
  }
  if (!career.unlockedMythic && career.championWins >= 1) {
    career.unlockedMythic = true;
    changed = true;
    showToast('unlock', '🔓 Unlocked: Mythic Rarity', 'A new top-tier rarity has entered the pool!');
  }
  if (!career.unlockedFusion && career.battlesWon >= 20) {
    career.unlockedFusion = true;
    changed = true;
    showToast('unlock', '🔓 Unlocked: Fusion Roulette', 'Fuse two fighters for a temporary power surge!');
  }
  if (!career.unlockedSecretOpponent && career.hadSaitamaEscanor) {
    career.unlockedSecretOpponent = true;
    changed = true;
    showToast('unlock', '🔓 Secret Unlocked: The Watcher', 'A hidden challenger now appears in your events!');
  }
  if (changed) {
    saveCareer();
    refreshActivePool();
  }
}

function runProgressionChecks() {
  checkSecretTriggers();
  checkAchievements();
  checkQuests();
  checkUnlocks();
  checkCollectionCompletions();
  checkTitles();
  saveCareer();
}

// ---------------------------------------------------------------------------
// UI rendering
// ---------------------------------------------------------------------------

function logEvent(text) {
  const row = document.createElement('div');
  row.textContent = text;
  logList.prepend(row);
  while (logList.children.length > 20) logList.removeChild(logList.lastChild);
}

function showEventPanel(kind, html) {
  eventPanel.className = `event-panel event-${kind}`;
  eventPanel.innerHTML = html;
}

function renderRosterSidebar() {
  const totalPower = game.roster.reduce((s, c) => s + c.power, 0);
  const avgPower = game.roster.length > 0 ? Math.round(totalPower / game.roster.length) : 0;
  rosterPowerSummary.textContent = `Team Power: ${totalPower} total · ${avgPower} avg`;

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
    attachAvatarImage(image, c.name, 'character', initials(c.name));

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

    const masteryLvl = masteryLevelFor(c.name);
    if (masteryLvl > 0) {
      const mastery = document.createElement('span');
      mastery.className = 'roster-card-mastery';
      mastery.textContent = `★ Mastery +${masteryLvl} power`;
      body.appendChild(mastery);
    }

    const chain = AWAKENING_CHAINS[c.name];
    if (chain) {
      const awaken = document.createElement('span');
      awaken.className = 'roster-card-awaken';
      if (c.awakenPhase >= chain.length) awaken.textContent = '✨ Max awakening reached';
      else if (game.tierIndex >= AWAKENING_UNLOCK_TIER) awaken.textContent = `✨ Ready: ${chain[c.awakenPhase].label}`;
      else awaken.textContent = '✨ Awakens later in the run';
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

function renderDailyQuests() {
  ensureDailyQuestsFresh();
  dailyQuestList.innerHTML = '';
  career.dailyQuestIds.forEach(id => {
    const def = DAILY_QUEST_POOL.find(q => q.id === id);
    if (!def) return;
    const done = career.dailyCompletedToday.includes(id);
    const progress = Math.min(dailyQuestProgressValue(def), def.target);
    const row = document.createElement('div');
    row.className = 'quest-row' + (done ? ' done' : '');
    const label = document.createElement('span');
    label.textContent = (done ? '✅ ' : '⬜ ') + def.name;
    const prog = document.createElement('span');
    prog.className = 'quest-progress';
    prog.textContent = `${progress}/${def.target}`;
    row.append(label, prog);
    dailyQuestList.appendChild(row);
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
  bracketTitle.textContent = game.finaleWon ? 'Tournament Complete — Multiverse Champion!' : `${tier.name} — Bracket`;
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

function renderLeaderboard() {
  const list = loadJSON('mat_leaderboard', []);
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
  flushPlaytime();
  renderRosterSidebar();
  renderItemsSidebar();
  renderDailyQuests();
  renderTrophyCase();
  renderBracket();
  renderLeaderboard();

  shardBalanceInline.textContent = career.shards;
  titleDisplay.textContent = career.equippedTitle ? `· ${career.equippedTitle}` : '';

  mainBtn.textContent = PHASE_LABELS[game.phase];
  mainBtn.disabled = isSpinning;
  rouletteTitle.textContent = PHASE_TITLES[game.phase] || PHASE_TITLES.action;
}

// ---------------------------------------------------------------------------
// Name entry
// ---------------------------------------------------------------------------

function getUsedNames() {
  return loadJSON('mat_usedNames', []);
}

function isNameTaken(name, excludeName) {
  const lower = name.trim().toLowerCase();
  return getUsedNames().some(n => n.toLowerCase() === lower && n.toLowerCase() !== (excludeName || '').toLowerCase());
}

function reserveName(name) {
  const used = getUsedNames();
  if (!used.some(n => n.toLowerCase() === name.toLowerCase())) {
    used.push(name);
    saveJSON('mat_usedNames', used);
  }
}

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
  if (!raw) { nameError.textContent = 'Enter a name to continue.'; nameError.classList.remove('hidden'); return; }
  if (raw.length > 20) { nameError.textContent = 'Keep it under 20 characters.'; nameError.classList.remove('hidden'); return; }
  if (isNameTaken(raw, game.playerName)) { nameError.textContent = 'That name is already taken on this device — try another.'; nameError.classList.remove('hidden'); return; }
  reserveName(raw);
  game.playerName = raw;
  saveJSON('mat_playerName', raw);
  playerNameDisplay.textContent = raw;
  closeNameOverlay();
}

nameSubmit.addEventListener('click', submitName);
nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') submitName(); });
changeNameBtn.addEventListener('click', () => openNameOverlay(game.playerName));

// ---------------------------------------------------------------------------
// Battle VS intro modal
// ---------------------------------------------------------------------------

let pendingOpponent = null;

function showBattleIntro(opponent) {
  pendingOpponent = opponent;
  battleYourPower.textContent = `Power ${averageRosterPower()} (avg)`;
  battleEnemyAvatar.innerHTML = '';
  battleEnemyAvatar.classList.remove('has-image');
  attachAvatarImage(battleEnemyAvatar, opponent.name, 'villain', opponent.icon || '👹');
  battleEnemyAvatar.parentElement.style.setProperty('--rarity-color', opponent.color || '#ff2d6b');
  battleEnemyName.textContent = opponent.name;
  battleEnemyPower.textContent = `Power ${opponent.power}`;
  battleEnemyQuote.textContent = `"${opponent.quote}"`;
  battleOverlay.classList.remove('hidden');
  mainBtn.disabled = true;
}

function hideBattleIntro() {
  battleOverlay.classList.add('hidden');
}

battleEngageBtn.addEventListener('click', () => {
  hideBattleIntro();
  if (pendingOpponent) {
    resolveMatch(pendingOpponent);
    pendingOpponent = null;
  }
});

// ---------------------------------------------------------------------------
// Celebration / Game Over modals
// ---------------------------------------------------------------------------

const CONFETTI_COLORS = ['#ffd24d', '#ff2d6b', '#2ecc71', '#00e5ff', '#a855f7', '#ff9f43'];

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
  if (extraText) { celebrationExtra.textContent = extraText; celebrationExtra.classList.remove('hidden-line'); }
  else { celebrationExtra.classList.add('hidden-line'); }
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
// Stats / Achievements / Quests modal
// ---------------------------------------------------------------------------

function statCell(label, value) {
  const cell = document.createElement('div');
  cell.className = 'stats-cell';
  const l = document.createElement('span');
  l.className = 'stats-cell-label';
  l.textContent = label;
  const v = document.createElement('div');
  v.className = 'stats-cell-value';
  v.textContent = value;
  cell.append(l, v);
  return cell;
}

function renderStatsModal() {
  flushPlaytime();
  statsGrid.innerHTML = '';
  const winRate = career.battlesWon + career.battlesLost > 0
    ? Math.round((career.battlesWon / (career.battlesWon + career.battlesLost)) * 100)
    : 0;
  statsGrid.append(
    statCell('Total Spins', career.totalSpins),
    statCell('Fighters Scouted', career.totalScouts),
    statCell('Unique Fighters', `${career.uniqueCharacters.length} / ${CORE_CHARACTER_COUNT}`),
    statCell('Highest Power', career.highestPower),
    statCell('Rarest Obtained', career.rarestObtained || '—'),
    statCell('Battles Won / Lost', `${career.battlesWon} / ${career.battlesLost} (${winRate}%)`),
    statCell('Villains Defeated', `${career.villainsDefeated.length} / ${TOTAL_VILLAIN_COUNT}`),
    statCell('Anime Collected', career.universesCollected.length),
    statCell('Anime Collections Complete', career.animesCompleted.length),
    statCell('Champion Wins', career.championWins),
    statCell('Best Champion Streak', career.bestChampionStreak),
    statCell('Playtime', formatPlaytime(career.playtimeSeconds)),
    statCell('Shards Balance', `${career.shards} 🔷`)
  );

  titleList.innerHTML = '';
  TITLE_DEFS.forEach(def => {
    if (!career.unlockedTitles.includes(def.id)) return;
    const equipped = career.equippedTitle === def.id;
    const row = document.createElement('div');
    row.className = 'title-row' + (equipped ? ' equipped' : '');
    const name = document.createElement('span');
    name.className = 'title-name';
    name.textContent = (equipped ? '✓ ' : '') + def.id;
    const btn = document.createElement('button');
    btn.textContent = equipped ? 'Equipped' : 'Equip';
    btn.disabled = equipped;
    btn.addEventListener('click', () => {
      career.equippedTitle = def.id;
      saveCareer();
      renderStatsModal();
      refreshUI();
    });
    row.append(name, btn);
    titleList.appendChild(row);
  });

  const unlockedCount = career.unlockedAchievements.length;
  achievementsProgress.textContent = `(${unlockedCount} / ${ACHIEVEMENT_DEFS.length})`;
  achievementsList.innerHTML = '';
  ACHIEVEMENT_DEFS.forEach(def => {
    const unlocked = career.unlockedAchievements.includes(def.id);
    const row = document.createElement('div');
    row.className = 'achievement-row' + (unlocked ? ' unlocked' : '');
    const icon = document.createElement('span');
    icon.className = 'ach-icon';
    icon.textContent = unlocked ? '🏅' : '🔒';
    const body = document.createElement('div');
    body.className = 'ach-body';
    const name = document.createElement('div');
    name.className = 'ach-name';
    const desc = document.createElement('div');
    desc.className = 'ach-desc';
    if (def.secret && !unlocked) {
      name.textContent = '???';
      desc.textContent = 'Secret achievement — keep playing to discover it.';
    } else if (def.secret && unlocked) {
      name.textContent = def.secretName;
      desc.textContent = def.secretDesc;
    } else {
      name.textContent = def.name;
      desc.textContent = def.desc;
    }
    body.append(name, desc);
    const reward = document.createElement('span');
    reward.className = 'ach-reward';
    reward.textContent = `+${def.reward} 🔷`;
    row.append(icon, body, reward);
    achievementsList.appendChild(row);
  });

  permanentQuestList.innerHTML = '';
  PERMANENT_QUEST_DEFS.forEach(def => {
    const done = career.permanentQuestCompleted.includes(def.id);
    const progress = Math.min(permanentQuestProgressValue(def), def.target);
    const row = document.createElement('div');
    row.className = 'quest-row' + (done ? ' done' : '');
    const label = document.createElement('span');
    label.textContent = (done ? '✅ ' : '⬜ ') + def.name;
    const prog = document.createElement('span');
    prog.className = 'quest-progress';
    prog.textContent = `${progress}/${def.target}`;
    row.append(label, prog);
    permanentQuestList.appendChild(row);
  });
}

openStatsBtn.addEventListener('click', () => { renderStatsModal(); statsOverlay.classList.remove('hidden'); });
statsCloseX.addEventListener('click', () => statsOverlay.classList.add('hidden'));

// ---------------------------------------------------------------------------
// Collection Index
// ---------------------------------------------------------------------------

function renderCollectionIndex() {
  const groups = getUniverseGroups();
  collectionList.innerHTML = '';
  const universeNames = Object.keys(groups).sort();
  universeNames.forEach(universe => {
    const chars = groups[universe];
    const owned = chars.filter(c => career.uniqueCharacters.includes(c.name));
    const complete = owned.length === chars.length;

    const section = document.createElement('div');
    section.className = 'collection-anime' + (complete ? ' complete' : '');

    const header = document.createElement('div');
    header.className = 'collection-anime-header';
    const name = document.createElement('span');
    name.className = 'collection-anime-name';
    name.textContent = (complete ? '✅ ' : '') + universe;
    const count = document.createElement('span');
    count.className = 'collection-anime-count';
    count.textContent = `${owned.length} / ${chars.length}`;
    header.append(name, count);

    const barWrap = document.createElement('div');
    barWrap.className = 'collection-progress-bar';
    const barFill = document.createElement('div');
    barFill.className = 'collection-progress-fill';
    barFill.style.width = `${Math.round((owned.length / chars.length) * 100)}%`;
    barWrap.appendChild(barFill);

    const chips = document.createElement('div');
    chips.className = 'collection-chips';
    chars.forEach(c => {
      const discovered = career.uniqueCharacters.includes(c.name);
      const chip = document.createElement('span');
      chip.className = 'collection-chip' + (discovered ? '' : ' undiscovered');
      if (discovered) {
        chip.style.setProperty('--rarity-color', RARITIES[c.rarity].color);
        chip.textContent = c.name;
      } else {
        chip.textContent = '???';
      }
      chips.appendChild(chip);
    });

    section.append(header, barWrap, chips);
    collectionList.appendChild(section);
  });
}

openCollectionBtn.addEventListener('click', () => { renderCollectionIndex(); collectionOverlay.classList.remove('hidden'); });
collectionCloseX.addEventListener('click', () => collectionOverlay.classList.add('hidden'));

// ---------------------------------------------------------------------------
// Shard shop
// ---------------------------------------------------------------------------

function renderShop() {
  shardBalance.textContent = career.shards;
  const runActive = game.phase !== 'victory' && game.phase !== 'gameover';
  shopNote.textContent = runActive ? '' : 'Your run just ended — start a new tournament to spend shards again.';

  shopCharacterList.innerHTML = '';
  SHOP_CHARACTER_ITEMS.forEach(item => {
    const row = document.createElement('div');
    row.className = 'shop-item-row';
    row.style.setProperty('--item-color', item.color);
    const icon = document.createElement('span');
    icon.className = 'shop-item-icon';
    icon.textContent = item.icon;
    const body = document.createElement('div');
    body.className = 'shop-item-body';
    const name = document.createElement('div');
    name.className = 'shop-item-name';
    name.textContent = item.name;
    const desc = document.createElement('div');
    desc.className = 'shop-item-desc';
    desc.textContent = item.desc;
    body.append(name, desc);
    const buyBtn = document.createElement('button');
    const canAfford = career.shards >= item.price;
    buyBtn.textContent = `${item.price} 🔷`;
    buyBtn.disabled = !runActive || !canAfford;
    buyBtn.title = !runActive ? 'Start a run first' : (!canAfford ? 'Not enough shards yet' : '');
    buyBtn.addEventListener('click', () => buyShopCharacter(item));
    row.append(icon, body, buyBtn);
    shopCharacterList.appendChild(row);
  });

  shopList.innerHTML = '';
  SHOP_ITEMS.forEach(item => {
    const row = document.createElement('div');
    row.className = 'shop-item-row';
    row.style.setProperty('--item-color', item.color);
    const icon = document.createElement('span');
    icon.className = 'shop-item-icon';
    icon.textContent = item.icon;
    const body = document.createElement('div');
    body.className = 'shop-item-body';
    const name = document.createElement('div');
    name.className = 'shop-item-name';
    name.textContent = item.name;
    const desc = document.createElement('div');
    desc.className = 'shop-item-desc';
    desc.textContent = item.desc;
    body.append(name, desc);
    const buyBtn = document.createElement('button');
    const canAfford = career.shards >= item.price;
    buyBtn.textContent = `${item.price} 🔷`;
    buyBtn.disabled = !runActive || !canAfford;
    buyBtn.title = !runActive ? 'Start a run first' : (!canAfford ? 'Not enough shards yet' : '');
    buyBtn.addEventListener('click', () => buyShopItem(item));
    row.append(icon, body, buyBtn);
    shopList.appendChild(row);
  });
}

function buyShopCharacter(item) {
  if (career.shards < item.price) return;
  const pool = poolExcludingRoster(ACTIVE_POOL.filter(c => c.rarity === item.rarity));
  if (pool.length === 0) {
    logEvent(`🛒 No available ${item.rarity} fighters left to recruit right now.`);
    return;
  }
  career.shards -= item.price;
  const picked = applyMasteryBonus(weightedPick(pool));
  addToRoster(picked);
  trackScoutedCharacter(picked);
  saveCareer();
  logEvent(`🛒 Recruited ${picked.name} (${item.rarity}) for ${item.price} shards`);
  runProgressionChecks();
  renderShop();
  refreshUI();
}

function buyShopItem(item) {
  if (career.shards < item.price) return;
  career.shards -= item.price;
  game.items[item.key] = (game.items[item.key] || 0) + 1;
  saveCareer();
  logEvent(`🛒 Bought ${item.name} for ${item.price} shards`);
  renderShop();
  refreshUI();
}

openShopBtn.addEventListener('click', () => { renderShop(); shopOverlay.classList.remove('hidden'); });
shopCloseX.addEventListener('click', () => shopOverlay.classList.add('hidden'));

// ---------------------------------------------------------------------------
// Run-end bookkeeping (career-level, replaces the old separate stats key)
// ---------------------------------------------------------------------------

function recordRunEnd(isChampion, opponentName) {
  const score = liveScore();
  const isNewBest = score > career.bestScore;

  career.totalRuns += 1;
  if (isNewBest) {
    career.bestScore = score;
    career.bestLabel = isChampion ? 'Multiverse Champion' : scoreLabel(score);
  }
  if (isChampion) {
    career.championWins += 1;
    career.currentChampionStreak += 1;
    career.bestChampionStreak = Math.max(career.bestChampionStreak, career.currentChampionStreak);
    career.currentStreak = career.currentChampionStreak;
    career.bestStreak = career.bestChampionStreak;
  } else {
    career.currentChampionStreak = 0;
    career.currentStreak = 0;
  }
  saveCareer();

  const leaderboard = loadJSON('mat_leaderboard', []);
  leaderboard.push({
    name: game.playerName || 'Anonymous',
    result: isChampion ? 'champion' : 'eliminated',
    label: isChampion ? 'Multiverse Champion' : scoreLabel(score),
    opponent: opponentName,
    score,
    date: new Date().toLocaleDateString()
  });
  leaderboard.sort((a, b) => b.score - a.score);
  saveJSON('mat_leaderboard', leaderboard.slice(0, 20));

  runProgressionChecks();
  return isNewBest;
}

// ---------------------------------------------------------------------------
// Roster management
// ---------------------------------------------------------------------------

function trackScoutedCharacter(c) {
  career.totalScouts += 1;
  const isRepeat = career.uniqueCharacters.includes(c.name);
  if (!isRepeat) {
    career.uniqueCharacters.push(c.name);
  } else {
    grantMasteryXP(c.name);
  }
  if (!career.universesCollected.includes(c.universe)) career.universesCollected.push(c.universe);
  career.rarityCounts[c.rarity] = (career.rarityCounts[c.rarity] || 0) + 1;
  if (career.rarestObtained === null || RARITY_RANK[c.rarity] > RARITY_RANK[career.rarestObtained]) {
    career.rarestObtained = c.rarity;
  }
  if (c.power > career.highestPower) career.highestPower = c.power;

  if (RARITY_RANK[c.rarity] >= RARITY_RANK.Epic) {
    career.currentLuckyStreak += 1;
    career.bestLuckyStreak = Math.max(career.bestLuckyStreak, career.currentLuckyStreak);
    career.currentUnluckyStreak = 0;
  } else if (c.rarity === 'Common') {
    career.currentUnluckyStreak += 1;
    career.bestUnluckyStreak = Math.max(career.bestUnluckyStreak, career.currentUnluckyStreak);
    career.currentLuckyStreak = 0;
  } else {
    career.currentLuckyStreak = 0;
    career.currentUnluckyStreak = 0;
  }

  recordScoutPityResult(c.rarity);
  bumpDailyStat('dailyScouts', 1);
  if (RARITY_RANK[c.rarity] >= RARITY_RANK.Epic) bumpDailyStat('dailyEpicPlus', 1);
}

// Applies a small, capped power bonus (max +5) for characters you've met
// before, career-wide. Duplicates still can't sit in your live roster —
// this only rewards re-pulling someone you've already discovered.
function applyMasteryBonus(character) {
  const bonus = masteryLevelFor(character.name);
  return bonus > 0 ? { ...character, power: character.power + bonus, masteryBonus: bonus } : character;
}

function rosterOwnedNames() {
  return new Set(game.roster.map(c => c.name));
}

function poolExcludingRoster(pool) {
  const owned = rosterOwnedNames();
  const filtered = pool.filter(c => !owned.has(c.name));
  // Fallback (should only happen if the whole pool is somehow owned already)
  return filtered.length > 0 ? filtered : pool;
}

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
  // The longer you avoid a match (scouting/trading/opening treasure instead),
  // the more the odds tilt toward forcing a match — you can't stall forever.
  const pressure = game.actionsSinceMatch || 0;
  const decay = Math.max(0.25, 1 - pressure * 0.15);

  const entries = [{ value: 'scout', weight: 26 * decay }];
  if (game.roster.length > 0) {
    entries.push({ value: 'train', weight: 16 });
    entries.push({ value: 'trade', weight: 8 * decay });
  }
  if (!game.finaleWon) entries.push({ value: 'match', weight: 34 + pressure * 8 });
  entries.push({ value: 'item', weight: 10 * decay });
  if (game.tierIndex >= AWAKENING_UNLOCK_TIER && awakenableRoster().length > 0) {
    entries.push({ value: 'awaken', weight: 8 });
  }
  if (career.unlockedFusion && game.roster.length >= 2) {
    entries.push({ value: 'fusion', weight: 6 });
  }
  if (career.unlockedSecretOpponent) {
    entries.push({ value: 'secret', weight: 5 });
  }
  return entries.map(e => ({ ...ACTION_META[e.value], value: e.value, weight: e.weight, sub: 'Event' }));
}

// ---------------------------------------------------------------------------
// Spin flows
// ---------------------------------------------------------------------------

function startStarterSpin() {
  runRoulette(STARTER_POOL, PHASE_TITLES.starter, winnerRaw => {
    const winner = applyMasteryBonus(winnerRaw);
    game.roster.push({ ...winner, awakenPhase: 0 });
    trackScoutedCharacter(winner);
    logEvent(`🎉 Your tournament begins with ${winner.name} (${winner.universe})!`);
    showEventPanel('success', `Your first fighter is <b>${winner.name}</b> from <b>${winner.universe}</b>! You also start with a 🔥 <b>Phoenix Ember</b>.`);
    game.phase = 'action';
    runProgressionChecks();
    refreshUI();
  });
}

function startActionSpin() {
  const pool = buildEventPool();
  runRoulette(pool, PHASE_TITLES.action, winner => {
    logEvent(`🎲 Event: ${winner.name}`);
    showEventPanel('info', `Coming up: <b>${winner.name}</b>`);
    game.phase = winner.value;
    game.actionsSinceMatch = winner.value === 'match' ? 0 : (game.actionsSinceMatch || 0) + 1;

    // Dimensional Rift: a small chance, only when not already active, to grant
    // a temporary boosted-luck window for your next Scout.
    if (winner.value !== 'match' && !game.riftActive && Math.random() < 0.04) {
      game.riftActive = true;
      showToast('unlock', '⚠️ DIMENSIONAL RIFT DETECTED', 'Your next Scout pulls from a boosted pool!');
    }
    refreshUI();
  });
}

function startScoutSpin() {
  let pool = career.pityCounter >= PITY_SOFT_START ? getPityAdjustedPool(ACTIVE_POOL) : ACTIVE_POOL;
  let usedDango = false;
  let usedRift = false;
  if (game.items.luckyDango > 0) {
    game.items.luckyDango--;
    pool = ACTIVE_POOL.filter(c => c.rarity !== 'Common');
    usedDango = true;
  } else if (game.riftActive) {
    game.riftActive = false;
    const boosted = ACTIVE_POOL.filter(c => RARITY_RANK[c.rarity] >= RARITY_RANK.Epic);
    pool = boosted.length > 0 ? boosted : ACTIVE_POOL;
    usedRift = true;
  }
  pool = poolExcludingRoster(pool);
  runRoulette(pool, PHASE_TITLES.scout, winnerRaw => {
    const winner = applyMasteryBonus(winnerRaw);
    addToRoster(winner);
    trackScoutedCharacter(winner);
    if (usedDango) logEvent('🍡 Lucky Dango Skewer guaranteed a Rare-or-better scout!');
    if (usedRift) logEvent('⚠️ The Dimensional Rift boosted this scout to Epic-or-better!');
    game.phase = 'action';
    runProgressionChecks();
    refreshUI();
  });
}

function startTradeSpin() {
  const pool = poolExcludingRoster(ACTIVE_POOL);
  runRoulette(pool, PHASE_TITLES.trade, winnerRaw => {
    const winner = applyMasteryBonus(winnerRaw);
    trackScoutedCharacter(winner);
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
    runProgressionChecks();
    refreshUI();
  });
}

function startTrainingSpin() {
  if (game.roster.length === 0) { game.phase = 'action'; refreshUI(); return; }
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
    if (target.power > career.highestPower) career.highestPower = target.power;
    bumpDailyStat('dailyTrainings', 1);
    logEvent(`🏋️ Training camp: ${target.name} gained +${boost} power (${target.power})`);
    showEventPanel('success', `<b>${target.name}</b> completed an intense training camp${usedWhistle ? ' (boosted by a Spirit Whistle!)' : ''} and is now <b>${target.power}</b> power strong!`);
    game.phase = 'action';
    runProgressionChecks();
    refreshUI();
  });
}

function startItemSpin() {
  runRoulette(ITEM_DROP_POOL, PHASE_TITLES.item, winner => {
    game.items[winner.key] = (game.items[winner.key] || 0) + 1;
    logEvent(`🎁 Found: ${winner.name}`);
    showEventPanel('success', `You found a <b>${winner.name}</b>! ${winner.desc}`);
    game.phase = 'action';
    runProgressionChecks();
    refreshUI();
  });
}

function startAwakenSpin() {
  const eligible = awakenableRoster();
  if (eligible.length === 0) { game.phase = 'action'; refreshUI(); return; }
  const pool = eligible.map(c => ({ ...c, weight: 1 }));
  runRoulette(pool, PHASE_TITLES.awaken, winner => {
    const target = game.roster.find(c => c.name === winner.name && c.awakenPhase < (AWAKENING_CHAINS[c.name] || []).length);
    if (!target) { game.phase = 'action'; refreshUI(); return; }
    const chain = AWAKENING_CHAINS[target.name];
    const phaseData = chain[target.awakenPhase];
    target.power = Math.min(MAX_POWER, Math.round(target.power * phaseData.multiplier));
    target.rarity = phaseData.newRarity;
    target.color = RARITIES[phaseData.newRarity].color;
    target.sub = `${target.universe} · ${target.rarity}`;
    target.awakenPhase++;
    if (target.power > career.highestPower) career.highestPower = target.power;
    logEvent(`✨ ${target.name} awakened: ${phaseData.label}! (Power ${target.power})`);
    game.phase = 'action';
    runProgressionChecks();
    refreshUI();
    showCelebration(`${target.name}: ${phaseData.label}!`, phaseData.flavor, phaseData.icon);
  });
}

function startFusionSpin() {
  if (game.roster.length < 2) { game.phase = 'action'; refreshUI(); return; }
  const pool = game.roster.map(c => ({ ...c, weight: 1 }));
  runRoulette(pool, PHASE_TITLES.fusion, lead => {
    const partners = game.roster.filter(c => c.name !== lead.name);
    const partner = partners.length > 0 ? partners[Math.floor(Math.random() * partners.length)] : lead;
    const bonus = Math.round((lead.power + partner.power) / 2 * 0.3);
    game.tempFusionBonus = bonus;
    logEvent(`🌀 Fusion: ${lead.name} + ${partner.name} (+${bonus} power next match)`);
    showEventPanel('success', `<b>${lead.name}</b> and <b>${partner.name}</b> fuse their power into an incredible surge! <b>+${bonus} power</b> for your next match.`);
    game.phase = 'action';
    runProgressionChecks();
    refreshUI();
  });
}

function resolveMatch(opponent) {
  let bonus = game.tempFusionBonus || 0;
  let forcedWin = false;
  let note = '';
  if (game.items.twinMoon > 0) {
    game.items.twinMoon--;
    forcedWin = true;
    note = ' Your Twin Moon Talisman guarantees the outcome!';
  } else if (game.items.chakraDraft > 0) {
    game.items.chakraDraft--;
    bonus += 20;
    note = ' Your Chakra Draft surges through your team (+20 power)!';
  }
  game.tempFusionBonus = 0;

  const winChance = forcedWin ? 0.99 : computeWinChance(opponent.power, bonus);
  game.lastWinChance = winChance;
  const pool = [
    { name: 'Victory', icon: '🏆', color: '#2ecc71', win: true, weight: winChance * 100, sub: 'Result' },
    { name: 'Defeat', icon: '💀', color: '#e74c3c', win: false, weight: (1 - winChance) * 100, sub: 'Result' }
  ];
  runRoulette(pool, `Match: vs ${opponent.name}!${note}`, outcome => handleMatchResult(opponent, outcome));
}

function handleMatchResult(opponent, outcome) {
  if (opponent.isSecret) {
    handleSecretMatchResult(opponent, outcome);
    return;
  }

  const tier = currentTier();

  if (outcome.win) {
    career.battlesWon += 1;
    bumpDailyStat('dailyMatchWins', 1);
    if (!career.villainsDefeated.includes(opponent.name)) career.villainsDefeated.push(opponent.name);
    logEvent(`⚔️ Defeated ${opponent.name}!`);
    game.roundIndex++;
    if (game.roundIndex >= tier.bracket.length) {
      game.roster.forEach(c => { c.power = Math.min(MAX_POWER, c.power + 5); if (c.power > career.highestPower) career.highestPower = c.power; });
      logEvent(`🏆 Won the ${tier.name} Trophy! Whole roster +5 power.`);
      const leagueKey = LEAGUE_STAT_KEY[tier.name];
      if (leagueKey) career.leaguesCleared[leagueKey] = (career.leaguesCleared[leagueKey] || 0) + 1;
      game.tierIndex++;
      game.roundIndex = 0;

      if (currentTier().name === 'Silver League') setDailyFlag('dailySilverReached');

      if (game.tierIndex >= TIERS.length) {
        game.finaleWon = true;
        logEvent('🏆 THE MULTIVERSE FINAL IS WON! You are the Multiverse Champion!');
        showEventPanel('victory', `You defeated <b>${opponent.name}</b> and became the <b>Multiverse Champion</b>! 🎉`);
        const isNewBest = recordRunEnd(true, opponent.name);
        refreshUI();
        showCelebration('MULTIVERSE CHAMPION!', `You conquered every league and defeated ${opponent.name}. Legends will speak of this run.`, '👑', isNewBest ? '🌟 New Personal Best!' : '');
        return;
      }

      showEventPanel('success', `You won the <b>${tier.name} Trophy</b>! Your whole roster grew stronger, and the <b>${currentTier().name}</b> is now open.`);
      runProgressionChecks();
      refreshUI();
      showCelebration(`${tier.name} Champion!`, `You swept the bracket and earned the ${tier.name} Trophy! Onward to the ${currentTier().name}.`, '🏆');
      return;
    }

    showEventPanel('success', `You defeated <b>${opponent.name}</b>! Next up: <b>${tier.bracket[game.roundIndex].name}</b>.`);
    game.phase = 'action';
    runProgressionChecks();
    refreshUI();
    return;
  }

  // Defeat
  career.battlesLost += 1;
  career.lossesByOpponent[opponent.name] = (career.lossesByOpponent[opponent.name] || 0) + 1;
  logEvent(`❌ Lost to ${opponent.name}`);

  if (game.items.phoenixEmber > 0) {
    game.items.phoenixEmber--;
    career.phoenixSaves += 1;
    logEvent(`🔥 Your Phoenix Ember flares — defeat averted against ${opponent.name}!`);
    showEventPanel('info', `You were about to fall to <b>${opponent.name}</b>, but your <b>Phoenix Ember</b> flared with the will to fight on! (Consumed)`);
    game.phase = 'action';
    runProgressionChecks();
    refreshUI();
    return;
  }

  const chancePct = Math.round((game.lastWinChance || 0) * 100);
  showEventPanel('fail', `You were eliminated by <b>${opponent.name}</b>. You had a <b>${chancePct}%</b> chance to win that fight — the roulette wasn't on your side today.`);
  const isNewBest = recordRunEnd(false, opponent.name);
  game.phase = 'gameover';
  refreshUI();
  showGameOver(opponent, isNewBest ? '🌟 New Personal Best for this run!' : `You had a ${chancePct}% chance to win that fight — so close!`);
}

function handleSecretMatchResult(opponent, outcome) {
  if (outcome.win) {
    career.shards += opponent.shardReward;
    logEvent(`👁️ Defeated ${opponent.name}! +${opponent.shardReward} shards`);
    showEventPanel('success', `You defeated the mysterious <b>${opponent.name}</b>! A reward of <b>${opponent.shardReward} shards</b> materializes.`);
  } else {
    logEvent(`👁️ ${opponent.name} was too much this time — no penalty, this fight was optional.`);
    showEventPanel('info', `<b>${opponent.name}</b> proved too strong this time. No harm done — this was an optional bonus fight.`);
  }
  game.phase = 'action';
  runProgressionChecks();
  refreshUI();
}

function startMatchSpin() {
  const opponent = currentOpponent();
  if (!opponent) { game.phase = 'victory'; refreshUI(); return; }
  showBattleIntro(opponent);
}

function startSecretSpin() {
  showBattleIntro({ ...SECRET_OPPONENT, isSecret: true });
}

function resetGame() {
  const keepName = game.playerName;
  game = createInitialState();
  game.playerName = keepName;
  logList.innerHTML = '';
  eventPanel.className = 'event-panel hidden';
  eventPanel.innerHTML = '';
  renderStrip(Array.from({ length: 20 }, () => weightedPick(ACTIVE_POOL)));
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
    case 'fusion': startFusionSpin(); break;
    case 'secret': startSecretSpin(); break;
    case 'victory': resetGame(); break;
    case 'gameover': break;
  }
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

renderStrip(Array.from({ length: 20 }, () => weightedPick(ACTIVE_POOL)));
mainBtn.addEventListener('click', handleMainButtonClick);

const savedName = loadJSON('mat_playerName', null);
if (savedName) {
  game.playerName = savedName;
  playerNameDisplay.textContent = savedName;
  refreshUI();
} else {
  playerNameDisplay.textContent = '—';
  refreshUI();
  openNameOverlay('');
}

// Persist playtime + career periodically and on unload
setInterval(() => { flushPlaytime(); saveCareer(); }, 15000);
window.addEventListener('beforeunload', () => { flushPlaytime(); saveCareer(); });
