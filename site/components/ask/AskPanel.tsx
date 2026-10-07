"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { PROJECTS, type Lang } from "@/lib/data";
import type { UIStrings } from "@/lib/i18n";

type Msg = { role: "user" | "assistant"; content: string };

const IDS = new Set(PROJECTS.map((p) => p.id));

function Answer({ text, lang }: { text: string; lang: Lang }) {
  const parts = text.split(/(\[\[[a-z0-9-]+\]\])/g);
  return (
    <>
      {parts.map((p, i) => {
        const m = p.match(/^\[\[([a-z0-9-]+)\]\]$/);
        if (m && IDS.has(m[1])) {
          return (
            <Link key={i} href={`/${lang}/work/${m[1]}`} className="cite">
              {m[1]}
            </Link>
          );
        }
        if (m) return <span key={i}>{m[1]}</span>;
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

export default function Ask({
  lang,
  t,
  children,
}: {
  lang: Lang;
  t: UIStrings;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const send = useCallback(
    async (question: string) => {
      const q = question.trim().slice(0, 500);
      if (!q || busy) return;
      const history = [...msgs, { role: "user" as const, content: q }];
      setMsgs([...history, { role: "assistant", content: "" }]);
      setBusy(true);
      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            messages: history.slice(-6),
            lang,
          }),
        });
        if (!res.ok || !res.body) {
          const txt = res.ok ? "" : await res.text();
          throw new Error(txt || `HTTP ${res.status}`);
        }
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += dec.decode(value, { stream: true });
          const cur = acc;
          setMsgs((m) => {
            const next = [...m];
            next[next.length - 1] = { role: "assistant", content: cur };
            return next;
          });
        }
      } catch (e) {
        const msg =
          e instanceof Error && e.message ? e.message : String(e);
        setMsgs((m) => {
          const next = [...m];
          next[next.length - 1] = {
            role: "assistant",
            content:
              msg.length < 300
                ? msg
                : lang === "zh"
                  ? "出了点问题，请稍后再试或发邮件给 jupiterxiaoxiaoyu@gmail.com。"
                  : "Something went wrong — try again or email jupiterxiaoxiaoyu@gmail.com.",
          };
          return next;
        });
      } finally {
        setBusy(false);
      }
    },
    [msgs, busy, lang],
  );

  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      const q = (e as CustomEvent<string | undefined>).detail;
      if (q) void send(q);
    };
    window.addEventListener("ask:open", onOpen);
    return () => window.removeEventListener("ask:open", onOpen);
  }, [send]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const id = setTimeout(() => inputRef.current?.focus(), 350);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(id);
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [msgs]);

  return (
    <>
      {children}
      <button
        className="ask-fab"
        onClick={() => setOpen(true)}
        aria-label={t.askTitle}
      >
        {t.askTitle} ✳
      </button>
      <div
        className={`ask-scrim ${open ? "on" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden
        style={{ pointerEvents: open ? "auto" : "none" }}
      />
      <aside
        className={`ask-panel ${open ? "on" : ""}`}
        role="dialog"
        aria-label={t.askTitle}
        aria-hidden={!open}
      >
        <div className="ask-head">
          <span className="t">
            <em>{t.askTitle}</em>
          </span>
          <button className="mono" onClick={() => setOpen(false)}>
            Esc ✕
          </button>
        </div>
        <div className="ask-msgs" ref={listRef}>
          {msgs.length === 0 && (
            <div className="mono">{t.askHint}</div>
          )}
          {msgs.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="ask-m u">
                {m.content}
              </div>
            ) : (
              <div key={i} className="ask-m">
                <span className="who mono mono-accent">Ask Jupiter</span>
                <Answer text={m.content} lang={lang} />
                {busy && i === msgs.length - 1 && "…"}
              </div>
            ),
          )}
        </div>
        <form
          className="ask-input"
          onSubmit={(e) => {
            e.preventDefault();
            const q = draft;
            setDraft("");
            void send(q);
          }}
        >
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t.askPlaceholder}
            aria-label={t.askPlaceholder}
          />
          <button type="submit" disabled={busy}>
            →
          </button>
        </form>
      </aside>
    </>
  );
}
