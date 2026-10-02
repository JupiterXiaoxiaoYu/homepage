"use client";

import { useEffect, useRef } from "react";
import { PAL } from "@/lib/sprites";

// Fixed low-res canvas backdrop: dusk sky, stars, travelling sun,
// parallax mountain ridges, pine forest, ground strip with torches
// and castle silhouettes that pass as you scroll.

const W = 320; // internal pixel width — chunky pixels by design

function seeded(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function ridge(x: number, seed: number) {
  return (
    Math.sin(x * 0.055 + seed) * 9 +
    Math.sin(x * 0.021 + seed * 2.3) * 14 +
    Math.sin(x * 0.11 + seed * 5.1) * 3
  );
}

export default function Sky() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let H = 200;
    let vw = 0;
    let vh = 0;
    const fit = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      H = Math.max(140, Math.round((W * vh) / vw));
      cv.width = W;
      cv.height = H;
    };
    fit();

    const stars = Array.from({ length: 110 }, (_, i) => ({
      x: seeded(i) * W,
      y: seeded(i + 999) * H * 0.55,
      s: seeded(i + 500) * 2 + 0.8,
      big: seeded(i + 77) > 0.88,
    }));

    const progress = () => {
      const max = document.documentElement.scrollHeight - vh;
      return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const drawDisc = (cx: number, cy: number, r: number, col: string, glow: string) => {
      for (let y = -r - 4; y <= r + 4; y++) {
        for (let x = -r - 4; x <= r + 4; x++) {
          const d = Math.sqrt(x * x + y * y);
          if (d <= r) {
            ctx.fillStyle = col;
            ctx.fillRect(cx + x, cy + y, 1, 1);
          } else if (d <= r + 3 && (x + y) % 2 === 0) {
            ctx.fillStyle = glow;
            ctx.fillRect(cx + x, cy + y, 1, 1);
          }
        }
      }
    };

    const castle = (x: number, groundY: number) => {
      // silhouette keep + two towers with lit windows
      ctx.fillStyle = "#221a3a";
      ctx.fillRect(x - 16, groundY - 26, 32, 26);
      ctx.fillRect(x - 24, groundY - 34, 10, 34);
      ctx.fillRect(x + 14, groundY - 34, 10, 34);
      ctx.fillRect(x - 8, groundY - 40, 16, 40);
      // battlements
      for (let i = -24; i <= 24; i += 4) {
        ctx.fillRect(x + i, groundY - (i >= -8 && i < 8 ? 44 : i < -12 || i > 12 ? 38 : 30), 2, 4);
      }
      // flag
      ctx.fillStyle = PAL.r;
      ctx.fillRect(x + 7, groundY - 46, 6, 3);
      ctx.fillStyle = PAL.k;
      ctx.fillRect(x + 6, groundY - 47, 1, 8);
      // lit windows
      ctx.fillStyle = PAL.F;
      ctx.fillRect(x - 4, groundY - 34, 2, 3);
      ctx.fillRect(x + 2, groundY - 30, 2, 3);
      ctx.fillRect(x - 21, groundY - 26, 2, 3);
      ctx.fillRect(x + 17, groundY - 22, 2, 3);
    };

    const groundY = H - 26;

    const draw = (t: number) => {
      const p = progress();
      const sy = window.scrollY;

      // sky gradient — dusk bands
      const bands: [number, string][] = [
        [0.0, "#0d0b22"],
        [0.35, "#1d1638"],
        [0.55, "#3a2450"],
        [0.72, "#6d3350"],
        [0.82, "#a5503f"],
      ];
      let prev = bands[0];
      for (let i = 1; i <= bands.length; i++) {
        const [f, c] = i < bands.length ? bands[i] : [0.9, "#c96a42"];
        const y0 = Math.floor(prev[0] * H);
        const y1 = Math.floor(f * H);
        ctx.fillStyle = c;
        ctx.fillRect(0, y0, W, y1 - y0);
        prev = [f, c];
      }

      // stars
      stars.forEach((s, i) => {
        const tw = 0.45 + 0.55 * Math.sin(t * 0.0012 * s.s + i * 1.7);
        ctx.fillStyle = `rgba(240,230,255,${0.25 + 0.55 * tw})`;
        const sz = s.big && tw > 0.7 ? 2 : 1;
        ctx.fillRect(Math.round(s.x), Math.round(s.y), sz, sz);
      });

      // sun crossing the sky with scroll progress
      const sunX = Math.round(26 + p * (W - 52));
      const sunY = Math.round(H * 0.68 - Math.sin(p * Math.PI) * H * 0.38);
      drawDisc(sunX, sunY, 11, "#ffd94a", "rgba(255,158,61,0.55)");
      // sun pixels shading
      ctx.fillStyle = "#ff9e3d";
      for (let x = -9; x <= 9; x += 2) ctx.fillRect(sunX + x, sunY + 6 + Math.abs(x / 3), 1, 2);

      // clouds — slow drift
      ctx.fillStyle = "rgba(20,16,40,0.85)";
      for (let i = 0; i < 5; i++) {
        const cx = Math.round((((seeded(i + 40) * W * 1.6 + t * 0.004 + sy * 0.015) % (W + 40)) + W + 40) % (W + 40)) - 20;
        const cy = Math.round(H * (0.12 + seeded(i + 90) * 0.3));
        ctx.fillRect(cx, cy, 16, 3);
        ctx.fillRect(cx + 3, cy - 2, 10, 2);
        ctx.fillRect(cx + 5, cy + 3, 8, 2);
      }

      // far ridge
      ctx.fillStyle = "#2c2149";
      for (let x = 0; x < W; x++) {
        const wx = x + sy * 0.02;
        const h = Math.round(groundY - H * 0.13 + ridge(wx, 1.7));
        ctx.fillRect(x, h, 1, groundY - h);
      }
      // near ridge
      ctx.fillStyle = "#1c1533";
      for (let x = 0; x < W; x++) {
        const wx = x + sy * 0.055;
        const h = Math.round(groundY - H * 0.06 + ridge(wx, 4.2) * 0.7);
        ctx.fillRect(x, h, 1, groundY - h);
      }

      // castles — appear mid and late journey
      castle(Math.round(W / 2 + (0.38 - p) * 620), groundY);
      castle(Math.round(W / 2 + (0.82 - p) * 620), groundY);

      // pine treeline
      const treeOff = sy * 0.14;
      for (let wx = Math.floor(treeOff / 15) * 15 - 30; wx < treeOff + W + 30; wx += 15) {
        const i = wx / 15;
        const x = Math.round(wx - treeOff);
        const th = 14 + Math.floor(seeded(i | 0) * 12);
        const y = groundY;
        ctx.fillStyle = "#0f0d20";
        ctx.fillRect(x, y - th + 6, 1, th - 6);
        for (let l = 0; l < 3; l++) {
          const lw = 6 - l * 2;
          const ly = y - th + l * 5;
          ctx.fillRect(x - lw, ly, lw * 2 + 1, 4);
        }
      }

      // ground strip
      ctx.fillStyle = "#241a2e";
      ctx.fillRect(0, groundY, W, H - groundY);
      ctx.fillStyle = "#4f7a4a";
      ctx.fillRect(0, groundY, W, 2);
      ctx.fillStyle = "#3b5c38";
      for (let x = 0; x < W; x += 3) ctx.fillRect(x, groundY + 2 + ((x * 7) % 5), 2, 1);
      // dirt speckles
      ctx.fillStyle = "#1a1222";
      for (let x = 0; x < W; x += 5) ctx.fillRect(x + ((x * 13) % 4), groundY + 6 + ((x * 11) % 16), 2, 2);

      // torches along the road
      const torOff = sy * 0.35;
      for (let wx = Math.floor(torOff / 110) * 110 - 60; wx < torOff + W + 60; wx += 110) {
        const x = Math.round(wx - torOff);
        const y = groundY - 9;
        // post
        ctx.fillStyle = PAL.t;
        ctx.fillRect(x + 3, y + 3, 1, 7);
        ctx.fillRect(x + 2, y + 10, 3, 1);
        // flame flicker
        const fl = Math.sin(t * 0.02 + wx) > 0 ? 0 : 1;
        ctx.fillStyle = PAL.f;
        ctx.fillRect(x + 2, y + fl, 3, 2);
        ctx.fillStyle = PAL.F;
        ctx.fillRect(x + 3, y + 1 + fl, 1, 2);
      }
    };

    let last = 0;
    let lastScroll = -1;
    let raf = 0;
    const loop = (t: number) => {
      if (reduced) return;
      if (t - last > 90 || window.scrollY !== lastScroll) {
        draw(t);
        last = t;
        lastScroll = window.scrollY;
      }
      raf = requestAnimationFrame(loop);
    };

    draw(0);
    if (!reduced) raf = requestAnimationFrame(loop);
    const onR = () => {
      fit();
      draw(performance.now());
    };
    window.addEventListener("resize", onR);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onR);
    };
  }, []);

  return <canvas ref={ref} className="sky" aria-hidden />;
}
