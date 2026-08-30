// =============================================================================
// data.js — static game data. No logic here, just definitions.
// Loaded first; everything below is available as globals to systems.js/main.js.
// =============================================================================

const RARITIES = {
  Useless: { weight: 18, color: '#5a5570', minPower: 975, maxPower: 2275 },
  Common: { weight: 42, color: '#9aa5b1', minPower: 3575, maxPower: 4550 },
  Rare: { weight: 30, color: '#3498db', minPower: 4615, maxPower: 5330 },
  Epic: { weight: 13, color: '#a855f7', minPower: 5395, maxPower: 5980 },
  Legendary: { weight: 4, color: '#ffd24d', minPower: 6045, maxPower: 6500 },
  Mythic: { weight: 2, color: '#00ffcc', minPower: 6825, maxPower: 7475 }
};

const RARITY_ORDER = ['Useless', 'Common', 'Rare', 'Epic', 'Legendary', 'Mythic'];
const RARITY_RANK = RARITY_ORDER.reduce((acc, rarity, i) => { acc[rarity] = i; return acc; }, {});

// ---------------------------------------------------------------------------
// Power tiers — anime-flavored descriptors for your team's average power
// ---------------------------------------------------------------------------

const POWER_TIERS = [
  { max: 1500, label: 'Unranked', icon: '💤', color: '#7a7a8a' },
  { max: 2500, label: 'E-Rank Talent', icon: '🌱', color: '#9aa5b1' },
  { max: 3900, label: 'D-Rank Threat', icon: '⚡', color: '#3498db' },
  { max: 4600, label: 'C-Rank Threat', icon: '🔥', color: '#5dade2' },
  { max: 5250, label: 'B-Rank Threat', icon: '⭐', color: '#a855f7' },
  { max: 5950, label: 'A-Rank Threat', icon: '👑', color: '#ffd24d' },
  { max: 6700, label: 'S-Rank Threat', icon: '🌍', color: '#ff9f43' },
  { max: 9000, label: 'SS-Rank Catastrophe', icon: '🌌', color: '#ff2d6b' },
  { max: Infinity, label: 'SSS-Rank — Unclassifiable', icon: '♾️', color: '#00ffcc' }
];

function getPowerTier(avgPower) {
  return POWER_TIERS.find(t => avgPower <= t.max) || POWER_TIERS[POWER_TIERS.length - 1];
}

function getPowerTierProgress(avgPower) {
  const idx = POWER_TIERS.findIndex(t => avgPower <= t.max);
  if (idx === -1 || idx === POWER_TIERS.length - 1) return 100; // top tier, always full
  const prevMax = idx === 0 ? 0 : POWER_TIERS[idx - 1].max;
  const curMax = POWER_TIERS[idx].max;
  return clamp(((avgPower - prevMax) / (curMax - prevMax)) * 100, 0, 100);
}

// ---------------------------------------------------------------------------
// Core roster (always available)
// ---------------------------------------------------------------------------

const ROSTER_BY_RARITY = {
  Useless: [
    { name: 'Ash Ketchum', universe: 'Pokémon' },
    { name: 'Yamcha', universe: 'Dragon Ball' },
    { name: 'Mr. Satan', universe: 'Dragon Ball' },
    { name: 'Konohamaru Sarutobi', universe: 'Naruto' },
    { name: 'Kon', universe: 'Bleach' },
    { name: 'Usopp', universe: 'One Piece' },
    { name: 'Chichi', universe: 'Dragon Ball' },
    { name: 'Bulma', universe: 'Dragon Ball' }
  ],
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
  { name: 'Grand Priest', universe: 'Dragon Ball Super' },
  { name: 'Shanks', universe: 'One Piece' }
];

// Any Common or Useless-tier character can be your starter — no fixed
// curated list. This means a genuine wildcard: sometimes you begin the
// tournament with a real fighter, sometimes with someone who can barely
// throw a punch, and the early bracket has to be survived regardless.
const STARTER_RARITIES = ['Common', 'Useless'];

// ---------------------------------------------------------------------------
// Awakenings
// ---------------------------------------------------------------------------

const AWAKENING_UNLOCK_TIER = 1; // Silver League (index 1) or later — moved earlier so the power boost lands before the mid-game difficulty spike

const AWAKENING_CHAINS = {
  'Naruto Uzumaki': [
    { label: 'Nine-Tails Chakra Mode', multiplier: 1.83, newRarity: 'Rare', icon: '🦊', flavor: 'Kurama lends his power — the Nine-Tails Chakra Mode erupts!' },
    { label: 'Six Paths Sage Mode', multiplier: 1.44, newRarity: 'Legendary', icon: '☯️', flavor: 'Six Paths Sage Mode awakens — a power beyond mortal limits!' }
  ],
  'Goku': [
    { label: 'Super Saiyan', multiplier: 2.1, newRarity: 'Legendary', icon: '⚡', flavor: 'Golden light erupts — Goku ascends to Super Saiyan!' },
    { label: 'Super Saiyan Blue', multiplier: 1.55, newRarity: 'Legendary', icon: '🔵', flavor: 'A godly blue aura ignites — Super Saiyan Blue!' },
    { label: 'Ultra Instinct', multiplier: 1.39, newRarity: 'Legendary', icon: '⬜', flavor: 'Instinct takes over — Ultra Instinct engaged!' }
  ],
  'Vegeta': [
    { label: 'Super Saiyan', multiplier: 2.1, newRarity: 'Epic', icon: '⚡', flavor: "Vegeta's pride ignites into golden flame — Super Saiyan!" },
    { label: 'Super Saiyan Blue', multiplier: 1.66, newRarity: 'Legendary', icon: '🔵', flavor: 'The Prince of Saiyans ascends further — Super Saiyan Blue!' }
  ],
  'Ichigo Kurosaki': [
    { label: 'Bankai', multiplier: 1.83, newRarity: 'Rare', icon: '⚔️', flavor: '"Bankai!" — Ichigo\'s Zanpakuto reveals its true form!' },
    { label: 'Final Getsuga Tensho', multiplier: 1.44, newRarity: 'Legendary', icon: '🌑', flavor: 'Final Getsuga Tensho — a power that costs everything!' }
  ],
  'Sasuke Uchiha': [
    { label: 'Susanoo', multiplier: 2.1, newRarity: 'Epic', icon: '👹', flavor: 'Ribs of chakra rise around him — Susanoo manifests!' },
    { label: 'Rinnegan Susanoo', multiplier: 1.39, newRarity: 'Legendary', icon: '👁️', flavor: 'The Rinnegan awakens fully — a titan of chakra towers over the arena!' }
  ],
  'Monkey D. Luffy': [
    { label: 'Gear Second', multiplier: 1.55, newRarity: 'Epic', icon: '💨', flavor: 'Steam rises from his skin — Gear Second!' },
    { label: 'Gear Fourth', multiplier: 1.44, newRarity: 'Epic', icon: '🥊', flavor: 'Boundman rises — Gear Fourth!' },
    { label: 'Gear Fifth', multiplier: 1.39, newRarity: 'Legendary', icon: '☀️', flavor: 'The laughter of legend echoes out — Gear Fifth!' }
  ],
  'Izuku Midoriya': [
    { label: 'Full Cowl 100%', multiplier: 1.66, newRarity: 'Rare', icon: '💚', flavor: 'One For All surges to its limit — Full Cowl 100%!' }
  ],
  'Saitama': [
    { label: 'Serious Series', multiplier: 1.03, newRarity: 'Legendary', icon: '👊', flavor: 'Saitama decides to take this one seriously... his power barely changes. He was already holding back 0%.' }
  ],
  'Ash Ketchum': [
    { label: 'Catches Pikachu', multiplier: 2.65, newRarity: 'Common', icon: '⚡', flavor: 'A wild Pikachu appears — and chooses Ash as its trainer! He is no longer fighting alone.' },
    { label: 'Full Team of Six', multiplier: 1.55, newRarity: 'Rare', icon: '🎒', flavor: 'Six Pokémon, one team — Ash commands a full battle roster!' },
    { label: 'League Champion', multiplier: 1.44, newRarity: 'Epic', icon: '🏆', flavor: 'After countless leagues and years of training, Ash finally becomes a Champion!' }
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
      { name: 'Zabuza Momochi', universe: 'Naruto', power: 2340, icon: '🗡️', color: '#6b7f8c', quote: "A blade doesn't hesitate. Neither will I." },
      { name: 'Kabuto Yakushi', universe: 'Naruto', power: 2730, icon: '🐍', color: '#5d8c5a', quote: "I've already analyzed your every move. This ends before it begins." },
      { name: 'Captain Ginyu', universe: 'Dragon Ball', power: 3120, icon: '🟣', color: '#8e5ba8', quote: "Strike a pose — you're about to meet the strongest fighter in the universe!" },
      { name: 'Orochimaru', universe: 'Naruto', power: 3575, icon: '🐍', color: '#5a6b4f', quote: 'Power is the only truth worth chasing. Let me have a taste of yours.' }
    ]
  },
  {
    name: 'Silver League',
    icon: '🥈',
    bracket: [
      { name: 'Grimmjow Jaegerjaquez', universe: 'Bleach', power: 3120, icon: '🐆', color: '#3a7bd5', quote: 'I only fight opponents who can push me to my limit. Try not to disappoint me.' },
      { name: 'Hidan', universe: 'Naruto', power: 3575, icon: '🔺', color: '#8c1c2b', quote: "Pain is a gift! Let's see how much of it you can take." },
      { name: 'Enel', universe: 'One Piece', power: 4030, icon: '⚡', color: '#e0b93c', quote: 'Mortals like you were never meant to challenge a god of thunder.' },
      { name: 'Donquixote Doflamingo', universe: 'One Piece', power: 4550, icon: '🧷', color: '#d162a4', quote: 'Everything and everyone is a string for me to pull, fufufu.' }
    ]
  },
  {
    name: 'Gold League',
    icon: '🥇',
    bracket: [
      { name: 'Ulquiorra Cifer', universe: 'Bleach', power: 4550, icon: '🦇', color: '#4a4a52', quote: "Despair is the only truth. I'll show you yours." },
      { name: 'Cell', universe: 'Dragon Ball', power: 5070, icon: '🟢', color: '#4caf6a', quote: 'I am the perfect being. You are simply another cell for me to absorb.' },
      { name: 'Akaza', universe: 'Demon Slayer', power: 5590, icon: '👊', color: '#c94f6d', quote: 'Only the strong deserve to keep living. Prove that you belong.' },
      { name: 'Frieza (Final Form)', universe: 'Dragon Ball', power: 6110, icon: '❄️', color: '#b073d1', quote: "I do hope you're prepared. I so rarely have to use more than one finger." }
    ]
  },
  {
    name: 'Platinum League',
    icon: '🏆',
    bracket: [
      { name: 'Muzan Kibutsuji', universe: 'Demon Slayer', power: 5720, icon: '🌑', color: '#5b2a86', quote: 'Perfection is my birthright. Everything beneath me is disposable.' },
      { name: 'Kaido', universe: 'One Piece', power: 6240, icon: '🐉', color: '#3d6b8c', quote: 'Call me the strongest creature alive — then try to prove me wrong.' },
      { name: 'Big Mom', universe: 'One Piece', power: 6695, icon: '🍰', color: '#d43f6a', quote: "Give me your soul, and maybe I'll let you leave in one piece." },
      { name: 'Majin Buu', universe: 'Dragon Ball', power: 7150, icon: '💗', color: '#e879b8', quote: "Buu doesn't understand strategy. Buu just doesn't stop." }
    ]
  },
  {
    name: 'Diamond League',
    icon: '💎',
    bracket: [
      { name: 'All For One', universe: 'My Hero Academia', power: 6760, icon: '🌫️', color: '#4a4358', quote: 'Whatever power you have, I can simply take it for myself.' },
      { name: 'Griffith', universe: 'Berserk', power: 7280, icon: '🦅', color: '#e8e4f0', quote: 'Dreams are worth any sacrifice. Even yours.' },
      { name: 'Meruem', universe: 'Hunter x Hunter', power: 7735, icon: '👑', color: '#3a3a42', quote: 'I was born to be the strongest. You are merely a data point.' },
      { name: 'Frieza (Golden Form)', universe: 'Dragon Ball', power: 8190, icon: '✨', color: '#e8c34a', quote: "This form cost me years of training I never wanted to do. You'd better be worth it." }
    ]
  },
  {
    name: 'Multiverse Final',
    icon: '👑',
    bracket: [
      { name: 'Beerus', universe: 'Dragon Ball Super', power: 7670, icon: '🐱', color: '#8e5ba8', quote: "Amuse me, or I'll erase this whole arena from existence." },
      { name: 'Kaguya Otsutsuki', universe: 'Naruto', power: 8190, icon: '🌙', color: '#c2a8e8', quote: 'Dimensions bend to my will. Yours is next.' },
      { name: 'Kars', universe: "JoJo's Bizarre Adventure", power: 8710, icon: '💎', color: '#7ac9d4', quote: 'I am the pinnacle of all life. Perfection does not lose.' },
      { name: 'Fused Zamasu', universe: 'Dragon Ball Super', power: 9230, icon: '♾️', color: '#4ce88a', quote: 'Mortals are a mistake I intend to erase — starting with you.' }
    ]
  }
];

// ---------------------------------------------------------------------------
// Special fusions — specific character pairs that, when both are in your
// roster, guarantee the next event is a Fusion (instead of the normal
// random-pair fusion). Matched by baseName so an awakened form still counts.
// ---------------------------------------------------------------------------

const SPECIAL_FUSIONS = [
  { pair: ['Goku', 'Vegeta'], name: 'Gogeta', icon: '⚡', color: '#ffd24d', bonus: 60, flavor: 'The Potara earrings — or is it the fusion dance? — merge Goku and Vegeta into Gogeta, a being of terrifying power!' },
  { pair: ['Naruto Uzumaki', 'Sasuke Uchiha'], name: 'Naruto & Sasuke: Perfect Combo', icon: '☯️', color: '#a855f7', bonus: 45, flavor: 'Yin and Yang chakra intertwine — rivals turned partners unleash the ultimate combination attack!' },
  { pair: ['Monkey D. Luffy', 'Roronoa Zoro'], name: 'Straw Hat Vanguard', icon: '🏴‍☠️', color: '#3498db', bonus: 40, flavor: 'Captain and first mate charge in together — nothing stands between them and victory!' },
  { pair: ['Ichigo Kurosaki', 'Rukia Kuchiki'], name: 'Shinigami Duo', icon: '❄️', color: '#00e5ff', bonus: 40, flavor: 'Substitute Soul Reaper and Squad 13 officer strike as one, blade and blade!' },
  { pair: ['Gon Freecss', 'Killua Zoldyck'], name: 'Best Friends Combo', icon: '⚡', color: '#f1c40f', bonus: 38, flavor: 'Gon and Killua — a friendship stronger than any Nen ability, syncing perfectly in battle!' },
  { pair: ['Saitama', 'Genos'], name: 'Master & Disciple', icon: '👊', color: '#e67e22', bonus: 45, flavor: 'Teacher and student unleash a coordinated assault — one serious punch, one cyborg barrage!' }
];

function getAvailableSpecialFusion() {
  const owned = new Set(game.roster.map(c => c.baseName || c.name));
  return SPECIAL_FUSIONS.find(f => owned.has(f.pair[0]) && owned.has(f.pair[1])) || null;
}

// If you already own exactly one half of a special-fusion pair, your next
// Scout gets nudged toward finding the missing half — turns the fusion into
// a reachable mini-quest instead of pure double-luck.
function getMissingFusionPartners() {
  const owned = new Set(game.roster.map(c => c.baseName || c.name));
  const missing = [];
  SPECIAL_FUSIONS.forEach(f => {
    const hasFirst = owned.has(f.pair[0]);
    const hasSecond = owned.has(f.pair[1]);
    if (hasFirst && !hasSecond) missing.push(f.pair[1]);
    else if (hasSecond && !hasFirst) missing.push(f.pair[0]);
  });
  return missing;
}

// ---------------------------------------------------------------------------
// Team synergies — evaluated live against your current roster. Only the
// single best-matching synergy applies at a time (no stacking) and grants a
// power bonus baked into your win chance. Built from small factory helpers
// so 100+ combinations stay readable instead of 100 hand-written objects.
// ---------------------------------------------------------------------------

// "Slots" for characters who exist as multiple named versions in the roster —
// any of these names fills the slot (e.g. either Gohan counts as "Gohan").
const GOHAN_ANY = ['Gohan (Kid Gohan)', 'Gohan (Beast Gohan)'];
const ERZA_ANY = ['Erza Scarlet (Heart Kreuz Armor)', 'Erza Scarlet (Nakagami Armor)'];
const GUTS_ANY = ['Guts (Band of the Hawk)', 'Guts (Berserker Armor)'];
const KANEKI_ANY = ['Kaneki Ken (Half-Ghoul)', 'Kaneki Ken (One-Eyed King)'];
const SUNGJINWOO_ANY = ['Sung Jin-Woo (E-Rank Hunter)', 'Sung Jin-Woo (Shadow Monarch)'];
const ALUCARD_ANY = ['Alucard', 'Alucard (No Life King)'];
const MELIODAS_ANY = ["Meliodas (Fairy King's Forest)", 'Meliodas (Demon King)'];

// A "slot" is either an exact name (string) or a list of acceptable
// alternative names (array) — the slot counts as filled if any match is owned.
function slotFilled(names, slot) {
  return Array.isArray(slot) ? slot.some(v => names.has(v)) : names.has(slot);
}

function groupSynergy(id, name, icon, bonus, desc, slots, minCount) {
  return {
    id, name, icon, bonus, desc,
    check: names => slots.filter(slot => slotFilled(names, slot)).length >= (minCount || slots.length)
  };
}

function pairSynergy(id, name, icon, bonus, desc, slots) {
  return groupSynergy(id, name, icon, bonus, desc, slots, slots.length);
}

function bothFormsSynergy(id, name, icon, bonus, desc, variants) {
  return pairSynergy(id, name, icon, bonus, desc, variants);
}

function sizeSynergy(id, name, icon, bonus, desc, exactSize) {
  return { id, name, icon, bonus, desc, check: (names, roster) => roster.length === exactSize };
}

function rarityCompositionSynergy(id, name, icon, bonus, desc, rarity, minSize) {
  return {
    id, name, icon, bonus, desc,
    check: (names, roster) => roster.length >= (minSize || 2) && roster.every(c => c.rarity === rarity)
  };
}

function stateSynergy(id, name, icon, bonus, desc, substring) {
  return { id, name, icon, bonus, desc, check: (names, roster) => roster.some(c => c.name.includes(substring)) };
}

const SYNERGY_DEFS = [
  // --- Iconic teams, duos & trios -------------------------------------------------
  groupSynergy('team-7', 'Team 7', '🍥', 0, 'Naruto, Sasuke, and Kakashi — the legendary genin squad reunites.', ['Naruto Uzumaki', 'Sasuke Uchiha', 'Kakashi Hatake'], 2),
  pairSynergy('sannin', 'Legendary Sannin', '🐌', 130, 'Jiraiya and Tsunade — two of the three legendary Sannin.', ['Jiraiya', 'Tsunade']),
  groupSynergy('leaf-legends', 'Leaf Village Legends', '🍃', 0, 'A gathering of Konoha\'s finest.', ['Naruto Uzumaki', 'Kakashi Hatake', 'Jiraiya', 'Tsunade', 'Might Guy'], 2),
  groupSynergy('uchiha-bloodline', 'Uchiha Bloodline', '👁️', 0, 'Sasuke, Itachi, and Madara — the Sharingan runs deep in this roster.', ['Sasuke Uchiha', 'Itachi Uchiha', 'Madara Uchiha'], 2),
  pairSynergy('ninja-academy', 'Ninja Academy', '📜', 130, 'Naruto looks out for the next generation.', ['Naruto Uzumaki', 'Konohamaru Sarutobi']),
  pairSynergy('akatsuki-ties', 'Akatsuki Ties', '☁️', 130, 'Itachi and Madara, bound by a dangerous organization\'s history.', ['Itachi Uchiha', 'Madara Uchiha']),
  pairSynergy('family-ties-uchiha', 'Brothers in Blood', '🩸', 130, 'Itachi and Sasuke — brothers, rivals, family.', ['Itachi Uchiha', 'Sasuke Uchiha']),
  pairSynergy('mentor-jiraiya', 'The Toad Sage\'s Student', '🐸', 130, 'Jiraiya trained him well.', ['Jiraiya', 'Naruto Uzumaki']),
  pairSynergy('mentor-kakashi', 'Copy Ninja\'s Pupil', '🐺', 130, 'Kakashi never truly stops watching over his students.', ['Kakashi Hatake', 'Sasuke Uchiha']),

  groupSynergy('straw-hats', 'Straw Hat Alliance', '🏴‍☠️', 0, 'Multiple Straw Hat crew members, sailing and fighting as one.', ['Monkey D. Luffy', 'Roronoa Zoro', 'Portgas D. Ace', 'Shanks'], 2),
  groupSynergy('east-blue-trio', 'East Blue Trio', '⛵', 0, 'Luffy, Zoro, and Usopp — where the legend began.', ['Monkey D. Luffy', 'Roronoa Zoro', 'Usopp'], 2),
  pairSynergy('yonko-alliance', 'Yonko\'s Shadow', '👑', 130, 'Whitebeard and Shanks — two of the Four Emperors.', ['Whitebeard', 'Shanks']),
  pairSynergy('legendary-blades', 'Legendary Blades', '⚔️', 130, 'Zoro and Levi — masters of the sword, from different worlds.', ['Roronoa Zoro', 'Levi Ackerman']),

  groupSynergy('z-fighters', 'Z Fighters', '🐉', 0, 'Goku, Vegeta, Gohan, and Piccolo assemble to defend the universe.', ['Goku', 'Vegeta', GOHAN_ANY, 'Piccolo'], 2),
  pairSynergy('saiyan-pride', 'Saiyan Pride', '⚡', 130, 'Goku and Vegeta together — rival Saiyans pushing each other past their limits.', ['Goku', 'Vegeta']),
  groupSynergy('bulma-crew', 'Bulma\'s Support Squad', '🔧', 260, 'Bulma, Chichi, and Yamcha — the ones who keep the Z Fighters grounded.', ['Bulma', 'Chichi', 'Yamcha'], 2),
  groupSynergy('angels-and-gods', 'Angels & Gods', '😇', 0, 'Whis, the Grand Priest, and Zeno — beings above mortal power scales entirely.', ['Whis', 'Grand Priest', 'Zeno'], 2),

  groupSynergy('soul-society', 'Soul Society', '⚔️', 0, 'Ichigo, Rukia, Toshiro, and Yoruichi represent the Soul Reapers.', ['Ichigo Kurosaki', 'Rukia Kuchiki', 'Toshiro Hitsugaya', 'Yoruichi Shihoin'], 2),
  pairSynergy('substitute-and-officer', 'Substitute Shinigami Duo', '❄️', 130, 'Ichigo and Rukia — the pair that started it all.', ['Ichigo Kurosaki', 'Rukia Kuchiki']),

  groupSynergy('class-1a', 'Class 1-A', '🎓', 0, 'Izuku, Bakugo, and Todoroki — UA\'s brightest (and loudest) students.', ['Izuku Midoriya', 'Bakugo Katsuki', 'Todoroki Shoto'], 2),
  pairSynergy('symbol-of-peace-legacy', 'Symbol of Peace\'s Legacy', '💪', 130, 'All Might passed the torch — and still fights beside his successor.', ['All Might', 'Izuku Midoriya']),

  groupSynergy('demon-slayer-corps', 'Demon Slayer Corps', '🗡️', 0, 'Tanjiro, Zenitsu, and Inosuke reunite — the training-arc trio rides again.', ['Tanjiro Kamado', 'Zenitsu Agatsuma', 'Inosuke Hashibira'], 2),
  pairSynergy('hashira-council', 'Hashira Council', '🌸', 130, 'Giyu and Shinobu — Pillars of the Demon Slayer Corps.', ['Giyu Tomioka', 'Shinobu Kocho']),

  groupSynergy('jujutsu-high', 'Jujutsu High', '🔮', 0, 'Yuji, Megumi, and Nobara — first-years with unlimited potential.', ['Yuji Itadori', 'Megumi Fushiguro', 'Nobara Kugisaki'], 2),
  pairSynergy('six-eyes-sensei', 'Six Eyes Sensei', '👓', 130, 'Gojo keeps a close eye on his most promising student.', ['Gojo Satoru', 'Megumi Fushiguro']),

  pairSynergy('hxh-duo', 'Gon & Killua', '🤝', 130, 'Best friends since the Hunter Exam — they always fight better together.', ['Gon Freecss', 'Killua Zoldyck']),
  pairSynergy('freecss-family', 'Freecss Family', '🎣', 130, 'Gon finally fights alongside the father he searched the world for.', ['Gon Freecss', 'Ging Freecss']),

  groupSynergy('fairy-tail-guild', 'Fairy Tail Guild', '🧚', 0, 'Natsu, Gray, and Erza — the guild\'s strongest mages, united.', ['Natsu Dragneel', 'Gray Fullbuster', ERZA_ANY], 2),
  pairSynergy('fire-and-ice', 'Fire and Ice', '🔥', 130, 'Natsu and Gray — eternal rivals, unstoppable together.', ['Natsu Dragneel', 'Gray Fullbuster']),

  groupSynergy('survey-corps', 'Survey Corps', '🦅', 0, 'Eren, Mikasa, Armin, and Levi — humanity\'s strongest soldiers.', ['Eren Yeager', 'Mikasa Ackerman', 'Armin Arlert', 'Levi Ackerman'], 2),
  groupSynergy('childhood-trio', 'Childhood Trio', '🏠', 0, 'Eren, Mikasa, and Armin — friends since before the walls fell.', ['Eren Yeager', 'Mikasa Ackerman', 'Armin Arlert'], 2),

  groupSynergy('devil-hunters', 'Devil Hunters', '🩸', 0, 'Denji, Power, and Aki — Public Safety\'s most chaotic division.', ['Denji', 'Power', 'Aki Hayakawa'], 2),

  pairSynergy('cat-and-mouse', 'Cat and Mouse', '🔍', 130, 'Light and L — the greatest rivalry ever written, now on the same team.', ['Light Yagami', 'L']),
  pairSynergy('genius-strategists-2', 'Battle of Wits', '🧠', 130, 'Two of the sharpest minds across the multiverse, for once cooperating.', ['L', 'Lelouch Lamperouge']),

  pairSynergy('stand-users', 'Stand Users', '⭐', 130, 'Jotaro and Dio — bitter enemies, undeniable power.', ['Jotaro Kujo', 'Dio Brando']),

  pairSynergy('spirits-and-guys', 'Spirits and Guys', '👻', 130, 'Mob and Reigen — psychic power meets pure confidence.', ['Mob (Shigeo Kageyama)', 'Reigen Arataka']),

  pairSynergy('hero-duo', 'Master & Disciple', '👊', 130, 'Saitama and Genos — one serious punch, one cyborg barrage.', ['Saitama', 'Genos']),
  pairSynergy('number-one-heroes', 'Number One Heroes', '🥇', 130, 'Saitama and All Might — two answers to "who is the strongest hero?"', ['Saitama', 'All Might']),

  groupSynergy('sin-brothers', 'Sin Brothers', '7️⃣', 0, 'Escanor, Ban, and Meliodas — three of the Seven Deadly Sins.', ['Escanor', 'Ban', MELIODAS_ANY], 2),

  pairSynergy('magic-knights', 'Magic Knights', '🍀', 130, 'Asta and Yami — the Black Bulls\' most explosive duo.', ['Asta', 'Yami Sukehiro']),
  pairSynergy('elric-and-mustang', 'State Alchemists', '🔥', 130, 'Edward and Roy — equivalent exchange meets the Flame Alchemist.', ['Edward Elric', 'Roy Mustang']),

  // --- "Twin Selves" — owning both versions of a split character at once ---------
  bothFormsSynergy('twin-selves-gohan', 'Two Gohans, One Timeline', '♊', 455, 'Kid Gohan and Beast Gohan, somehow standing side by side.', GOHAN_ANY),
  bothFormsSynergy('twin-selves-erza', 'Two Ezras, Two Armors', '♊', 455, 'Both of Erza\'s iconic armors, worn at once.', ERZA_ANY),
  bothFormsSynergy('twin-selves-guts', 'The Black Swordsman, Twice Over', '♊', 455, 'Both eras of Guts fighting in the same roster.', GUTS_ANY),
  bothFormsSynergy('twin-selves-kaneki', 'One Man, Two Forms', '♊', 455, 'Half-Ghoul and One-Eyed King, together at last.', KANEKI_ANY),
  bothFormsSynergy('twin-selves-sungjinwoo', 'From E-Rank to Monarch', '♊', 455, 'The full journey of the Shadow Monarch, represented at once.', SUNGJINWOO_ANY),
  bothFormsSynergy('twin-selves-alucard', 'No Life King, Twice', '♊', 455, 'Alucard in both of his terrifying forms.', ALUCARD_ANY),
  bothFormsSynergy('twin-selves-meliodas', 'Captain and Demon King', '♊', 455, 'Meliodas before and after his true nature awakens.', MELIODAS_ANY),

  // --- Trope & joke synergies -----------------------------------------------------
  groupSynergy('overpowered-protagonists', 'Strongest There Is', '💥', 0, 'Saitama, Escanor, and All Might — each the undisputed strongest of their world.', ['Saitama', 'Escanor', 'All Might'], 2),
  groupSynergy('isekai-legends', 'Isekai Legends', '🌀', 0, 'Rimuru, Anos, and Ainz — reincarnated (or transported) into unstoppable power.', ['Rimuru Tempest', 'Anos Voldigoad', 'Ainz Ooal Gown'], 2),
  pairSynergy('reincarnated-heroes', 'Reincarnated Heroes', '🔁', 130, 'Rimuru and Anos, both given a second life and a first-class power set.', ['Rimuru Tempest', 'Anos Voldigoad']),
  groupSynergy('shadow-and-demon-kings', 'Shadow & Demon Kings', '😈', 0, 'Sung Jin-Woo, Meliodas, and Anos — rulers of darkness in their own right.', [SUNGJINWOO_ANY, MELIODAS_ANY, 'Anos Voldigoad'], 2),
  groupSynergy('the-kings', 'The Kings', '👑', 0, 'Ainz, Anos, and Meliodas — each a king of their own domain.', ['Ainz Ooal Gown', 'Anos Voldigoad', MELIODAS_ANY], 2),

  groupSynergy('silver-haired-squad', 'Silver-Haired Squad', '🩶', 0, 'Toshiro, Killua, and Kakashi — a coincidence of hair color, or a sign of power?', ['Toshiro Hitsugaya', 'Killua Zoldyck', 'Kakashi Hatake'], 2),
  groupSynergy('golden-hair-alliance', 'Golden Hair Alliance', '💛', 0, 'Naruto, Armin, Edward, and Zenitsu — a blonde battalion.', ['Naruto Uzumaki', 'Armin Arlert', 'Edward Elric', 'Zenitsu Agatsuma'], 2),
  pairSynergy('redhead-rally', 'Redhead Rally', '🔴', 130, 'Erza and Shanks — fire-haired and fiercely powerful.', [ERZA_ANY, 'Shanks']),

  groupSynergy('swordsmen-union', 'Swordsmen Union', '🗡️', 0, 'Zoro, Levi, Guts, and Erza — masters of the blade from every corner of the multiverse.', ['Roronoa Zoro', 'Levi Ackerman', GUTS_ANY, ERZA_ANY], 2),
  groupSynergy('fists-of-fury', 'Fists of Fury', '👊', 0, 'Saitama, All Might, Bakugo, and Might Guy — pure martial power, no weapons needed.', ['Saitama', 'All Might', 'Bakugo Katsuki', 'Might Guy'], 2),
  groupSynergy('genius-strategists', 'Genius Strategists', '🧩', 0, 'L, Lelouch, and Light — masterminds who see ten moves ahead.', ['L', 'Lelouch Lamperouge', 'Light Yagami'], 2),
  groupSynergy('prodigies', 'Prodigies', '✨', 0, 'Itachi, Gojo, Killua, and Todoroki — child geniuses who never stopped growing.', ['Itachi Uchiha', 'Gojo Satoru', 'Killua Zoldyck', 'Todoroki Shoto'], 2),
  groupSynergy('immortals-club', 'Immortals Club', '♾️', 0, 'Ban, Alucard, and Yhwach — death is more of a suggestion to this crowd.', ['Ban', ALUCARD_ANY, 'Yhwach'], 2),
  groupSynergy('big-brother-energy', 'Big Brother Energy', '🫂', 0, 'Whitebeard, All Might, and Kakashi — mentors who protect everyone around them.', ['Whitebeard', 'All Might', 'Kakashi Hatake'], 2),
  groupSynergy('comic-relief-crew', 'Comic Relief Crew', '🤡', 0, 'Yamcha, Mr. Satan, and Usopp — legendary cowards, occasional heroes.', ['Yamcha', 'Mr. Satan', 'Usopp'], 2),
  pairSynergy('reapers-and-ghouls', 'Reapers & Ghouls', '💀', 130, 'Ichigo and Kaneki — death and hunger, crossing paths.', ['Ichigo Kurosaki', KANEKI_ANY]),
  groupSynergy('multiverse-core-four', 'The Core Four', '🔱', 715, 'Naruto, Luffy, Goku, and Ichigo — four of the most iconic protagonists in anime, together.', ['Naruto Uzumaki', 'Monkey D. Luffy', 'Goku', 'Ichigo Kurosaki'], 4),
  groupSynergy('big-three', 'The Big Three', '🔱', 650, 'Naruto, Luffy, and Goku all on one roster — the three shonen legends fight side by side.', ['Naruto Uzumaki', 'Monkey D. Luffy', 'Goku'], 3),

  // --- Awakened-state synergies (name reflects the current transformation) -------
  stateSynergy('six-paths-active', 'Six Paths Awakened', '☯️', 0, 'Naruto has reached Six Paths Sage Mode — a power beyond mortal limits.', 'Six Paths'),
  stateSynergy('ultra-instinct-active', 'Ultra Instinct Engaged', '⬜', 0, 'Goku moves on pure instinct, body ahead of mind.', 'Ultra Instinct'),
  stateSynergy('super-saiyan-active', 'Super Saiyan Ascended', '⚡', 0, 'A golden aura burns — Super Saiyan has been unlocked.', 'Super Saiyan'),
  stateSynergy('bankai-released', 'Bankai Released', '🌑', 0, '"Bankai!" — a Zanpakuto\'s true form has been revealed.', 'Bankai'),
  stateSynergy('getsuga-active', 'Final Getsuga Tensho', '🌌', 0, 'A power that costs everything has been unleashed.', 'Getsuga'),
  stateSynergy('gear-fifth-active', 'Gear Fifth Unlocked', '☀️', 0, 'The laughter of legend — Luffy has reached his ultimate form.', 'Gear Fifth'),
  stateSynergy('susanoo-active', 'Susanoo Manifested', '👹', 0, 'Ribs of chakra tower over the arena.', 'Susanoo'),
  stateSynergy('full-cowl-active', 'Full Cowl 100%', '💚', 0, 'One For All is surging at its absolute limit.', 'Full Cowl'),

  // --- Roster size synergies -------------------------------------------------------
  sizeSynergy('dynamic-duo', 'Dynamic Duo', '👥', 0, 'Two fighters, perfectly in sync.', 2),
  sizeSynergy('terrific-trio', 'Terrific Trio', '👨‍👩‍👧', 0, 'Three fighters covering every angle.', 3),
  sizeSynergy('fantastic-four', 'Fantastic Four', '🃏', 0, 'A well-rounded four-fighter roster.', 4),
  sizeSynergy('famous-five', 'Famous Five', '🖐️', 0, 'Five fighters deep — very few gaps left to exploit.', 5),
  sizeSynergy('final-six', 'Final Six', '💯', 0, 'A completely full roster — every slot earning its place.', 6),

  // --- Rarity composition -----------------------------------------------------------
  rarityCompositionSynergy('all-common', 'Grounded Squad', '⚪', 0, 'Every fighter is Common rarity — humble, but reliable.', 'Common'),
  rarityCompositionSynergy('all-rare', 'Rare Formation', '🔵', 0, 'Every fighter on this roster is Rare or better, uniformly.', 'Rare'),
  rarityCompositionSynergy('all-epic', 'Epic Formation', '🟣', 0, 'A roster built entirely of Epic-tier fighters.', 'Epic'),
  {
    id: 'elite-tier',
    name: 'Multiversal Elite',
    icon: '👑',
    bonus: 715,
    desc: 'Your whole roster is Legendary or Mythic — an assembly of true powerhouses.',
    check: (names, roster) => roster.length >= 2 && roster.every(c => RARITY_RANK[c.rarity] >= RARITY_RANK.Legendary)
  },
  rarityCompositionSynergy('all-mythic', 'Beyond the Multiverse', '🌈', 975, 'Every single fighter is Mythic-tier. This should not be possible.', 'Mythic'),
  {
    id: 'no-weak-links',
    name: 'No Weak Links',
    icon: '🛡️',
    bonus: 0,
    desc: 'Not a single Useless or Common fighter in sight — a serious roster.',
    check: (names, roster) => roster.length >= 2 && roster.every(c => RARITY_RANK[c.rarity] >= RARITY_RANK.Rare)
  },
  {
    id: 'elite-six',
    name: 'The Chosen Few',
    icon: '💎',
    bonus: 585,
    desc: 'A full six-fighter roster with nobody below Rare rarity.',
    check: (names, roster) => roster.length === 6 && roster.every(c => RARITY_RANK[c.rarity] >= RARITY_RANK.Rare)
  },
  {
    id: 'rainbow-roster',
    name: 'Rainbow Roster',
    icon: '🌈',
    bonus: 1105,
    desc: 'One fighter of every single rarity, from Useless to Mythic — the full spectrum, assembled.',
    check: (names, roster) => roster.length === 6 && RARITY_ORDER.every(r => roster.filter(c => c.rarity === r).length === 1)
  },
  {
    id: 'underdog-story',
    name: 'David and Goliath',
    icon: '🪨',
    bonus: 0,
    desc: 'A Useless fighter and a Legendary-or-better fighter, side by side — the ultimate power gap.',
    check: (names, roster) => roster.some(c => c.rarity === 'Useless') && roster.some(c => RARITY_RANK[c.rarity] >= RARITY_RANK.Legendary)
  },

  // --- Power-level thresholds --------------------------------------------------------
  {
    id: 'overwhelming-force',
    name: 'Overwhelming Force',
    icon: '💢',
    bonus: 0,
    desc: 'Your average power exceeds 9750 — this team hits hard.',
    check: (names, roster) => roster.length >= 2 && (roster.reduce((s, c) => s + c.power, 0) / roster.length) > 9750
  },
  {
    id: 'absolute-power',
    name: 'Absolute Power',
    icon: '🌟',
    bonus: 0,
    desc: 'Your average power exceeds 16250 — a roster that defies the power scale.',
    check: (names, roster) => roster.length >= 2 && (roster.reduce((s, c) => s + c.power, 0) / roster.length) > 16250
  },
  {
    id: 'glass-cannon-cinema',
    name: 'Power Overwhelming',
    icon: '💣',
    bonus: 0,
    desc: 'Total combined power exceeds 39000.',
    check: (names, roster) => roster.reduce((s, c) => s + c.power, 0) > 39000
  },
  {
    id: 'balanced-squad',
    name: 'Perfectly Matched',
    icon: '⚖️',
    bonus: 0,
    desc: 'Every fighter is within a tight power range of each other — no weak link to exploit.',
    check: (names, roster) => {
      if (roster.length < 3) return false;
      const powers = roster.map(c => c.power);
      return (Math.max(...powers) - Math.min(...powers)) < 975;
    }
  },

  // --- Mastery & awakening progress ---------------------------------------------------
  {
    id: 'veteran-squad',
    name: 'Battle-Tested',
    icon: '🎖️',
    bonus: 0,
    desc: 'At least two fighters carry a Veteran Bonus from being scouted before — experience shows.',
    check: (names, roster) => roster.filter(c => masteryLevelFor(c.baseName || c.name) > 0).length >= 2
  },
  {
    id: 'awakened-ensemble',
    name: 'Ascended Forms',
    icon: '✨',
    bonus: 0,
    desc: 'At least two fighters have undergone an Awakening.',
    check: (names, roster) => roster.filter(c => c.awakenPhase > 0).length >= 2
  },
  {
    id: 'raw-potential',
    name: 'Raw Potential',
    icon: '🌱',
    bonus: 0,
    desc: 'Not a single fighter has awakened yet — untapped power, still waiting.',
    check: (names, roster) => roster.length >= 3 && roster.every(c => c.awakenPhase === 0)
  },
  {
    id: 'rookie-roster',
    name: 'Rookie Roster',
    icon: '🆕',
    bonus: 0,
    desc: 'A team of fresh faces — nobody here has a Veteran Bonus yet.',
    check: (names, roster) => roster.length >= 3 && roster.every(c => masteryLevelFor(c.baseName || c.name) === 0)
  },

  // --- Universe diversity discrete tiers ------------------------------------------------
  {
    id: 'crossover-special',
    name: 'Crossover Special',
    icon: '🎬',
    bonus: 0,
    desc: 'Fighters from at least 4 different anime, working together.',
    check: (names, roster) => new Set(roster.map(c => c.universe)).size >= 4
  },
  {
    id: 'multiverse-roadshow',
    name: 'Multiverse Roadshow',
    icon: '🚀',
    bonus: 0,
    desc: 'Fighters from at least 5 different anime — a true crossover event.',
    check: (names, roster) => new Set(roster.map(c => c.universe)).size >= 5
  },
  {
    id: 'infinite-diversity',
    name: 'Infinite Diversity',
    icon: '🌌',
    bonus: 650,
    desc: 'Six fighters, six completely different anime — total crossover chemistry.',
    check: (names, roster) => roster.length === 6 && new Set(roster.map(c => c.universe)).size === 6
  },
  {
    id: 'grand-finale-assembly',
    name: 'Grand Finale Assembly',
    icon: '🏆',
    bonus: 845,
    desc: 'A full six-fighter roster spanning at least four different anime — your ultimate team.',
    check: (names, roster) => roster.length === 6 && new Set(roster.map(c => c.universe)).size >= 4
  },
  {
    id: 'same-anime',
    name: 'One Universe, United',
    icon: '📖',
    bonus: 0,
    desc: 'Every fighter on your roster hails from the same anime.',
    check: (names, roster) => roster.length >= 2 && new Set(roster.map(c => c.universe)).size === 1
  },

  {
    id: 'useless-squad',
    name: 'Useless Squad',
    icon: '🤡',
    bonus: 0,
    desc: 'Every fighter on this team is, on paper, completely useless. There is a strange power in having absolutely nothing to lose.',
    check: (names, roster) => roster.length >= 2 && roster.every(c => c.rarity === 'Useless')
  },

  {
    id: 'ego-overload',
    name: 'Too Many Main Characters',
    icon: '🗣️',
    bonus: -455,
    desc: '3 or more "chosen one" protagonists on one team — everybody wants to be the hero, nobody wants to follow orders.',
    check: (names, roster) => {
      const opProtagonists = ['Saitama', 'Goku', 'Monkey D. Luffy', 'Naruto Uzumaki', 'Escanor', 'All Might', 'Anos Voldigoad', 'Rimuru Tempest', 'Ainz Ooal Gown', 'Ichigo Kurosaki'];
      return opProtagonists.filter(n => names.has(n)).length >= 3;
    }
  },
  {
    id: 'directionless',
    name: 'No Clear Leader',
    icon: '🤷',
    bonus: -195,
    desc: 'A near-full roster and still not one fighter above Common rarity — reliable enthusiasm, but nobody who can actually close out a fight.',
    check: (names, roster) => roster.length >= 5 && roster.every(c => RARITY_RANK[c.rarity] <= RARITY_RANK.Common)
  },
  {
    id: 'overextended',
    name: 'Overextended',
    icon: '📉',
    bonus: -325,
    desc: 'A massive gap between your strongest and weakest fighter — the team can only ever move as fast as its weakest link.',
    check: (names, roster) => {
      if (roster.length < 5) return false;
      const powers = roster.map(c => c.power);
      return (Math.max(...powers) - Math.min(...powers)) > 50000;
    }
  },
  {
    id: 'total-strangers',
    name: 'Total Strangers',
    icon: '🫥',
    bonus: -260,
    desc: "A full six-fighter roster and every single one is from a completely different anime — they've never so much as heard of each other. Zero chemistry.",
    check: (names, roster) => roster.length === 6 && new Set(roster.map(c => c.universe)).size === 6
  },

  {
    id: 'multiverse-ensemble',
    name: 'Multiverse Ensemble',
    icon: '🌌',
    bonus: 0,
    desc: 'A team drawn from many different anime — no bonus, just an interesting crowd.',
    check: (names, roster) => roster.length >= 3
  }
];

// Priority: a genuinely rare positive synergy first (real reward), then the
// worst matching negative synergy (a warning worth noticing), then a plain
// flavor name with no mechanical effect, then nothing at all — most teams,
// most of the time, should show no synergy. That's what makes one special.
function computeActiveSynergy() {
  const roster = game.roster;
  if (roster.length < 2) return null;
  const names = new Set(roster.map(c => c.baseName || c.name));

  let bestPositive = null;
  let worstNegative = null;
  let firstFlavor = null;

  for (const def of SYNERGY_DEFS) {
    if (!def.check(names, roster)) continue;
    if (def.bonus > 0) {
      if (!bestPositive || def.bonus > bestPositive.bonus) bestPositive = def;
    } else if (def.bonus < 0) {
      if (!worstNegative || def.bonus < worstNegative.bonus) worstNegative = def;
    } else if (!firstFlavor) {
      firstFlavor = def;
    }
  }

  return bestPositive || worstNegative || firstFlavor || null;
}

// ---------------------------------------------------------------------------
// The rarest possible pull in the game — not part of any normal rarity pool.
// A tiny independent roll on every Scout spin (see startScoutSpin) can
// override the result entirely with this absurd multiverse anomaly.
// ---------------------------------------------------------------------------
// Share-to-unlock — sharing the game (once) permanently adds a fan-favorite
// exclusive fighter to the scout pool. Honor-system unlock: there's no way
// to verify an actual friend saw the link from a static site, so it unlocks
// the moment the share sheet (or clipboard fallback) is used.
// ---------------------------------------------------------------------------

const SHARE_UNLOCK_CHARACTER = { name: 'Rengoku Kyojuro', universe: 'Demon Slayer', rarity: 'Epic' };

// ---------------------------------------------------------------------------

const SECRET_PULL_CHANCE = 0.003; // 0.3% per Scout spin
const SECRET_PULL_CHARACTER = {
  name: 'Ultra Instinct Shaggy',
  baseName: 'Ultra Instinct Shaggy',
  universe: 'Multiverse Anomaly',
  rarity: 'Mythic',
  color: '#00ffcc',
  power: 9100,
  weight: 1,
  sub: 'Multiverse Anomaly · Mythic',
  isStarter: false,
  awakenPhase: 0
};

// Secret bonus opponent — only fightable after the "Two Absurd Powers" secret
// achievement unlocks it. Not part of the normal bracket progression.
const SECRET_OPPONENT = {
  name: 'The Watcher', universe: '???', power: 8450, icon: '👁️', color: '#ffffff',
  quote: 'I have observed every roulette spin across every universe. Show me something new.',
  shardReward: 75
};

const TOTAL_MATCHES = TIERS.length * 4; // 24 — the full-clear score

const ACTION_META = {
  scout: { name: 'Scout', icon: '🥷', color: '#2ecc71' },
  train: { name: 'Train', icon: '🥋', color: '#f1c40f' },
  trade: { name: 'Dimensional Swap', icon: '🌌', color: '#3498db' },
  match: { name: 'Match', icon: '⚔️', color: '#e67e22' },
  item: { name: 'Treasure', icon: '🎁', color: '#ff9f43' },
  awaken: { name: 'Awakening', icon: '💥', color: '#ff6b81' },
  fusion: { name: 'Fusion', icon: '🌀', color: '#00e5ff' }
};

const PHASE_LABELS = {
  starter: 'Draft your first fighter!',
  action: 'Spin for the next event!',
  scout: 'Scout a fighter!',
  train: 'Start training!',
  trade: 'Start a Dimensional Swap!',
  'trade-select': 'Spin to see who leaves!',
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
  trade: 'Spin to pull a fighter through the rift!',
  'trade-select': 'Spin to see who leaves your roster!',
  item: 'Spin to find a support item!',
  awaken: 'Which fighter awakens?!',
  fusion: 'Which two fighters fuse?!',
  victory: 'You are the Multiverse Champion! 🏆'
};

const MAX_ROSTER = 6;
const MAX_POWER = 65000;

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
  { id: 'power-100', category: 'Power', name: 'Triple Digits', desc: 'Reach 8500 power on a single fighter.', reward: 15, check: c => c.highestPower >= 8500 },
  { id: 'power-over-9000', category: 'Power', name: "It's Over 9000!", desc: 'Reach 9001 power on a single fighter.', reward: 25, check: c => c.highestPower >= 9001 },
  { id: 'power-250', category: 'Power', name: 'Breaking the Scale', desc: 'Reach 20000 power on a single fighter.', reward: 40, check: c => c.highestPower >= 20000 },
  { id: 'power-500', category: 'Power', name: 'Power Level: Unmeasurable', desc: 'Reach 45000 power on a single fighter.', reward: 80, check: c => c.highestPower >= 45000 },

  // Combat / progress
  { id: 'first-win', category: 'Combat', name: 'First Blood', desc: 'Win your first match.', reward: 10, check: c => c.battlesWon >= 1 },
  { id: 'battles-50', category: 'Combat', name: 'Veteran Fighter', desc: 'Win 50 matches (career total).', reward: 50, check: c => c.battlesWon >= 50 },
  { id: 'bronze-champion', category: 'Combat', name: 'Bronze Champion', desc: 'Clear the Bronze League.', reward: 20, check: c => c.leaguesCleared.Bronze >= 1 },
  { id: 'multiverse-champion', category: 'Combat', name: 'Multiverse Champion', desc: 'Become Multiverse Champion.', reward: 300, check: c => c.championWins >= 1 },
  { id: 'phoenix-save', category: 'Combat', name: 'Cheating Death', desc: 'Get saved by a Phoenix Ember.', reward: 15, check: c => c.phoenixSaves >= 1 },
  { id: 'streak-3', category: 'Combat', name: 'Unstoppable', desc: 'Win 3 tournaments in a row.', reward: 100, check: c => c.bestChampionStreak >= 3 },

  // Secret
  { id: 'secret-saitama-escanor', category: 'Secret', name: '???', secretName: 'Two Absurd Powers', secretDesc: 'Have both Saitama and Escanor in your roster at once.', desc: '???', reward: 50, secret: true, check: c => c.hadSaitamaEscanor },
  { id: 'secret-ultra-instinct-shaggy', category: 'Secret', name: '???', secretName: 'Zero Percent Battle Power', secretDesc: 'Scout the impossible: Ultra Instinct Shaggy, a multiverse anomaly with a 0.3% chance per Scout.', desc: '???', reward: 150, secret: true, check: c => c.hadUltraInstinctShaggy },
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
    rarityCounts: { Useless: 0, Common: 0, Rare: 0, Epic: 0, Legendary: 0, Mythic: 0 },
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
    hadUltraInstinctShaggy: false,
    unlockedShareReward: false,
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
const MASTERY_MAX_BONUS_POWER = 325;

function masteryLevelFor(name) {
  const xp = (career.masteryXP && career.masteryXP[name]) || 0;
  return Math.min(MASTERY_MAX_BONUS_POWER, Math.floor(xp / MASTERY_XP_PER_LEVEL) * 65);
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

// As you clear more leagues, your Scout odds shift toward stronger fighters —
// early game stays a real gamble, but persistence pays off later.
function getProgressionAdjustedPool(basePool) {
  const tier = game.tierIndex || 0;
  if (tier <= 0) return basePool;
  const boostFactor = 1 + tier * 0.35;
  const uselessPenalty = Math.max(0.2, 1 - tier * 0.18);
  return basePool.map(c => {
    if (RARITY_RANK[c.rarity] >= RARITY_RANK.Rare) {
      return { ...c, weight: c.weight * boostFactor };
    }
    if (c.rarity === 'Useless') {
      return { ...c, weight: c.weight * uselessPenalty };
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
        baseName: entry.name,
        universe: entry.universe,
        rarity,
        color: cfg.color,
        power,
        weight: cfg.weight / list.length,
        sub: `${entry.universe} · ${rarity}`,
        isStarter: STARTER_RARITIES.includes(rarity),
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
  if (career.unlockedShareReward) {
    merged[SHARE_UNLOCK_CHARACTER.rarity] = merged[SHARE_UNLOCK_CHARACTER.rarity].concat([SHARE_UNLOCK_CHARACTER]);
  }
  return merged;
}

let ACTIVE_POOL = buildCharacterPool(buildActiveRosterByRarity());
// Weighted (not uniform) so genuine fighters are still somewhat more likely
// than the useless ones — but a rough start is always possible.
const STARTER_POOL = buildCharacterPool(ROSTER_BY_RARITY).filter(c => c.isStarter);

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
    actionsSinceMatch: 0,
    riftActive: false,
    godMode: false,
    pendingTradeIncoming: null,
    justWonTrophy: false,
    forceNextMatchLoss: false
  };
}

let game = createInitialState();
let isSpinning = false;

// ---------------------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------------------

const track = document.getElementById('strip-track');
const revealFlash = document.getElementById('reveal-flash');
const pageEl = document.querySelector('.page');
const viewport = document.querySelector('.roulette-viewport');
const mainBtn = document.getElementById('main-btn');
const rouletteTitle = document.getElementById('roulette-title');
const eventPanel = document.getElementById('event-panel');
const logList = document.getElementById('log-list');
const rosterList = document.getElementById('roster-list');
const rosterPowerSummary = document.getElementById('roster-power-summary');
const mobileRosterBarList = document.getElementById('mobile-roster-bar-list');
const mobileRosterBarPower = document.getElementById('mobile-roster-bar-power');

function renderMobileRosterBar(totalPower) {
  if (!mobileRosterBarList) return;
  mobileRosterBarList.innerHTML = '';
  game.roster.forEach(c => {
    const mini = document.createElement('div');
    mini.className = 'mobile-roster-bar-avatar';
    mini.style.setProperty('--rarity-color', c.color);
    attachAvatarImage(mini, c.name, 'character', initials(c.name));
    mobileRosterBarList.appendChild(mini);
  });
  mobileRosterBarPower.textContent = game.roster.length > 0 ? `⚡ ${totalPower}` : '—';
}

const powerTierLabel = document.getElementById('power-tier-label');
const powerTierBarFill = document.getElementById('power-tier-bar-fill');
const synergyBanner = document.getElementById('synergy-banner');
const itemsList = document.getElementById('items-list');
const dailyQuestList = document.getElementById('daily-quest-list');
const trophyCase = document.getElementById('trophy-case');
const bracketTitle = document.getElementById('bracket-title');
const leagueProgress = document.getElementById('league-progress');
const playerStatAvatar = document.getElementById('player-stat-avatar');
const playerStatName = document.getElementById('player-stat-name');
const playerStatLeague = document.getElementById('player-stat-league');
const playerStatWins = document.getElementById('player-stat-wins');
const playerStatLosses = document.getElementById('player-stat-losses');
const playerStatWinrate = document.getElementById('player-stat-winrate');
const leagueBannerCount = document.getElementById('league-banner-count');
const leagueBannerSub = document.getElementById('league-banner-sub');
const dailyResetCountdown = document.getElementById('daily-reset-countdown');
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
const celebrationShareBtn = document.getElementById('celebration-share-btn');
const confettiLayer = document.getElementById('confetti-layer');

const gameoverOverlay = document.getElementById('gameover-overlay');
const gameoverSubtitle = document.getElementById('gameover-subtitle');
const gameoverExtra = document.getElementById('gameover-extra');
const gameoverClose = document.getElementById('gameover-close');
const gameoverShareBtn = document.getElementById('gameover-share-btn');

const nameOverlay = document.getElementById('name-overlay');
const nameInput = document.getElementById('name-input');
const nameError = document.getElementById('name-error');
const nameSubmit = document.getElementById('name-submit');

const battleOverlay = document.getElementById('battle-intro-overlay');
const battleYourPower = document.getElementById('battle-your-power');
const battleModal = document.getElementById('battle-modal');
const battleTeamStrip = document.getElementById('battle-team-strip');
const battleEnemyAvatar = document.getElementById('battle-enemy-avatar');
const battleEnemyName = document.getElementById('battle-enemy-name');
const battleEnemyPower = document.getElementById('battle-enemy-power');
const battleEnemyQuote = document.getElementById('battle-enemy-quote');
const battleWinChance = document.getElementById('battle-win-chance');
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
const openHowtoBtn = document.getElementById('open-howto-btn');
const howtoOverlay = document.getElementById('howto-overlay');
const howtoCloseX = document.getElementById('howto-close-x');
const howtoGotIt = document.getElementById('howto-got-it');
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
const SPECIAL_IMAGE_DIR = 'images/special/';
const UI_IMAGE_DIR = 'images/ui/';
const ICON_IMAGE_DIR = 'images/icons/';

// Optional custom icons for the roulette's action events — drop PNGs into
// images/icons/ named exactly: scout.png, train.png, trade.png, match.png,
// item.png. Missing ones just keep their emoji icon — nothing breaks.
const ACTION_ICON_KEYS = ['scout', 'train', 'trade', 'match', 'item', 'awaken'];

// Optional custom battle-intro background — drop a "vs-background.png" into
// images/ui/ (any wide image works, it gets cropped to fill nicely) and it
// automatically replaces the plain VS layout with roster portraits on the
// blue side and the villain on the red side, framed against your image.
const VS_BACKGROUND_PATH = `${UI_IMAGE_DIR}vs-background.png`;
(function preloadVsBackground() {
  const img = new Image();
  img.onload = () => {
    document.documentElement.style.setProperty('--vs-background-url', `url('${VS_BACKGROUND_PATH}')`);
    document.getElementById('battle-modal').classList.add('has-vs-bg');
  };
  img.src = VS_BACKGROUND_PATH;
})();

function slugifyName(name) {
  return name
    .toLowerCase()
    .replace(/[().'"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '');
}

function imagePathFor(name, kind) {
  if (name === SHARE_UNLOCK_CHARACTER.name) return `${SPECIAL_IMAGE_DIR}${slugifyName(name)}.png`;
  const dir = kind === 'villain' ? VILLAIN_IMAGE_DIR : CHARACTER_IMAGE_DIR;
  return `${dir}${slugifyName(name)}.png`;
}

// Renders into `container`: a fallback text/icon (shown by default) plus an
// <img> that, if it loads successfully, covers the fallback. If the image
// 404s, it silently removes itself and the fallback stays visible.
// Some source images are full-bleed scenes (work great with a cropping
// object-fit: cover), others are character cutouts on a transparent
// background (cover would zoom awkwardly into empty space). This checks the
// actual pixel alpha data after load and picks whichever fit looks right.
function detectMostlyTransparent(img, callback) {
  try {
    const w = Math.min(img.naturalWidth || 64, 64);
    const h = Math.min(img.naturalHeight || 64, 64);
    if (!w || !h) { callback(false); return; }
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    const data = ctx.getImageData(0, 0, w, h).data;
    let transparentCount = 0;
    const totalPixels = data.length / 4;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 200) transparentCount++;
    }
    callback((transparentCount / totalPixels) > 0.18);
  } catch (e) {
    callback(false); // canvas security error or similar — keep the default
  }
}

function attachAvatarImage(container, name, kind, fallbackText) {
  const fallback = document.createElement('span');
  fallback.className = 'avatar-fallback-text';
  fallback.textContent = fallbackText;
  container.appendChild(fallback);

  const img = document.createElement('img');
  img.className = 'char-img';
  img.alt = name;
  img.loading = 'lazy';
  img.onload = () => {
    container.classList.add('has-image');
    detectMostlyTransparent(img, isTransparent => {
      if (isTransparent) container.classList.add('has-transparency');
    });
    // Taller, more "portrait-shaped" source images lose proportionally more
    // of their height when cropped to a square — bias the crop further
    // toward the top for those, so the face doesn't get pushed out of frame.
    // A perfectly square source still gets a gentle top bias (15%); a very
    // tall portrait (e.g. 450×700) biases much harder (~50%+).
    const ratio = img.naturalHeight / img.naturalWidth;
    const bias = Math.max(15, Math.min(60, 15 + (ratio - 1) * 65));
    img.style.objectPosition = `center ${bias.toFixed(0)}%`;
  };
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
    const chain = AWAKENING_CHAINS[c.baseName || c.name];
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
  if (game.godMode) return 0.99;
  const rosterSize = game.roster.length;
  if (rosterSize === 0) return 0.05;
  const avgPower = game.roster.reduce((s, c) => s + c.power, 0) / rosterSize;
  const teamSizeBonus = (rosterSize - 1) * 260;
  const activeSynergy = computeActiveSynergy();
  const teamSynergyBonus = activeSynergy ? activeSynergy.bonus : 0;
  const effectivePower = avgPower + teamSizeBonus + teamSynergyBonus + (bonus || 0);
  const diff = effectivePower - opponentPower;
  // Wider steepness: a moderate power lead still matters a lot, but it now
  // takes a genuinely large advantage to approach the win-chance ceiling —
  // previously ~40 power over the opponent was already almost-guaranteed.
  const steepness = 2210;
  const raw = 1 / (1 + Math.exp(-diff / steepness));
  return clamp(raw, 0.05, 0.92);
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
  if (entry.rarity && (RARITY_RANK[entry.rarity] >= RARITY_RANK.Legendary)) {
    el.classList.add('rarity-glow-strong');
  } else if (entry.rarity && RARITY_RANK[entry.rarity] >= RARITY_RANK.Epic) {
    el.classList.add('rarity-glow-soft');
  }
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  if (entry.universe) {
    attachAvatarImage(avatar, entry.name, 'character', initials(entry.name));
  } else if (entry.value && ACTION_ICON_KEYS.includes(entry.value)) {
    avatar.classList.add('action-icon-avatar');
    const fallback = document.createElement('span');
    fallback.className = 'avatar-fallback-text';
    fallback.textContent = entry.icon || initials(entry.name);
    avatar.appendChild(fallback);
    const img = document.createElement('img');
    img.className = 'char-img action-icon-img';
    img.alt = entry.name;
    img.loading = 'lazy';
    img.onload = () => avatar.classList.add('has-image');
    img.onerror = () => img.remove();
    img.src = `${ICON_IMAGE_DIR}${entry.value}.png`;
    avatar.appendChild(img);
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

// Shrinks an element's font-size (instead of letting it wrap) until the text
// fits on one line — keeps card layouts perfectly consistent no matter how
// long a character's name is, instead of some cards being taller than others.
function fitTextToOneLine(el, maxSizeRem, minSizeRem) {
  if (!el) return;
  let size = maxSizeRem;
  el.style.fontSize = size + 'rem';
  let guard = 0;
  while (el.scrollWidth > el.clientWidth + 1 && size > minSizeRem && guard < 40) {
    size -= 0.03;
    el.style.fontSize = size + 'rem';
    guard++;
  }
}

function renderStrip(items) {
  track.innerHTML = '';
  const fragment = document.createDocumentFragment();
  items.forEach(entry => fragment.appendChild(createItemEl(entry)));
  track.appendChild(fragment);
  track.querySelectorAll('.strip-item .name').forEach(el => fitTextToOneLine(el, 0.8, 0.5));
}

function targetTranslateX() {
  const containerWidth = viewport.clientWidth;
  const winnerCenter = WINNER_INDEX * ITEM_FULL_WIDTH + ITEM_WIDTH / 2;
  const jitter = (Math.random() - 0.5) * 80;
  return containerWidth / 2 - winnerCenter + jitter;
}

// ---------------------------------------------------------------------------
// Pull sound effects — synthesized with Web Audio, no external files needed.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Custom sound files (optional). Drop mp3s into a "sounds/" folder next to
// index.html, named exactly as listed below. If a file is missing, the game
// automatically falls back to the built-in synthesized tone — nothing breaks.
//   sounds/spin-tick.mp3        — plays repeatedly while the wheel spins
//   sounds/reveal-useless.mp3   — plays on a Useless-rarity reveal
//   sounds/reveal-common.mp3
//   sounds/reveal-rare.mp3
//   sounds/reveal-epic.mp3
//   sounds/reveal-legendary.mp3
//   sounds/reveal-mythic.mp3
// ---------------------------------------------------------------------------

const CUSTOM_SOUND_DIR = 'sounds/';
const CUSTOM_SOUND_KEYS = ['spin-tick', 'reveal-useless', 'reveal-common', 'reveal-rare', 'reveal-epic', 'reveal-legendary', 'reveal-mythic'];
const customSoundAvailable = {};
const customSoundElements = {};

function preloadCustomSounds() {
  CUSTOM_SOUND_KEYS.forEach(key => {
    const audio = new Audio(`${CUSTOM_SOUND_DIR}${key}.mp3`);
    audio.preload = 'auto';
    audio.addEventListener('canplaythrough', () => { customSoundAvailable[key] = true; }, { once: true });
    audio.addEventListener('error', () => { customSoundAvailable[key] = false; }, { once: true });
    customSoundElements[key] = audio;
    audio.load();
  });
}
preloadCustomSounds();

function playCustomSound(key, volume) {
  const base = customSoundElements[key];
  if (!base) return false;
  const instance = base.cloneNode(); // clone so overlapping plays don't cut each other off
  instance.volume = volume != null ? volume : 0.7;
  instance.play().catch(() => {});
  return true;
}

let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; }
  }
  return audioCtx;
}

// Browsers only allow an AudioContext to start/resume when that call happens
// synchronously inside a real user-gesture handler (a tap/click). Mobile
// Safari is stricter still: it needs an actual sound-producing node started
// synchronously in the gesture to fully "prime" the audio session, and the
// context can re-suspend after the screen locks or the tab backgrounds — so
// this runs on every tap/click, not just once.
function unlockAudio() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  try {
    const buffer = ctx.createBuffer(1, 1, 22050);
    const primer = ctx.createBufferSource();
    primer.buffer = buffer;
    primer.connect(ctx.destination);
    primer.start(0);
  } catch (e) { /* ignore — best-effort priming */ }
}
['touchstart', 'touchend', 'click'].forEach(evt => {
  document.addEventListener(evt, unlockAudio, { passive: true });
});

function playTone(freq, startTime, duration, type, gainPeak) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type || 'sine';
  osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
  gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
  gain.gain.linearRampToValueAtTime(gainPeak || 0.22, ctx.currentTime + startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + startTime);
  osc.stop(ctx.currentTime + startTime + duration + 0.05);
}

function playRaritySound(rarity) {
  const key = `reveal-${rarity.toLowerCase()}`;
  if (customSoundAvailable[key] && playCustomSound(key, 0.8)) return;

  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();
  if (rarity === 'Useless') {
    playTone(200, 0, 0.18, 'triangle', 0.12);
  } else if (rarity === 'Common') {
    playTone(330, 0, 0.15, 'triangle', 0.15);
  } else if (rarity === 'Rare') {
    playTone(440, 0, 0.12, 'sine', 0.18);
    playTone(660, 0.08, 0.2, 'sine', 0.19);
  } else if (rarity === 'Epic') {
    playTone(440, 0, 0.1, 'sine', 0.19);
    playTone(554, 0.08, 0.1, 'sine', 0.19);
    playTone(660, 0.16, 0.28, 'sine', 0.22);
  } else if (rarity === 'Legendary') {
    playTone(392, 0, 0.12, 'sawtooth', 0.15);
    playTone(494, 0.1, 0.12, 'sawtooth', 0.16);
    playTone(587, 0.2, 0.12, 'sawtooth', 0.17);
    playTone(784, 0.3, 0.5, 'sine', 0.24);
  } else if (rarity === 'Mythic') {
    playTone(392, 0, 0.1, 'sawtooth', 0.15);
    playTone(494, 0.08, 0.1, 'sawtooth', 0.16);
    playTone(587, 0.16, 0.1, 'sawtooth', 0.17);
    playTone(784, 0.24, 0.1, 'sawtooth', 0.18);
    playTone(988, 0.32, 0.65, 'sine', 0.26);
    playTone(1174, 0.4, 0.65, 'sine', 0.2);
  }
}

// A satisfying decelerating "tick" run for the whole spin duration, timed to
// roughly follow the strip's own ease-out — fast ticks at first, slowing
// toward the landing, like a real prize wheel or slot machine.
function playSpinTicks(durationMs) {
  // A custom spin-tick.mp3 is treated as one single sound for the whole
  // spin (e.g. a "whoosh" or a full ticking-run recording) — play it once,
  // not repeated. Only the built-in synthesized fallback uses a real
  // repeating click-click-click pattern, since those are tiny discrete blips.
  if (customSoundAvailable['spin-tick']) {
    playCustomSound('spin-tick', 0.6);
    return;
  }

  const totalSeconds = durationMs / 1000;
  const tickCount = Math.round(18 + totalSeconds * 4);
  const ctx = getAudioCtx();
  if (!ctx) return;
  for (let i = 1; i <= tickCount; i++) {
    const x = i / tickCount;
    const progress = Math.pow(x, 3); // ease-IN, matching the custom-sound branch above
    const t = progress * totalSeconds;
    const freq = 150 + Math.random() * 30;
    playTone(freq, t, 0.035, 'square', 0.06);
  }
}

// ---------------------------------------------------------------------------
// Reveal effects — screen flash, shake, and particle burst, scaled by rarity.
// ---------------------------------------------------------------------------

const REVEAL_SETTLE_MS = { Useless: 150, Common: 200, Rare: 350, Epic: 550, Legendary: 800, Mythic: 1100 };
const REVEAL_DURATION_BONUS_MS = { Useless: 0, Common: 0, Rare: 250, Epic: 700, Legendary: 1500, Mythic: 2400 };

function spawnRevealParticles(color, count) {
  const layer = document.createElement('div');
  layer.className = 'reveal-particle-layer';
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'reveal-particle';
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
    const dist = 60 + Math.random() * 60;
    p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
    p.style.background = color;
    layer.appendChild(p);
  }
  viewport.appendChild(layer);
  setTimeout(() => layer.remove(), 900);
}

function triggerRevealEffects(rarity, color) {
  playRaritySound(rarity);

  if (RARITY_RANK[rarity] >= RARITY_RANK.Epic) {
    revealFlash.style.background = color;
    revealFlash.classList.remove('flashing');
    void revealFlash.offsetWidth;
    revealFlash.classList.add('flashing');
    spawnRevealParticles(color, RARITY_RANK[rarity] >= RARITY_RANK.Legendary ? 24 : 14);
  }

  if (RARITY_RANK[rarity] >= RARITY_RANK.Legendary) {
    pageEl.classList.remove('screen-shake');
    void pageEl.offsetWidth;
    pageEl.classList.add('screen-shake');
  }
}

// ---------------------------------------------------------------------------
// Main roulette engine. Pass { characterReveal: true } for genuine character
// pulls (Scout/Trade/Starter/Shop) to get suspense-scaled spin duration,
// near-miss fake-out fillers, a silhouette hold, and a rarity-scaled reveal
// (sound + screen flash/shake + particles) before the result is confirmed.
// ---------------------------------------------------------------------------

function runRoulette(pool, titleText, onComplete, options) {
  if (isSpinning) return;
  isSpinning = true;
  mainBtn.disabled = true;
  rouletteTitle.textContent = titleText;

  career.totalSpins += 1;

  const characterReveal = !!(options && options.characterReveal);
  // A forced outcome (e.g. a guaranteed special fusion, or the ultra-rare
  // secret pull) still needs to LOOK like a real gamble — so the winner is
  // fixed, but the filler cards are drawn from a separate, varied decoy pool
  // rather than repeating the same guaranteed result across the whole strip.
  const forcedWinner = options && options.forcedWinner;
  const decoyPool = (options && options.decoyPool) || pool;
  const winner = forcedWinner || weightedPick(pool);

  const items = [];
  for (let i = 0; i < TOTAL_ITEMS; i++) {
    if (i === WINNER_INDEX) {
      items.push(winner);
      continue;
    }
    // Fake-out: bias a few slots just before the pointer toward high-rarity
    // cards, so the strip teases a big pull even when the real winner is not one.
    if (characterReveal && i >= WINNER_INDEX - 5 && i < WINNER_INDEX && Math.random() < 0.3) {
      const flashy = decoyPool.filter(c => c.rarity && RARITY_RANK[c.rarity] >= RARITY_RANK.Epic);
      items.push(flashy.length > 0 ? flashy[Math.floor(Math.random() * flashy.length)] : weightedPick(decoyPool));
    } else {
      items.push(weightedPick(decoyPool));
    }
  }
  renderStrip(items);

  track.style.transition = 'none';
  track.style.transform = 'translateX(0px)';
  void track.offsetHeight;

  const rarityBonus = characterReveal ? (REVEAL_DURATION_BONUS_MS[winner.rarity] || 0) : 0;
  const duration = MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION) + rarityBonus;
  const finalX = targetTranslateX();

  requestAnimationFrame(() => {
    track.style.transition = `transform ${duration}ms ${EASING}`;
    track.style.transform = `translateX(${finalX}px)`;
  });
  playSpinTicks(duration);

  let settled = false;
  const finish = () => {
    if (settled) return;
    settled = true;
    const winnerEl = track.children[WINNER_INDEX];

    if (characterReveal && winnerEl && winner.rarity) {
      winnerEl.classList.add('winner', `reveal-${winner.rarity.toLowerCase()}`);
      triggerRevealEffects(winner.rarity, winner.color);
      const settleMs = REVEAL_SETTLE_MS[winner.rarity] || 200;
      setTimeout(() => {
        isSpinning = false;
        onComplete(winner);
      }, settleMs);
    } else {
      if (winnerEl) winnerEl.classList.add('winner');
      isSpinning = false;
      onComplete(winner);
    }
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
  const emptyMsg = logList.querySelector('.log-empty');
  if (emptyMsg) emptyMsg.remove();
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

  renderMobileRosterBar(totalPower);

  const powerTier = getPowerTier(avgPower);
  powerTierLabel.textContent = `${powerTier.icon} ${powerTier.label}`;
  powerTierLabel.style.color = powerTier.color;
  powerTierBarFill.style.width = `${avgPower > 0 ? getPowerTierProgress(avgPower) : 0}%`;
  powerTierBarFill.style.background = powerTier.color;

  const synergy = computeActiveSynergy();
  if (synergy) {
    synergyBanner.classList.remove('hidden');
    synergyBanner.classList.toggle('synergy-negative', synergy.bonus < 0);
    const bonusText = synergy.bonus > 0
      ? `<span class="synergy-bonus">+${synergy.bonus} power</span>`
      : synergy.bonus < 0
        ? `<span class="synergy-bonus synergy-bonus-negative">${synergy.bonus} power</span>`
        : '';
    synergyBanner.innerHTML = `<span class="synergy-icon">${synergy.icon}</span><div><b>${synergy.name}</b> ${bonusText}<div class="synergy-desc">${synergy.desc}</div></div>`;
  } else {
    synergyBanner.classList.add('hidden');
    synergyBanner.innerHTML = '';
  }

  rosterList.innerHTML = '';
  if (game.roster.length === 0) {
    rosterList.innerHTML = `
      <div class="journey-empty">
        <div class="journey-empty-title">Your Journey Begins</div>
        <div class="journey-empty-text">Draft your first fighter and start building your Multiverse team.</div>
        <div class="journey-steps">
          <div class="journey-step active"><span class="journey-dot"></span>Draft a fighter</div>
          <div class="journey-step-line"></div>
          <div class="journey-step"><span class="journey-dot"></span>Build your team</div>
          <div class="journey-step-line"></div>
          <div class="journey-step"><span class="journey-dot"></span>Become Champion</div>
        </div>
      </div>`;
    return;
  }
  game.roster.forEach(c => {
    const card = document.createElement('div');
    card.className = 'roster-card';
    card.style.setProperty('--rarity-color', c.color);

    const chainForCard = AWAKENING_CHAINS[c.baseName || c.name];
    const isMaxAwakened = chainForCard && c.awakenPhase >= chainForCard.length;
    if (isMaxAwakened) {
      card.classList.add('max-awakened');
      const crown = document.createElement('span');
      crown.className = 'max-awakened-crown';
      crown.textContent = '👑';
      const cornerTL = document.createElement('span');
      cornerTL.className = 'max-awakened-corner tl';
      const cornerBR = document.createElement('span');
      cornerBR.className = 'max-awakened-corner br';
      card.append(crown, cornerTL, cornerBR);
    }

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
    power.textContent = `⚡ Power ${c.power}`;

    const universe = document.createElement('div');
    universe.className = 'roster-card-universe';
    universe.textContent = c.universe;

    const rarity = document.createElement('span');
    rarity.className = 'roster-card-rarity';
    rarity.textContent = c.rarity;

    const powerBarWrap = document.createElement('div');
    powerBarWrap.className = 'roster-card-powerbar';
    const powerBarFill = document.createElement('div');
    powerBarFill.className = 'roster-card-powerbar-fill';
    powerBarFill.style.width = `${clamp((c.power / 13000) * 100, 4, 100)}%`;
    powerBarFill.style.background = c.color;
    powerBarWrap.appendChild(powerBarFill);

    body.append(name, power, universe, rarity, powerBarWrap);

    const masteryLvl = masteryLevelFor(c.baseName || c.name);
    if (masteryLvl > 0) {
      const mastery = document.createElement('span');
      mastery.className = 'roster-card-mastery';
      mastery.textContent = `🔁 Veteran Bonus: +${masteryLvl} power`;
      mastery.title = "You've scouted this fighter before, elsewhere in your career — that experience carries over as a permanent power bonus.";
      body.appendChild(mastery);
    }

    const chain = AWAKENING_CHAINS[c.baseName || c.name];
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
    fitTextToOneLine(name, 0.66, 0.44);
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

function renderPlayerStatCard() {
  const name = game.playerName || 'Anonymous';
  playerStatAvatar.textContent = initials(name);
  playerStatName.textContent = name;
  playerStatLeague.textContent = game.finaleWon ? 'Multiverse Champion' : `${currentTier().name}`;
  const wins = career.battlesWon || 0;
  const losses = career.battlesLost || 0;
  const total = wins + losses;
  playerStatWins.textContent = wins;
  playerStatLosses.textContent = losses;
  playerStatWinrate.textContent = total > 0 ? `${Math.round((wins / total) * 100)}%` : '—';

  const tier = currentTier();
  if (game.finaleWon) {
    leagueBannerCount.textContent = '👑 Champion';
    leagueBannerSub.textContent = 'multiverse conquered';
  } else {
    const winsInLeague = Math.min(game.roundIndex, tier.bracket.length);
    leagueBannerCount.textContent = `${winsInLeague} / ${tier.bracket.length}`;
    const isLastLeague = game.tierIndex >= TIERS.length - 1;
    leagueBannerSub.textContent = isLastLeague ? 'wins to become Champion' : `wins to ${TIERS[game.tierIndex + 1].name}`;
  }
}

function updateDailyResetCountdown() {
  if (!dailyResetCountdown) return;
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const msLeft = midnight - now;
  const hh = Math.floor(msLeft / 3600000);
  const mm = Math.floor((msLeft % 3600000) / 60000);
  const ss = Math.floor((msLeft % 60000) / 1000);
  dailyResetCountdown.textContent = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}
setInterval(updateDailyResetCountdown, 1000);
updateDailyResetCountdown();

function renderBracket() {
  const tier = currentTier();
  bracketTitle.textContent = game.finaleWon ? 'Tournament Complete — Multiverse Champion!' : `${tier.name} — Bracket`;
  bracketPath.innerHTML = '';

  if (leagueProgress) {
    if (game.finaleWon) {
      leagueProgress.textContent = '';
    } else {
      const winsInLeague = Math.min(game.roundIndex, tier.bracket.length);
      const isLastLeague = game.tierIndex >= TIERS.length - 1;
      leagueProgress.innerHTML = isLastLeague
        ? `<b>${winsInLeague} / ${tier.bracket.length}</b> wins to become Champion`
        : `<b>${winsInLeague} / ${tier.bracket.length}</b> wins to ${TIERS[game.tierIndex + 1].name}`;
    }
  }

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

const LEAGUE_THEMES = [
  { text: '#e0a458', border: 'rgba(224,164,88,0.35)', borderStrong: 'rgba(224,164,88,0.5)', glow: 'rgba(224,164,88,0.15)', glowStrong: 'rgba(224,164,88,0.4)' },
  { text: '#c7d3e0', border: 'rgba(199,211,224,0.35)', borderStrong: 'rgba(199,211,224,0.5)', glow: 'rgba(199,211,224,0.15)', glowStrong: 'rgba(199,211,224,0.4)' },
  { text: '#ffd24d', border: 'rgba(255,210,77,0.35)', borderStrong: 'rgba(255,210,77,0.5)', glow: 'rgba(255,210,77,0.15)', glowStrong: 'rgba(255,210,77,0.4)' },
  { text: '#8fe8ff', border: 'rgba(143,232,255,0.35)', borderStrong: 'rgba(143,232,255,0.5)', glow: 'rgba(143,232,255,0.16)', glowStrong: 'rgba(143,232,255,0.42)' },
  { text: '#9db4ff', border: 'rgba(157,180,255,0.4)', borderStrong: 'rgba(157,180,255,0.55)', glow: 'rgba(157,180,255,0.18)', glowStrong: 'rgba(157,180,255,0.45)' },
  { text: '#ff6b9d', border: 'rgba(255,45,107,0.45)', borderStrong: 'rgba(255,45,107,0.6)', glow: 'rgba(255,45,107,0.2)', glowStrong: 'rgba(255,45,107,0.5)' }
];

function applyLeagueTheme() {
  const theme = LEAGUE_THEMES[Math.min(game.tierIndex, LEAGUE_THEMES.length - 1)];
  const root = document.documentElement.style;
  root.setProperty('--league-text', theme.text);
  root.setProperty('--league-border', theme.border);
  root.setProperty('--league-border-strong', theme.borderStrong);
  root.setProperty('--league-glow', theme.glow);
  root.setProperty('--league-glow-strong', theme.glowStrong);
}

function refreshUI() {
  flushPlaytime();
  applyLeagueTheme();
  document.body.classList.toggle('pre-draft', game.roster.length === 0 && !game.godMode);
  renderRosterSidebar();
  renderPlayerStatCard();
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
  viewport.classList.toggle('rift-active', !!game.riftActive);
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

const GODMODE_CODE = 'ZKLLMPtzJXIvymzsy7_T_g';

function activateGodMode() {
  game.godMode = true;
  const displayName = '⚡ GOD MODE ⚡';
  game.playerName = displayName;
  playerNameDisplay.textContent = displayName;
  game.items.phoenixEmber = 99;
  logEvent('⚡ God Mode activated. Reality itself bends to your will.');
  closeNameOverlay();
  refreshUI();
}

// Testing-only cheat: drafts a solo Yamcha and force-loses the very next
// match, so the Yamcha defeat easter egg can be checked on demand without
// having to lose a real fight with him as your only fighter.
const YAMCHA_TEST_CODE = 'yamcha-death-loop-QW9fL2';

function activateYamchaTestMode() {
  const yamchaCard = ACTIVE_POOL.find(c => c.name === 'Yamcha') || {
    name: 'Yamcha', baseName: 'Yamcha', universe: 'Dragon Ball',
    rarity: 'Useless', color: RARITIES.Useless.color, power: 1200, weight: 1
  };
  game.roster = [{ ...yamchaCard, awakenPhase: 0 }];
  game.phase = 'match';
  game.forceNextMatchLoss = true;
  const displayName = '💥 YAMCHA TEST 💥';
  game.playerName = displayName;
  playerNameDisplay.textContent = displayName;
  logEvent('💥 Yamcha test mode activated — your next match is a guaranteed loss.');
  closeNameOverlay();
  refreshUI();
}

function submitName() {
  const raw = nameInput.value.trim();
  if (raw === GODMODE_CODE) {
    activateGodMode();
    return;
  }
  if (raw === YAMCHA_TEST_CODE) {
    activateYamchaTestMode();
    return;
  }
  if (!raw) { nameError.textContent = 'Enter a name to continue.'; nameError.classList.remove('hidden'); return; }
  if (raw.length > 24) { nameError.textContent = 'Keep it under 24 characters.'; nameError.classList.remove('hidden'); return; }
  if (isNameTaken(raw, game.playerName)) { nameError.textContent = 'That name is already taken on this device — try another.'; nameError.classList.remove('hidden'); return; }
  const isFirstEverVisit = !loadJSON('mat_playerName', null);
  reserveName(raw);
  game.playerName = raw;
  saveJSON('mat_playerName', raw);
  playerNameDisplay.textContent = raw;
  closeNameOverlay();
  if (isFirstEverVisit) showHowto();
}

nameSubmit.addEventListener('click', submitName);
nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') submitName(); });
changeNameBtn.addEventListener('click', () => openNameOverlay(game.playerName));

// ---------------------------------------------------------------------------
// Battle VS intro modal
// ---------------------------------------------------------------------------

let pendingOpponent = null;

function previewWinChance(opponent) {
  if (game.godMode) return 0.99;
  if (game.items.twinMoon > 0) return 0.99;
  let bonus = game.tempFusionBonus || 0;
  if (game.items.chakraDraft > 0) bonus += 1300;
  return computeWinChance(opponent.power, bonus);
}

function showBattleIntro(opponent) {
  pendingOpponent = opponent;
  const totalRosterPower = game.roster.reduce((s, c) => s + c.power, 0);
  battleYourPower.textContent = `Power ${totalRosterPower} total (${averageRosterPower()} avg)`;

  battleTeamStrip.innerHTML = '';
  const miniSizeBySize = { 1: 96, 2: 80, 3: 68, 4: 58, 5: 50, 6: 44 };
  const miniSize = miniSizeBySize[game.roster.length] || 30;
  battleTeamStrip.style.maxWidth = `${Math.min(3, game.roster.length) * (miniSize + 4) + 20}px`;
  game.roster.forEach(c => {
    const mini = document.createElement('div');
    mini.className = 'battle-mini-avatar';
    mini.style.width = `${miniSize}px`;
    mini.style.height = `${miniSize}px`;
    mini.style.setProperty('--rarity-color', c.color);
    attachAvatarImage(mini, c.name, 'character', initials(c.name));
    battleTeamStrip.appendChild(mini);
  });

  battleEnemyAvatar.innerHTML = '';
  battleEnemyAvatar.classList.remove('has-image');
  attachAvatarImage(battleEnemyAvatar, opponent.name, 'villain', opponent.icon || '👹');
  battleEnemyAvatar.parentElement.style.setProperty('--rarity-color', opponent.color || '#ff2d6b');
  battleEnemyName.textContent = opponent.name;
  battleEnemyPower.textContent = `Power ${opponent.power}`;
  battleEnemyQuote.textContent = `"${opponent.quote}"`;

  const chance = Math.round(previewWinChance(opponent) * 100);
  battleWinChance.textContent = `Estimated win chance: ${chance}%`;
  battleWinChance.className = 'battle-win-chance ' + (chance >= 60 ? 'good' : chance >= 35 ? 'ok' : 'bad');

  battleModal.classList.remove('bg-enter');
  void battleModal.offsetWidth;
  battleModal.classList.add('bg-enter');

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
// Shareable run-summary badge (canvas-generated PNG download)
// ---------------------------------------------------------------------------

function loadImageWithFallback(src, timeoutMs) {
  return new Promise(resolve => {
    const img = new Image();
    let done = false;
    const finish = result => { if (!done) { done = true; resolve(result); } };
    img.onload = () => finish(img);
    img.onerror = () => finish(null);
    img.src = src;
    setTimeout(() => finish(null), timeoutMs || 1500);
  });
}

function drawShareBadge(ctx, isChampion, opponentName, rosterImages, rosterTransparency) {
  const w = 800;
  const radius = 50;
  const rowHeight = 128;
  const headerHeight = 340;
  const footerHeight = 96;
  const h = Math.max(600, headerHeight + game.roster.length * rowHeight + footerHeight);
  const accent = isChampion ? '#ffd24d' : '#e74c3c';
  const accentSoft = isChampion ? 'rgba(255,210,77,0.14)' : 'rgba(231,76,60,0.14)';

  // ---------- Background ----------
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#241238');
  bg.addColorStop(1, '#07040e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle diagonal grid texture so the background isn't flat
  ctx.save();
  ctx.globalAlpha = 0.05;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1;
  for (let gx = -h; gx < w + h; gx += 34) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx + h, h);
    ctx.stroke();
  }
  ctx.restore();

  // Large faint watermark so smaller rosters don't leave a bare card.
  ctx.save();
  ctx.globalAlpha = 0.06;
  ctx.textAlign = 'center';
  ctx.fillStyle = accent;
  ctx.font = 'bold 380px sans-serif';
  ctx.fillText(isChampion ? '👑' : '💀', w / 2, h / 2 + 130);
  ctx.restore();

  // ---------- Outer frame (with real margin, nothing touches it) ----------
  ctx.strokeStyle = accent;
  ctx.lineWidth = 5;
  ctx.strokeRect(18, 18, w - 36, h - 36);
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1;
  ctx.strokeRect(26, 26, w - 52, h - 52);

  // ---------- Header medallion ----------
  const medY = 78;
  const medR = 46;
  ctx.save();
  const medGlow = ctx.createRadialGradient(w / 2, medY, 4, w / 2, medY, medR + 22);
  medGlow.addColorStop(0, accentSoft);
  medGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = medGlow;
  ctx.beginPath();
  ctx.arc(w / 2, medY, medR + 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const medGrad = ctx.createLinearGradient(w / 2 - medR, medY - medR, w / 2 + medR, medY + medR);
  medGrad.addColorStop(0, accent);
  medGrad.addColorStop(1, '#0a0614');
  ctx.fillStyle = medGrad;
  ctx.beginPath();
  ctx.arc(w / 2, medY, medR, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '52px sans-serif';
  ctx.fillText(isChampion ? '👑' : '💀', w / 2, medY + 4);
  ctx.textBaseline = 'alphabetic';

  // ---------- Title / name / subtitle ----------
  ctx.fillStyle = accent;
  ctx.font = '900 32px "Segoe UI", sans-serif';
  ctx.fillText(isChampion ? 'MULTIVERSE CHAMPION' : 'ELIMINATED', w / 2, 150);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px "Segoe UI", sans-serif';
  ctx.fillText(game.playerName || 'Anonymous', w / 2, 182);

  ctx.fillStyle = '#a9a3c2';
  ctx.font = '16px "Segoe UI", sans-serif';
  ctx.fillText(
    isChampion ? `Defeated ${opponentName}` : `Fell to ${opponentName} in the ${currentTier().name}`,
    w / 2, 206
  );

  const synergy = computeActiveSynergy();
  const teamName = synergy ? `${synergy.icon}  “${synergy.name}”` : '⚔️  “Multiverse Squad”';
  ctx.fillStyle = accent;
  ctx.font = 'italic bold 19px "Segoe UI", sans-serif';
  ctx.fillText(teamName, w / 2, 234);

  // ---------- Stat chips ----------
  const score = liveScore();
  const totalPower = game.roster.reduce((s, c) => s + c.power, 0);
  const chipY = 254, chipH = 44, chipW = 300, chipGap = 16;
  const chip1X = w / 2 - chipGap / 2 - chipW;
  const chip2X = w / 2 + chipGap / 2;

  function drawChip(x, icon, label, value, valueColor) {
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    roundRectPath(ctx, x, chipY, chipW, chipH, 10);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    roundRectPath(ctx, x, chipY, chipW, chipH, 10);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.font = '22px sans-serif';
    ctx.fillText(icon, x + 14, chipY + 29);
    ctx.font = '12px "Segoe UI", sans-serif';
    ctx.fillStyle = '#8a84a0';
    ctx.fillText(label, x + 46, chipY + 17);
    ctx.font = 'bold 18px "Segoe UI", sans-serif';
    ctx.fillStyle = valueColor;
    ctx.fillText(value, x + 46, chipY + 35);
  }
  drawChip(chip1X, '⚔️', 'MATCHES WON', `${score} / ${TOTAL_MATCHES}`, '#00e5ff');
  drawChip(chip2X, '⚡', 'TEAM POWER', `${totalPower}`, '#ffd24d');

  // ---------- Roster ----------
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px "Segoe UI", sans-serif';
  ctx.fillText('FINAL ROSTER', 46, 328);
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(46, 336);
  ctx.lineTo(w - 46, 336);
  ctx.stroke();

  let y = headerHeight;
  game.roster.forEach((c, i) => {
    const rowTop = y + 6;
    const rowBottom = y + rowHeight - 6;
    const cx = 46 + 20 + radius, cy = rowTop + (rowBottom - rowTop) / 2;

    // Card background for this roster row
    ctx.fillStyle = 'rgba(255,255,255,0.035)';
    roundRectPath(ctx, 40, rowTop, w - 80, rowBottom - rowTop, 12);
    ctx.fill();
    ctx.fillStyle = c.color;
    roundRectPath(ctx, 40, rowTop, 5, rowBottom - rowTop, 3);
    ctx.fill();

    const img = rosterImages && rosterImages[i];
    const isTransparent = rosterTransparency && rosterTransparency[i];

    ctx.save();
    ctx.shadowColor = c.color;
    ctx.shadowBlur = 16;
    if (img) {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      const grad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
      grad.addColorStop(0, c.color);
      grad.addColorStop(1, '#0a0614');
      ctx.fillStyle = grad;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      if (isTransparent) {
        // Cutout art on a transparent background — show the whole image,
        // never crop it (matches how the live game handles these).
        const scale = Math.min((radius * 1.85) / img.width, (radius * 1.85) / img.height);
        const dw = img.width * scale, dh = img.height * scale;
        ctx.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh);
      } else {
        // Full scene/portrait art — fill the circle completely, cropping
        // overflow, biased toward the top third (where faces usually are).
        const scale = Math.max((radius * 2.05) / img.width, (radius * 2.05) / img.height);
        const dw = img.width * scale, dh = img.height * scale;
        const dx = cx - dw / 2;
        const dy = cy - dh * 0.35;
        ctx.drawImage(img, dx, dy, dw, dh);
      }
    } else {
      const grad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
      grad.addColorStop(0, c.color);
      grad.addColorStop(1, '#0a0614');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0a0614';
      ctx.font = 'bold 32px "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      const initials = c.name.split(' ').map(word => word[0]).slice(0, 2).join('').toUpperCase();
      ctx.fillText(initials, cx, cy + 11);
      ctx.textAlign = 'left';
    }
    ctx.restore();

    ctx.strokeStyle = c.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    const textX = cx + radius + 22;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 21px "Segoe UI", sans-serif';
    ctx.fillText(truncateToWidth(ctx, c.name, w - textX - 30), textX, cy - 9);
    ctx.fillStyle = c.color;
    ctx.font = '16px "Segoe UI", sans-serif';
    ctx.fillText(`Power ${c.power} · ${c.rarity}`, textX, cy + 12);
    ctx.fillStyle = '#8a84a0';
    ctx.font = '13px "Segoe UI", sans-serif';
    ctx.fillText(c.universe, textX, cy + 30);

    y += rowHeight;
  });

  // ---------- Footer ----------
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(46, h - 62);
  ctx.lineTo(w - 46, h - 62);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#6c6c78';
  ctx.font = '14px "Segoe UI", sans-serif';
  ctx.fillText('Multiverse Anime Tournament', w / 2, h - 40);
  ctx.fillText(new Date().toLocaleDateString(), w / 2, h - 22);

  return h;
}

function roundRectPath(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function truncateToWidth(ctx, text, maxWidth) {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let truncated = text;
  while (truncated.length > 1 && ctx.measureText(truncated + '…').width > maxWidth) {
    truncated = truncated.slice(0, -1);
  }
  return truncated + '…';
}

async function downloadShareBadge(isChampion, opponentName) {
  const radius = 50, rowHeight = 128, headerHeight = 340, footerHeight = 96;
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = Math.max(600, headerHeight + game.roster.length * rowHeight + footerHeight);
  const ctx = canvas.getContext('2d');

  const rosterImages = await Promise.all(
    game.roster.map(c => loadImageWithFallback(imagePathFor(c.name, 'character')))
  );
  const rosterTransparency = await Promise.all(
    rosterImages.map(img => new Promise(resolve => {
      if (!img) { resolve(false); return; }
      detectMostlyTransparent(img, resolve);
    }))
  );

  drawShareBadge(ctx, isChampion, opponentName, rosterImages, rosterTransparency);
  const link = document.createElement('a');
  link.download = `multiverse-tournament-${isChampion ? 'champion' : 'run'}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

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

let lastCelebrationWasChampion = false;
let lastCelebrationOpponent = '';

function showCelebration(title, subtitle, icon, extraText, opponentName) {
  celebrationTrophy.textContent = icon || '🏆';
  celebrationTitle.textContent = title;
  celebrationSubtitle.textContent = subtitle;
  if (extraText) { celebrationExtra.textContent = extraText; celebrationExtra.classList.remove('hidden-line'); }
  else { celebrationExtra.classList.add('hidden-line'); }
  spawnConfetti(icon === '👑' ? 70 : 40);
  celebrationOverlay.classList.remove('hidden');
  mainBtn.disabled = true;

  lastCelebrationWasChampion = icon === '👑';
  lastCelebrationOpponent = opponentName || '';
  celebrationShareBtn.classList.toggle('hidden', !lastCelebrationWasChampion);
}

function hideCelebration() {
  celebrationOverlay.classList.add('hidden');
  confettiLayer.innerHTML = '';
  refreshUI();
}

celebrationClose.addEventListener('click', hideCelebration);
celebrationShareBtn.addEventListener('click', () => downloadShareBadge(true, lastCelebrationOpponent));

let lastGameOverOpponent = '';

function showGameOver(opponent, extraText) {
  gameoverSubtitle.textContent = `You made it to the ${currentTier().name} before falling to ${opponent.name}. Every legend has a beginning — try again!`;
  gameoverExtra.textContent = extraText || '';
  gameoverOverlay.classList.remove('hidden');
  mainBtn.disabled = true;
  lastGameOverOpponent = opponent.name;
}

function hideGameOverAndRestart() {
  gameoverOverlay.classList.add('hidden');
  resetGame();
}

gameoverClose.addEventListener('click', hideGameOverAndRestart);
gameoverShareBtn.addEventListener('click', () => downloadShareBadge(false, lastGameOverOpponent));

// ---------------------------------------------------------------------------
// Dimensional Rift popup
// ---------------------------------------------------------------------------

const riftOverlay = document.getElementById('rift-overlay');
const riftClose = document.getElementById('rift-close');

function showRiftPopup() {
  riftOverlay.classList.remove('hidden');
  mainBtn.disabled = true;
  refreshUI();
}

function hideRiftPopup() {
  riftOverlay.classList.add('hidden');
  refreshUI();
}

riftClose.addEventListener('click', hideRiftPopup);


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

function showHowto() {
  howtoOverlay.classList.remove('hidden');
}

function hideHowto() {
  howtoOverlay.classList.add('hidden');
}

openHowtoBtn.addEventListener('click', showHowto);

// ---------------------------------------------------------------------------
// Feedback form — submits to Formspree (free, no backend needed, and your
// real email address is never exposed in the page source).
//
// SETUP (2 minutes): go to https://formspree.io, sign up free, create a new
// form, and it gives you an endpoint like "https://formspree.io/f/abcdwxyz".
// Paste that below, replacing the placeholder.
// ---------------------------------------------------------------------------

const FEEDBACK_ENDPOINT = 'https://formspree.io/f/mljerpnw';

const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackCloseX = document.getElementById('feedback-close-x');
const feedbackText = document.getElementById('feedback-text');
const feedbackEmail = document.getElementById('feedback-email');
const feedbackStatus = document.getElementById('feedback-status');
const feedbackSubmit = document.getElementById('feedback-submit');
const openFeedbackBtn = document.getElementById('open-feedback-btn');

function showFeedback() {
  feedbackStatus.className = 'feedback-status hidden';
  feedbackOverlay.classList.remove('hidden');
}

function hideFeedback() {
  feedbackOverlay.classList.add('hidden');
}

openFeedbackBtn.addEventListener('click', showFeedback);

// ---------------------------------------------------------------------------
// Share-to-unlock button
// ---------------------------------------------------------------------------

const openShareBtn = document.getElementById('open-share-btn');
const shareCardTitle = document.getElementById('share-card-title');
const shareCardSubtitle = document.getElementById('share-card-subtitle');

function refreshShareCard() {
  if (career.unlockedShareReward) {
    shareCardTitle.textContent = 'Share again?';
    shareCardSubtitle.textContent = `${SHARE_UNLOCK_CHARACTER.name} is already unlocked — sharing again just spreads the word!`;
  } else {
    shareCardTitle.textContent = 'Share & unlock a fighter!';
    shareCardSubtitle.textContent = `Share the game once to permanently unlock ${SHARE_UNLOCK_CHARACTER.name}.`;
  }
}
refreshShareCard();

openShareBtn.addEventListener('click', async () => {
  const shareData = {
    title: 'Multiverse Anime Tournament',
    text: 'Draft your dream anime team and spin your way through 6 tournament leagues! Come play:',
    url: window.location.href
  };

  let shared = false;
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      shared = true;
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareData.url);
      showToast('info', '🔗 Link copied!', 'Paste it anywhere to share the game.');
      shared = true;
    }
  } catch (e) {
    // Share sheet was cancelled — not an error, just don't unlock.
    return;
  }

  if (shared && !career.unlockedShareReward) {
    career.unlockedShareReward = true;
    saveCareer();
    refreshActivePool();
    showToast('unlock', `🔓 Unlocked: ${SHARE_UNLOCK_CHARACTER.name}`, 'Thanks for sharing! A new fighter has entered your scout pool.');
    refreshShareCard();
  }
});

feedbackCloseX.addEventListener('click', hideFeedback);

feedbackSubmit.addEventListener('click', async () => {
  const message = feedbackText.value.trim();
  if (!message) {
    feedbackStatus.textContent = 'Please write something first.';
    feedbackStatus.className = 'feedback-status error';
    return;
  }
  if (FEEDBACK_ENDPOINT.includes('YOUR_FORM_ID_HERE')) {
    feedbackStatus.textContent = 'Feedback form is not set up yet — see the setup note in script.js.';
    feedbackStatus.className = 'feedback-status error';
    return;
  }

  feedbackSubmit.disabled = true;
  feedbackStatus.textContent = 'Sending...';
  feedbackStatus.className = 'feedback-status';

  try {
    const formData = new FormData();
    const emailValue = feedbackEmail.value.trim();
    formData.append('message', message);
    // Formspree treats a field literally named "email" as the reply-to
    // address and rejects the whole submission if it isn't a valid email —
    // so only send it when actually filled in, under a safe field name.
    if (emailValue) formData.append('_replyto', emailValue);
    formData.append('contact_email', emailValue || 'Not provided');
    formData.append('player', game.playerName || 'unknown');
    formData.append('_subject', 'Multiverse Anime Tournament — Feedback');

    const res = await fetch(FEEDBACK_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    });

    if (res.ok) {
      feedbackStatus.textContent = '✅ Sent! Thanks for the feedback.';
      feedbackStatus.className = 'feedback-status ok';
      feedbackText.value = '';
      feedbackEmail.value = '';
      setTimeout(hideFeedback, 1800);
    } else {
      feedbackStatus.textContent = '❌ Something went wrong — try again later.';
      feedbackStatus.className = 'feedback-status error';
    }
  } catch (e) {
    feedbackStatus.textContent = '❌ Network error — check your connection.';
    feedbackStatus.className = 'feedback-status error';
  } finally {
    feedbackSubmit.disabled = false;
  }
});

const howtoInlineLink = document.getElementById('howto-inline-link');
if (howtoInlineLink) howtoInlineLink.addEventListener('click', showHowto);
howtoCloseX.addEventListener('click', hideHowto);
howtoGotIt.addEventListener('click', hideHowto);

// ---------------------------------------------------------------------------
// Shard shop
// ---------------------------------------------------------------------------

function renderShop() {
  shardBalance.textContent = career.shards;
  const runActive = game.phase !== 'victory' && game.phase !== 'gameover' && !isSpinning;
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
  if (isSpinning) return;
  if (career.shards < item.price) return;
  const pool = poolExcludingRoster(ACTIVE_POOL.filter(c => c.rarity === item.rarity));
  if (pool.length === 0) {
    logEvent(`🛒 No available ${item.rarity} fighters left to recruit right now.`);
    return;
  }
  career.shards -= item.price;
  saveCareer();
  shopOverlay.classList.add('hidden');
  runRoulette(pool, `Recruiting a ${item.rarity} fighter!`, winnerRaw => {
    const picked = applyMasteryBonus(winnerRaw);
    addToRoster(picked);
    trackScoutedCharacter(picked);
    logEvent(`🛒 Recruited ${picked.name} (${item.rarity}) for ${item.price} shards`);
    runProgressionChecks();
    refreshUI();
  }, { characterReveal: true });
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
  } else if (c.rarity === 'Common' || c.rarity === 'Useless') {
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

  // Does this scout complete a special-fusion pair with someone already on
  // the roster? If so, that's worth a slot even at lower raw power — but
  // never at the cost of the very character that makes the fusion possible.
  const cName = c.baseName || c.name;
  const protectedNames = new Set();
  SPECIAL_FUSIONS.forEach(f => {
    if (!f.pair.includes(cName)) return;
    const otherHalf = f.pair.find(p => p !== cName);
    if (game.roster.some(m => (m.baseName || m.name) === otherHalf)) protectedNames.add(otherHalf);
  });
  const completesFusion = protectedNames.size > 0;

  const candidates = game.roster.filter(m => !protectedNames.has(m.baseName || m.name));
  const pool = candidates.length > 0 ? candidates : game.roster;
  const weakestPick = pool.reduce((min, t) => (t.power < min.power ? t : min), pool[0]);
  const weakestIdx = game.roster.indexOf(weakestPick);
  const weakest = game.roster[weakestIdx];

  if (c.power > weakest.power || completesFusion) {
    game.roster[weakestIdx] = c;
    if (completesFusion && c.power <= weakest.power) {
      logEvent(`🔁 ${weakest.name} steps aside — ${c.name} completes a legendary fusion pair!`);
      showEventPanel('success', `Your roster was full, but <b>${c.name}</b> completes a powerful fusion combo — <b>${weakest.name}</b> makes way!`);
    } else {
      logEvent(`🔁 ${weakest.name} replaced by ${c.name}`);
      showEventPanel('success', `Your roster was full: <b>${weakest.name}</b> made way for <b>${c.name}</b> (${c.universe})!`);
    }
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
  // A short breather after winning a league — no back-to-back matches.
  if (!game.finaleWon && !game.justWonTrophy) {
    entries.push({ value: 'match', weight: 34 + pressure * 8 });
  }
  entries.push({ value: 'item', weight: 10 * decay });
  if (game.tierIndex >= AWAKENING_UNLOCK_TIER && awakenableRoster().length > 0) {
    // Weight scales with how many awakenable fighters you have, so multi-phase
    // chains (which need several awaken events on the same fighter) stay
    // realistically reachable instead of a near-impossible needle in a haystack.
    entries.push({ value: 'awaken', weight: 20 + awakenableRoster().length * 8 });
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
  }, { characterReveal: true });
}

function startActionSpin() {
  const pool = buildEventPool();

  // A ready special-pair fusion (e.g. Goku + Vegeta) always takes over the
  // very next event — 100% guaranteed — but the strip still shows the normal
  // varied mix of cards as it spins, so it never looks like an obvious fix.
  const special = getAvailableSpecialFusion();
  const forcedWinner = special
    ? { value: 'fusion', name: `${special.name} Fusion!`, icon: special.icon, color: special.color, sub: 'Event' }
    : null;

  runRoulette(pool, PHASE_TITLES.action, winner => {
    logEvent(`🎲 Event: ${winner.name}`);
    showEventPanel('info', `Coming up: <b>${winner.name}</b>`);
    game.phase = winner.value;
    game.actionsSinceMatch = winner.value === 'match' ? 0 : (game.actionsSinceMatch || 0) + 1;
    game.justWonTrophy = false;

    // Dimensional Rift: a small chance, only when not already active, to grant
    // a temporary boosted-luck window for your next Scout.
    if (winner.value !== 'match' && !game.riftActive && Math.random() < 0.04) {
      game.riftActive = true;
      showRiftPopup();
    }
    refreshUI();
  }, { forcedWinner });
}

function startScoutSpin() {
  // An independent, vanishingly small roll on every Scout — if it hits, it
  // completely overrides everything else (pity, rift, dango included).
  if (Math.random() < SECRET_PULL_CHANCE) {
    runRoulette([SECRET_PULL_CHARACTER], PHASE_TITLES.scout, winnerRaw => {
      const winner = applyMasteryBonus(winnerRaw);
      addToRoster(winner);
      trackScoutedCharacter(winner);
      career.hadUltraInstinctShaggy = true;
      logEvent('🐾 REALITY BREAKS: Ultra Instinct Shaggy has entered your roster!');
      game.phase = 'action';
      runProgressionChecks();
      refreshUI();
    }, { characterReveal: true, forcedWinner: SECRET_PULL_CHARACTER, decoyPool: poolExcludingRoster(ACTIVE_POOL) });
    return;
  }

  let pool = getProgressionAdjustedPool(ACTIVE_POOL);
  if (career.pityCounter >= PITY_SOFT_START) pool = getPityAdjustedPool(pool);
  let usedDango = false;
  let usedRift = false;
  if (game.items.luckyDango > 0) {
    game.items.luckyDango--;
    pool = ACTIVE_POOL.filter(c => RARITY_RANK[c.rarity] >= RARITY_RANK.Rare);
    usedDango = true;
  } else if (game.riftActive) {
    game.riftActive = false;
    const boosted = ACTIVE_POOL.filter(c => RARITY_RANK[c.rarity] >= RARITY_RANK.Epic);
    pool = boosted.length > 0 ? boosted : ACTIVE_POOL;
    usedRift = true;
  }

  const missingPartners = getMissingFusionPartners();
  if (missingPartners.length > 0) {
    pool = pool.map(c => missingPartners.includes(c.baseName || c.name) ? { ...c, weight: c.weight * 10 } : c);
  }

  pool = poolExcludingRoster(pool);
  runRoulette(pool, PHASE_TITLES.scout, winnerRaw => {
    const winner = applyMasteryBonus(winnerRaw);
    addToRoster(winner);
    trackScoutedCharacter(winner);
    if (usedDango) logEvent('🍡 Lucky Dango Skewer guaranteed a Rare-or-better scout!');
    if (usedRift) logEvent('⚠️ The Dimensional Rift boosted this scout to Epic-or-better!');
    if (missingPartners.includes(winner.baseName || winner.name)) logEvent(`✨ A familiar aura draws ${winner.name} to your team...`);
    game.phase = 'action';
    runProgressionChecks();
    refreshUI();
  }, { characterReveal: true });
}

function startTradeSpin() {
  let pool = poolExcludingRoster(ACTIVE_POOL);
  const missingPartners = getMissingFusionPartners();
  if (missingPartners.length > 0) {
    pool = pool.map(c => missingPartners.includes(c.baseName || c.name) ? { ...c, weight: c.weight * 10 } : c);
  }
  runRoulette(pool, PHASE_TITLES.trade, winnerRaw => {
    const winner = applyMasteryBonus(winnerRaw);
    if (game.roster.length === 0) {
      trackScoutedCharacter(winner);
      addToRoster(winner);
      game.phase = 'action';
      runProgressionChecks();
      refreshUI();
      return;
    }
    game.pendingTradeIncoming = winner;
    logEvent(`🔄 A rift pulls in ${winner.name} — spin again to see who steps through!`);
    showEventPanel('info', `A Dimensional Rift pulls in <b>${winner.name}</b> (${winner.universe})! Spin to decide who it trades places with.`);
    game.phase = 'trade-select';
    refreshUI();
  }, { characterReveal: true });
}

function startTradeSelectSpin() {
  const incoming = game.pendingTradeIncoming;
  if (!incoming) { game.phase = 'action'; refreshUI(); return; }
  const pool = game.roster.map(c => ({ ...c, weight: 1 }));
  runRoulette(pool, 'Who leaves the team?', winnerRaw => {
    const idx = game.roster.findIndex(c => c.name === winnerRaw.name && c.power === winnerRaw.power);
    const safeIdx = idx >= 0 ? idx : 0;
    const old = game.roster[safeIdx];
    game.roster[safeIdx] = { ...incoming, awakenPhase: 0 };
    trackScoutedCharacter(incoming);
    logEvent(`🔄 Dimensional Swap: ${old.name} → ${incoming.name}`);
    showEventPanel('info', `A rift pulls <b>${old.name}</b> out and <b>${incoming.name}</b> (${incoming.universe}) steps through in their place!`);
    game.pendingTradeIncoming = null;
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
    let boost = rand(260, 585);
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
    const winnerBase = winner.baseName || winner.name;
    const target = game.roster.find(c => (c.baseName || c.name) === winnerBase && c.awakenPhase < (AWAKENING_CHAINS[winnerBase] || []).length);
    if (!target) { game.phase = 'action'; refreshUI(); return; }
    const chain = AWAKENING_CHAINS[target.baseName || target.name];
    const phaseData = chain[target.awakenPhase];
    const oldPower = target.power;
    target.power = Math.min(MAX_POWER, Math.round(target.power * phaseData.multiplier));
    target.rarity = phaseData.newRarity;
    target.color = RARITIES[phaseData.newRarity].color;
    target.name = `${target.baseName || target.name} (${phaseData.label})`;
    target.sub = `${target.universe} · ${target.rarity}`;
    target.awakenPhase++;
    if (target.power > career.highestPower) career.highestPower = target.power;
    logEvent(`✨ ${target.name} awakened: ${phaseData.label}! (Power ${target.power})`);
    game.phase = 'action';
    runProgressionChecks();
    refreshUI();
    showAwakenReveal(target, phaseData, oldPower);
  });
}

// ---------------------------------------------------------------------------
// Epic awakening reveal popup — character portrait, rarity-colored rays,
// power comparison, sound + screen effects reused from the gacha reveal system.
// ---------------------------------------------------------------------------

const awakenRevealOverlay = document.getElementById('awaken-reveal-overlay');
const awakenRevealModal = document.getElementById('awaken-reveal-modal');
const awakenRevealPortrait = document.getElementById('awaken-reveal-portrait');
const awakenRevealIcon = document.getElementById('awaken-reveal-icon');
const awakenRevealTitle = document.getElementById('awaken-reveal-title');
const awakenRevealSubtitle = document.getElementById('awaken-reveal-subtitle');
const awakenRevealFlavor = document.getElementById('awaken-reveal-flavor');
const awakenRevealPower = document.getElementById('awaken-reveal-power');
const awakenRevealContinue = document.getElementById('awaken-reveal-continue');

function showAwakenReveal(character, phaseData, oldPower) {
  awakenRevealModal.style.setProperty('--rarity-color', character.color);
  awakenRevealIcon.textContent = phaseData.icon;
  awakenRevealTitle.textContent = `${character.baseName || character.name} Awakens!`;
  awakenRevealSubtitle.textContent = phaseData.label;
  awakenRevealFlavor.textContent = phaseData.flavor;
  awakenRevealPower.textContent = `Power ${oldPower} → ${character.power}`;

  awakenRevealPortrait.innerHTML = '';
  awakenRevealPortrait.style.setProperty('--rarity-color', character.color);
  awakenRevealPortrait.classList.remove('has-image', 'has-transparency');
  attachAvatarImage(awakenRevealPortrait, character.name, 'character', initials(character.baseName || character.name));

  awakenRevealOverlay.classList.remove('hidden');
  triggerRevealEffects(RARITY_RANK[character.rarity] >= RARITY_RANK.Legendary ? 'Legendary' : 'Epic', character.color);
  mainBtn.disabled = true;
}

function hideAwakenReveal() {
  awakenRevealOverlay.classList.add('hidden');
  refreshUI();
}

awakenRevealContinue.addEventListener('click', hideAwakenReveal);

// ---------------------------------------------------------------------------
// Yamcha defeat easter egg — a lighthearted anime-fandom nod, purely for fun.
// ---------------------------------------------------------------------------

const YAMCHA_FLAVOR_LINES = [
  "Yamcha has been defeated. Some things never change.",
  "In the grand tradition of Yamcha, your solo run ends here — with dignity, mostly intact.",
  "Yamcha's career win-rate remains an impressively consistent 0%.",
  "A wild Saibaman was not even required this time. Yamcha simply lost.",
  "Somewhere, a Dragon Ball fan nods knowingly.",
  "Yamcha looked his opponent dead in the eyes... and lost anyway."
];

const yamchaOverlay = document.getElementById('yamcha-overlay');
const yamchaFlavor = document.getElementById('yamcha-flavor');
const yamchaContinue = document.getElementById('yamcha-continue');
let yamchaResumeCallback = null;

function showYamchaEasterEgg(onDismiss) {
  yamchaResumeCallback = onDismiss || null;
  yamchaFlavor.textContent = YAMCHA_FLAVOR_LINES[Math.floor(Math.random() * YAMCHA_FLAVOR_LINES.length)];
  yamchaOverlay.classList.remove('hidden');
  mainBtn.disabled = true;
}

function hideYamchaEasterEgg() {
  yamchaOverlay.classList.add('hidden');
  const cb = yamchaResumeCallback;
  yamchaResumeCallback = null;
  if (cb) cb();
}

yamchaContinue.addEventListener('click', hideYamchaEasterEgg);

// Actually merges two roster members into one permanent fusion character —
// this costs a roster slot (2 members become 1), which is the real balance
// lever: fusing trades team size/synergy potential for raw power.
function performFusionMerge(baseNameA, baseNameB, fusionName, icon, isSpecial) {
  const idxA = game.roster.findIndex(c => (c.baseName || c.name) === baseNameA);
  const idxB = game.roster.findIndex(c => (c.baseName || c.name) === baseNameB);
  if (idxA === -1 || idxB === -1) return null;
  const a = game.roster[idxA];
  const b = game.roster[idxB];

  // Special (canon) fusions merge more efficiently than a random pairing.
  const efficiency = isSpecial ? 0.9 : 0.72;
  const combinedPower = Math.min(MAX_POWER, Math.round((a.power + b.power) * efficiency));

  const maxRarityRank = Math.max(RARITY_RANK[a.rarity], RARITY_RANK[b.rarity]);
  const bumpedRank = Math.min(RARITY_ORDER.length - 1, maxRarityRank + (isSpecial ? 1 : 0));
  const newRarity = RARITY_ORDER[bumpedRank];

  const fused = {
    name: fusionName,
    baseName: fusionName,
    universe: a.universe === b.universe ? a.universe : `${a.universe} × ${b.universe}`,
    rarity: newRarity,
    color: RARITIES[newRarity].color,
    power: combinedPower,
    awakenPhase: 0,
    sub: `${a.universe} × ${b.universe} · ${newRarity}`
  };

  [idxA, idxB].sort((x, y) => y - x).forEach(i => game.roster.splice(i, 1));
  game.roster.push(fused);

  if (fused.power > career.highestPower) career.highestPower = fused.power;
  return fused;
}

function startFusionSpin() {
  // Fusion only ever happens for curated special pairs (Goku+Vegeta, etc.) —
  // buildEventPool() only offers this phase when such a pair is present, so
  // this should always find one. The action-phase fallback is just a safety net.
  const special = getAvailableSpecialFusion();
  if (!special) { game.phase = 'action'; refreshUI(); return; }

  // No second "who fuses" spin needed — both members are already known and
  // both are always used, so it goes straight to the reveal.
  const fused = performFusionMerge(special.pair[0], special.pair[1], special.name, special.icon, true);
  if (fused) {
    logEvent(`🌀 SPECIAL FUSION: ${special.pair[0]} + ${special.pair[1]} permanently merge into ${special.name}! (Power ${fused.power})`);
    showEventPanel('success', `<b>${special.pair[0]}</b> and <b>${special.pair[1]}</b> permanently fuse into <b>${special.name}</b>! <b>Power ${fused.power}</b> — but they now share one roster slot.`);
  }
  game.phase = 'action';
  runProgressionChecks();
  refreshUI();
  showCelebration(special.name, special.flavor, special.icon);
}

function resolveMatch(opponent) {
  let bonus = 0;
  let forcedWin = false;
  let note = '';
  if (game.forceNextMatchLoss) {
    game.forceNextMatchLoss = false;
    game.lastWinChance = 0.05;
    const decoyPool = [
      { name: 'Victory', icon: '🏆', color: '#2ecc71', win: true, weight: 50, sub: 'Result' },
      { name: 'Defeat', icon: '💀', color: '#e74c3c', win: false, weight: 50, sub: 'Result' }
    ];
    runRoulette(decoyPool, `Match: vs ${opponent.name}!`, outcome => handleMatchResult(opponent, outcome), {
      forcedWinner: { name: 'Defeat', icon: '💀', color: '#e74c3c', win: false, sub: 'Result' }
    });
    return;
  }
  if (game.items.twinMoon > 0) {
    game.items.twinMoon--;
    forcedWin = true;
    note = ' Your Twin Moon Talisman guarantees the outcome!';
  } else if (game.items.chakraDraft > 0) {
    game.items.chakraDraft--;
    bonus += 1300;
    note = ' Your Chakra Draft surges through your team (+1300 power)!';
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
      game.roster.forEach(c => { c.power = Math.min(MAX_POWER, c.power + 325); if (c.power > career.highestPower) career.highestPower = c.power; });
      logEvent(`🏆 Won the ${tier.name} Trophy! Whole roster +325 power.`);
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
        showCelebration('MULTIVERSE CHAMPION!', `You conquered every league and defeated ${opponent.name}. Legends will speak of this run.`, '👑', isNewBest ? '🌟 New Personal Best!' : '', opponent.name);
        return;
      }

      showEventPanel('success', `You won the <b>${tier.name} Trophy</b>! Your whole roster grew stronger, and the <b>${currentTier().name}</b> is now open.`);
      game.phase = 'action';
      game.justWonTrophy = true;
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

  // Easter egg: losing with Yamcha as your one and only fighter is an
  // anime-fandom rite of passage. Purely cosmetic — pause here for the fun
  // aside, then resolve the real consequences once it's dismissed.
  if (game.roster.length === 1 && (game.roster[0].baseName || game.roster[0].name) === 'Yamcha') {
    showYamchaEasterEgg(() => resolveDefeatConsequences(opponent));
    return;
  }

  resolveDefeatConsequences(opponent);
}

function resolveDefeatConsequences(opponent) {
  // "Gear Fifth happened because Luffy lost to Kaido." — if Luffy is sitting
  // in his 2nd awakened form (Gear Fourth) when a defeat lands, despair
  // triggers his final awakening immediately, no roulette needed — and the
  // awakening itself IS the comeback, so it revives you even with zero
  // Phoenix Embers left. Otherwise the moment would be pointless.
  const luffyGear4 = game.roster.find(c => (c.baseName || c.name) === 'Monkey D. Luffy' && c.awakenPhase === 2);
  if (luffyGear4) {
    const chain = AWAKENING_CHAINS['Monkey D. Luffy'];
    const phaseData = chain[luffyGear4.awakenPhase];
    const oldPower = luffyGear4.power;
    luffyGear4.power = Math.min(MAX_POWER, Math.round(luffyGear4.power * phaseData.multiplier));
    luffyGear4.rarity = phaseData.newRarity;
    luffyGear4.color = RARITIES[phaseData.newRarity].color;
    luffyGear4.name = `${luffyGear4.baseName} (${phaseData.label})`;
    luffyGear4.sub = `${luffyGear4.universe} · ${luffyGear4.rarity}`;
    luffyGear4.awakenPhase++;
    if (luffyGear4.power > career.highestPower) career.highestPower = luffyGear4.power;
    logEvent(`☀️ Defeat becomes the catalyst — ${luffyGear4.name} awakens: ${phaseData.label}! (Power ${luffyGear4.power})`);
    career.phoenixSaves += 1;
    showEventPanel('success', `You were about to fall to <b>${opponent.name}</b> — but defeat itself was the spark. <b>${luffyGear4.name}</b> awakens: <b>${phaseData.label}</b>!`);
    game.phase = 'action';
    runProgressionChecks();
    refreshUI();
    showAwakenReveal(luffyGear4, phaseData, oldPower);
    return;
  }

  if (game.godMode || game.items.phoenixEmber > 0) {
    if (!game.godMode) game.items.phoenixEmber--;
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
  const keepGodMode = game.godMode;
  game = createInitialState();
  game.playerName = keepName;
  if (keepGodMode) {
    game.godMode = true;
    game.items.phoenixEmber = 99;
  }
  logList.innerHTML = '<span class="log-empty">Your tournament log will fill up here once you start spinning.</span>';
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
    case 'trade-select': startTradeSelectSpin(); break;
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

// Warm the browser's image cache with every character/villain portrait the
// game could possibly show, right away in the background — so by the time
// you actually spin, images load instantly instead of racing the animation
// and briefly showing the text fallback.
function preloadAllGameArt() {
  const characterNames = new Set();
  Object.values(ROSTER_BY_RARITY).forEach(list => list.forEach(c => characterNames.add(c.name)));
  Object.values(BONUS_PACK_ROSTER).forEach(list => list.forEach(c => characterNames.add(c.name)));
  MYTHIC_ROSTER.forEach(c => characterNames.add(c.name));
  Object.keys(AWAKENING_CHAINS).forEach(baseName => {
    AWAKENING_CHAINS[baseName].forEach(phase => characterNames.add(`${baseName} (${phase.label})`));
  });
  SPECIAL_FUSIONS.forEach(f => characterNames.add(f.name));
  characterNames.add(SECRET_PULL_CHARACTER.name);
  characterNames.add(SHARE_UNLOCK_CHARACTER.name);
  characterNames.forEach(name => { const img = new Image(); img.src = imagePathFor(name, 'character'); });

  const villainNames = new Set();
  TIERS.forEach(tier => tier.bracket.forEach(v => villainNames.add(v.name)));
  villainNames.add(SECRET_OPPONENT.name);
  villainNames.forEach(name => { const img = new Image(); img.src = imagePathFor(name, 'villain'); });
}
preloadAllGameArt();

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
