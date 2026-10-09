import Image from "next/image";
import type { Lang } from "@/lib/data";
import { CATEGORY_LABEL } from "@/lib/i18n";

// Deterministic PRNG seeded from the project id.
function seedOf(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function () {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Dark, cohesive cover palette — category only biases the pick.
const BASES = ["#141a4a", "#3a1418", "#0f2e2c", "#1b1b1d", "#2a1733"];
const BASE_BIAS: Record<string, number[]> = {
  agent: [0, 3, 2, 0, 1],
  ai: [0, 2, 3, 0, 4],
  web3: [1, 3, 4, 0, 1],
  research: [3, 2, 0, 3, 4],
  hackathon: [4, 0, 1, 2, 3],
};
const ACCENTS = ["#2f3bff", "#ff5a1f", "#5be3b4", "#f2f0eb"];
const PAPER = "rgba(242,240,235,1)";
const S1 = "rgba(242,240,235,0.45)"; // main strokes
const S2 = "rgba(242,240,235,0.16)"; // secondary strokes

const RATIOS: Record<string, [number, number]> = {
  wide: [800, 450], // 16:9
  spread: [800, 500], // 16:10
  tall: [800, 1000], // 4:5
  card: [800, 640], // 5:4
};

function crosshair(x: number, y: number, r: number, color: string, key: string) {
  return (
    <g key={key} stroke={color} strokeWidth={1.1} opacity={0.9}>
      <line x1={x - r} y1={y} x2={x + r} y2={y} />
      <line x1={x} y1={y - r} x2={x} y2={y + r} />
      <circle cx={x} cy={y} r={r * 0.55} fill="none" />
    </g>
  );
}

function ticks(W: number, H: number, y: number, color: string) {
  const els = [];
  const n = 18;
  const x0 = W * 0.06;
  const x1 = W * 0.94;
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) / n) * i;
    els.push(
      <line
        key={i}
        x1={x}
        y1={y}
        x2={x}
        y2={y + (i % 5 === 0 ? 10 : 5)}
        stroke={color}
        strokeWidth={0.8}
        opacity={0.7}
      />,
    );
  }
  return <g>{els}</g>;
}

function label(
  x: number,
  y: number,
  text: string,
  key: string,
  anchor: "start" | "middle" | "end" = "start",
) {
  return (
    <text
      key={key}
      x={x}
      y={y}
      fill={PAPER}
      fontFamily="monospace"
      fontSize={11}
      letterSpacing={2}
      opacity={0.65}
      textAnchor={anchor}
    >
      {text}
    </text>
  );
}

function art(id: string, cat: string, W: number, H: number) {
  const rnd = seedOf(id);
  const bias = BASE_BIAS[cat] ?? [0, 1, 2, 3, 4];
  const base = BASES[bias[Math.floor(rnd() * bias.length)]];
  const accent = ACCENTS[Math.floor(rnd() * ACCENTS.length)];
  const kind = Math.floor(rnd() * 4);
  const els: React.ReactNode[] = [];
  const fx = W * (0.3 + rnd() * 0.4);
  const fy = H * (0.3 + rnd() * 0.4);

  if (kind === 0) {
    // (a) topographic contours around a focal peak
    const lines = 13 + Math.floor(rnd() * 5);
    const mid = Math.floor(lines / 2);
    for (let i = 0; i < lines; i++) {
      const yBase = (H / (lines + 1)) * (i + 1);
      const amp = 10 + rnd() * 70;
      const freq = 1.2 + rnd() * 2.6;
      const ph = rnd() * Math.PI * 2;
      const steps = 48;
      let d = "";
      for (let s = 0; s <= steps; s++) {
        const x = (W / steps) * s;
        const bump =
          Math.exp(-Math.pow((x - fx) / (W * 0.22), 2)) *
          (i - mid) *
          -14;
        const y =
          yBase +
          bump +
          Math.sin((s / steps) * Math.PI * freq + ph) * amp * 0.45 +
          Math.sin((s / steps) * Math.PI * freq * 2.7 + ph * 2) * amp * 0.18;
        d += `${s === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      }
      els.push(
        <path
          key={i}
          d={d}
          fill="none"
          stroke={i === mid ? accent : i % 3 === 0 ? S1 : S2}
          strokeWidth={i === mid ? 1.8 : i % 3 === 0 ? 1 : 0.6}
        />,
      );
    }
    els.push(crosshair(fx, H * 0.5, 14, PAPER, "xh"));
    els.push(label(fx + 22, H * 0.5 + 4, `P.${Math.floor(rnd() * 90) + 10}`, "lb"));
    els.push(ticks(W, H, H - 26, S1));
  } else if (kind === 1) {
    // (b) dot-matrix field with radial falloff
    const gap = 24;
    const maxD = Math.hypot(W, H) * 0.5;
    let k = 0;
    for (let y = gap; y < H; y += gap) {
      for (let x = gap; x < W; x += gap) {
        const d = Math.hypot(x - fx, y - fy);
        const fall = Math.max(0, 1 - d / maxD);
        const r = 0.8 + fall * 4.6 * (0.6 + rnd() * 0.8);
        if (r < 1 && rnd() < 0.35) continue;
        els.push(
          <circle
            key={k++}
            cx={x}
            cy={y}
            r={r.toFixed(2)}
            fill={fall > 0.78 && rnd() < 0.4 ? accent : PAPER}
            opacity={0.15 + fall * 0.8}
          />,
        );
      }
    }
    els.push(crosshair(fx, fy, 16, accent, "xh"));
    els.push(
      <circle key="f" cx={fx} cy={fy} r={4} fill={accent} />,
    );
    els.push(
      label(
        Math.min(fx + 26, W - 90),
        Math.max(fy - 14, 24),
        `R${fx.toFixed(0)},${fy.toFixed(0)}`,
        "lb",
      ),
    );
    els.push(ticks(W, H, H - 26, S1));
  } else if (kind === 2) {
    // (c) concentric orbits + accent arc + satellite
    const cx = W * (0.34 + rnd() * 0.32);
    const cy = H * (0.38 + rnd() * 0.3);
    const rings = 9 + Math.floor(rnd() * 5);
    const max = Math.hypot(W, H) * 0.66;
    const accRing = 2 + Math.floor(rnd() * 3);
    const radii: number[] = [];
    for (let i = 1; i <= rings; i++) {
      const r = (max / rings) * i * (0.72 + rnd() * 0.42);
      radii.push(r);
      els.push(
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r.toFixed(1)}
          fill="none"
          stroke={i === accRing ? accent : i % 2 ? S1 : S2}
          strokeWidth={i === accRing ? 1.8 : i % 2 ? 0.9 : 0.6}
          strokeDasharray={i !== accRing && rnd() < 0.45 ? "2 8" : undefined}
        />,
      );
    }
    // accent arc segment on the accent ring
    const rA = radii[accRing - 1];
    const a0 = rnd() * Math.PI * 2;
    const a1 = a0 + 0.6 + rnd() * 1.2;
    els.push(
      <path
        key="arc"
        d={`M${cx + Math.cos(a0) * rA},${cy + Math.sin(a0) * rA} A${rA} ${rA} 0 0 1 ${cx + Math.cos(a1) * rA},${cy + Math.sin(a1) * rA}`}
        fill="none"
        stroke={accent}
        strokeWidth={3.4}
      />,
    );
    const sa = a1;
    els.push(
      <circle
        key="sat"
        cx={cx + Math.cos(sa) * rA}
        cy={cy + Math.sin(sa) * rA}
        r={5}
        fill={accent}
      />,
    );
    els.push(crosshair(cx, cy, 12, PAPER, "xh"));
    els.push(label(cx + 18, cy - 12, `ORB.${accRing}`, "lb"));
    els.push(ticks(W, H, H - 26, S1));
  } else {
    // (d) vertical line-grid with a large displaced band (30–45% of height)
    const gap = 13;
    const bandY = H * (0.24 + rnd() * 0.2);
    const bandH = H * (0.3 + rnd() * 0.15);
    const shift = (rnd() < 0.5 ? -1 : 1) * W * (0.1 + rnd() * 0.14);
    const steps = 24;
    let k = 0;
    for (let x = gap; x < W; x += gap) {
      let d = "";
      for (let s = 0; s <= steps; s++) {
        const y = (H / steps) * s;
        const inB = y > bandY && y < bandY + bandH;
        const prog = inB ? (y - bandY) / bandH : 0;
        const edge =
          y <= bandY
            ? Math.max(0, 1 - (bandY - y) / (bandH * 0.5))
            : y >= bandY + bandH
              ? Math.max(0, 1 - (y - bandY - bandH) / (bandH * 0.5))
              : Math.sin(prog * Math.PI);
        const xx = x + shift * edge * (0.85 + 0.15 * Math.sin(x * 0.05));
        d += `${s === 0 ? "M" : "L"}${xx.toFixed(1)},${y.toFixed(1)}`;
      }
      const emph = rnd() < 1 / 14;
      els.push(
        <path
          key={k}
          d={d}
          fill="none"
          stroke={emph ? accent : k % 4 === 0 ? S1 : S2}
          strokeWidth={emph ? 1.4 : k % 4 === 0 ? 0.9 : 0.6}
          opacity={emph ? 1 : 0.95}
        />,
      );
      k++;
    }
    els.push(
      <rect
        key="band"
        x={0}
        y={bandY}
        width={W}
        height={bandH}
        fill="none"
        stroke={accent}
        strokeWidth={1.4}
      />,
    );
    const bx = W * (0.12 + rnd() * 0.7);
    els.push(crosshair(bx, bandY + bandH * 0.5, 12, PAPER, "xh"));
    els.push(
      label(Math.min(bx + 18, W - 90), bandY + bandH * 0.5 - 14, `Δ${shift.toFixed(0)}`, "lb"),
    );
    els.push(ticks(W, H, H - 26, S1));
  }
  return { base, els };
}

export default function Cover({
  id,
  name,
  year,
  cats,
  index,
  ratio = "spread",
  lang = "en",
  cover,
  video,
}: {
  id: string;
  name: string;
  year: string;
  cats: string[];
  index?: string;
  ratio?: keyof typeof RATIOS;
  lang?: Lang;
  cover?: string;
  video?: string;
}) {
  const [W, H] = RATIOS[ratio];
  const labels = cats.map((c) => CATEGORY_LABEL[lang][c] ?? c).join(" · ");
  const meta = `${index ? `NO.${index} — ` : ""}${labels}`;

  return (
    <div className="cover cover-media" style={{ aspectRatio: `${W} / ${H}` }}>
      {video ? (
        <video
          src={video}
          muted
          loop
          playsInline
          autoPlay
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : cover ? (
        <Image
          src={cover}
          alt={name}
          fill
          sizes="(max-width: 900px) 100vw, 60vw"
          style={{ objectFit: "cover" }}
        />
      ) : (
        (() => {
          const { base, els } = art(id, cats[0] ?? "", W, H);
          return (
            <svg
              className="art"
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="xMidYMid slice"
              aria-hidden
            >
              <rect width={W} height={H} fill={base} />
              {els}
            </svg>
          );
        })()
      )}
      <div className="c-grain" aria-hidden />
      <div className="c-meta">{meta}</div>
      <div className="c-year">{year}</div>
      <div className="c-name">
        <em>{name}</em>
      </div>
    </div>
  );
}
