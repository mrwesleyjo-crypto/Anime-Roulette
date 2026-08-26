// =============================================================================
// data.js — static game data. No logic here, just definitions.
// Loaded first; everything below is available as globals to systems.js/main.js.
// =============================================================================

const RARITIES = {
  Useless: { weight: 18, color: '#5a5570', minPower: 15, maxPower: 35 },
  Common: { weight: 42, color: '#9aa5b1', minPower: 55, maxPower: 70 },
  Rare: { weight: 30, color: '#3498db', minPower: 71, maxPower: 82 },
  Epic: { weight: 13, color: '#a855f7', minPower: 83, maxPower: 92 },
  Legendary: { weight: 4, color: '#ffd24d', minPower: 93, maxPower: 100 },
  Mythic: { weight: 2, color: '#00ffcc', minPower: 105, maxPower: 115 }
};

const RARITY_ORDER = ['Useless', 'Common', 'Rare', 'Epic', 'Legendary', 'Mythic'];
const RARITY_RANK = RARITY_ORDER.reduce((acc, rarity, i) => { acc[rarity] = i; return acc; }, {});

// ---------------------------------------------------------------------------
// Power tiers — anime-flavored descriptors for your team's average power
// ---------------------------------------------------------------------------

const POWER_TIERS = [
  { max: 30, label: 'Unranked', icon: '💤', color: '#7a7a8a' },
  { max: 55, label: 'E-Rank Talent', icon: '🌱', color: '#9aa5b1' },
  { max: 75, label: 'D-Rank Threat', icon: '⚡', color: '#3498db' },
  { max: 95, label: 'C-Rank Threat', icon: '🔥', color: '#5dade2' },
  { max: 120, label: 'B-Rank Threat', icon: '⭐', color: '#a855f7' },
  { max: 160, label: 'A-Rank Threat', icon: '👑', color: '#ffd24d' },
  { max: 250, label: 'S-Rank Threat', icon: '🌍', color: '#ff9f43' },
  { max: 500, label: 'SS-Rank Catastrophe', icon: '🌌', color: '#ff2d6b' },
  { max: Infinity, label: 'SSS-Rank — Unclassifiable', icon: '♾️', color: '#00ffcc' }
];

function getPowerTier(avgPower) {
  return POWER_TIERS.find(t => avgPower <= t.max) || POWER_TIERS[POWER_TIERS.length - 1];
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
  ],
  'Ash Ketchum': [
    { label: 'Catches Pikachu', multiplier: 4, newRarity: 'Common', icon: '⚡', flavor: 'A wild Pikachu appears — and chooses Ash as its trainer! He is no longer fighting alone.' },
    { label: 'Full Team of Six', multiplier: 2, newRarity: 'Rare', icon: '🎒', flavor: 'Six Pokémon, one team — Ash commands a full battle roster!' },
    { label: 'League Champion', multiplier: 1.8, newRarity: 'Epic', icon: '🏆', flavor: 'After countless leagues and years of training, Ash finally becomes a Champion!' }
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
      { name: 'Zabuza Momochi', universe: 'Naruto', power: 36, icon: '🗡️', color: '#6b7f8c', quote: "A blade doesn't hesitate. Neither will I." },
      { name: 'Kabuto Yakushi', universe: 'Naruto', power: 42, icon: '🐍', color: '#5d8c5a', quote: "I've already analyzed your every move. This ends before it begins." },
      { name: 'Captain Ginyu', universe: 'Dragon Ball', power: 48, icon: '🟣', color: '#8e5ba8', quote: "Strike a pose — you're about to meet the strongest fighter in the universe!" },
      { name: 'Orochimaru', universe: 'Naruto', power: 55, icon: '🐍', color: '#5a6b4f', quote: 'Power is the only truth worth chasing. Let me have a taste of yours.' }
    ]
  },
  {
    name: 'Silver League',
    icon: '🥈',
    bracket: [
      { name: 'Grimmjow Jaegerjaquez', universe: 'Bleach', power: 48, icon: '🐆', color: '#3a7bd5', quote: 'I only fight opponents who can push me to my limit. Try not to disappoint me.' },
      { name: 'Hidan', universe: 'Naruto', power: 55, icon: '🔺', color: '#8c1c2b', quote: "Pain is a gift! Let's see how much of it you can take." },
      { name: 'Enel', universe: 'One Piece', power: 62, icon: '⚡', color: '#e0b93c', quote: 'Mortals like you were never meant to challenge a god of thunder.' },
      { name: 'Donquixote Doflamingo', universe: 'One Piece', power: 70, icon: '🧷', color: '#d162a4', quote: 'Everything and everyone is a string for me to pull, fufufu.' }
    ]
  },
  {
    name: 'Gold League',
    icon: '🥇',
    bracket: [
      { name: 'Ulquiorra Cifer', universe: 'Bleach', power: 70, icon: '🦇', color: '#4a4a52', quote: "Despair is the only truth. I'll show you yours." },
      { name: 'Cell', universe: 'Dragon Ball', power: 78, icon: '🟢', color: '#4caf6a', quote: 'I am the perfect being. You are simply another cell for me to absorb.' },
      { name: 'Akaza', universe: 'Demon Slayer', power: 86, icon: '👊', color: '#c94f6d', quote: 'Only the strong deserve to keep living. Prove that you belong.' },
      { name: 'Frieza (Final Form)', universe: 'Dragon Ball', power: 94, icon: '❄️', color: '#b073d1', quote: "I do hope you're prepared. I so rarely have to use more than one finger." }
    ]
  },
  {
    name: 'Platinum League',
    icon: '🏆',
    bracket: [
      { name: 'Muzan Kibutsuji', universe: 'Demon Slayer', power: 88, icon: '🌑', color: '#5b2a86', quote: 'Perfection is my birthright. Everything beneath me is disposable.' },
      { name: 'Kaido', universe: 'One Piece', power: 96, icon: '🐉', color: '#3d6b8c', quote: 'Call me the strongest creature alive — then try to prove me wrong.' },
      { name: 'Big Mom', universe: 'One Piece', power: 103, icon: '🍰', color: '#d43f6a', quote: "Give me your soul, and maybe I'll let you leave in one piece." },
      { name: 'Majin Buu', universe: 'Dragon Ball', power: 110, icon: '💗', color: '#e879b8', quote: "Buu doesn't understand strategy. Buu just doesn't stop." }
    ]
  },
  {
    name: 'Diamond League',
    icon: '💎',
    bracket: [
      { name: 'All For One', universe: 'My Hero Academia', power: 104, icon: '🌫️', color: '#4a4358', quote: 'Whatever power you have, I can simply take it for myself.' },
      { name: 'Griffith', universe: 'Berserk', power: 112, icon: '🦅', color: '#e8e4f0', quote: 'Dreams are worth any sacrifice. Even yours.' },
      { name: 'Meruem', universe: 'Hunter x Hunter', power: 119, icon: '👑', color: '#3a3a42', quote: 'I was born to be the strongest. You are merely a data point.' },
      { name: 'Frieza (Golden Form)', universe: 'Dragon Ball', power: 126, icon: '✨', color: '#e8c34a', quote: "This form cost me years of training I never wanted to do. You'd better be worth it." }
    ]
  },
  {
    name: 'Multiverse Final',
    icon: '👑',
    bracket: [
      { name: 'Beerus', universe: 'Dragon Ball Super', power: 118, icon: '🐱', color: '#8e5ba8', quote: "Amuse me, or I'll erase this whole arena from existence." },
      { name: 'Kaguya Otsutsuki', universe: 'Naruto', power: 126, icon: '🌙', color: '#c2a8e8', quote: 'Dimensions bend to my will. Yours is next.' },
      { name: 'Kars', universe: "JoJo's Bizarre Adventure", power: 134, icon: '💎', color: '#7ac9d4', quote: 'I am the pinnacle of all life. Perfection does not lose.' },
      { name: 'Fused Zamasu', universe: 'Dragon Ball Super', power: 142, icon: '♾️', color: '#4ce88a', quote: 'Mortals are a mistake I intend to erase — starting with you.' }
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
  groupSynergy('team-7', 'Team 7', '🍥', 26, 'Naruto, Sasuke, and Kakashi — the legendary genin squad reunites.', ['Naruto Uzumaki', 'Sasuke Uchiha', 'Kakashi Hatake'], 2),
  pairSynergy('sannin', 'Legendary Sannin', '🐌', 24, 'Jiraiya and Tsunade — two of the three legendary Sannin.', ['Jiraiya', 'Tsunade']),
  groupSynergy('leaf-legends', 'Leaf Village Legends', '🍃', 18, 'A gathering of Konoha\'s finest.', ['Naruto Uzumaki', 'Kakashi Hatake', 'Jiraiya', 'Tsunade', 'Might Guy'], 2),
  groupSynergy('uchiha-bloodline', 'Uchiha Bloodline', '👁️', 24, 'Sasuke, Itachi, and Madara — the Sharingan runs deep in this roster.', ['Sasuke Uchiha', 'Itachi Uchiha', 'Madara Uchiha'], 2),
  pairSynergy('ninja-academy', 'Ninja Academy', '📜', 12, 'Naruto looks out for the next generation.', ['Naruto Uzumaki', 'Konohamaru Sarutobi']),
  pairSynergy('akatsuki-ties', 'Akatsuki Ties', '☁️', 16, 'Itachi and Madara, bound by a dangerous organization\'s history.', ['Itachi Uchiha', 'Madara Uchiha']),
  pairSynergy('family-ties-uchiha', 'Brothers in Blood', '🩸', 14, 'Itachi and Sasuke — brothers, rivals, family.', ['Itachi Uchiha', 'Sasuke Uchiha']),
  pairSynergy('mentor-jiraiya', 'The Toad Sage\'s Student', '🐸', 12, 'Jiraiya trained him well.', ['Jiraiya', 'Naruto Uzumaki']),
  pairSynergy('mentor-kakashi', 'Copy Ninja\'s Pupil', '🐺', 12, 'Kakashi never truly stops watching over his students.', ['Kakashi Hatake', 'Sasuke Uchiha']),

  groupSynergy('straw-hats', 'Straw Hat Alliance', '🏴‍☠️', 20, 'Multiple Straw Hat crew members, sailing and fighting as one.', ['Monkey D. Luffy', 'Roronoa Zoro', 'Portgas D. Ace', 'Shanks'], 2),
  groupSynergy('east-blue-trio', 'East Blue Trio', '⛵', 20, 'Luffy, Zoro, and Usopp — where the legend began.', ['Monkey D. Luffy', 'Roronoa Zoro', 'Usopp'], 2),
  pairSynergy('yonko-alliance', 'Yonko\'s Shadow', '👑', 22, 'Whitebeard and Shanks — two of the Four Emperors.', ['Whitebeard', 'Shanks']),
  pairSynergy('legendary-blades', 'Legendary Blades', '⚔️', 16, 'Zoro and Levi — masters of the sword, from different worlds.', ['Roronoa Zoro', 'Levi Ackerman']),

  groupSynergy('z-fighters', 'Z Fighters', '🐉', 26, 'Goku, Vegeta, Gohan, and Piccolo assemble to defend the universe.', ['Goku', 'Vegeta', GOHAN_ANY, 'Piccolo'], 2),
  pairSynergy('saiyan-pride', 'Saiyan Pride', '⚡', 22, 'Goku and Vegeta together — rival Saiyans pushing each other past their limits.', ['Goku', 'Vegeta']),
  groupSynergy('bulma-crew', 'Bulma\'s Support Squad', '🔧', 14, 'Bulma, Chichi, and Yamcha — the ones who keep the Z Fighters grounded.', ['Bulma', 'Chichi', 'Yamcha'], 2),
  groupSynergy('angels-and-gods', 'Angels & Gods', '😇', 30, 'Whis, the Grand Priest, and Zeno — beings above mortal power scales entirely.', ['Whis', 'Grand Priest', 'Zeno'], 2),

  groupSynergy('soul-society', 'Soul Society', '⚔️', 22, 'Ichigo, Rukia, Toshiro, and Yoruichi represent the Soul Reapers.', ['Ichigo Kurosaki', 'Rukia Kuchiki', 'Toshiro Hitsugaya', 'Yoruichi Shihoin'], 2),
  pairSynergy('substitute-and-officer', 'Substitute Shinigami Duo', '❄️', 20, 'Ichigo and Rukia — the pair that started it all.', ['Ichigo Kurosaki', 'Rukia Kuchiki']),

  groupSynergy('class-1a', 'Class 1-A', '🎓', 22, 'Izuku, Bakugo, and Todoroki — UA\'s brightest (and loudest) students.', ['Izuku Midoriya', 'Bakugo Katsuki', 'Todoroki Shoto'], 2),
  pairSynergy('symbol-of-peace-legacy', 'Symbol of Peace\'s Legacy', '💪', 18, 'All Might passed the torch — and still fights beside his successor.', ['All Might', 'Izuku Midoriya']),

  groupSynergy('demon-slayer-corps', 'Demon Slayer Corps', '🗡️', 24, 'Tanjiro, Zenitsu, and Inosuke reunite — the training-arc trio rides again.', ['Tanjiro Kamado', 'Zenitsu Agatsuma', 'Inosuke Hashibira'], 2),
  pairSynergy('hashira-council', 'Hashira Council', '🌸', 18, 'Giyu and Shinobu — Pillars of the Demon Slayer Corps.', ['Giyu Tomioka', 'Shinobu Kocho']),

  groupSynergy('jujutsu-high', 'Jujutsu High', '🔮', 22, 'Yuji, Megumi, and Nobara — first-years with unlimited potential.', ['Yuji Itadori', 'Megumi Fushiguro', 'Nobara Kugisaki'], 2),
  pairSynergy('six-eyes-sensei', 'Six Eyes Sensei', '👓', 20, 'Gojo keeps a close eye on his most promising student.', ['Gojo Satoru', 'Megumi Fushiguro']),

  pairSynergy('hxh-duo', 'Gon & Killua', '🤝', 18, 'Best friends since the Hunter Exam — they always fight better together.', ['Gon Freecss', 'Killua Zoldyck']),
  pairSynergy('freecss-family', 'Freecss Family', '🎣', 16, 'Gon finally fights alongside the father he searched the world for.', ['Gon Freecss', 'Ging Freecss']),

  groupSynergy('fairy-tail-guild', 'Fairy Tail Guild', '🧚', 22, 'Natsu, Gray, and Erza — the guild\'s strongest mages, united.', ['Natsu Dragneel', 'Gray Fullbuster', ERZA_ANY], 2),
  pairSynergy('fire-and-ice', 'Fire and Ice', '🔥', 16, 'Natsu and Gray — eternal rivals, unstoppable together.', ['Natsu Dragneel', 'Gray Fullbuster']),

  groupSynergy('survey-corps', 'Survey Corps', '🦅', 24, 'Eren, Mikasa, Armin, and Levi — humanity\'s strongest soldiers.', ['Eren Yeager', 'Mikasa Ackerman', 'Armin Arlert', 'Levi Ackerman'], 2),
  groupSynergy('childhood-trio', 'Childhood Trio', '🏠', 18, 'Eren, Mikasa, and Armin — friends since before the walls fell.', ['Eren Yeager', 'Mikasa Ackerman', 'Armin Arlert'], 2),

  groupSynergy('devil-hunters', 'Devil Hunters', '🩸', 20, 'Denji, Power, and Aki — Public Safety\'s most chaotic division.', ['Denji', 'Power', 'Aki Hayakawa'], 2),

  pairSynergy('cat-and-mouse', 'Cat and Mouse', '🔍', 22, 'Light and L — the greatest rivalry ever written, now on the same team.', ['Light Yagami', 'L']),
  pairSynergy('genius-strategists-2', 'Battle of Wits', '🧠', 20, 'Two of the sharpest minds across the multiverse, for once cooperating.', ['L', 'Lelouch Lamperouge']),

  pairSynergy('stand-users', 'Stand Users', '⭐', 22, 'Jotaro and Dio — bitter enemies, undeniable power.', ['Jotaro Kujo', 'Dio Brando']),

  pairSynergy('spirits-and-guys', 'Spirits and Guys', '👻', 14, 'Mob and Reigen — psychic power meets pure confidence.', ['Mob (Shigeo Kageyama)', 'Reigen Arataka']),

  pairSynergy('hero-duo', 'Master & Disciple', '👊', 20, 'Saitama and Genos — one serious punch, one cyborg barrage.', ['Saitama', 'Genos']),
  pairSynergy('number-one-heroes', 'Number One Heroes', '🥇', 24, 'Saitama and All Might — two answers to "who is the strongest hero?"', ['Saitama', 'All Might']),

  groupSynergy('sin-brothers', 'Sin Brothers', '7️⃣', 26, 'Escanor, Ban, and Meliodas — three of the Seven Deadly Sins.', ['Escanor', 'Ban', MELIODAS_ANY], 2),

  pairSynergy('magic-knights', 'Magic Knights', '🍀', 16, 'Asta and Yami — the Black Bulls\' most explosive duo.', ['Asta', 'Yami Sukehiro']),
  pairSynergy('elric-and-mustang', 'State Alchemists', '🔥', 16, 'Edward and Roy — equivalent exchange meets the Flame Alchemist.', ['Edward Elric', 'Roy Mustang']),

  // --- "Twin Selves" — owning both versions of a split character at once ---------
  bothFormsSynergy('twin-selves-gohan', 'Two Gohans, One Timeline', '♊', 20, 'Kid Gohan and Beast Gohan, somehow standing side by side.', GOHAN_ANY),
  bothFormsSynergy('twin-selves-erza', 'Two Ezras, Two Armors', '♊', 20, 'Both of Erza\'s iconic armors, worn at once.', ERZA_ANY),
  bothFormsSynergy('twin-selves-guts', 'The Black Swordsman, Twice Over', '♊', 20, 'Both eras of Guts fighting in the same roster.', GUTS_ANY),
  bothFormsSynergy('twin-selves-kaneki', 'One Man, Two Forms', '♊', 20, 'Half-Ghoul and One-Eyed King, together at last.', KANEKI_ANY),
  bothFormsSynergy('twin-selves-sungjinwoo', 'From E-Rank to Monarch', '♊', 22, 'The full journey of the Shadow Monarch, represented at once.', SUNGJINWOO_ANY),
  bothFormsSynergy('twin-selves-alucard', 'No Life King, Twice', '♊', 20, 'Alucard in both of his terrifying forms.', ALUCARD_ANY),
  bothFormsSynergy('twin-selves-meliodas', 'Captain and Demon King', '♊', 20, 'Meliodas before and after his true nature awakens.', MELIODAS_ANY),

  // --- Trope & joke synergies -----------------------------------------------------
  groupSynergy('overpowered-protagonists', 'Strongest There Is', '💥', 26, 'Saitama, Escanor, and All Might — each the undisputed strongest of their world.', ['Saitama', 'Escanor', 'All Might'], 2),
  groupSynergy('isekai-legends', 'Isekai Legends', '🌀', 24, 'Rimuru, Anos, and Ainz — reincarnated (or transported) into unstoppable power.', ['Rimuru Tempest', 'Anos Voldigoad', 'Ainz Ooal Gown'], 2),
  pairSynergy('reincarnated-heroes', 'Reincarnated Heroes', '🔁', 16, 'Rimuru and Anos, both given a second life and a first-class power set.', ['Rimuru Tempest', 'Anos Voldigoad']),
  groupSynergy('shadow-and-demon-kings', 'Shadow & Demon Kings', '😈', 28, 'Sung Jin-Woo, Meliodas, and Anos — rulers of darkness in their own right.', [SUNGJINWOO_ANY, MELIODAS_ANY, 'Anos Voldigoad'], 2),
  groupSynergy('the-kings', 'The Kings', '👑', 26, 'Ainz, Anos, and Meliodas — each a king of their own domain.', ['Ainz Ooal Gown', 'Anos Voldigoad', MELIODAS_ANY], 2),

  groupSynergy('silver-haired-squad', 'Silver-Haired Squad', '🩶', 14, 'Toshiro, Killua, and Kakashi — a coincidence of hair color, or a sign of power?', ['Toshiro Hitsugaya', 'Killua Zoldyck', 'Kakashi Hatake'], 2),
  groupSynergy('golden-hair-alliance', 'Golden Hair Alliance', '💛', 12, 'Naruto, Armin, Edward, and Zenitsu — a blonde battalion.', ['Naruto Uzumaki', 'Armin Arlert', 'Edward Elric', 'Zenitsu Agatsuma'], 2),
  pairSynergy('redhead-rally', 'Redhead Rally', '🔴', 14, 'Erza and Shanks — fire-haired and fiercely powerful.', [ERZA_ANY, 'Shanks']),

  groupSynergy('swordsmen-union', 'Swordsmen Union', '🗡️', 22, 'Zoro, Levi, Guts, and Erza — masters of the blade from every corner of the multiverse.', ['Roronoa Zoro', 'Levi Ackerman', GUTS_ANY, ERZA_ANY], 2),
  groupSynergy('fists-of-fury', 'Fists of Fury', '👊', 20, 'Saitama, All Might, Bakugo, and Might Guy — pure martial power, no weapons needed.', ['Saitama', 'All Might', 'Bakugo Katsuki', 'Might Guy'], 2),
  groupSynergy('genius-strategists', 'Genius Strategists', '🧩', 22, 'L, Lelouch, and Light — masterminds who see ten moves ahead.', ['L', 'Lelouch Lamperouge', 'Light Yagami'], 2),
  groupSynergy('prodigies', 'Prodigies', '✨', 20, 'Itachi, Gojo, Killua, and Todoroki — child geniuses who never stopped growing.', ['Itachi Uchiha', 'Gojo Satoru', 'Killua Zoldyck', 'Todoroki Shoto'], 2),
  groupSynergy('immortals-club', 'Immortals Club', '♾️', 24, 'Ban, Alucard, and Yhwach — death is more of a suggestion to this crowd.', ['Ban', ALUCARD_ANY, 'Yhwach'], 2),
  groupSynergy('big-brother-energy', 'Big Brother Energy', '🫂', 16, 'Whitebeard, All Might, and Kakashi — mentors who protect everyone around them.', ['Whitebeard', 'All Might', 'Kakashi Hatake'], 2),
  groupSynergy('comic-relief-crew', 'Comic Relief Crew', '🤡', 12, 'Yamcha, Mr. Satan, and Usopp — legendary cowards, occasional heroes.', ['Yamcha', 'Mr. Satan', 'Usopp'], 2),
  pairSynergy('reapers-and-ghouls', 'Reapers & Ghouls', '💀', 14, 'Ichigo and Kaneki — death and hunger, crossing paths.', ['Ichigo Kurosaki', KANEKI_ANY]),
  groupSynergy('multiverse-core-four', 'The Core Four', '🔱', 34, 'Naruto, Luffy, Goku, and Ichigo — four of the most iconic protagonists in anime, together.', ['Naruto Uzumaki', 'Monkey D. Luffy', 'Goku', 'Ichigo Kurosaki'], 3),
  groupSynergy('big-three', 'The Big Three', '🔱', 30, 'Naruto, Luffy, and Goku all on one roster — the three shonen legends fight side by side.', ['Naruto Uzumaki', 'Monkey D. Luffy', 'Goku'], 3),

  // --- Awakened-state synergies (name reflects the current transformation) -------
  stateSynergy('six-paths-active', 'Six Paths Awakened', '☯️', 20, 'Naruto has reached Six Paths Sage Mode — a power beyond mortal limits.', 'Six Paths'),
  stateSynergy('ultra-instinct-active', 'Ultra Instinct Engaged', '⬜', 26, 'Goku moves on pure instinct, body ahead of mind.', 'Ultra Instinct'),
  stateSynergy('super-saiyan-active', 'Super Saiyan Ascended', '⚡', 18, 'A golden aura burns — Super Saiyan has been unlocked.', 'Super Saiyan'),
  stateSynergy('bankai-released', 'Bankai Released', '🌑', 18, '"Bankai!" — a Zanpakuto\'s true form has been revealed.', 'Bankai'),
  stateSynergy('getsuga-active', 'Final Getsuga Tensho', '🌌', 24, 'A power that costs everything has been unleashed.', 'Getsuga'),
  stateSynergy('gear-fifth-active', 'Gear Fifth Unlocked', '☀️', 24, 'The laughter of legend — Luffy has reached his ultimate form.', 'Gear Fifth'),
  stateSynergy('susanoo-active', 'Susanoo Manifested', '👹', 18, 'Ribs of chakra tower over the arena.', 'Susanoo'),
  stateSynergy('full-cowl-active', 'Full Cowl 100%', '💚', 16, 'One For All is surging at its absolute limit.', 'Full Cowl'),

  // --- Roster size synergies -------------------------------------------------------
  sizeSynergy('dynamic-duo', 'Dynamic Duo', '👥', 8, 'Two fighters, perfectly in sync.', 2),
  sizeSynergy('terrific-trio', 'Terrific Trio', '👨‍👩‍👧', 10, 'Three fighters covering every angle.', 3),
  sizeSynergy('fantastic-four', 'Fantastic Four', '🃏', 12, 'A well-rounded four-fighter roster.', 4),
  sizeSynergy('famous-five', 'Famous Five', '🖐️', 14, 'Five fighters deep — very few gaps left to exploit.', 5),
  sizeSynergy('final-six', 'Final Six', '💯', 16, 'A completely full roster — every slot earning its place.', 6),

  // --- Rarity composition -----------------------------------------------------------
  rarityCompositionSynergy('all-common', 'Grounded Squad', '⚪', 8, 'Every fighter is Common rarity — humble, but reliable.', 'Common'),
  rarityCompositionSynergy('all-rare', 'Rare Formation', '🔵', 16, 'Every fighter on this roster is Rare or better, uniformly.', 'Rare'),
  rarityCompositionSynergy('all-epic', 'Epic Formation', '🟣', 24, 'A roster built entirely of Epic-tier fighters.', 'Epic'),
  {
    id: 'elite-tier',
    name: 'Multiversal Elite',
    icon: '👑',
    bonus: 32,
    desc: 'Your whole roster is Legendary or Mythic — an assembly of true powerhouses.',
    check: (names, roster) => roster.length >= 2 && roster.every(c => RARITY_RANK[c.rarity] >= RARITY_RANK.Legendary)
  },
  rarityCompositionSynergy('all-mythic', 'Beyond the Multiverse', '🌈', 45, 'Every single fighter is Mythic-tier. This should not be possible.', 'Mythic'),
  {
    id: 'no-weak-links',
    name: 'No Weak Links',
    icon: '🛡️',
    bonus: 18,
    desc: 'Not a single Useless or Common fighter in sight — a serious roster.',
    check: (names, roster) => roster.length >= 2 && roster.every(c => RARITY_RANK[c.rarity] >= RARITY_RANK.Rare)
  },
  {
    id: 'elite-six',
    name: 'The Chosen Few',
    icon: '💎',
    bonus: 28,
    desc: 'A full six-fighter roster with nobody below Rare rarity.',
    check: (names, roster) => roster.length === 6 && roster.every(c => RARITY_RANK[c.rarity] >= RARITY_RANK.Rare)
  },
  {
    id: 'rainbow-roster',
    name: 'Rainbow Roster',
    icon: '🌈',
    bonus: 50,
    desc: 'One fighter of every single rarity, from Useless to Mythic — the full spectrum, assembled.',
    check: (names, roster) => roster.length === 6 && RARITY_ORDER.every(r => roster.filter(c => c.rarity === r).length === 1)
  },
  {
    id: 'underdog-story',
    name: 'David and Goliath',
    icon: '🪨',
    bonus: 12,
    desc: 'A Useless fighter and a Legendary-or-better fighter, side by side — the ultimate power gap.',
    check: (names, roster) => roster.some(c => c.rarity === 'Useless') && roster.some(c => RARITY_RANK[c.rarity] >= RARITY_RANK.Legendary)
  },

  // --- Power-level thresholds --------------------------------------------------------
  {
    id: 'overwhelming-force',
    name: 'Overwhelming Force',
    icon: '💢',
    bonus: 18,
    desc: 'Your average power exceeds 150 — this team hits hard.',
    check: (names, roster) => roster.length >= 2 && (roster.reduce((s, c) => s + c.power, 0) / roster.length) > 150
  },
  {
    id: 'absolute-power',
    name: 'Absolute Power',
    icon: '🌟',
    bonus: 32,
    desc: 'Your average power exceeds 250 — a roster that defies the power scale.',
    check: (names, roster) => roster.length >= 2 && (roster.reduce((s, c) => s + c.power, 0) / roster.length) > 250
  },
  {
    id: 'glass-cannon-cinema',
    name: 'Power Overwhelming',
    icon: '💣',
    bonus: 20,
    desc: 'Total combined power exceeds 600.',
    check: (names, roster) => roster.reduce((s, c) => s + c.power, 0) > 600
  },
  {
    id: 'balanced-squad',
    name: 'Perfectly Matched',
    icon: '⚖️',
    bonus: 14,
    desc: 'Every fighter is within a tight power range of each other — no weak link to exploit.',
    check: (names, roster) => {
      if (roster.length < 3) return false;
      const powers = roster.map(c => c.power);
      return (Math.max(...powers) - Math.min(...powers)) < 15;
    }
  },

  // --- Mastery & awakening progress ---------------------------------------------------
  {
    id: 'veteran-squad',
    name: 'Battle-Tested',
    icon: '🎖️',
    bonus: 14,
    desc: 'At least two fighters carry Mastery from being scouted before — experience shows.',
    check: (names, roster) => roster.filter(c => masteryLevelFor(c.baseName || c.name) > 0).length >= 2
  },
  {
    id: 'awakened-ensemble',
    name: 'Ascended Forms',
    icon: '✨',
    bonus: 20,
    desc: 'At least two fighters have undergone an Awakening.',
    check: (names, roster) => roster.filter(c => c.awakenPhase > 0).length >= 2
  },
  {
    id: 'raw-potential',
    name: 'Raw Potential',
    icon: '🌱',
    bonus: 10,
    desc: 'Not a single fighter has awakened yet — untapped power, still waiting.',
    check: (names, roster) => roster.length >= 3 && roster.every(c => c.awakenPhase === 0)
  },
  {
    id: 'rookie-roster',
    name: 'Rookie Roster',
    icon: '🆕',
    bonus: 8,
    desc: 'A team of fresh faces — nobody here has Mastery yet.',
    check: (names, roster) => roster.length >= 3 && roster.every(c => masteryLevelFor(c.baseName || c.name) === 0)
  },

  // --- Universe diversity discrete tiers ------------------------------------------------
  {
    id: 'crossover-special',
    name: 'Crossover Special',
    icon: '🎬',
    bonus: 16,
    desc: 'Fighters from at least 4 different anime, working together.',
    check: (names, roster) => new Set(roster.map(c => c.universe)).size >= 4
  },
  {
    id: 'multiverse-roadshow',
    name: 'Multiverse Roadshow',
    icon: '🚀',
    bonus: 22,
    desc: 'Fighters from at least 5 different anime — a true crossover event.',
    check: (names, roster) => new Set(roster.map(c => c.universe)).size >= 5
  },
  {
    id: 'infinite-diversity',
    name: 'Infinite Diversity',
    icon: '🌌',
    bonus: 30,
    desc: 'Six fighters, six completely different anime — total crossover chemistry.',
    check: (names, roster) => roster.length === 6 && new Set(roster.map(c => c.universe)).size === 6
  },
  {
    id: 'grand-finale-assembly',
    name: 'Grand Finale Assembly',
    icon: '🏆',
    bonus: 38,
    desc: 'A full six-fighter roster spanning at least four different anime — your ultimate team.',
    check: (names, roster) => roster.length === 6 && new Set(roster.map(c => c.universe)).size >= 4
  },
  {
    id: 'same-anime',
    name: 'One Universe, United',
    icon: '📖',
    bonus: 20,
    desc: 'Every fighter on your roster hails from the same anime.',
    check: (names, roster) => roster.length >= 2 && new Set(roster.map(c => c.universe)).size === 1
  },

  {
    id: 'useless-squad',
    name: 'Useless Squad',
    icon: '🤡',
    bonus: 10,
    desc: 'Every fighter on this team is, on paper, completely useless. There is a strange power in having absolutely nothing to lose.',
    check: (names, roster) => roster.length >= 2 && roster.every(c => c.rarity === 'Useless')
  },

  {
    id: 'multiverse-ensemble',
    name: 'Multiverse Ensemble',
    icon: '🌌',
    bonus: 0, // computed dynamically below
    desc: 'A team drawn from many different anime — raw crossover chemistry.',
    check: (names, roster) => roster.length >= 3
  }
];

function computeActiveSynergy() {
  const roster = game.roster;
  if (roster.length < 2) return null;
  const names = new Set(roster.map(c => c.baseName || c.name));

  let best = null;
  for (const def of SYNERGY_DEFS) {
    if (def.id === 'multiverse-ensemble') continue; // fallback, evaluated last
    if (def.check(names, roster)) {
      if (!best || def.bonus > best.bonus) best = { ...def };
    }
  }
  if (best) return best;

  // Fallback: reward genuine anime diversity across a near-full roster.
  const ensembleDef = SYNERGY_DEFS.find(d => d.id === 'multiverse-ensemble');
  if (ensembleDef.check(names, roster)) {
    const uniqueUniverses = new Set(roster.map(c => c.universe)).size;
    const bonus = Math.min(24, uniqueUniverses * 4);
    return { ...ensembleDef, bonus };
  }
  return null;
}

// ---------------------------------------------------------------------------
// The rarest possible pull in the game — not part of any normal rarity pool.
// A tiny independent roll on every Scout spin (see startScoutSpin) can
// override the result entirely with this absurd multiverse anomaly.
// ---------------------------------------------------------------------------

const SECRET_PULL_CHANCE = 0.003; // 0.3% per Scout spin
const SECRET_PULL_CHARACTER = {
  name: 'Ultra Instinct Shaggy',
  baseName: 'Ultra Instinct Shaggy',
  universe: 'Multiverse Anomaly',
  rarity: 'Mythic',
  color: '#00ffcc',
  power: 140,
  weight: 1,
  sub: 'Multiverse Anomaly · Mythic',
  isStarter: false,
  awakenPhase: 0
};

// Secret bonus opponent — only fightable after the "Two Absurd Powers" secret
// achievement unlocks it. Not part of the normal bracket progression.
const SECRET_OPPONENT = {
  name: 'The Watcher', universe: '???', power: 130, icon: '👁️', color: '#ffffff',
  quote: 'I have observed every roulette spin across every universe. Show me something new.',
  shardReward: 75
};

const TOTAL_MATCHES = TIERS.length * 4; // 24 — the full-clear score

const ACTION_META = {
  scout: { name: 'Scout', icon: '🥷', kanji: '偵察', color: '#2ecc71' },
  train: { name: 'Train', icon: '🥋', kanji: '修行', color: '#f1c40f' },
  trade: { name: 'Dimensional Swap', icon: '🌌', kanji: '次元', color: '#3498db' },
  match: { name: 'Match', icon: '⚔️', kanji: '決闘', color: '#e67e22' },
  item: { name: 'Treasure', icon: '🎁', kanji: '秘宝', color: '#ff9f43' },
  awaken: { name: 'Awakening', icon: '💥', kanji: '覚醒', color: '#ff6b81' },
  fusion: { name: 'Fusion', icon: '🌀', kanji: '融合', color: '#00e5ff' }
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
    justWonTrophy: false
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
const powerTierLabel = document.getElementById('power-tier-label');
const powerTierBarFill = document.getElementById('power-tier-bar-fill');
const synergyBanner = document.getElementById('synergy-banner');
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
  const teamSizeBonus = (rosterSize - 1) * 4;
  const activeSynergy = computeActiveSynergy();
  const teamSynergyBonus = activeSynergy ? activeSynergy.bonus : 0;
  const effectivePower = avgPower + teamSizeBonus + teamSynergyBonus + (bonus || 0);
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

// ---------------------------------------------------------------------------
// Pull sound effects — synthesized with Web Audio, no external files needed.
// ---------------------------------------------------------------------------

let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; }
  }
  return audioCtx;
}

// Browsers only allow an AudioContext to start/resume when that call happens
// synchronously inside a real user-gesture handler (a click). Our reveal
// sounds fire several setTimeout()s deep inside the spin sequence, which is
// too far removed from the original click for browsers to allow — so we
// "unlock" audio eagerly on the very first click anywhere on the page.
function unlockAudioOnce() {
  const ctx = getAudioCtx();
  if (ctx && ctx.state === 'suspended') ctx.resume();
  document.removeEventListener('click', unlockAudioOnce);
}
document.addEventListener('click', unlockAudioOnce);

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
  const winner = weightedPick(pool);

  const items = [];
  for (let i = 0; i < TOTAL_ITEMS; i++) {
    if (i === WINNER_INDEX) {
      items.push(winner);
      continue;
    }
    // Fake-out: bias a few slots just before the pointer toward high-rarity
    // cards, so the strip teases a big pull even when the real winner is not one.
    if (characterReveal && i >= WINNER_INDEX - 5 && i < WINNER_INDEX && Math.random() < 0.3) {
      const flashy = pool.filter(c => c.rarity && RARITY_RANK[c.rarity] >= RARITY_RANK.Epic);
      items.push(flashy.length > 0 ? flashy[Math.floor(Math.random() * flashy.length)] : weightedPick(pool));
    } else {
      items.push(weightedPick(pool));
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

  const powerTier = getPowerTier(avgPower);
  powerTierLabel.textContent = `${powerTier.icon} ${powerTier.label}`;
  powerTierLabel.style.color = powerTier.color;
  powerTierBarFill.style.width = `${clamp((avgPower / 300) * 100, avgPower > 0 ? 3 : 0, 100)}%`;
  powerTierBarFill.style.background = powerTier.color;

  const synergy = computeActiveSynergy();
  if (synergy) {
    synergyBanner.classList.remove('hidden');
    synergyBanner.innerHTML = `<span class="synergy-icon">${synergy.icon}</span><div><b>${synergy.name}</b> <span class="synergy-bonus">+${synergy.bonus} power</span><div class="synergy-desc">${synergy.desc}</div></div>`;
  } else {
    synergyBanner.classList.add('hidden');
    synergyBanner.innerHTML = '';
  }

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

    const powerBarWrap = document.createElement('div');
    powerBarWrap.className = 'roster-card-powerbar';
    const powerBarFill = document.createElement('div');
    powerBarFill.className = 'roster-card-powerbar-fill';
    powerBarFill.style.width = `${clamp((c.power / 200) * 100, 4, 100)}%`;
    powerBarFill.style.background = c.color;
    powerBarWrap.appendChild(powerBarFill);

    body.append(name, power, rarity, powerBarWrap);

    const masteryLvl = masteryLevelFor(c.baseName || c.name);
    if (masteryLvl > 0) {
      const mastery = document.createElement('span');
      mastery.className = 'roster-card-mastery';
      mastery.textContent = `★ Mastery +${masteryLvl} power`;
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
  viewport.classList.toggle('rift-active', !!game.riftActive);
}

// ----------------------