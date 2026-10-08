"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { PROJECTS, PROFILE, type Lang, type Project } from "@/lib/data";
import { loc } from "@/lib/i18n";

/* ── specimen content ───────────────────────────────────────────────────────── */

const SPREADS = 4;

const CHAPTERS: { key: string; en: string; zh: string; tabEn?: string; folio: string }[] = [
  { key: "ai", en: "AI Works", zh: "智能之作", folio: "1" },
  { key: "web3", en: "On-Chain Works", zh: "链上之作", folio: "9" },
  { key: "res", en: "Research Notes", zh: "研究手记", folio: "17" },
  { key: "hack", en: "Hackathon Ledger", zh: "黑客松账册", tabEn: "Hackathons", folio: "21" },
  { key: "me", en: "Cursus Vitae", zh: "生平", folio: "27" },
];

const T = {
  en: {
    specimen: "SPECIMEN · 样张",
    manuscript: "A Working Manuscript",
    readerTitle: "To the Reader",
    readerBody:
      "This volume gathers what Jupiter Yu has built, studied and won — bound, not scrolled. Ribbons on the fore-edge jump between chapters; the leaves themselves turn. Ask the index a question below, and the book will find the passage itself.",
    askPlaceholder: "Ask the index a question…",
    contents: "Contents",
    folio: "Fol.",
    chapter1: "Chapter I",
    aiWorks: "AI Works",
    aiIntro:
      "Four systems where machine intelligence is the material, not the garnish — retrieval over a million-post social graph, decentralized audits of AI itself, an AIGC marketing engine, and a fraud model that took first place.",
    plateCaption: "Plate I. — Sovereign RAG: metapath retrieval over 1.36M posts",
    metrics: ["79.3% accuracy", "<100ms latency", "1.36M posts", "$0 api cost"],
    colophon: "Set in EB Garamond · bound by hand, MMXXVI",
    exlibris: "EX LIBRIS",
    prev: "‹ Prev",
    next: "Next ›",
    hint: "scroll to read · ribbons jump chapters · the index answers",
    noMatch: "— no such entry; try “AI”, “fraud”, “marketing”…",
    found: "— found at folio",
  },
  zh: {
    specimen: "SPECIMEN · 样张",
    manuscript: "一册在手 · 工作手稿",
    readerTitle: "致读者",
    readerBody:
      "本册收录于杰宇所做、所学、所赢——装订成书，而非无尽下滑。书口处的丝带书签用来跳章，书页真的会翻动。在下方问索引一个问题，书会自己翻到答案所在的那一页。",
    askPlaceholder: "向索引提一个问题…",
    contents: "目录",
    folio: "页",
    chapter1: "第一章",
    aiWorks: "智能之作",
    aiIntro:
      "四个以机器智能为材料、而非点缀的系统：面向百万帖社交图的检索、对 AI 本身的去中心化审计、AIGC 营销引擎、以及拿下第一名的反欺诈模型。",
    plateCaption: "图版 I —— Sovereign RAG：在 136 万帖之上的元路径检索",
    metrics: ["79.3% 准确率", "<100ms 延迟", "136 万帖", "API 成本 $0"],
    colophon: "以 EB Garamond 排印 · 手工装订 · 二〇二六",
    exlibris: "藏书票",
    prev: "‹ 上一页",
    next: "下一页 ›",
    hint: "下滑阅读 · 丝带跳章 · 索引会回答",
    noMatch: "——查无此条；试试“AI”、“反欺诈”、“营销”…",
    found: "——见于第",
  },
};

/* entries that live inside chapter I spread, mapped for the index */
const CHAPTER_ENTRIES = ["sovereign-rag", "trustai", "martech3", "antifraud"];

const proj = (id: string, lang: Lang): Project =>
  loc(PROJECTS.find((p) => p.id === id)!, lang);

const PAGES = SPREADS * 2;
const folio = (label: string, n: number) => `${label} · ${n}/${PAGES}`;

/* keyword → entry scorer (mirrors the API's offline fallback, trimmed) */
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
  for (const id of CHAPTER_ENTRIES) {
    const p = PROJECTS.find((x) => x.id === id)!;
    const hay = `${p.name} ${p.role} ${p.category.join(" ")} ${p.summary} ${p.detail ?? ""} ${p.stack.join(" ")} ${p.zh?.name ?? ""} ${p.zh?.summary ?? ""}`.toLowerCase();
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
  const [turned, setTurned] = useState(false);
  const bookRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const go = useCallback(
    (target: number) => {
      if (target === spread || leaf) return;
      const dir = target > spread ? 1 : -1;
      setLeaf({ dir, from: spread, to: target });
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
    if (!leaf) return;
    const r = requestAnimationFrame(() =>
      requestAnimationFrame(() => setTurned(true)),
    );
    return () => cancelAnimationFrame(r);
  }, [leaf]);

  /* after landing, highlight + pencil tab */
  const land = useCallback((domId: string, label: string) => {
    timers.current.push(
      setTimeout(() => {
        const el = bookRef.current?.querySelector<HTMLElement>(`#ent-${domId}`);
        const page = bookRef.current?.querySelector<HTMLElement>(".b-page.right");
        if (el && page) {
          const pr = page.getBoundingClientRect();
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

  const ask = useCallback(
    (q: string) => {
      const query = q.trim().slice(0, 140);
      if (!query) return;
      const hit = score(query);
      if (!hit) {
        setAnswer(t.noMatch);
        return;
      }
      const p = proj(hit, lang);
      const target = hit === "martech3" || hit === "antifraud" ? 3 : 2;
      setAnswer(`${t.found} ${target === 3 ? "3" : "1"}: ${p.name}`);
      go(target);
      land(hit, "?");
    },
    [lang, t, go, land],
  );

  /* entry block used on the chapter spreads */
  const Entry = ({ id, note }: { id: string; note?: string }) => {
    const p = proj(id, lang);
    return (
      <article className={`b-entry ${hl === id ? "hl" : ""}`} id={`ent-${id}`}>
        <header>
          <h3>{p.name}</h3>
          <div className="b-meta">
            {p.year} · {p.role} · {p.category.join(" · ").toUpperCase()}
          </div>
        </header>
        <p>{p.summary}</p>
        {p.impact && <p className="b-imp">{p.impact}</p>}
        {note && <aside className="b-marg">{note}</aside>}
      </article>
    );
  };

  /* ── spreads ──────────────────────────────────────────────────────────── */

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

  const plateFigure = (
    <svg viewBox="0 0 320 210" className="b-fig" aria-hidden>
      {/* engraved retrieval diagram */}
      <g fill="none" stroke="#241d12" strokeWidth=".6">
        <path d="M40 150 C 90 60, 150 40, 200 90 S 280 150, 300 60" strokeDasharray="1.5 3" />
        <path d="M40 150 C 110 130, 160 150, 210 120 S 270 90, 300 60" />
        <path d="M40 150 L 120 90 L 210 120 L 300 60" strokeDasharray="4 3" />
        {[40, 120, 210, 300].map((x, i) => (
          <circle key={i} cx={x} cy={[150, 90, 120, 60][i]} r="3" fill="#241d12" stroke="none" />
        ))}
        {[85, 165, 255].map((x, i) => (
          <circle key={i} cx={x} cy={[118, 108, 102][i]} r="2" fill="#241d12" stroke="none" />
        ))}
      </g>
      <path
        d="M40 150 L 120 90 L 210 120 L 300 60"
        fill="none"
        stroke="#2f3bff"
        strokeWidth="1.6"
      />
      <text x="122" y="82" fontSize="8" fill="#241d12" fontFamily="serif" fontStyle="italic">
        metapath
      </text>
      <text x="16" y="165" fontSize="7" fill="#5c5142" fontFamily="monospace">
        query →
      </text>
      <text x="284" y="48" fontSize="7" fill="#5c5142" fontFamily="monospace">
        → answer
      </text>
    </svg>
  );

  const spreads: { l: React.ReactNode; r: React.ReactNode }[] = [
    /* 0 — inside cover + title page */
    {
      l: (
        <>
          <div className="b-leather-note">
            <div className="b-exlibris">
              <div className="b-ex-frame">
                <span>{t.exlibris}</span>
                <strong>JY</strong>
                <span className="b-ex-sub">{PROFILE.handle}</span>
              </div>
            </div>
            <div className="b-seal" aria-hidden><span>JY</span></div>
            <p className="b-marg b-marg-c">{t.specimen}</p>
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
          <div className="b-pagehead">{t.manuscript}</div>
          <h2 className="b-h2">{t.readerTitle}</h2>
          <p className="b-body">{t.readerBody}</p>
          <div className="b-askbox">
            <label className="b-marg">{t.askPlaceholder}</label>
            <AskInline onAsk={ask} lang={lang} />
            {answer && <p className="b-ans">{answer}</p>}
            <div className="b-chips">
              {(lang === "zh"
                ? ["他做过什么 AI 项目？", "有什么 Web3 作品？", "黑客松成绩如何？"]
                : ["What has he built in AI?", "Any Web3 work?", "Hackathon record?"]
              ).map((c) => (
                <button key={c} onClick={() => ask(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="b-folio">{folio(t.folio + " iii", 3)}</div>
        </>
      ),
      r: (
        <>
          <div className="b-pagehead">{t.manuscript}</div>
          <h2 className="b-h2">{t.contents}</h2>
          <ol className="b-toc">
            {CHAPTERS.map((c, i) => (
              <li key={c.key}>
                <span className="b-toc-n">{["I", "II", "III", "IV", "V"][i]}.</span>
                <span className="b-toc-t">{lang === "zh" ? c.zh : c.en}</span>
                <span className="b-dots" />
                <span className="b-toc-f">{c.folio}</span>
              </li>
            ))}
            <li className="b-toc-app">
              <span className="b-toc-n" />
              <span className="b-toc-t">{lang === "zh" ? "附录 · 荣誉与简历" : "Appendix · Honours & CV"}</span>
              <span className="b-dots" />
              <span className="b-toc-f">31</span>
            </li>
          </ol>
          <div className="b-folio">{folio(t.folio + " iv", 4)}</div>
        </>
      ),
    },
    /* 2 — chapter I opener + first entries */
    {
      l: (
        <>
          <div className="b-pagehead">{t.chapter1}</div>
          <div className="b-chap">
            <div className="b-roman">I.</div>
            <h2 className="b-chap-t">{t.aiWorks}</h2>
            {engraved}
            <p className="b-body b-drop">{t.aiIntro}</p>
            <p className="b-marg">
              {lang === "zh" ? "从检索开始入迷 ↓" : "got obsessed with retrieval here ↓"}
            </p>
          </div>
          <div className="b-folio">{folio("1", 5)}</div>
        </>
      ),
      r: (
        <>
          <div className="b-pagehead">{t.aiWorks}</div>
          <Entry
            id="sovereign-rag"
            note={lang === "zh" ? "论文主线" : "the thesis thread"}
          />
          <Entry id="trustai" />
          <p className="b-fn">
            <sup>1</sup> {lang === "zh" ? "硕士论文，香港科技大学，进行中。" : "MPhil thesis, HKUST — work in progress."}
          </p>
          <div className="b-folio">{folio("2", 6)}</div>
        </>
      ),
    },
    /* 3 — plate + remaining entries */
    {
      l: (
        <>
          <div className="b-pagehead">{t.aiWorks}</div>
          <figure className="b-plate">
            <span className="b-tape tl" />
            <span className="b-tape br" />
            {plateFigure}
            <figcaption>{t.plateCaption}</figcaption>
          </figure>
          <ul className="b-metrics">
            {t.metrics.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <div className="b-folio">{folio("3", 7)}</div>
        </>
      ),
      r: (
        <>
          <div className="b-pagehead">{t.aiWorks}</div>
          <Entry id="martech3" note={lang === "zh" ? "AIGC×Web3 试水" : "AIGC × Web3"} />
          <Entry id="antifraud" note={lang === "zh" ? "拿了第一名" : "1st place — nice"} />
          <p className="b-end">❦</p>
          <div className="b-folio">{folio("4", 8)}</div>
        </>
      ),
    },
  ];

  /* ribbon → spread target (chapters I & IV land inside the specimen) */
  const ribTarget = [2, 2, 3, 2, 0];

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
          <Link href={lang === "zh" ? "/en/book" : "/zh/book"}>
            {lang === "zh" ? "EN" : "中文"}
          </Link>
        </nav>
      </header>

      <div className="b-book" ref={bookRef}>
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

        {/* fore-edge page lines + ribbons */}
        <div className="b-ribs" role="tablist">
          {CHAPTERS.map((c, i) => (
            <button
              key={c.key}
              className={`b-rib rib-${c.key}`}
              style={{ top: `${10 + i * 16}%` }}
              onClick={() => go(ribTarget[i])}
              role="tab"
              aria-label={lang === "zh" ? c.zh : c.en}
            >
              <span>{lang === "zh" ? c.zh : (c.tabEn ?? c.en)}</span>
            </button>
          ))}
        </div>

        {/* pencil tab inserted by the index */}
        {tab && (
          <div className="b-ptab" style={{ top: tab.top }}>
            <span>{tab.label}</span>
          </div>
        )}

        {/* turning leaf */}
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

/* inline ask box drawn like a marginal note */
function AskInline({ onAsk, lang }: { onAsk: (q: string) => void; lang: Lang }) {
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
        placeholder={lang === "zh" ? "比如：他做过什么 AI 项目？" : "e.g. what has he built in AI?"}
        aria-label="ask"
      />
    </form>
  );
}
