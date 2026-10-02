// ── tower kingdom layout ──────────────────────────────────────────────────────
// The realm is a vertical tower of floors. Each floor is a horizontal walk;
// buildings on it map 1:1 to real content items. Stairs alternate ends so the
// monarch crosses every floor to ascend.

import {
  PROFILE, PROJECTS, WORK, RESEARCH, AWARDS, SKILLS, EDUCATION, CERTS,
} from "./data";
import {
  ICON_CROWN, ICON_SWORD, ICON_SCROLL, ICON_FLASK, ICON_TROPHY, ICON_HEART,
  ICON_COIN, ICON_GEM, ICON_RAVEN, ICON_CASTLE, ICON_FLAG, ICON_BOOK,
  ICON_KEY, ICON_STAR, ICON_POTION, PROJECT_ICONS,
} from "./sprites";

export const FLOOR_W = 2600;
export const FLOOR_H = 320;
export const FLOOR_COUNT = 6;
export const WORLD_H = FLOOR_COUNT * FLOOR_H;

export type ItemKind =
  | "project" | "work" | "research" | "award" | "profile" | "link" | "skills" | "edu";

export type Item = {
  id: string;
  x: number;
  kind: ItemKind;
  bld: BldKind;
  icon: string[];
  title: string;
  sub: string;
  desc: string;
  extra?: string[];
  tags?: string[];
  links?: { label: string; href: string }[];
  tint: number;
};

export type BldKind =
  | "hut" | "house" | "tower" | "dome" | "forge" | "tent" | "stall"
  | "keep" | "pedestal" | "statue" | "portal" | "spire";

export type Floor = {
  id: string;
  name: string;
  sub: string;
  items: Item[];
  up?: "l" | "r";
  down?: "l" | "r";
  dark?: boolean;
};

const spread = (n: number, pad = 170) =>
  Array.from({ length: n }, (_, i) =>
    Math.round(pad + (i * (FLOOR_W - pad * 2)) / Math.max(1, n - 1)),
  );

const spreadPed = (n: number) =>
  Array.from({ length: n }, (_, i) =>
    Math.round(110 + (i * (FLOOR_W - 220)) / Math.max(1, n - 1)),
  );

const QUEST_BLDS: BldKind[] = [
  "keep", "tower", "dome", "house", "forge", "stall", "tent", "hut",
];

export const FLOORS: Floor[] = [
  {
    id: "gate",
    name: "GATE OF THE REALM",
    sub: "where the patrol begins",
    up: "r",
    items: [
      {
        id: "statue", x: 420, kind: "profile", bld: "statue", icon: ICON_CROWN,
        title: "JUPITER YU", sub: PROFILE.tagline,
        desc: PROFILE.bio,
        tags: PROFILE.stats.map((s) => `${s.v} ${s.k}`),
        links: [
          { label: "github", href: PROFILE.github },
          { label: "linkedin", href: PROFILE.linkedin },
          { label: "email", href: `mailto:${PROFILE.email}` },
          { label: "resume", href: PROFILE.resume },
        ],
        tint: 0,
      },
      {
        id: "skills", x: 900, kind: "skills", bld: "stall", icon: ICON_KEY,
        title: "SKILL TREES", sub: "the armoury",
        desc: "Capability clusters gathered across the realm.",
        extra: SKILLS.map((s) => `${s.label}: ${s.items.join(" · ")}`),
        tint: 1,
      },
      {
        id: "edu", x: 1400, kind: "edu", bld: "house", icon: ICON_BOOK,
        title: "TRAINING GROUNDS", sub: "education",
        desc: "Where the monarch studied.",
        extra: [
          ...EDUCATION.map((e) => `${e.school} — ${e.degree} (${e.period})`),
          `scrolls: ${CERTS}`,
        ],
        tint: 2,
      },
      {
        id: "board", x: 1950, kind: "link", bld: "stall", icon: ICON_SCROLL,
        title: "NOTICE BOARD", sub: "resume parchment",
        desc: "A nailed-up parchment listing the monarch's deeds — the full résumé.",
        links: [{ label: "read the parchment", href: PROFILE.resume }],
        tint: 3,
      },
    ],
  },
  {
    id: "quests",
    name: "GUILD OF QUESTS",
    sub: "15 shipped systems",
    up: "l",
    down: "r",
    items: PROJECTS.map((p, i) => ({
      id: p.id,
      x: spread(PROJECTS.length)[i],
      kind: "project" as ItemKind,
      bld: QUEST_BLDS[i % QUEST_BLDS.length],
      icon: PROJECT_ICONS[p.id] ?? ICON_SWORD,
      title: p.name,
      sub: `${p.year} · ${p.role}`,
      desc: p.detail ?? p.summary,
      tags: p.stack,
      links: p.links,
      tint: i % 4,
    })),
  },
  {
    id: "chronicle",
    name: "HALL OF CHRONICLES",
    sub: "reign & service",
    up: "r",
    down: "l",
    items: WORK.map((w, i) => ({
      id: w.id,
      x: spread(WORK.length, 300)[i],
      kind: "work" as ItemKind,
      bld: "keep" as BldKind,
      icon: w.current ? ICON_FLAG : ICON_CASTLE,
      title: w.org,
      sub: `${w.role} · ${w.period}${w.current ? " · ONGOING" : ""}`,
      desc: w.backing ? `Backed by ${w.backing}.` : "",
      extra: w.points,
      tint: i % 4,
    })),
  },
  {
    id: "vault",
    name: "TROPHY VAULT",
    sub: `${AWARDS.length} competition spoils`,
    up: "l",
    down: "r",
    dark: true,
    items: AWARDS.map((a, i) => ({
      id: `award-${i}`,
      x: spreadPed(AWARDS.length)[i],
      kind: "award" as ItemKind,
      bld: "pedestal" as BldKind,
      icon: /champion|1st|first/i.test(a.result) ? ICON_TROPHY : i % 3 === 0 ? ICON_STAR : ICON_COIN,
      title: a.event,
      sub: a.year,
      desc: a.result,
      tint: i % 4,
    })),
  },
  {
    id: "library",
    name: "ARCANE LIBRARY",
    sub: "research & forbidden knowledge",
    up: "r",
    down: "l",
    items: RESEARCH.map((r, i) => ({
      id: r.id,
      x: spread(RESEARCH.length, 500)[i],
      kind: "research" as ItemKind,
      bld: "dome" as BldKind,
      icon: i === 0 ? ICON_POTION : ICON_FLASK,
      title: r.title,
      sub: `${r.venue} · ${r.period}`,
      desc: r.summary,
      tags: [...r.tags, ...r.metrics.map((m) => `${m.k}: ${m.v}`)],
      tint: i % 4,
    })),
  },
  {
    id: "spire",
    name: "RAVEN SPIRE",
    sub: "the top of the world",
    down: "r",
    items: [
      {
        id: "roost", x: 640, kind: "link", bld: "spire", icon: ICON_RAVEN,
        title: "RAVEN ROOST", sub: "send word to the monarch",
        desc: "The realm is open for alliances — engineering, research collaborations, ecosystem work, or a quest worth taking.",
        links: [
          { label: `raven · ${PROFILE.email}`, href: `mailto:${PROFILE.email}` },
          { label: "github", href: PROFILE.github },
          { label: "linkedin", href: PROFILE.linkedin },
        ],
        tint: 0,
      },
      {
        id: "portal-gh", x: 1300, kind: "link", bld: "portal", icon: ICON_STAR,
        title: "GITHUB PORTAL", sub: "code & quests",
        desc: "A swirling gate into the monarch's repositories.",
        links: [{ label: "step through", href: PROFILE.github }],
        tint: 1,
      },
      {
        id: "portal-li", x: 1750, kind: "link", bld: "portal", icon: ICON_GEM,
        title: "LINKEDIN PORTAL", sub: "formal seal",
        desc: "A swirling gate into the monarch's professional scroll.",
        links: [{ label: "step through", href: PROFILE.linkedin }],
        tint: 2,
      },
      {
        id: "portal-cv", x: 2150, kind: "link", bld: "portal", icon: ICON_SCROLL,
        title: "RESUME PORTAL", sub: "the parchment",
        desc: "A swirling gate to the full résumé document.",
        links: [{ label: "step through", href: PROFILE.resume }],
        tint: 3,
      },
    ],
  },
];

export const TOTAL_ITEMS = FLOORS.reduce((n, f) => n + f.items.length, 0);

// floor index → top Y of that floor in world space (floor 0 is at the bottom)
export const floorTop = (i: number) => WORLD_H - (i + 1) * FLOOR_H;

export const STAIR_X = { l: 90, r: FLOOR_W - 90 };

export { ICON_HEART, ICON_COIN };
