"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { FLOORS, FLOOR_W, FLOOR_H, FLOOR_COUNT, WORLD_H, floorTop, STAIR_X, TOTAL_ITEMS, type Item } from "@/lib/tower";
import { KING_A, KING_B, TORCH } from "@/lib/sprites";
import Building from "./Building";
import PxIcon from "@/components/kd/PxIcon";
import Modal from "./Modal";
import HudG from "./HudG";

const SPEED = 3.4;
const NEAR = 110;

export default function World() {
  const [floor, setFloor] = useState(0);
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
  const frameT = useRef(0);
  const frame = useRef(0);
  const moving = useRef(false);
  const dirRef = useRef(1);

  const openItem = useCallback((it: Item) => {
    setModal(it);
    setVisited((v) => new Set(v).add(it.id));
  }, []);

  // ── input ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!started) { setStarted(true); return; }
      const k = e.key.toLowerCase();
      if (["arrowleft", "arrowright", "arrowup", "arrowdown", "a", "d", "w", "s", " ", "e", "enter"].includes(k))
        e.preventDefault();
      if (modal) {
        if (k === "escape" || k === "e" || k === "enter" || k === " ") setModal(null);
        return;
      }
      keys.current.add(k);
      if (k === "e" || k === "enter") tryInteract();
      if (k === "arrowup" || k === "w") tryStair(1);
      if (k === "arrowdown" || k === "s") tryStair(-1);
      if (k === "escape") setModal(null);
    };
    const up = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal, started, floor, near]);

  // expose controls to on-screen pad
  useEffect(() => {
    (window as any).__pad = {
      press: (k: string) => {
        keys.current.add(k);
        if (k === "u") tryStair(1);
        if (k === "dn") tryStair(-1);
        if (k === "e") tryInteract();
      },
      release: (k: string) => keys.current.delete(k),
    };
  });

  const tryStair = useCallback((dir: 1 | -1) => {
    const f = FLOORS[pos.current.f];
    const x = pos.current.x;
    if (dir === 1 && f.up) {
      const sx = STAIR_X[f.up];
      if (Math.abs(x - sx) < 110) goFloor(pos.current.f + 1, f.up);
    } else if (dir === -1 && f.down) {
      const sx = STAIR_X[f.down];
      if (Math.abs(x - sx) < 110) goFloor(pos.current.f - 1, f.down);
    }
  }, []);

  const tryInteract = useCallback(() => {
    const f = FLOORS[pos.current.f];
    const it = f.items.find((i) => Math.abs(i.x - pos.current.x) < NEAR);
    if (it) openItem(it);
  }, [openItem]);

  const goFloor = (f: number, via: "l" | "r") => {
    pos.current.f = f;
    pos.current.x = STAIR_X[via] + (via === "l" ? 40 : -40);
    walkTarget.current = null;
    setFloor(f);
    setNear(null);
    if (knightEl.current) {
      knightEl.current.style.opacity = "0";
      setTimeout(() => { if (knightEl.current) knightEl.current.style.opacity = "1"; }, 260);
    }
  };

  // click a building → walk to it, then open
  const clickItem = useCallback((it: Item) => {
    if (!started) setStarted(true);
    walkTarget.current = it.x;
    pendingOpen.current = it;
  }, [started]);

  // ── game loop ────────────────────────────────────────────────────────────
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (t: number) => {
      const dt = Math.min(50, t - last);
      last = t;
      const k = keys.current;
      const cur = pos.current;
      const f = FLOORS[cur.f];

      let dx = 0;
      if (k.has("arrowleft") || k.has("a")) dx -= 1;
      if (k.has("arrowright") || k.has("d")) dx += 1;

      if (walkTarget.current != null) {
        const d = walkTarget.current - cur.x;
        if (Math.abs(d) < 8) {
          walkTarget.current = null;
          if (pendingOpen.current) {
            openItem(pendingOpen.current);
            pendingOpen.current = null;
          }
        } else dx = Math.sign(d);
      }
      if (modal) { dx = 0; walkTarget.current = null; pendingOpen.current = null; }

      moving.current = dx !== 0;
      if (dx !== 0) {
        dirRef.current = dx;
        cur.x = Math.min(FLOOR_W - 60, Math.max(60, cur.x + dx * SPEED * (dt / 16.7)));
      }

      // expose position for the sky backdrop (parallax + sun arc)
      (window as any).__realm = {
        x: cur.x + cur.f * FLOOR_W,
        p: (cur.f + cur.x / FLOOR_W) / (FLOOR_COUNT - 0.5),
      };

      // proximity
      const it = f.items.find((i) => Math.abs(i.x - cur.x) < NEAR);
      setNear((n) => (it?.id ?? null) !== n ? it?.id ?? null : n);

      // stair hint
      let hint: string | null = null;
      if (f.up && Math.abs(cur.x - STAIR_X[f.up]) < 110) hint = "▲ W · 上塔";
      else if (f.down && Math.abs(cur.x - STAIR_X[f.down]) < 110) hint = "▼ S · 下塔";
      setStairHint((h) => (h !== hint ? hint : h));

      // walk frame
      if (moving.current && t - frameT.current > 150) {
        frame.current = 1 - frame.current;
        frameT.current = t;
      }

      // position knight + camera via direct DOM writes
      const el = knightEl.current;
      const wd = worldEl.current;
      if (el && wd) {
        const feetY = floorTop(cur.f) + FLOOR_H - 66;
        el.style.transform = `translate(${cur.x - 30}px, ${feetY - 70}px) scaleX(${dirRef.current})`;
        const bb = bubbleEl.current;
        if (bb) bb.style.transform = `translate(${cur.x}px, ${feetY - 108}px)`;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const cx = Math.min(Math.max(cur.x - vw / 2, 0), Math.max(0, FLOOR_W - vw));
        const knightY = floorTop(cur.f) + FLOOR_H / 2;
        const cy = Math.min(Math.max(knightY - vh * 0.55, 0), Math.max(0, WORLD_H - vh));
        wd.style.transform = `translate(${-cx}px, ${-cy}px)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [modal, openItem]);

  return (
    <>
      <div className="viewport">
        <div className="world" ref={worldEl} style={{ width: FLOOR_W, height: WORLD_H }}>
          {FLOORS.map((f, fi) => (
            <div
              key={f.id}
              className={`floor ${f.dark ? "floor-dark" : ""}`}
              style={{ top: floorTop(fi), height: FLOOR_H, width: FLOOR_W }}
            >
              <div className="floor-wall" />
              <p className="floor-name">
                {f.name} <i>· {f.sub}</i>
              </p>

              {/* stairs */}
              {f.up && (
                <div className={`stair stair-${f.up}`}>
                  <div className="stair-steps" />
                  <span className="stair-tag">▲</span>
                </div>
              )}
              {f.down && (
                <div className={`stair stair-${f.down}`}>
                  <div className="stair-steps stair-dn" />
                  <span className="stair-tag">▼</span>
                </div>
              )}

              {/* torch accents */}
              {[480, 1240, 2000].map((x) => (
                <div key={x} className="floor-torch" style={{ left: x }}>
                  <PxIcon map={TORCH} scale={3} />
                </div>
              ))}

              {f.items.map((it) => (
                <button
                  key={it.id}
                  className={`bld ${near === it.id ? "near" : ""} ${visited.has(it.id) ? "seen" : ""}`}
                  style={{ left: it.x }}
                  onClick={() => clickItem(it)}
                >
                  <PxIcon map={it.icon} scale={3} className="bld-icon" />
                  <span className="bld-label">{it.title}</span>
                  <Building kind={it.bld} tint={it.tint} lit={floor === fi} />
                  <span className="bld-ping">!</span>
                </button>
              ))}
            </div>
          ))}

          {/* the monarch */}
          <div ref={knightEl} className="knight" style={{ transition: "opacity .25s" }}>
            <KnightSprite frameRef={frame} movingRef={moving} />
          </div>

          {/* interaction bubble — follows the knight via inline transform */}
          <div ref={bubbleEl} className="bubble-wrap">
            <Bubble floor={floor} near={near} stairHint={stairHint} />
          </div>
        </div>
      </div>

      <HudG floor={floor} seen={visited.size} total={TOTAL_ITEMS} />
      {modal && <Modal item={modal} onClose={() => setModal(null)} />}
      {!started && (
        <div className="gate-overlay" onClick={() => setStarted(true)}>
          <p className="gate-small">A REALM OF VERIFIABLE SYSTEMS</p>
          <h1 className="gate-title">JUPITER&rsquo;S REALM</h1>
          <p className="gate-keys">← → 移动 · W/↑ 上塔 · E 查看建筑 · 点击建筑自动走过去</p>
          <p className="gate-press">— PRESS ANY KEY —</p>
        </div>
      )}
    </>
  );
}

// knight sprite that swaps walk frames without re-rendering the tree
function KnightSprite({ frameRef, movingRef }: { frameRef: React.MutableRefObject<number>; movingRef: React.MutableRefObject<boolean> }) {
  const [f, setF] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setF(movingRef.current ? frameRef.current : 0), 60);
    return () => clearInterval(id);
  }, [frameRef, movingRef]);
  return <PxIcon map={f ? KING_B : KING_A} scale={5} />;
}

// floating hint bubble that follows the knight
function Bubble({ floor, near, stairHint }: { floor: number; near: string | null; stairHint: string | null }) {
  const it = FLOORS[floor].items.find((i) => i.id === near);
  const text = stairHint ?? (it ? `E · ${it.title}` : null);
  if (!text) return null;
  return <div className="bubble">{text}</div>;
}
