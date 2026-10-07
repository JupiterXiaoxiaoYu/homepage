import { NextRequest } from "next/server";
import { buildCorpus } from "@/lib/knowledge";
import { PROJECTS, WORK, RESEARCH } from "@/lib/data";

export const runtime = "nodejs";

const CORPUS = buildCorpus();

const SYSTEM = `You are "Ask Jupiter", the assistant on Jupiter Yu's portfolio website. You answer questions from recruiters, founders and engineers about Jupiter's work, skills, experience, research and availability.

Rules:
- Use ONLY the facts in the knowledge base below. If something is not covered, say you don't know and suggest emailing jupiterxiaoxiaoyu@gmail.com. Never invent projects, employers, numbers or dates.
- Reply in the language of the user's latest message; if unclear, use {LANG} (en = English, zh = Simplified Chinese).
- Be concise: at most ~120 words or 5 bullets. Lead with the direct answer.
- When you mention a project, cite it with its id in double brackets, e.g. [[sovereign-rag]]. Only use ids that appear in the knowledge base.
- Speak about Jupiter in the third person. Be warm and confident, not salesy.
- Politely decline requests unrelated to Jupiter or his work.

Knowledge base:
{CORPUS}`;

// ── naive per-IP rate limit: 20 req / 10 min ────────────────────────────────
const hits = new Map<string, { n: number; reset: number }>();
function limited(ip: string) {
  const now = Date.now();
  const w = hits.get(ip);
  if (!w || w.reset < now) {
    hits.set(ip, { n: 1, reset: now + 10 * 60_000 });
    return false;
  }
  w.n++;
  return w.n > 20;
}

// ── offline fallback: keyword scoring over the corpus entries ───────────────
type Entry = { id: string; text: string; label: string };
const ENTRIES: Entry[] = [
  ...PROJECTS.map((p) => ({
    id: p.id,
    label: `${p.name} (${p.year})`,
    text: `${p.name} ${p.role} ${p.category.join(" ")} ${p.summary} ${p.detail ?? ""} ${p.stack.join(" ")}`,
  })),
  ...WORK.map((w) => ({
    id: `work-${w.id}`,
    label: `${w.role} @ ${w.org} (${w.period})`,
    text: `${w.role} ${w.org} ${w.points.join(" ")}`,
  })),
  ...RESEARCH.map((r) => ({
    id: r.id,
    label: `${r.title} — ${r.venue}`,
    text: `${r.title} ${r.summary} ${r.tags.join(" ")}`,
  })),
];

const STOP = new Set(
  "the a an and or of to in for on with is are was were be been has have had do does did what which who how his he him about tell me show did do does can could would should i you it its".split(
    " ",
  ),
);

function offlineAnswer(q: string, lang: string): string {
  const toks = q
    .toLowerCase()
    .replace(/[^a-z0-9一-鿿]+/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w));
  const scored = ENTRIES.map((e) => {
    const hay = e.text.toLowerCase();
    let s = 0;
    for (const t of toks) if (hay.includes(t)) s += t.length;
    return { e, s };
  })
    .sort((a, b) => b.s - a.s)
    .slice(0, 3)
    .filter((x) => x.s > 0);

  const prefix = lang === "zh" ? "（离线演示）" : "(offline demo) ";
  if (scored.length === 0) {
    return (
      prefix +
      (lang === "zh"
        ? "我在站点的资料中没有找到直接相关的内容。Jupiter 是 AI + Web3 工程师，代表项目包括 [[sovereign-rag]]、[[zkwasm-suite]] 和 [[trustai]]。其他问题可以发邮件到 jupiterxiaoxiaoyu@gmail.com。"
        : "I couldn't find a close match in the site's knowledge base. Jupiter is an AI + Web3 engineer — representative work includes [[sovereign-rag]], [[zkwasm-suite]] and [[trustai]]. For anything else, email jupiterxiaoxiaoyu@gmail.com.")
    );
  }
  const pids = new Set(PROJECTS.map((p) => p.id));
  const lines = scored.map(
    (x) => `• ${x.e.label}${pids.has(x.e.id) ? ` [[${x.e.id}]]` : ""}`,
  );
  return (
    prefix +
    (lang === "zh"
      ? `根据站点资料，最相关的是：\n${lines.join("\n")}\n点开引用标签可查看对应案例。`
      : `Based on the site's records, the closest matches are:\n${lines.join("\n")}\nTap a citation pill to open the case study.`)
  );
}

function streamText(text: string) {
  const enc = new TextEncoder();
  const chunks = text.match(/[\s\S]{1,24}/g) ?? [text];
  return new ReadableStream<Uint8Array>({
    async start(c) {
      for (const ch of chunks) {
        c.enqueue(enc.encode(ch));
        await new Promise((r) => setTimeout(r, 20));
      }
      c.close();
    },
  });
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "local";
  if (limited(ip)) {
    return new Response(
      "Slow down a little — Ask Jupiter allows 20 questions per 10 minutes. / 问得太快啦，请 10 分钟后再试。",
      { status: 429, headers: { "content-type": "text/plain; charset=utf-8" } },
    );
  }

  let body: { messages?: { role: string; content: string }[]; lang?: string };
  try {
    body = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  const lang = body.lang === "zh" ? "zh" : "en";
  const messages = (body.messages ?? [])
    .slice(-6)
    .filter((m) => typeof m.content === "string")
    .map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content.slice(0, 500),
    }));
  const question = [...messages].reverse().find((m) => m.role === "user");
  if (!question) return new Response("Bad request", { status: 400 });

  const key = process.env.LLM_API_KEY;
  if (!key) {
    return new Response(streamText(offlineAnswer(question.content, lang)), {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const base = process.env.LLM_BASE_URL ?? "https://api.openai.com/v1";
  const model = process.env.LLM_MODEL ?? "gpt-4o-mini";
  const upstream = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      stream: true,
      temperature: 0.3,
      max_tokens: 500,
      messages: [
        { role: "system", content: SYSTEM.replace("{CORPUS}", () => CORPUS).replace("{LANG}", () => lang) },
        ...messages,
      ],
    }),
  });
  if (!upstream.ok || !upstream.body) {
    return new Response(streamText(offlineAnswer(question.content, lang)), {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  // pipe OpenAI-compatible SSE deltas → plain text stream
  const dec = new TextDecoder();
  const enc = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(c) {
      const reader = upstream.body!.getReader();
      let buf = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          const s = line.trim();
          if (!s.startsWith("data:")) continue;
          const payload = s.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const delta = JSON.parse(payload)?.choices?.[0]?.delta?.content;
            if (typeof delta === "string") c.enqueue(enc.encode(delta));
          } catch {
            /* partial JSON — ignore */
          }
        }
      }
      c.close();
    },
  });
  return new Response(stream, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
