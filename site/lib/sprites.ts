// ── pixel sprite maps ─────────────────────────────────────────────────────────
// Each sprite is an array of strings; chars index into PAL. "." = transparent.

export const PAL: Record<string, string> = {
  k: "#181226", // outline / near-black
  w: "#f3ead3", // parchment white
  g: "#f2b83b", // gold
  G: "#8a6420", // gold shade
  s: "#e8b483", // skin
  S: "#b37f52", // skin shade
  r: "#c9403d", // banner red / cape
  R: "#7e2624", // cape shade
  b: "#3a2f45", // leather / boots
  B: "#7fb3d5", // pale blue (gem/magic)
  e: "#1d1428", // eye
  t: "#5a3d2b", // wood / brown
  T: "#8a6244", // light wood
  f: "#ff9e3d", // flame
  F: "#ffd94a", // flame core
  m: "#8fa3bf", // steel
  M: "#5d6b80", // steel shade
  p: "#b48ec7", // potion purple
  n: "#4f7a4a", // leaf green
  N: "#2f4d2e", // dark green
};

// ── icons (8×8) ───────────────────────────────────────────────────────────────

export const ICON_CROWN = [
  "..g..g..",
  ".gg.ggg.",
  ".gkgkg..",
  "gkgkgkg.",
  "ggggggg.",
  "kgggggk.",
  ".kkkkk..",
];

export const ICON_SWORD = [
  "......m.",
  ".....mmm",
  "g...mmm.",
  "gg.mmm..",
  ".ggmm...",
  "tg.m....",
  "ttgg....",
  "tt.t....",
];

export const ICON_SCROLL = [
  ".kkkkkk.",
  "kwwwwwk.",
  "kwkkkwk.",
  "kwwwwwk.",
  "kwkkkwk.",
  "kwwwwkk.",
  ".kkkkwk.",
  "....kk..",
];

export const ICON_FLASK = [
  "..kkk...",
  "..kwk...",
  "..kwk...",
  ".kwwwk..",
  "kwpppwk.",
  "kppFppk.",
  "kpppppk.",
  ".kkkkk..",
];

export const ICON_TROPHY = [
  ".kkkkkk.",
  "kggggggk",
  "kgkggkgk",
  "kggggggk",
  ".kggggk.",
  "..kggk..",
  ".kggggk.",
  "kkkkkkkk",
];

export const ICON_HEART = [
  ".rr..rr.",
  "rrrrrrr.",
  "rFrrrrr.",
  "rrrrrrr.",
  ".rrrrr..",
  "..rrr...",
  "...r....",
];

export const ICON_COIN = [
  ".kkkkk..",
  "kggFggk.",
  "kgkkkFk.",
  "kgkggkk.",
  "kgkggkk.",
  "kgkkkgk.",
  "kgggggk.",
  ".kkkkk..",
];

export const ICON_GEM = [
  "..kkkk..",
  ".kBBBBk.",
  "kBBwwBBk",
  "kBwwBBk.",
  ".kBBBkk.",
  "..kBk...",
  "...k....",
];

export const ICON_RAVEN = [
  "..kk....",
  ".kkwk...",
  "kkwkk...",
  "kwwwwwk.",
  ".kwkwk..",
  "..k.kk..",
  "..k..k..",
];

export const ICON_CASTLE = [
  "m.mmm.m.",
  "mmmmmmm.",
  "mkkmkkk.",
  "mmmmmmm.",
  "mmmmmmm.",
  "mmmkkmm.",
  "mmmkkmm.",
  "mmmmmmm.",
];

export const ICON_FLAG = [
  "k.......",
  "krrrrr..",
  "krrrrrr.",
  "krrrrr..",
  "k.......",
  "k.......",
  "kk......",
];

export const ICON_BOOK = [
  ".kkkkkk.",
  "kwwwwwk.",
  "kwkwkwk.",
  "kwwwwwk.",
  "kwkwkwk.",
  "kwwwwwk.",
  "kkwkwkk.",
  "..kkk...",
];

export const ICON_KEY = [
  ".kkk....",
  "kw.wk...",
  ".kkk....",
  "..k.....",
  "..kkk...",
  "..k.k...",
  "..kkk...",
];

export const ICON_STAR = [
  "...g....",
  "..ggg...",
  "ggFgFgg.",
  ".ggggg..",
  "..ggg...",
  ".gg.gg..",
  "g.....g.",
];

export const ICON_POTION = [
  "...kk...",
  "..kggk..",
  "..kggk..",
  ".kppppk.",
  "kpFpppk.",
  "kpppppk.",
  ".kkkkk..",
];

// map a project/award vibe → icon
export const PROJECT_ICONS: Record<string, string[]> = {
  neurodaos: ICON_CROWN,
  trustai: ICON_FLASK,
  "rosen-app": ICON_CASTLE,
  "social-chain": ICON_SCROLL,
  "daily-lens": ICON_STAR,
  martech3: ICON_POTION,
  superfans: ICON_FLAG,
  "nft-similarity": ICON_GEM,
  "disaster-container": ICON_KEY,
  danmao: ICON_HEART,
  "nft-ticket": ICON_SCROLL,
  "drone-delivery": ICON_STAR,
  antifraud: ICON_SWORD,
  horoscope: ICON_GEM,
  yunda: ICON_BOOK,
};

// ── the wandering king (12×14, two walk frames) ──────────────────────────────

const KING_HEAD = [
  "...g...g....",
  "..gkg.gkg...",
  "..kgggggk...",
  "...ksssk....",
  "...kssek....",
  "...kssk.....",
  "..kwwwwk....",
];

const KING_BODY = [
  "rrkwwwwwk...",
  "rkwwwwwwk...",
  "rkwwkwwwk...",
  ".kwwwwwwk...",
];

export const KING_A = [
  ...KING_HEAD,
  ...KING_BODY,
  "..kkkkkk....",
  "..kbk.kbk...",
  "..bb...bb...",
  "..b.....b...",
];

export const KING_B = [
  ...KING_HEAD,
  ...KING_BODY,
  "..kkkkkk....",
  "...kbbbk....",
  "...b...b....",
  "...b...b....",
];

// torch post (7×9) — drawn on the ground strip
export const TORCH = [
  "...f.....",
  "..fFf....",
  "..fFf....",
  "...f.....",
  "..kkk....",
  "...t.....",
  "...t.....",
  "...t.....",
  "..ttt....",
];
