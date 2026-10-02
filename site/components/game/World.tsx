"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  LEVELS, LEVEL_W, LEVEL_H, LEVEL_COUNT, WORLD_H, levelTop, STAIR_X,
  TOTAL_ITEMS, type Item,
} from "@/lib/dungeon";
import { KING_IDLE, KING_WALK, SPRITES, FLAME, BANNER, BONES, BOOKS, PAL } from "@/lib/sprites";
import PxSprite from "./PxSprite";
import PxIcon from "@/components/kd/PxIcon";
import Modal from "./Modal";
import HudG from "./HudG";

const SPEED = 3.6;
const NEAR = 110;
const KX = 35; // knight half-width offset for centering

export default function World() {
  const [level, setLevel] = useState(0);
  const [near, setNear] = useState<string | null>(null);
  const [stairHint, setStairHint] = useState<string | null>(null);
  const [modal, setModal] = useState<Item | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [started, setStarted] = useState(false);

  const keys = useRef<Set<string>>(new Set());
  const pos = useRef({ x: 300, f: 0 });
  const walkTarget = useRef<number | null>(null);
  const pendingOpen = useRef<Item | null>(null);
  const knightEl = useRef<HTMLDivElement>(null);
  const worldEl = useRef<HTMLDivElement>(null);
  const bubbleEl = useRef<HTMLDivElement>(null);
  const critterEls = useRef<Map<string, HTMLDivElement>>(new Map());
  const critPos = useRef<Map<string, { x: number; dir: number }>>(new Map());
  const frameT = useRef(0);
  const frame = useRef(0);
  const idleT = useRef(0);
  const idleF = useRef(0);
  const moving = useRef(false);
  const dirRef = useRef(1);
  const knightSprite = useRef<HTMLCanvasElement>(null);
  const knightMap = useRef(KING_IDLE[0]);

  const openItem = useCallback((it: Item) => {
    setModal(it);
    setVisited((v) => new Set(v).add(it.id));
  }, []);

  const goLevel = (f: number, via: "l" | "r") => {
    pos.current.f = f;
    pos.current.x = STAIR_X[via] + (via === "l" ? 60 : -60);
    walkTarget.current = null;
    pendingOpen.current = null;
    setLevel(f);
    setNear(null);
    if (knightEl.current) {
      knightEl.current.style.opacity = "0";
      setTimeout(() => { if (knightEl.current) knightEl.current.style.opacity = "1"; }, 240);
    }
  };

  const tryStair = useCallback((dir: 1 | -1) => {
    const l = LEVELS[pos.current.f];
    const x = pos.current.x;
    const sx = dir === 1 ? l.down : l.up;
    const target = dir === 1 ? pos.current.f + 1 : pos.current.f - 1;
    if (sx && target >= 0 && target < LEVEL_COUNT && Math.abs(x - STAIR_X[sx]) < 170) {
      goLevel(target, sx);
    }
  }, []);

  const tryInteract = useCallback(() => {
    const it = LEVELS[pos.current.f].items.find((i) => Math.abs(i.x - pos.current.x) < NEAR);
    if (it) openItem(it);
  }, [openItem]);

  const clickItem = useCallback((it: Item) => {
    if (!started) setStarted(true);
    walkTarget.current = it.x;
    pendingOpen.current = it;
  }, [started]);

  // ── keyboard ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!started) { setStarted(true); return; }
      const k = e.key.toLowerCase();
      if (["arrowleft", "arrowright", "arrowup", "arrowdown", "a", "d", "w", "s", " ", "e", "enter"].includes(k))
        e.preventDefault();
      if (modal) {
        if (["escape", "e", "enter", " "].includes(k)) setModal(null);
        return;
      }
      keys.current.add(k);
      if (k === "e" || k === "enter") tryInteract();
      if (k === "arrowup" || k === "w") tryStair(-1);   // W = back up
      if (k === "arrowdown" || k === "s") tryStair(1);  // S = descend
      if (k === "escape") setModal(null);
    };
    const up = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [modal, started, tryInteract, tryStair]);

  // expose to touch pad
  useEffect(() => {
    (window as any).__pad = {
      press: (k: string) => {
        keys.current.add(k);
        if (k === "u") tryStair(-1);
        if (k === "dn") tryStair(1);
        if (k === "e") tryInteract();
      },
      release: (k: string) => keys.current.delete(k),
    };
  });

  // knight frame painter
  const paintKnight = useCallback(() => {
    const cv = knightSprite.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    const map = knightMap.current;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, 18, 16);
    if (dirRef.current < 0) { ctx.translate(18, 0); ctx.scale(-1, 1); }
    map.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const c = PAL[row[x]];
        if (!c) continue;
        ctx.fillStyle = c;
        ctx.fillRect(x, y, 1, 1);
      }
    });
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }, []);

  // ── main loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    paintKnight();
    let raf = 0;
    let last = performance.now();

    const tick = (t: number) => {
      const dt = Math.min(50, t - last);
      last = t;
      const k = keys.current;
      const cur = pos.current;
      const lvl = LEVELS[cur.f];

      let dx = 0;
      if (k.has("arrowleft") || k.has("a")) dx -= 1;
      if (k.has("arrowright") || k.has("d")) dx += 1;

      if (walkTarget.current != null) {
        const d = walkTarget.current - cur.x;
        if (Math.abs(d) < 8) {
          walkTarget.current = null;
          if (pendingOpen.current) { openItem(pendingOpen.current); pendingOpen.current = null; }
        } else dx = Math.sign(d);
      }
      if (modal) { dx = 0; walkTarget.current = null; pendingOpen.current = null; }

      const wasMoving = moving.current;
      moving.current = dx !== 0;
      if (dx !== 0) {
        dirRef.current = dx;
        cur.x = Math.min(LEVEL_W - 60, Math.max(60, cur.x + dx * SPEED * (dt / 16.7)));
      }

      // knight animation frames
      if (moving.current && t - frameT.current > 140) {
        frame.current = 1 - frame.current;
        frameT.current = t;
        knightMap.current = KING_WALK[frame.current];
        paintKnight();
      }
      if (!moving.current) {
        if (wasMoving) { knightMap.current = KING_IDLE[0]; idleF.current = 0; paintKnight(); }
        if (t - idleT.current > 420) {
          idleT.current = t;
          idleF.current = 1 - idleF.current;
          knightMap.current = KING_IDLE[idleF.current];
          paintKnight();
        }
      }

      // critters wander
      lvl.critters.forEach((c, ci) => {
        const key = `${cur.f}-${ci}`;
        let st = critPos.current.get(key);
        if (!st) { st = { x: c.x0, dir: 1 }; critPos.current.set(key, st); }
        st.x += c.speed * st.dir * (dt / 16.7);
        if (st.x > c.x0 + c.range) { st.x = c.x0 + c.range; st.dir = -1; }
        if (st.x < c.x0 - c.range) { st.x = c.x0 - c.range; st.dir = 1; }
        const el = critterEls.current.get(key);
        if (el) el.style.transform = `translateX(${st.x - c.x0}px) scaleX(${st.dir})`;
      });

      // expose camera/pos for darkness layer
      const feetY = levelTop(cur.f) + LEVEL_H - 64;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cx = Math.min(Math.max(cur.x - vw / 2, 0), Math.max(0, LEVEL_W - vw));
      const cy = Math.min(Math.max(feetY - vh * 0.62, 0), Math.max(0, WORLD_H - vh));
      (window as any).__cam = { x: cx, y: cy, fx: cur.x, fy: feetY, floor: cur.f };

      // proximity + stair hints
      const it = lvl.items.find((i) => Math.abs(i.x - cur.x) < NEAR);
      setNear((n) => (it?.id ?? null) !== n ? it?.id ?? null : n);
      let hint: string | null = null;
      if (lvl.down && Math.abs(cur.x - STAIR_X[lvl.down]) < 170) hint = "▼ S · 深入";
      else if (lvl.up && Math.abs(cur.x - STAIR_X[lvl.up]) < 170) hint = "▲ W · 回到上层";
      setStairHint((h) => (h !== hint ? hint : h));

      const el = knightEl.current;
      const wd = worldEl.current;
      if (el && wd) {
        el.style.transform = `translate(${cur.x - KX}px, ${feetY - 80}px)`;
        const bb = bubbleEl.current;
        if (bb) bb.style.transform = `translate(${cur.x}px, ${feetY - 118}px)`;
        wd.style.transform = `translate(${-cx}px, ${-cy}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [modal, openItem, paintKnight]);

  return (
    <>
      <div className="viewport">
        <div className="world" ref={worldEl} style={{ width: LEVEL_W, height: WORLD_H }}>
          {LEVELS.map((l, li) => (
            <div key={l.id} className="lvl" style={{ top: levelTop(li), height: LEVEL_H, width: LEVEL_W }}>
              <div className="lvl-wall" />
              <p className="lvl-name">
                <b>{l.depth}</b> {l.name} <i>· {l.sub}</i>
              </p>

              {/* wall torches — the dungeon's only native light */}
              {[420, 1180, 1980].map((x) => (
                <div key={x} className="wall-torch" style={{ left: x }}>
                  <PxSprite frames={FLAME} scale={4} fps={7} />
                  <i className="torch-stick" />
                </div>
              ))}

              {/* stone columns carrying the ceiling */}
              {[260, 820, 1380, 1940, 2380].map((x) => (
                <div key={x} className="column" style={{ left: x }} />
              ))}

              {/* hanging chains */}
              {[560, 1500, 2240].map((x, i) => (
                <div key={x} className="chain" style={{ left: x, height: 90 + (i % 3) * 34 }} />
              ))}

              {/* hanging banners */}
              {[700, 1600].map((x) => (
                <div key={x} className="lvl-banner-w" style={{ left: x }}>
                  <PxIcon map={BANNER} scale={4} className="lvl-banner" />
                </div>
              ))}

              {/* floor props: bones & books scattered */}
              {[340, 1520, 2380].map((x, i) => (
                <div key={x} className="lvl-prop" style={{ left: x }}>
                  <PxIcon map={i % 2 ? BOOKS : BONES} scale={3} />
                </div>
              ))}

              {/* puddles catch the torchlight */}
              {[540, 1560, 2260].map((x) => (
                <div key={x} className="puddle" style={{ left: x }} />
              ))}

              {/* stairs */}
              {l.up && (
                <div className={`stair st-${l.up}`}>
                  <div className="stair-up" />
                  <span className="stair-tag">▲</span>
                </div>
              )}
              {l.down && (
                <div className={`stair st-${l.down}`}>
                  <div className="stair-dn" />
                  <span className="stair-tag">▼</span>
                </div>
              )}

              {/* content items — living NPCs & props */}
              {l.items.map((it) => (
                <button
                  key={it.id}
                  className={`npc ${near === it.id ? "near" : ""} ${visited.has(it.id) ? "seen" : ""}`}
                  style={{ left: it.x }}
                  onClick={() => clickItem(it)}
                >
                  <span className="npc-label">{it.title}</span>
                  <PxSprite
                    frames={SPRITES[it.npc] ?? SPRITES.merchant}
                    scale={it.npc === "raven" ? 6 : it.npc === "portal" ? 6 : 5}
                    fps={it.npc === "ghost" ? 4 : it.npc === "portal" ? 3 : 6}
                    anim={it.anim}
                    className="npc-spr"
                  />
                  <span className="npc-ping">!</span>
                </button>
              ))}

              {/* ambient critters */}
              {l.critters.map((c, ci) => (
                <div
                  key={ci}
                  className="critter"
                  ref={(el) => { if (el) critterEls.current.set(`${li}-${ci}`, el); }}
                  style={{ left: c.x0, bottom: 64 + (c.y ?? 0) }}
                >
                  <PxSprite frames={SPRITES[c.sprite]} scale={4} fps={7} />
                </div>
              ))}
            </div>
          ))}

          {/* the monarch */}
          <div ref={knightEl} className="knight">
            <canvas ref={knightSprite} width={18} height={16} style={{ width: 90, height: 80, imageRendering: "pixelated" }} />
          </div>

          <div ref={bubbleEl} className="bubble-wrap">
            <Bubble level={level} near={near} stairHint={stairHint} />
          </div>
        </div>
      </div>

      <HudG level={level} seen={visited.size} total={TOTAL_ITEMS} />
      {modal && <Modal item={modal} onClose={() => setModal(null)} />}
      {!started && (
        <div className="gate-overlay" onClick={() => setStarted(true)}>
          <p className="gate-small">A REALM BENEATH THE RESUME</p>
          <h1 className="gate-title">JUPITER&rsquo;S<br />DUNGEON</h1>
          <p className="gate-keys">
            ← → 移动 · S 下楼 · W 上楼 · E 对话<br />
            点击任何生物/物件，君主会自动走过去
          </p>
          <p className="gate-press">— PRESS ANY KEY TO DESCEND —</p>
        </div>
      )}
    </>
  );
}

function Bubble({ level, near, stairHint }: { level: number; near: string | null; stairHint: string | null }) {
  const it = LEVELS[level].items.find((i) => i.id === near);
  const text = stairHint ?? (it ? `E · ${it.title}` : null);
  if (!text) return null;
  return <div className="bubble">{text}</div>;
}
