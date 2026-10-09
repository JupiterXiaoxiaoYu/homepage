import type { Lang } from "./data";

export const LANGS: Lang[] = ["en", "zh"];

export function isLang(x: string): x is Lang {
  return x === "en" || x === "zh";
}

/** Merge an item's `zh` overrides when lang is zh. */
export function loc<T extends { zh?: Record<string, unknown> }>(
  item: T,
  lang: Lang,
): T {
  if (lang !== "zh" || !item.zh) return item;
  const { zh, ...rest } = item;
  return { ...rest, ...zh } as T;
}

export const UI = {
  en: {
    work: "Work",
    about: "About",
    ask: "Ask",
    resume: "Resume",
    openTo: "Open to AI engineering roles",
    askPlaceholder: "Ask about Jupiter's work…",
    askTitle: "Ask Jupiter",
    askHint: "Answers use only the facts on this site.",
    chips: [
      "What AI systems has he built?",
      "What's his strongest project?",
      "Is he open to roles?",
    ],
    selectedWorks: "Selected Works",
    index: "Index",
    allWork: "All work →",
    readCase: "Read case →",
    viewCase: "View case ↗",
    aboutTitle: "Experience",
    education: "Education",
    skills: "Capabilities",
    research: "Research",
    recognition: "Recognition",
    hackathonWins: "hackathon wins",
    cta: "Let's build.",
    play: "Play the dungeon →",
    colophon: "Set in EB Garamond & JetBrains Mono. Bound with Next.js.",
    copy: "Copy email",
    copied: "copied",
    filterAll: "All",
    projects: "projects",
    role: "Role",
    year: "Year",
    category: "Category",
    stack: "Stack",
    links: "Links",
    prev: "Prev",
    next: "Next",
    notFound: "Project not found.",
    offline: "(offline demo) ",
    you: "You",
  },
  zh: {
    work: "作品",
    about: "关于",
    ask: "提问",
    resume: "简历",
    openTo: "开放 AI 工程岗位机会",
    askPlaceholder: "问我任何关于 Jupiter 的事…",
    askTitle: "问问 Jupiter",
    askHint: "回答只使用本站所列事实。",
    chips: ["他做过哪些 AI 系统？", "最强的项目是哪个？", "目前在找工作吗？"],
    selectedWorks: "精选作品",
    index: "索引",
    allWork: "全部作品 →",
    readCase: "阅读案例 →",
    viewCase: "查看案例 ↗",
    aboutTitle: "经历",
    education: "教育",
    skills: "能力",
    research: "研究",
    recognition: "荣誉",
    hackathonWins: "次黑客松获奖",
    cta: "一起做点东西。",
    play: "进入像素地牢 →",
    colophon: "以 EB Garamond、思源宋体与 JetBrains Mono 排印 · Next.js 装订。",
    copy: "复制邮箱",
    copied: "已复制",
    filterAll: "全部",
    projects: "个项目",
    role: "角色",
    year: "年份",
    category: "类别",
    stack: "技术栈",
    links: "链接",
    prev: "上一个",
    next: "下一个",
    notFound: "未找到该项目。",
    offline: "（离线演示）",
    you: "你",
  },
} as const;

export type UIStrings = (typeof UI)["en"];

export function ui(lang: Lang): UIStrings {
  return UI[lang] as UIStrings;
}

export const CATEGORY_LABEL: Record<Lang, Record<string, string>> = {
  en: { agent: "Agents", ai: "AI", web3: "Web3", research: "Research", hackathon: "Hackathon" },
  zh: { agent: "智能体", ai: "AI", web3: "Web3", research: "研究", hackathon: "黑客松" },
};
