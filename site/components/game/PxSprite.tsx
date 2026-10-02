"use client";

import { useEffect, useRef, useState } from "react";
import { PAL } from "@/lib/sprites";

// Animated pixel sprite: cycles through frames at `fps`.
// `bob`/`float`/`shimmer` add CSS life on top of frame animation.
export default function PxSprite({
  frames,
  scale = 4,
  fps = 5,
  flip = false,
  anim,
  className,
}: {
  frames: string[][];
  scale?: number;
  fps?: number;
  flip?: boolean;
  anim?: "bob" | "float" | "shimmer" | "sway";
  className?: string;
}) {
  const [fi, setFi] = useState(0);
  const ref = useRef<HTMLCanvasElement>(null);
  const map = frames[Math.min(fi, frames.length - 1)];
  const w = Math.max(...map.map((r) => r.length));
  const h = map.length;

  useEffect(() => {
    if (frames.length < 2) return;
    const id = setInterval(() => setFi((f) => (f + 1) % frames.length), 1000 / fps);
    return () => clearInterval(id);
  }, [frames.length, fps]);

  useEffect(() => {
    const ctx = ref.current!.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, w, h);
    if (flip) { ctx.translate(w, 0); ctx.scale(-1, 1); }
    map.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const c = PAL[row[x]];
        if (!c) continue;
        ctx.fillStyle = c;
        ctx.fillRect(x, y, 1, 1);
      }
    });
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }, [map, w, h, flip]);

  return (
    <canvas
      ref={ref}
      width={w}
      height={h}
      className={[className, anim && `anim-${anim}`].filter(Boolean).join(" ")}
      style={{
        width: w * scale,
        height: h * scale,
        imageRendering: "pixelated",
        ...(flip ? { transform: "scaleX(-1)" } : {}),
      }}
      aria-hidden
    />
  );
}
