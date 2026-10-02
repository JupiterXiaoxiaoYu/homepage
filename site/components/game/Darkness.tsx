"use client";

import { useEffect, useRef } from "react";
import { LEVELS, LEVEL_H, levelTop } from "@/lib/dungeon";

// Darkness overlay: fills the viewport with dark, punches soft radial light
// holes at the monarch's torch, wall torches, and glowing items (portals,
// crystals, gold chests). Reads camera state from window.__cam each frame.

const TORCH_XS = [420, 1180, 1980];
const SCALE = 0.25; // low-res overlay — chunky light is the point

export default function Darkness() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let last = 0;

    const draw = (t: number) => {
      const cam = (window as any).__cam;
      if (!cam) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (cv.width !== Math.ceil(vw * SCALE) || cv.height !== Math.ceil(vh * SCALE)) {
        cv.width = Math.ceil(vw * SCALE);
        cv.height = Math.ceil(vh * SCALE);
      }
      ctx.imageSmoothingEnabled = true;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(6, 4, 18, 0.84)";
      ctx.fillRect(0, 0, cv.width, cv.height);

      const lvl = LEVELS[cam.floor];
      const baseY = levelTop(cam.floor) + LEVEL_H - 64;

      const hole = (wx: number, wy: number, r: number, warm: number) => {
        const sx = (wx - cam.x) * SCALE;
        const sy = (wy - cam.y) * SCALE;
        const rr = r * SCALE;
        if (sx < -rr || sx > cv.width + rr || sy < -rr || sy > cv.height + rr) return;
        const g = ctx.createRadialGradient(sx, sy, rr * 0.08, sx, sy, rr);
        g.addColorStop(0, `rgba(255,190,90,${0.95 * warm})`);
        g.addColorStop(0.55, `rgba(255,170,70,${0.55 * warm})`);
        g.addColorStop(1, "rgba(255,150,60,0)");
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(sx, sy, rr, 0, Math.PI * 2);
        ctx.fill();
      };

      // monarch's hand torch — big, slightly flickering
      const flick = 1 + Math.sin(t * 0.011) * 0.05 + Math.sin(t * 0.047) * 0.03;
      hole(cam.fx + 30 * (1), cam.fy - 60, 240 * flick, 1);

      // wall torches on this level
      TORCH_XS.forEach((x, i) => {
        const tf = 1 + Math.sin(t * 0.013 + i * 2.4) * 0.08;
        hole(x, baseY - 150, 130 * tf, 0.8);
      });

      // every denizen carries a faint halo; glowing items burn brighter
      lvl.items.forEach((it, i) => {
        const base = it.glow ?? 52;
        const ig = 1 + Math.sin(t * 0.006 + i) * 0.12;
        hole(it.x, baseY - 60, base * ig, it.glow ? 0.8 : 0.5);
      });

      // faint eyes in the dark — pairs of ember dots beyond torchlight
      ctx.globalCompositeOperation = "source-over";
      for (let i = 0; i < 4; i++) {
        const ex = (((cam.x * 0.9 + i * 733) % LEVELS[0].items.length) || i * 480 + 300);
        const wx = (i * 617 + 240) % 2400;
        const sx = (wx - cam.x) * SCALE;
        const sy = (baseY - 40 - (i % 2) * 24) * SCALE;
        const blink = Math.sin(t * 0.0009 + i * 9) > -0.82;
        if (blink && sx > 0 && sx < cv.width) {
          ctx.fillStyle = "rgba(255,140,60,0.75)";
          ctx.fillRect(sx, sy, 2, 2);
          ctx.fillRect(sx + 4, sy, 2, 2);
        }
      }
    };

    const loop = (t: number) => {
      if (t - last > 50) { draw(t); last = t; }
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      const still = () => draw(0);
      still();
      window.addEventListener("resize", still);
      return () => window.removeEventListener("resize", still);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="darkness" aria-hidden />;
}
