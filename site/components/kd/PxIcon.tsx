"use client";

import { useEffect, useRef } from "react";
import { PAL } from "@/lib/sprites";

// Renders a pixel sprite map onto a canvas at integer scale.
export default function PxIcon({
  map,
  scale = 3,
  className,
  flip = false,
}: {
  map: string[];
  scale?: number;
  className?: string;
  flip?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const w = Math.max(...map.map((r) => r.length));
  const h = map.length;

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, w, h);
    if (flip) {
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
    }
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
      className={className}
      style={{ width: w * scale, height: h * scale, imageRendering: "pixelated" }}
      aria-hidden
    />
  );
}
