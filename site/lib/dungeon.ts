// ── dungeon layout ────────────────────────────────────────────────────────────
// Six levels descending. Side-view corridors; stairs alternate ends so the
// monarch must cross each hall to go deeper. Items are living things — NPCs,
// chests, portals — each bound 1:1 to real content.

import {
  PROFILE, PROJECTS, WORK, RESEARCH, AWARDS, SKILLS, EDUCATION, CERTS,
} from "./data";
import {
  ICON_CROWN, ICON_SWORD, ICON_SCROLL, ICON_FLASK, ICON_TROPHY, ICON_HEART,
  ICON_COIN, ICON_GEM, ICON_RAVEN, ICON_CASTLE, ICON_FLAG, ICON_BOOK,
  ICON_KEY, ICON_STAR, ICON_POTION, PROJECT_ICONS, PROJECT_NPC,
} from "./sprites";

export const LEVEL_W = 2600;
export const LEVEL_H = 300;
export const LEVEL_COUNT = 6;
export const SURFACE = 320; // bedrock above B0 — gives the camera headroom
export const WORLD_H = SURFACE + LEVEL_COUNT * LEVEL_H;

export type ItemKind =
  | "project" | "work" | "research" | "award" | "profile" | "link" | "skills" | "edu";

export type Item = {
  id: string;
  x: number;
  kind: ItemKind;
  npc: string;          // key into SPRITES
  anim?: "bob" | "float" | "shimmer" | "sway";
  icon: string[];
  title: string;
  sub: string;
  desc: string;
  extra?: string[];
  tags?: string[];
  links?: { label: string; href: string }[];
  glow?: number;        // emits light radius (world px)
};

export type Critter = {
  sprite: string;       // SPRITES key, animated
  x0: number;           // spawn x
  range: number;        // wander ±range
  speed: number;        // px/frame-ish
  y?: number;           // hover height above floor line (bats)
};

export type Level = {
  id: string;
  depth: string;        // "B1" etc
  name: string;
  sub: string;
  items: Item[];
  critters: Critter[];
  down?: "l" | "r";
  up?: "l" | "r";
};

const spread = (n: number, pad = 170) =>
  Array.from({ length: n }, (_, i) =>
    Math.round(pad + (i * (LEVEL_W - pad * 2)) / Math.max(1, n - 1)),
  );

const spreadDense = (n: number) =>
  Array.from({ length: n }, (_, i) =>
    Math.round(100 + (i * (LEVEL_W - 200)) / Math.max(1, n - 1)),
  );

export const LEVELS: Level[] = [
  {
    id: "gate", depth: "B0", name: "GATEHALL",
    sub: "the threshold",
    down: "r",
    critters: [{ sprite: "rat", x0: 1900, range: 320, speed: 0.9 }],
    items: [
      {
        id: "statue", x: 500, kind: "profile", npc: "statue", icon: ICON_CROWN,
        title: "JUPITER YU", sub: PROFILE.tagline,
        desc: PROFILE.bio,
        tags: PROFILE.stats.map((s) => `${s.v} ${s.k}`),
        links: [
          { label: "github", href: PROFILE.github },
          { label: "linkedin", href: PROFILE.linkedin },
          { label: "email", href: `mailto:${PROFILE.email}` },
          { label: "resume", href: PROFILE.resume },
        ],
        glow: 90,
      },
      {
        id: "armory", x: 900, kind: "skills", npc: "armor", icon: ICON_KEY,
        title: "THE ARMOURY", sub: "skill trees",
        desc: "Capability clusters gathered across the realm.",
        extra: SKILLS.map((s) => `${s.label}: ${s.items.join(" · ")}`),
      },
      {
        id: "scribe", x: 1400, kind: "edu", npc: "scholar", anim: "bob", icon: ICON_BOOK,
        title: "TRAINING GROUNDS", sub: "education & seals",
        desc: "Where the monarch studied.",
        extra: [
          ...EDUCATION.map((e) => `${e.school} — ${e.degree} (${e.period})`),
          `scrolls: ${CERTS}`,
        ],
      },
      {
        id: "board", x: 1950, kind: "link", npc: "board", icon: ICON_SCROLL,
        title: "NOTICE BOARD", sub: "the parchment",
        desc: "A nailed-up parchment listing the monarch's deeds — the full résumé.",
        links: [{ label: "read the parchment", href: PROFILE.resume }],
      },
    ],
  },
  {
    id: "quests", depth: "B1", name: "HALL OF QUESTS",
    sub: "15 undertakings given form",
    up: "r", down: "l",
    critters: [
      { sprite: "slime", x0: 600, range: 220, speed: 0.5 },
      { sprite: "slime", x0: 2100, range: 260, speed: 0.4 },
    ],
    items: PROJECTS.map((p, i) => ({
      id: p.id,
      x: spread(PROJECTS.length)[i],
      kind: "project" as ItemKind,
      npc: PROJECT_NPC[p.id] ?? "merchant",
      anim: p.id === "danmao" ? undefined : "bob" as const,
      icon: PROJECT_ICONS[p.id] ?? ICON_SWORD,
      title: p.name,
      sub: `${p.year} · ${p.role}`,
      desc: p.detail ?? p.summary,
      tags: p.stack,
      links: p.links,
      glow: p.id === "horoscope" || p.id === "trustai" ? 60 : 0,
    })),
  },
  {
    id: "reigns", depth: "B2", name: "GALLERY OF REIGNS",
    sub: "service & chronicle — old roles linger as spirits",
    up: "l", down: "r",
    critters: [{ sprite: "bat", x0: 1300, range: 700, speed: 1.3, y: 120 }],
    items: WORK.map((w, i) => ({
      id: w.id,
      x: spread(WORK.length, 300)[i],
      kind: "work" as ItemKind,
      npc: w.current ? "herald" : "ghost",
      anim: w.current ? "bob" as const : "float" as const,
      icon: w.current ? ICON_FLAG : ICON_CASTLE,
      title: w.org,
      sub: `${w.role} · ${w.period}${w.current ? " · ONGOING" : ""}`,
      desc: w.backing ? `Backed by ${w.backing}.` : "",
      extra: w.points,
      glow: w.current ? 70 : 0,
    })),
  },
  {
    id: "crypt", depth: "B3", name: "TROPHY CRYPT",
    sub: `${AWARDS.length} spoils, still glinting`,
    up: "r", down: "l",
    critters: [
      { sprite: "slime", x0: 900, range: 300, speed: 0.4 },
      { sprite: "bat", x0: 1800, range: 600, speed: 1.1, y: 110 },
    ],
    items: AWARDS.map((a, i) => {
      const gold = /champion|1st|first/i.test(a.result);
      return {
        id: `award-${i}`,
        x: spreadDense(AWARDS.length)[i],
        kind: "award" as ItemKind,
        npc: gold ? "chestgold" : i % 3 === 1 ? "chest" : "goldpile",
        anim: "shimmer" as const,
        icon: gold ? ICON_TROPHY : i % 3 === 0 ? ICON_STAR : ICON_COIN,
        title: a.event,
        sub: a.year,
        desc: a.result,
        glow: gold ? 40 : 0,
      };
    }),
  },
  {
    id: "library", depth: "B4", name: "ARCANE LIBRARY",
    sub: "research & forbidden knowledge",
    up: "l", down: "r",
    critters: [
      { sprite: "cat", x0: 800, range: 140, speed: 0.25 },
      { sprite: "bat", x0: 1900, range: 500, speed: 1.0, y: 100 },
    ],
    items: [
      ...RESEARCH.map((r, i) => ({
        id: r.id,
        x: spread(RESEARCH.length, 480)[i],
        kind: "research" as ItemKind,
        npc: "wizard",
        anim: "bob" as const,
        icon: i === 0 ? ICON_POTION : ICON_FLASK,
        title: r.title,
        sub: `${r.venue} · ${r.period}`,
        desc: r.summary,
        tags: [...r.tags, ...r.metrics.map((m) => `${m.k}: ${m.v}`)],
        glow: 70,
      })),
      {
        id: "crystals", x: 1320, kind: "link" as ItemKind, npc: "crystal", anim: "shimmer" as const,
        icon: ICON_GEM, title: "CRYSTAL CACHE",
        sub: "raw material of the work",
        desc: "The shards that power every experiment above — data, proofs, and stubbornness.",
        glow: 110,
      },
    ],
  },
  {
    id: "roost", depth: "B5", name: "THE ROOST",
    sub: "deepest chamber — send word",
    up: "r",
    critters: [],
    items: [
      {
        id: "roost", x: 620, kind: "link", npc: "raven", anim: "bob", icon: ICON_RAVEN,
        title: "RAVEN ROOST", sub: "send word to the monarch",
        desc: "The realm is open for alliances — engineering, research collaborations, ecosystem work, or a quest worth taking.",
        links: [
          { label: `raven · ${PROFILE.email}`, href: `mailto:${PROFILE.email}` },
          { label: "github", href: PROFILE.github },
          { label: "linkedin", href: PROFILE.linkedin },
        ],
        glow: 60,
      },
      {
        id: "portal-gh", x: 1300, kind: "link", npc: "portal", anim: "shimmer", icon: ICON_STAR,
        title: "GITHUB PORTAL", sub: "code & quests",
        desc: "A swirling gate into the monarch's repositories.",
        links: [{ label: "step through", href: PROFILE.github }],
        glow: 130,
      },
      {
        id: "portal-li", x: 1750, kind: "link", npc: "portal", anim: "shimmer", icon: ICON_GEM,
        title: "LINKEDIN PORTAL", sub: "formal seal",
        desc: "A swirling gate into the monarch's professional scroll.",
        links: [{ label: "step through", href: PROFILE.linkedin }],
        glow: 130,
      },
      {
        id: "portal-cv", x: 2150, kind: "link", npc: "portal", anim: "shimmer", icon: ICON_SCROLL,
        title: "RESUME PORTAL", sub: "the parchment",
        desc: "A swirling gate to the full résumé document.",
        links: [{ label: "step through", href: PROFILE.resume }],
        glow: 130,
      },
    ],
  },
];

export const TOTAL_ITEMS = LEVELS.reduce((n, l) => n + l.items.length, 0);
export const levelTop = (i: number) => SURFACE + i * LEVEL_H; // level 0 just below surface
export const STAIR_X = { l: 90, r: LEVEL_W - 90 };
