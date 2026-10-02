// ── pixel sprite atlas ────────────────────────────────────────────────────────
// Each sprite is an array of strings; chars index into PAL. "." = transparent.
// Animated things expose frames: string[][] — PxSprite cycles them.

export const PAL: Record<string, string> = {
  k: "#14101f", // outline / near-black
  w: "#f3ead3", // parchment white
  g: "#f2b83b", // gold
  G: "#8a6420", // gold shade
  s: "#e8b483", // skin
  r: "#c9403d", // banner red / cape
  R: "#7e2624", // cape shade
  b: "#3a2f45", // leather / boots
  B: "#7fb3d5", // pale blue
  e: "#1d1428", // eye
  t: "#5a3d2b", // wood
  T: "#8a6244", // light wood
  f: "#ff9e3d", // flame
  F: "#ffd94a", // flame core
  m: "#8fa3bf", // steel
  M: "#5d6b80", // steel shade
  p: "#b48ec7", // potion purple
  n: "#4f7a4a", // leaf green
  N: "#2f4d2e", // dark green
  v: "#6a4a8a", // violet robe
  V: "#453060", // violet shade
  a: "#4a4454", // apron / dark cloth
  c: "#7fe3d0", // cyan glow / slime
  C: "#3a8a7a", // slime shade
  h: "#b8a584", // hood tan
  H: "#8a7a5c", // robe tan shade
  d: "#3d3450", // dark robe / bat
  y: "#e8c53a", // merchant hat yellow
  u: "#4a6a9a", // scholar blue
  q: "#cfe8f0", // ghost pale
  D: "#454055", // dark steel / stone
};

// ── THE KNIGHT (16×16) — plumed helm, steel mail, raised torch ────────────────
// 4 frames: idle×2, walk×2. Flame flickers via pixels baked into each frame.

const K_TOP = [
  "..rr..............",   // plume
  ".krrk..............",
  ".kmmmmk.............",  // helm dome
  ".kmmemk.............",  // eye slit
  "..kmmmmk.............", // gorget
];

const K_T1 = ["rkmmmmmk..ff......", "rkmmmmmk..fFf.....", ".kmmmmmk...ff.....", ".kmmmmmk..kk......", ".kmmmmk...tk......", "..kmmmk...tk......", "...kkk....t......."];
const K_T2 = ["rkmmmmmk...f......", "rkmmmmmk..fFf.....", ".kmmmmmk...ff.....", ".kmmmmmk..kk......", ".kmmmmk...tk......", "..kmmmk...tk......", "...kkk....t......."];

const K_LEGS_IDLE = ["..kmmmk.........", "..kkkkk.........", "...kbkbk........", "...b...b........", "...b...b........"];
const K_LEGS_W1 = ["..kmmmk.........", "..kkkkk.........", "..kbk.kbk.......", "..bb...bb.......", "..b.....b......."];
const K_LEGS_W2 = ["..kmmmk.........", "..kkkkk.........", "...kbbbk........", "....b.b.........", "....b.b........."];

export const KING_IDLE = [ [...K_TOP, ...K_T1, ...K_LEGS_IDLE], [...K_TOP, ...K_T2, ...K_LEGS_IDLE] ];
export const KING_WALK = [ [...K_TOP, ...K_T1, ...K_LEGS_W1], [...K_TOP, ...K_T2, ...K_LEGS_W2] ];

// ── VILLAGER ARCHETYPES (12×13) ───────────────────────────────────────────────

export const MERCHANT = [
  "..yyyyyy....",
  ".yyyyyyyy...",
  "...ksssk....",
  "...kssek....",
  "...kssk.....",
  "..khhhhk....",
  ".khhhhhhk...",
  ".khhkkhhk...",
  ".khhhhhhk.t.",
  "..khhhhk....",
  "..kbbbk.....",
  "..b...b.....",
  "..b...b.....",
];

export const WIZARD = [
  ".....p......",
  "....ppk.....",
  "...vvpvk....",
  "..vvvvvvk...",
  "...kssk.....",
  "...ksek.....",
  "...kssk.....",
  "..kvvvvk....",
  ".kvvvvvvk.t.",
  ".kvvkvvvk.t.",
  ".kvvvvvvk..F",
  "..kvvvvk..t.",
  "..kkkkkk....",
];

export const SCHOLAR = [
  "...kuuuk....",
  "..kuuuuuk...",
  "...ksssk....",
  "...kssek....",
  "...kssk.....",
  "..kuuuuk....",
  ".kuuuuuuk...",
  ".kuukuuuk...",
  ".kuwwwwuk...",
  "..kwkwkuk...",
  "..kwwwwk....",
  "..kbbbk.....",
  "...b.b......",
];

export const SMITH = [
  "...ktttk....",
  "..kssssk....",
  "...kssek....",
  "...kssk.....",
  "..kaaaak....",
  ".kssaassk.k.",
  ".kssassskTTk",
  ".kaaaaaak.k.",
  ".kaaaaaak...",
  "..kaaaak....",
  "..kbbbk.....",
  "..b...b.....",
  "..b...b.....",
];

export const HERALD = [
  "....krrrk...",
  "...ksssk.r..",
  "...kssek.r..",
  "...kssk..r..",
  "..krrrrk.r..",
  ".krrrrrrkr..",
  ".krrkrrrk...",
  ".krrrrrrk...",
  "..krrrrk....",
  "..kbbbk.....",
  "..b...b.....",
  "..b...b.....",
];

export const GUARD = [
  "...kmmmk....",
  "..kmmmmk....",
  "...kmemk....",
  "...kmmk.....",
  "..kmmmmk.m..",
  ".kmmmmmmk.m.",
  ".kmmkmmmk.m.",
  ".kmmmmmmk.M.",
  "..kmmmmk..m.",
  "..kbbbk.....",
  "..b...b.....",
  "..b...b.....",
];

export const ELDER = [
  "...kwwwk....",
  "..kwwwwwk...",
  "...ksssk....",
  "...kssek....",
  "...kwwk.....",
  "..kddddk....",
  ".kddddddk...",
  ".kddkdddk...",
  ".kddddddk.t.",
  "..kddddk..t.",
  "..kbbbk.....",
  "...b.b......",
];

// ghost — floats (CSS bob), tail wave on frame 2
export const GHOST_A = [
  "...kkkk.....",
  "..kqqqqk....",
  ".kqqqqqqk...",
  ".kqkkqkqk...",
  ".kqqqqqqk...",
  "kqqqqqqqqk..",
  "kqqqqqqqqk..",
  ".kqqqqqqk...",
  ".kqqkkqqk...",
  ".kqqkkqqk...",
  "..k..k..k...",
];
export const GHOST_B = [
  "...kkkk.....",
  "..kqqqqk....",
  ".kqqqqqqk...",
  ".kqqkqqqk...",
  ".kqqqqqqk...",
  ".kqqqqqqqk..",
  ".kqqqqqqqk..",
  ".kqqqqqqk...",
  ".kqkkqqkq...",
  ".kqqkkqqk...",
  "...k..k.k...",
];
export const GHOST = [GHOST_A, GHOST_B];

// ── CREATURES ─────────────────────────────────────────────────────────────────

export const SLIME_A = [
  "...kkkk.....",
  "..kcccck....",
  ".kcccccck...",
  "kckkcckkCk..",
  "kcccccccck..",
  "kccccccCck..",
  ".kkkkkkkk...",
];
export const SLIME_B = [
  "....kkkkk...",
  "..kcccccck..",
  ".kckkcckkCk.",
  "kccccccccck.",
  "kccccccCcck.",
  ".kkkkkkkkkk.",
];
export const SLIME = [SLIME_A, SLIME_B];

export const BAT_A = [
  ".kk.....kk..",
  "kkkk...kkkk.",
  "kkkkkkkkkkk.",
  "kdk.kkk.kdk.",
  ".dk.kdk.kd..",
  "...kkek.....",
];
export const BAT_B = [
  ".....kk.....",
  "..kkkddkkk..",
  ".kkkdeedkkk.",
  "kkk.dddd.kkk",
  "kk..dkkd..kk",
  "k...k..k...k",
];
export const BAT = [BAT_A, BAT_B];

export const RAT_A = [
  "...........k",
  ".kk..kk..tk.",
  "kddkddktt...",
  "kdddddddk...",
  ".k.k.k.k....",
];
export const RAT_B = [
  "...........k",
  ".kk..kk..tk.",
  "kddkddktt...",
  "kdddddddk...",
  "..k.k.k.k...",
];
export const RAT = [RAT_A, RAT_B];

// Danmao — the campus cat, sits & flicks tail
export const CAT_A = [
  ".kk......kk.",
  "kwk.....kwk.",
  "kwwk...kwk..",
  ".kwwwwwk....",
  ".kwkwkwkk...",
  ".kwwwwwk.t..",
  ".kwwwwwk.t..",
  "..kkkkkk.tt.",
];
export const CAT_B = [
  ".kk......kk.",
  "kwk.....kwk.",
  "kwwk...kwk..",
  ".kwwwwwk....",
  ".kwkwkwk....",
  ".kwwwwwk....",
  ".kwwwwwk.t..",
  "..kkkkkktt..",
];
export const CAT = [CAT_A, CAT_B];

// the great raven — wing flap
export const RAVEN_A = [
  "....kk........",
  "...kbbk.......",
  "..kbek.tt.....",
  "...kbbbk.t....",
  "..kbbbbbk.....",
  ".kbbbbbbbk....",
  ".kbbbbbbbkk...",
  "..kbbbbbbk....",
  "...kkkkkk.....",
  "....k..k......",
  "...kk..kk.....",
];
export const RAVEN_B = [
  "....kk........",
  "...kbbk.......",
  "..kbek.tt.....",
  "..kbbbbbkk....",
  ".kbbbbbbbbk...",
  "kbbbbbbbbbk...",
  "kk.kbbbbk.kk..",
  "...kbbbbk.....",
  "....kkkkk.....",
  "....k..k......",
  "...kk..kk.....",
];
export const RAVEN = [RAVEN_A, RAVEN_B];

// ── PROPS ─────────────────────────────────────────────────────────────────────

export const CHEST = [
  "..kkkkkkkk..",
  ".kggggggggk.",
  "kgkgggggkGk.",
  "kgkkkkkkkgk.",
  "kgggggkgggk.",
  "kggggkFkggk.",
  "kggggkFkggk.",
  "kgggggkgggk.",
  "kGkkkkkkkGk.",
  ".kkkkkkkkk..",
];

export const CHEST_GOLD = [
  "..kkkkkkkk..",
  ".kFFFFFFFFk.",
  "kFkFFFFkFkFk.",
  "kFkkkkkkkFk.",
  "kgggggkgggk.",
  "kggggkFkggk.",
  "kggggkFkggk.",
  "kgggggkgggk.",
  "kGkkkkkkkGk.",
  ".kkkkkkkkk..",
];

export const GOLDPILE = [
  "............",
  ".....gg.....",
  "...g.gg.g.g.",
  "..gggFgg.gg.",
  ".ggg.gg.ggg.",
  "gggggggggggg",
  ".kkkkkkkkkk.",
];

export const PEDESTAL = [
  "...kkkkkk...",
  "..kDDDDDDk..",
  "..kDkkkkDk..",
  "...kDDDDk...",
  "....kDDk....",
  "....kDDk....",
  "...kDDDDk...",
  "..kDDDDDDk..",
  "..kkkkkkkk..",
];

export const ARMOR = [
  "...kmmmk....",
  "..kmmmmk....",
  "...kmemk....",
  "...kmmk.....",
  "..kmmmmk....",
  ".kmmmmmmk...",
  ".kmmkmmmk...",
  "..kmmmmk....",
  "..kmmmmk....",
  "...kmmk.....",
  "..kmmmmk....",
  "..kbbkbbk...",
];

export const STATUE = [
  "...g...g....",
  "..gkg.gkg...",
  "..kgggggk...",
  "...kDDk.....",
  "..kDDDDk....",
  ".kDDDDDDk...",
  ".kDDkDDDK...",
  "..kDDDDk....",
  "..kDDDDk....",
  "...kDDk.....",
  "..kDDDDk....",
  ".kkkkkkkkk..",
];

export const BOARD = [
  "kkkkkkkkkk..",
  "kwwwwwwwwk..",
  "kwkkkwkkwk..",
  "kwwwwwwwwk..",
  "kwkkwkkwwk..",
  "kwwwwwwwwk..",
  "kwkwkwkkwk..",
  "kwwwwwwwwk..",
  "kkkkkkkkkk..",
  "..k....k....",
  "..k....k....",
];

export const PORTAL_A = [
  "...kkkkkk...",
  "..kvvvvvvk..",
  ".kvvccccvvk.",
  ".kvcckkccvk.",
  "kvcckBBkcvk.",
  "kvckBwwBkck.",
  "kvcckBBkcvk.",
  ".kvcckkcvk..",
  ".kvvccccvk..",
  "..kvvvvvvk..",
  "...kkkkkk...",
];
export const PORTAL_B = [
  "...kkkkkk...",
  "..kvvvvvvk..",
  ".kvcccccvvk.",
  ".kvckkkccvk.",
  "kvcBkwwBcvk.",
  "kvckBwwBkck.",
  "kvcckBBkcvk.",
  ".kvcckkcvk..",
  ".kvvccccvk..",
  "..kvvvvvvk..",
  "...kkkkkk...",
];
export const PORTAL = [PORTAL_A, PORTAL_B];

export const CRYSTAL = [
  "....kk......",
  "...kBBk.....",
  "..kBwwBk....",
  "..kBBBk.....",
  ".kBBBBBk....",
  ".kBBBBBk....",
  "..kkkkk.....",
];

// wall torch flame — 2 frames
export const FLAME_A = [
  "..f..",
  ".fFf.",
  "fFFFf",
  ".fFf.",
  "..f..",
];
export const FLAME_B = [
  "...f.",
  ".fFf.",
  "fFFFf",
  ".fFf.",
  ".f...",
];
export const FLAME = [FLAME_A, FLAME_B];

export const BANNER = [
  "kkkkkk..",
  "krrrrrk.",
  "krggrrk.",
  "krrgrrk.",
  "krrrrrk.",
  "krrrrrk.",
  ".krrrk..",
  "..krrk..",
  "...krk..",
  "....k...",
];

export const CANDLE = [
  "..f..",
  ".fFf.",
  "..w..",
  "..w..",
  "..w..",
  ".www.",
];

export const BOOKS = [
  "kukkvkk.",
  "kuukvvk.",
  "kuukvvk.",
  "kuukvvk.",
  "kuukvvk.",
  "kkkkkkk.",
];

export const BONES = [
  "w.......w.",
  ".ww...ww..",
  "..wwwww...",
  "...www....",
  "..wwwww...",
  ".ww...ww..",
  "w.......w.",
];

// ── project → npc sprite key (SPRITES registry) ───────────────────────────────

export const PROJECT_NPC: Record<string, string> = {
  neurodaos: "merchant",
  trustai: "wizard",
  "rosen-app": "guard",
  "social-chain": "scholar",
  "daily-lens": "merchant",
  martech3: "wizard",
  superfans: "herald",
  "nft-similarity": "elder",
  "disaster-container": "smith",
  danmao: "cat",
  "nft-ticket": "merchant",
  "drone-delivery": "smith",
  antifraud: "guard",
  horoscope: "wizard",
  yunda: "scholar",
};

// ── small icons (unchanged, for labels/HUD) ───────────────────────────────────

export const ICON_CROWN = ["..g..g..", ".gg.ggg.", ".gkgkg..", "gkgkgkg.", "ggggggg.", "kgggggk.", ".kkkkk.."];
export const ICON_SWORD = ["......m.", ".....mmm", "g...mmm.", "gg.mmm..", ".ggmm...", "tg.m....", "ttgg....", "tt.t...."];
export const ICON_SCROLL = [".kkkkkk.", "kwwwwwk.", "kwkkkwk.", "kwwwwwk.", "kwkkkwk.", "kwwwwkk.", ".kkkkwk.", "....kk.."];
export const ICON_FLASK = ["..kkk...", "..kwk...", "..kwk...", ".kwwwk..", "kwpppwk.", "kppFppk.", "kpppppk.", ".kkkkk.."];
export const ICON_TROPHY = [".kkkkkk.", "kggggggk", "kgkggkgk", "kggggggk", ".kggggk.", "..kggk..", ".kggggk.", "kkkkkkkk"];
export const ICON_HEART = [".rr..rr.", "rrrrrrr.", "rFrrrrr.", "rrrrrrr.", ".rrrrr..", "..rrr...", "...r...."];
export const ICON_COIN = [".kkkkk..", "kggFggk.", "kgkkkFk.", "kgkggkk.", "kgkggkk.", "kgkkkgk.", "kgggggk.", ".kkkkk.."];
export const ICON_GEM = ["..kkkk..", ".kBBBBk.", "kBBwwBBk", "kBwwBBk.", ".kBBBkk.", "..kBk...", "...k...."];
export const ICON_RAVEN = ["..kk....", ".kkwk...", "kkwkk...", "kwwwwwk.", ".kwkwk..", "..k.kk..", "..k..k.."];
export const ICON_CASTLE = ["m.mmm.m.", "mmmmmmm.", "mkkmkkk.", "mmmmmmm.", "mmmmmmm.", "mmmkkmm.", "mmmkkmm.", "mmmmmmm."];
export const ICON_FLAG = ["k.......", "krrrrr..", "krrrrrr.", "krrrrr..", "k.......", "k.......", "kk......"];
export const ICON_BOOK = [".kkkkkk.", "kwwwwwk.", "kwkwkwk.", "kwwwwwk.", "kwkwkwk.", "kwwwwwk.", "kkwkwkk.", "..kkk..."];
export const ICON_KEY = [".kkk....", "kw.wk...", ".kkk....", "..k.....", "..kkk...", "..k.k...", "..kkk..."];
export const ICON_STAR = ["...g....", "..ggg...", "ggFgFgg.", ".ggggg..", "..ggg...", ".gg.gg..", "g.....g."];
export const ICON_POTION = ["...kk...", "..kggk..", "..kggk..", ".kppppk.", "kpFpppk.", "kpppppk.", ".kkkkk.."];

export const PROJECT_ICONS: Record<string, string[]> = {
  neurodaos: ICON_CROWN, trustai: ICON_FLASK, "rosen-app": ICON_CASTLE,
  "social-chain": ICON_SCROLL, "daily-lens": ICON_STAR, martech3: ICON_POTION,
  superfans: ICON_FLAG, "nft-similarity": ICON_GEM, "disaster-container": ICON_KEY,
  danmao: ICON_HEART, "nft-ticket": ICON_SCROLL, "drone-delivery": ICON_STAR,
  antifraud: ICON_SWORD, horoscope: ICON_GEM, yunda: ICON_BOOK,
};

// registry for animated content sprites in the dungeon
export const SPRITES: Record<string, string[][]> = {
  merchant: [MERCHANT], wizard: [WIZARD], scholar: [SCHOLAR], smith: [SMITH],
  herald: [HERALD], guard: [GUARD], elder: [ELDER],
  ghost: GHOST, slime: SLIME, bat: BAT, rat: RAT, cat: CAT, raven: RAVEN,
  chest: [CHEST], chestgold: [CHEST_GOLD], goldpile: [GOLDPILE],
  pedestal: [PEDESTAL], armor: [ARMOR], statue: [STATUE], board: [BOARD],
  portal: PORTAL, crystal: [CRYSTAL],
};
