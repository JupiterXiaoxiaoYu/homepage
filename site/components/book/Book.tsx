"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  PROJECTS,
  PROFILE,
  RESEARCH,
  WORK,
  AWARDS,
  EDUCATION,
  type Lang,
  type Project,
} from "@/lib/data";
import { loc } from "@/lib/i18n";

/* ── specimen structure ─────────────────────────────────────────────────────── */

const SPREADS = 10;
const PAGES = SPREADS * 2;
const folio = (label: string, n: number) => `${label} · ${n}/${PAGES}`;

const CHAPTERS: {
  key: string;
  en: string;
  zh: string;
  tabEn?: string;
  short: { en: string; zh: string };
  hash: string;
  folio: string;
  intro: { en: string; zh: string };
  spread: number;
}[] = [
  {
    key: "ai", en: "Agent Systems", zh: "智能体之作", short: { en: "Agents", zh: "智能体" }, hash: "agents", folio: "1", spread: 2,
    intro: {
      en: "Production agent systems from 2026 — a drama studio that turns scripts into finished episodes, an editing SaaS that people and agents share, a writers' room of agents kept honest by evals, and browser agents that film product demos.",
      zh: "生产级 Agent 系统，均成于 2026 年：把剧本变成成片的短剧工作台、人和 Agent 共用的剪辑 SaaS、靠评测把关的多 Agent 编剧室，以及会自己拍产品 Demo 的浏览器 Agent。",
    },
  },
  {
    key: "web3", en: "Full-Stack & On-Chain", zh: "全栈与链上", tabEn: "Full-Stack", short: { en: "Stack", zh: "全栈" }, hash: "stack", folio: "9", spread: 4,
    intro: {
      en: "Products shipped across the stack — zkWASM apps with thousands of users, an agent-native messenger on three platforms, tools running in daily production, and two 2026 hackathon builds where agents meet settlement.",
      zh: "横跨全栈的产品：数千用户的 zkWASM 应用、三端 Agent 原生通讯、每天在线运行的生产工具，以及两个让 Agent 与链上结算相遇的 2026 黑客松作品。",
    },
  },
  {
    key: "res", en: "Research Notes", zh: "研究手记", short: { en: "Research", zh: "研究" }, hash: "research", folio: "13", spread: 6,
    intro: {
      en: "A first-author benchmark paper and a retrieval research project — both about retrieval over social graphs that you can check.",
      zh: "一篇一作基准论文与一个检索研究项目——都关于社交图谱上可核验的检索。",
    },
  },
  {
    key: "hack", en: "Hackathon Ledger", zh: "黑客松账册", tabEn: "Hackathons", short: { en: "Awards", zh: "奖项" }, hash: "awards", folio: "15", spread: 7,
    intro: {
      en: "Thirty-three awards and counting — twelve of them first place.",
      zh: "三十三项奖，十二个第一，还在涨。",
    },
  },
  {
    key: "me", en: "Cursus Vitae", zh: "生平", short: { en: "CV", zh: "生平" }, hash: "cv", folio: "17", spread: 8,
    intro: {
      en: "Where the work happened, and where it was studied.",
      zh: "事在何处做，学在何处读。",
    },
  },
];

const T = {
  en: {
    specimen: "A WORKING MANUSCRIPT",
    manuscript: "A Working Manuscript",
    readerTitle: "To the Reader",
    readerBody:
      "This volume gathers what Jupiter Yu has built, studied and won — bound, not scrolled. The tabs on the fore-edge jump between chapters; the leaves themselves turn. And at the back, an index that answers questions — ask it, and the book will leaf to the passage itself.",
    askPlaceholder: "Ask the index a question…",
    indexTitle: "The Index",
    indexBody:
      "Every proper book ends in an index; this one is alive. Ask it anything about the author — the book will turn to the passage and mark it for you.",
    indexTeaser: "an index that answers — folio 19 →",
    leafing: "the index is leafing…",
    contents: "Contents",
    folio: "Fol.",
    chapter: "Chapter",
    colophon: "Set in EB Garamond · bound by hand, MMXXVI",
    exlibris: "EX LIBRIS",
    prev: "‹ Prev",
    next: "Next ›",
    hint: "← → turn pages · tabs jump chapters",
    glance: "At a Glance",
    now: "Now",
    before: "Before",
    study: "Study",
    nowV: "Agent Engineer at Viciking (full-time) — production agent systems for AI video",
    beforeV: "Founder of Resona (browser agents) · Ecosystem Director, Delphinus Lab (zkWASM)",
    studyV: "MPhil Data Science, HKUST (GZ) · MA Cognitive Science, Edinburgh (First)",
    stats: [
      ["15–30 min", "script → finished 1-min episode"],
      ["~90%", "agent outputs ready for placement"],
      ["3.7×", "token waste an eval caught before shipping"],
      ["33", "hackathon & competition awards, 12 firsts"],
    ],
    begin: "Begin reading",
    allWork: "All work",
    resume: "Résumé",
    email: "Email",
    work: "Work",
    mPrev: "‹ Prev",
    mNext: "Next ›",
    noMatch: "— no such entry; try “agent”, “drama”, “zkWASM”…",
    found: "— found at folio",
    awardsNote: "selection — full ledger runs to the appendix",
    appendix: "Appendix · Honours & CV",
    education: "Schooling",
    skills: "Arsenal",
    end: "FINIS",
    contact: "Correspondence",
    ongoing: "ongoing",
  },
  zh: {
    specimen: "工作手稿",
    manuscript: "一册在手 · 工作手稿",
    readerTitle: "致读者",
    readerBody:
      "本册收录于杰宇所做、所学、所赢——装订成书，而非无尽下滑。书口处的标签用来跳章，书页真的会翻动。书末还有一页活的索引——问它问题，书会自己翻到答案所在的那一页。",
    askPlaceholder: "向索引提一个问题…",
    indexTitle: "索引",
    indexBody:
      "凡正经的书，卷末都有索引；这一册的索引是活的。问它任何关于作者的问题——书会自己翻到那一页，并把答案划出来。",
    indexTeaser: "书末的索引会回答问题——第 19 页 →",
    leafing: "索引正在翻页…",
    contents: "目录",
    folio: "页",
    chapter: "第",
    colophon: "以 EB Garamond 排印 · 手工装订 · 二〇二六",
    exlibris: "藏书票",
    prev: "‹ 上一页",
    next: "下一页 ›",
    hint: "← → 翻页 · 标签跳章",
    glance: "一览",
    now: "现在",
    before: "此前",
    study: "求学",
    nowV: "北京唯西网络科技有限公司 Agent 工程师（全职）——为 AI 视频生产构建生产级 Agent 系统",
    beforeV: "Resona 创始人（浏览器 Agent）· Delphinus Lab 生态总监（zkWASM）",
    studyV: "香港科技大学（广州）数据科学 MPhil · 爱丁堡大学认知科学 MA（一等）",
    stats: [
      ["15–30 分钟", "剧本 → 1 分钟成片"],
      ["~90%", "Agent 产出可直接投放交付"],
      ["3.7×", "上线前被评测拦下的 token 浪费"],
      ["33", "项黑客松与竞赛奖，12 个第一"],
    ],
    begin: "开始阅读",
    allWork: "全部作品",
    resume: "简历",
    email: "邮箱",
    work: "作品",
    mPrev: "‹ 上一页",
    mNext: "下一页 ›",
    noMatch: "——查无此条；试试“Agent”、“短剧”、“zkWASM”…",
    found: "——见于第",
    awardsNote: "节选——完整账册见附录",
    appendix: "附录 · 荣誉与简历",
    education: "求学",
    skills: "兵器库",
    end: "卷终",
    contact: "书信",
    ongoing: "至今",
  },
};

/* every citable entry: id → spread (and printed folio for the index) */
const ENTRY_SPREAD: Record<string, number> = {
  weichuang: 2,
  "weixi-studio": 2,
  "creative-engine": 2,
  "screenplay-studio": 3,
  resona: 3,
  "novel-to-script": 3,
  shotloom: 3,
  "zkwasm-suite": 4,
  ringchat: 4,
  outcomex: 5,
  "ava-box": 5,
  "production-tools": 5,
  "rosen-app": 5,
  socialattributionqa: 6,
  "sovereign-rag": 6,
  ...Object.fromEntries(WORK.flatMap((w) => [[w.id, 8], [`work-${w.id}`, 8]])),
};

const ENTRY_FOLIO: Record<string, number> = {
  weichuang: 2,
  "weixi-studio": 2,
  "creative-engine": 2,
  "screenplay-studio": 3,
  resona: 3,
  "novel-to-script": 4,
  shotloom: 4,
  "zkwasm-suite": 10,
  ringchat: 10,
  outcomex: 11,
  "ava-box": 11,
  "production-tools": 12,
  "rosen-app": 12,
  socialattributionqa: 14,
  "sovereign-rag": 14,
};

const proj = (id: string, lang: Lang): Project =>
  loc(PROJECTS.find((p) => p.id === id)!, lang);

/* keyword → entry scorer */
const STOP = new Set(
  "the a an and or of to in for on with is are was were be has have he his him what which who how about tell show can i you it its 的 了 在 和 有 什么 哪些 吗".split(" "),
);
function score(q: string) {
  const toks = q
    .toLowerCase()
    .replace(/[^a-z0-9一-鿿]+/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w));
  let best: { id: string; s: number } | null = null;
  for (const id of Object.keys(ENTRY_SPREAD)) {
    const p = PROJECTS.find((x) => x.id === id);
    const r = RESEARCH.find((x) => x.id === id);
    const hay = (
      p
        ? `${p.name} ${p.role} ${p.category.join(" ")} ${p.summary} ${p.detail ?? ""} ${p.stack.join(" ")} ${p.zh?.name ?? ""} ${p.zh?.summary ?? ""}`
        : r
          ? `${r.title} ${r.venue} ${r.summary} ${r.tags.join(" ")} ${r.zh?.summary ?? ""}`
          : ""
    ).toLowerCase();
    if (!hay) continue;
    let s = 0;
    for (const t of toks) if (hay.includes(t)) s += t.length;
    if (!best || s > best.s) best = { id, s };
  }
  return best && best.s > 0 ? best.id : null;
}

/* ── component ─────────────────────────────────────────────────────────────── */

export default function Book({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [spread, setSpread] = useState(0);
  const [leaf, setLeaf] = useState<{ dir: 1 | -1; from: number; to: number } | null>(null);
  const [hl, setHl] = useState<string | null>(null);
  const [tab, setTab] = useState<{ top: number; label: string } | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [slip, setSlip] = useState<{ id: string; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [turned, setTurned] = useState(false);
  const bookRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const go = useCallback(
    (target: number) => {
      if (target === spread || leaf) return;
      const dir = target > spread ? 1 : -1;
      setLeaf({ dir, from: spread, to: target });
      if (window.matchMedia("(max-width: 860px)").matches) {
        bookRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setTurned(false);
      timers.current.push(
        setTimeout(() => setSpread(target), 300),
        setTimeout(() => setLeaf(null), 660),
      );
    },
    [spread, leaf],
  );
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace("#", "");
      const c = CHAPTERS.find((x) => x.hash === h);
      const target = c ? c.spread : h === "index" ? 9 : null;
      if (target != null) setSpread(target);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);
  useEffect(() => {
    if (!leaf) return;
    const r = requestAnimationFrame(() =>
      requestAnimationFrame(() => setTurned(true)),
    );
    return () => cancelAnimationFrame(r);
  }, [leaf]);

  const land = useCallback((domId: string, label: string) => {
    timers.current.push(
      setTimeout(() => {
        const el = bookRef.current?.querySelector<HTMLElement>(`#ent-${domId}`);
        const host = el?.closest<HTMLElement>(".b-page");
        if (el && host) {
          const pr = host.getBoundingClientRect();
          const er = el.getBoundingClientRect();
          setTab({
            top: Math.min(Math.max(er.top - pr.top, 30), pr.height - 90),
            label,
          });
        }
        setHl(domId);
      }, 380),
    );
  }, []);

  const resolve = useCallback(
    (id: string | null, query: string) => {
      const hit = (id && ENTRY_SPREAD[id] != null && id) || score(query);
      if (!hit) return null;
      return { id: hit, spread: ENTRY_SPREAD[hit] ?? 8 };
    },
    [],
  );

  const ask = useCallback(
    async (q: string) => {
      const query = q.trim().slice(0, 140);
      if (!query || busy) return;
      setBusy(true);
      setAnswer(t.leafing);
      setSlip(null);
      setHl(null);
      setTab(null);
      let text = "";
      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ lang, messages: [{ role: "user", content: query }] }),
        });
        if (!res.ok || !res.body) throw new Error("ask failed");
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          text += dec.decode(value, { stream: true });
          setAnswer(text.replace(/\[\[[a-z0-9-]+\]\]/gi, "").slice(-400));
        }
      } catch {
        /* offline — fall through to the local index */
      }
      setBusy(false);
      const cite = /\[\[([a-z0-9-]+)\]\]/i.exec(text)?.[1]?.toLowerCase() ?? null;
      const clean =
        text.replace(/\[\[[a-z0-9-]+\]\]/gi, "").replace(/\s+/g, " ").trim().slice(0, 340) ||
        null;
      const hit = resolve(cite, query);
      if (!hit) {
        setAnswer(clean ?? t.noMatch);
        return;
      }
      const p = PROJECTS.find((x) => x.id === hit.id);
      setAnswer(clean ?? `${t.found} ${ENTRY_FOLIO[hit.id] ?? ""}: ${p ? loc(p, lang).name : hit.id}`);
      if (spread !== hit.spread) go(hit.spread);
      if (clean) setSlip({ id: hit.id, text: clean });
      land(hit.id, "?");
    },
    [busy, lang, spread, t, go, land, resolve],
  );

  /* ── building blocks ────────────────────────────────────────────────────── */

  const Slip = ({ id }: { id: string }) =>
    slip?.id === id ? <aside className="b-slip">{slip.text}</aside> : null;

  const Entry = ({ id, note }: { id: string; note?: string }) => {
    const p = proj(id, lang);
    return (
      <article className={`b-entry ${hl === id ? "hl" : ""}`} id={`ent-${id}`}>
        <header>
          <h3>
            <Link href={`/${lang}/work/${id}`} className="b-elink">
              {p.name}
              <span className="b-earrow" aria-hidden> ↗</span>
            </Link>
          </h3>
          <div className="b-meta">
            {p.year} · {p.role} · {p.category.join(" · ").toUpperCase()}
          </div>
        </header>
        <p>{p.summary}</p>
        {p.impact && <p className="b-imp">{p.impact}</p>}
        <Slip id={id} />
        {note && <aside className="b-marg">{note}</aside>}
      </article>
    );
  };

  const ChapOpen = ({ idx }: { idx: number }) => {
    const c = CHAPTERS[idx];
    return (
      <div className="b-chap">
        <div className="b-roman">{["I.", "II.", "III.", "IV.", "V."][idx]}</div>
        <h2 className="b-chap-t">{lang === "zh" ? c.zh : c.en}</h2>
        {engraved}
        <p className="b-body b-drop">{c.intro[lang]}</p>
      </div>
    );
  };

  const engraved = (
    <svg className="b-orn" viewBox="0 0 120 24" aria-hidden>
      <path d="M8 12h34M78 12h34" stroke="currentColor" strokeWidth=".7" />
      <path
        d="M60 3c3 0 5 4 5 9s-2 9-5 9-5-4-5-9 2-9 5-9Zm0 3c-1.4 0-2.5 2.8-2.5 6s1.1 6 2.5 6 2.5-2.8 2.5-6-1.1-6-2.5-6Z"
        stroke="currentColor"
        strokeWidth=".7"
        fill="none"
      />
    </svg>
  );

  const pagehead = (s: string) => <div className="b-pagehead">{s}</div>;

  const champs = AWARDS.filter((a) => /champion|1st|first/i.test(a.result)).slice(0, 9);

  /* ── spreads ────────────────────────────────────────────────────────────── */

  const spreads: { l: React.ReactNode; r: React.ReactNode }[] = [
    /* 0 — inside cover + title */
    {
      l: (
        <>
          <div className="b-glance">
            <div className="b-glance-head">
              <div className="b-seal b-seal-sm" aria-hidden><span>JY</span></div>
              <p className="b-over">{t.glance}</p>
            </div>
            <dl className="b-facts">
              <dt>{t.now}</dt><dd>{t.nowV}</dd>
              <dt>{t.before}</dt><dd>{t.beforeV}</dd>
              <dt>{t.study}</dt><dd>{t.studyV}</dd>
            </dl>
            <ul className="b-stats">
              {t.stats.map(([v, k]) => (
                <li key={k}><strong>{v}</strong><span>{k}</span></li>
              ))}
            </ul>
            <div className="b-cta">
              <button className="b-btn b-btn-ink" onClick={() => go(1)}>{t.begin} →</button>
              <Link className="b-btn" href={`/${lang}/work`}>{t.allWork}</Link>
              <a className="b-btn" href={PROFILE.resume} target="_blank" rel="noreferrer">{t.resume} ↗</a>
              <a className="b-btn" href={`mailto:${PROFILE.email}`}>{t.email}</a>
            </div>
          </div>
          <div className="b-folio">{folio(t.folio + " ii", 1)}</div>
        </>
      ),
      r: (
        <>
          <div className="b-titlepage">
            <div className="b-title-frame">
              <i className="b-fleuron tl">❦</i><i className="b-fleuron tr">❦</i>
              <i className="b-fleuron bl">❦</i><i className="b-fleuron br">❦</i>
              <p className="b-over">{t.manuscript}</p>
              <h1>JUPITER&nbsp;YU</h1>
              <p className="b-role">{lang === "zh" ? "Agent 工程师 · 全栈" : "Agent Engineer · Full-Stack"}</p>
              {engraved}
              <p className="b-pos">{PROFILE.positioning[lang]}</p>
              <p className="b-colophon">{t.colophon}</p>
            </div>
          </div>
          <div className="b-folio">{folio(t.folio + " i", 2)}</div>
        </>
      ),
    },
    /* 1 — reader's note + contents */
    {
      l: (
        <>
          {pagehead(t.manuscript)}
          <h2 className="b-h2">{t.readerTitle}</h2>
          <p className="b-body">{t.readerBody}</p>
          <button className="b-idxlink" onClick={() => go(9)}>
            <span className="b-marg">{t.indexTeaser}</span>
          </button>
          <div className="b-folio">{folio(t.folio + " iii", 3)}</div>
        </>
      ),
      r: (
        <>
          {pagehead(t.manuscript)}
          <h2 className="b-h2">{t.contents}</h2>
          <ol className="b-toc">
            {CHAPTERS.map((c, i) => (
              <li key={c.key}>
                <button className="b-toc-go" onClick={() => go(c.spread)}>
                  <span className="b-toc-n">{["I", "II", "III", "IV", "V"][i]}.</span>
                  <span className="b-toc-t">{lang === "zh" ? c.zh : c.en}</span>
                  <span className="b-dots" />
                  <span className="b-toc-f">{c.folio}</span>
                </button>
              </li>
            ))}
            <li className="b-toc-app">
              <span className="b-toc-n" />
              <span className="b-toc-t">{t.appendix}</span>
              <span className="b-dots" />
              <span className="b-toc-f">18</span>
            </li>
            <li className="b-toc-app b-toc-idx">
              <span className="b-toc-n" />
              <span className="b-toc-t">
                <button onClick={() => go(9)}>{t.indexTitle}</button>
              </span>
              <span className="b-dots" />
              <span className="b-toc-f">19</span>
            </li>
          </ol>
          <div className="b-folio">{folio(t.folio + " iv", 4)}</div>
        </>
      ),
    },
    /* 2 — chapter I opener + entries */
    {
      l: (
        <>
          {pagehead(`${t.chapter} I`)}
          <ChapOpen idx={0} />
          <p className="b-marg">{lang === "zh" ? "从 harness 开始入迷 ↓" : "got obsessed with harnesses here ↓"}</p>
          <div className="b-folio">{folio("1", 5)}</div>
        </>
      ),
      r: (
        <>
          {pagehead(lang === "zh" ? CHAPTERS[0].zh : CHAPTERS[0].en)}
          <Entry id="weichuang" note={lang === "zh" ? "现在的正职" : "the day job"} />
          <Entry id="weixi-studio" />
          <Entry id="creative-engine" />
          <div className="b-folio">{folio("2", 6)}</div>
        </>
      ),
    },
    /* 3 — chapter I continued */
    {
      l: (
        <>
          {pagehead(lang === "zh" ? CHAPTERS[0].zh : CHAPTERS[0].en)}
          <Entry id="screenplay-studio" note={lang === "zh" ? "评测说不" : "the eval said no"} />
          <Entry id="resona" />
          <div className="b-folio">{folio("3", 7)}</div>
        </>
      ),
      r: (
        <>
          {pagehead(lang === "zh" ? CHAPTERS[0].zh : CHAPTERS[0].en)}
          <Entry id="novel-to-script" note={lang === "zh" ? "GitHub 175 星" : "175 stars on GitHub"} />
          <Entry id="shotloom" />
          <p className="b-end">❦</p>
          <div className="b-folio">{folio("4", 8)}</div>
        </>
      ),
    },
    /* 4 — chapter II opener + entries */
    {
      l: (
        <>
          {pagehead(`${t.chapter} II`)}
          <ChapOpen idx={1} />
          <p className="b-marg">{lang === "zh" ? "八条链都跑过" : "eight chains deep"}</p>
          <div className="b-folio">{folio("9", 9)}</div>
        </>
      ),
      r: (
        <>
          {pagehead(lang === "zh" ? CHAPTERS[1].zh : CHAPTERS[1].en)}
          <Entry id="zkwasm-suite" note={lang === "zh" ? "上一份正职" : "the last day job"} />
          <Entry id="ringchat" />
          <div className="b-folio">{folio("10", 10)}</div>
        </>
      ),
    },
    /* 5 — chapter II continued */
    {
      l: (
        <>
          {pagehead(lang === "zh" ? CHAPTERS[1].zh : CHAPTERS[1].en)}
          <Entry id="outcomex" />
          <Entry id="ava-box" note={lang === "zh" ? "冠军作品" : "took the title"} />
          <div className="b-folio">{folio("11", 11)}</div>
        </>
      ),
      r: (
        <>
          {pagehead(lang === "zh" ? CHAPTERS[1].zh : CHAPTERS[1].en)}
          <Entry id="production-tools" />
          <Entry id="rosen-app" />
          <p className="b-end">❦</p>
          <div className="b-folio">{folio("12", 12)}</div>
        </>
      ),
    },

    {
      l: (
        <>
          {pagehead(`${t.chapter} III`)}
          <ChapOpen idx={2} />
          <div className="b-folio">{folio("13", 13)}</div>
        </>
      ),
      r: (
        <>
          {pagehead(lang === "zh" ? CHAPTERS[2].zh : CHAPTERS[2].en)}
          {RESEARCH.slice(0, 2).map((r) => {
            const rr = loc(r, lang);
            return (
              <article className={`b-entry ${hl === r.id ? "hl" : ""}`} key={r.id} id={`ent-${r.id}`}>
                <header>
                  <h3>{rr.title}</h3>
                  <div className="b-meta">{r.venue} · {r.period}</div>
                </header>
                <p>{rr.summary}</p>
                <p className="b-imp">{r.metrics.map((m) => `${m.v} ${m.k}`).join(" · ")}</p>
                <Slip id={r.id} />
              </article>
            );
          })}
          <div className="b-folio">{folio("14", 14)}</div>
        </>
      ),
    },
    /* 7 — chapter IV hackathon ledger */
    {
      l: (
        <>
          {pagehead(`${t.chapter} IV`)}
          <ChapOpen idx={3} />
          <p className="b-marg">{lang === "zh" ? "冠军是最快的学习方式" : "winning is the fastest curriculum"}</p>
          <div className="b-folio">{folio("15", 15)}</div>
        </>
      ),
      r: (
        <>
          {pagehead(lang === "zh" ? CHAPTERS[3].zh : CHAPTERS[3].en)}
          <table className="b-ledger">
            <tbody>
              {champs.map((a, i) => (
                <tr key={i}>
                  <td className="b-ly">{a.year}</td>
                  <td>{a.event}</td>
                  <td className="b-lr">{a.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="b-fn">{t.awardsNote}</p>
          <div className="b-folio">{folio("16", 16)}</div>
        </>
      ),
    },
    /* 8 — chapter V cursus vitae + colophon */
    {
      l: (
        <>
          {pagehead(`${t.chapter} V`)}
          <ChapOpen idx={4} />
          <div className="b-cv">
            {WORK.slice(0, 6).map((w) => {
              const wl = loc(w, lang);
              const wid = `work-${w.id}`;
              return (
                <div key={w.id}>
                  <div className={`b-cv-row ${hl === wid || hl === w.id ? "hl" : ""}`} id={`ent-${wid}`}>
                    <span className="b-cv-p">{w.period.replace("now", t.ongoing)}</span>
                    <span className="b-cv-r">{wl.role}</span>
                    <span className="b-cv-o">{wl.org}{wl.backing ? ` · ${wl.backing}` : ""}</span>
                  </div>
                  <Slip id={wid} />
                  <Slip id={w.id} />
                </div>
              );
            })}
          </div>
          <div className="b-folio">{folio("17", 17)}</div>
        </>
      ),
      r: (
        <>
          {pagehead(t.appendix)}
          <h3 className="b-h3">{t.education}</h3>
          <ul className="b-list">
            {EDUCATION.map((e) => (
              <li key={e.school}><strong>{e.school}</strong> — {e.degree} · {e.period}</li>
            ))}
          </ul>
          <h3 className="b-h3">{t.contact}</h3>
          <ul className="b-list b-links">
            <li><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></li>
            <li><a href={PROFILE.github} target="_blank" rel="noreferrer">github.com/JupiterXiaoxiaoYu</a></li>
            <li><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">linkedin/in/jupiter-yu</a></li>
            <li><a href={PROFILE.resume} target="_blank" rel="noreferrer">résumé.pdf</a></li>
          </ul>
          <p className="b-end">{t.end} ❦</p>
          <div className="b-folio">{folio("18", 18)}</div>
        </>
      ),
    },
    /* 9 — the index (a living one) */
    {
      l: (
        <>
          {pagehead(t.indexTitle)}
          <h2 className="b-h2">{t.indexTitle}</h2>
          <p className="b-body">{t.indexBody}</p>
          <div className="b-askbox b-askbox-big">
            <label className="b-marg">{t.askPlaceholder}</label>
            <AskInline onAsk={ask} lang={lang} busy={busy} />
            {answer && <p className="b-ans">{answer}</p>}
            <div className="b-chips">
              {(lang === "zh"
                ? ["Jupiter 做过哪些 Agent 系统？", "有什么全栈作品？", "黑客松成绩如何？", "Jupiter 现在在哪工作？"]
                : ["What agent systems has Jupiter built?", "Any full-stack work?", "Hackathon record?", "Where does Jupiter work now?"]
              ).map((c) => (
                <button key={c} onClick={() => ask(c)} disabled={busy}>{c}</button>
              ))}
            </div>
          </div>
          <div className="b-folio">{folio("19", 19)}</div>
        </>
      ),
      r: (
        <>
          {pagehead(t.indexTitle)}
          <ul className="b-index">
            {[...Object.keys(ENTRY_FOLIO)]
              .sort((a, b) => ENTRY_FOLIO[a] - ENTRY_FOLIO[b])
              .map((id) => {
                const p = PROJECTS.find((x) => x.id === id);
                const r = RESEARCH.find((x) => x.id === id);
                const name = p ? loc(p, lang).name : r ? loc(r, lang).title : id;
                const kind = p ? p.category[0].toUpperCase() : "RESEARCH";
                return (
                  <li key={id}>
                    <button onClick={() => { go(ENTRY_SPREAD[id]); land(id, "→"); }}>
                      <span className="b-ix-t">{name}</span>
                      <span className="b-ix-k">{kind}</span>
                      <span className="b-dots" />
                      <span className="b-ix-f">{ENTRY_FOLIO[id]}</span>
                    </button>
                  </li>
                );
              })}
            <li>
              <button onClick={() => go(7)}>
                <span className="b-ix-t">{lang === "zh" ? "黑客松账册" : "Hackathon Ledger"}</span>
                <span className="b-ix-k">HONOURS</span>
                <span className="b-dots" />
                <span className="b-ix-f">16</span>
              </button>
            </li>
            <li>
              <button onClick={() => go(8)}>
                <span className="b-ix-t">{lang === "zh" ? "生平 · 书信" : "Cursus Vitae · Correspondence"}</span>
                <span className="b-ix-k">CV</span>
                <span className="b-dots" />
                <span className="b-ix-f">17</span>
              </button>
            </li>
          </ul>
          <div className="b-folio">{folio("20", 20)}</div>
        </>
      ),
    },
  ];

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(Math.min(spread + 1, SPREADS - 1));
      if (e.key === "ArrowLeft") go(Math.max(spread - 1, 0));
    },
    [go, spread],
  );
  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  const leafFaces = leaf
    ? leaf.dir === 1
      ? { f: spreads[leaf.from].r, b: spreads[leaf.to].l }
      : { f: spreads[leaf.to].r, b: spreads[leaf.from].l }
    : null;

  return (
    <div className={`b-stage bk-${lang}`}>
      <header className="b-chrome">
        <span>JUPITER YU · {t.specimen}</span>
        <nav>
          <span className="b-hintline">{t.hint}</span>
          <Link href={`/${lang}/work`}>{t.work}</Link>
          <a href={PROFILE.resume} target="_blank" rel="noreferrer">{t.resume}</a>
          <Link href={lang === "zh" ? "/en" : "/zh"}>
            {lang === "zh" ? "EN" : "中文"}
          </Link>
        </nav>
      </header>

      <div className={`b-book sp-${spread}`} ref={bookRef}>
        <div className="b-page left">
          <div className="b-page-in">{spreads[spread].l}</div>
          <button className="b-turn prev" onClick={() => go(Math.max(spread - 1, 0))} aria-label={t.prev}>
            {t.prev}
          </button>
        </div>
        <div className="b-page right">
          <div className="b-page-in">{spreads[spread].r}</div>
          <button className="b-turn next" onClick={() => go(Math.min(spread + 1, SPREADS - 1))} aria-label={t.next}>
            {t.next}
          </button>
        </div>

        <div className="b-ribs" role="tablist">
          {CHAPTERS.map((c, i) => (
            <button
              key={c.key}
              className={`b-rib rib-${c.key}`}
              style={{ top: `${8 + i * 14}%` }}
              onClick={() => go(c.spread)}
              role="tab"
              aria-label={lang === "zh" ? c.zh : c.en}
            >
              <span className="rib-full">{lang === "zh" ? c.zh : (c.tabEn ?? c.en)}</span>
              <span className="rib-short">{c.short[lang]}</span>
            </button>
          ))}
          <button
            className="b-rib rib-idx"
            style={{ top: `${8 + CHAPTERS.length * 14}%` }}
            onClick={() => go(9)}
            role="tab"
            aria-label={t.indexTitle}
          >
            <span className="rib-full">{lang === "zh" ? "索引" : "Index"}</span>
            <span className="rib-short">{lang === "zh" ? "索引" : "Index"}</span>
          </button>
        </div>

        {tab && (
          <div className="b-ptab" style={{ top: tab.top }}>
            <span>{tab.label}</span>
          </div>
        )}

        <nav className="b-mnav" aria-label="pages">
          <button onClick={() => go(Math.max(spread - 1, 0))} disabled={spread === 0}>{t.mPrev}</button>
          <span>{spread + 1} / {SPREADS}</span>
          <button onClick={() => go(Math.min(spread + 1, SPREADS - 1))} disabled={spread === SPREADS - 1}>{t.mNext}</button>
        </nav>

        {leaf && leafFaces && (
          <div className={`b-leaf ${leaf.dir === 1 ? "next" : "prev"} ${turned ? "turning" : ""}`}>
            <div className="b-face f">
              <div className="b-page-in">{leafFaces.f}</div>
            </div>
            <div className="b-face b">
              <div className="b-page-in">{leafFaces.b}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AskInline({ onAsk, lang, busy }: { onAsk: (q: string) => void; lang: Lang; busy?: boolean }) {
  const [q, setQ] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAsk(q);
        setQ("");
      }}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        disabled={busy}
        placeholder={lang === "zh" ? "比如：Jupiter 做过哪些 Agent 系统？" : "e.g. what agent systems has Jupiter built?"}
        aria-label="ask"
      />
    </form>
  );
}
