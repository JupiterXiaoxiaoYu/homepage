"use client";

import { useEffect, useRef } from "react";
import { PAL } from "@/lib/sprites";
import type { BldKind } from "@/lib/tower";

// Parametric pixel buildings. Internal canvas 44×34, scaled up crisply.
const BW = 44;
const BH = 34;

const WALLS = ["#7a5a3d", "#6b6b7e", "#5d4a5e", "#71624a"];
const ROOFS = ["#c9403d", "#4f6b8a", "#8a5a3d", "#5d7355"];

function draw(ctx: CanvasRenderingContext2D, kind: BldKind, tint: number, lit: boolean) {
  const wall = WALLS[tint % WALLS.length];
  const roof = ROOFS[(tint + 1) % ROOFS.length];
  const dark = "#2e2130";
  const glow = lit ? "#ffd94a" : "#3d3450";
  const gy = BH - 1; // ground line (feet)

  const rect = (x: number, y: number, w: number, h: number, c: string) => {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
  };
  const win = (x: number, y: number) => rect(x, y, 3, 4, glow);

  switch (kind) {
    case "hut": {
      rect(14, gy - 12, 18, 12, wall);
      ctx.fillStyle = roof;
      for (let i = 0; i < 7; i++) rect(15 + i, gy - 14 - (i < 3 ? i : 6 - i) * 2, 14 - i * 2, 2, roof);
      rect(20, gy - 7, 5, 7, dark);
      win(14 + 12, gy - 9);
      break;
    }
    case "house": {
      rect(10, gy - 15, 24, 15, wall);
      for (let i = 0; i < 5; i++) rect(9 + i * 2, gy - 17 - (i < 3 ? i : 4 - i), 26 - i * 4, 2, roof);
      rect(30, gy - 24, 4, 8, wall); // chimney
      rect(19, gy - 9, 6, 9, dark);
      win(12, gy - 12); win(27, gy - 12);
      break;
    }
    case "tower": {
      rect(16, gy - 26, 14, 26, wall);
      for (let i = 0; i < 5; i++) rect(15 + i * 3, gy - 29, 2, 3, wall); // merlons
      rect(14, gy - 30, 18, 2, roof);
      rect(20, gy - 6, 6, 6, dark);
      win(20, gy - 20); win(20, gy - 12);
      ctx.fillStyle = PAL.r;
      rect(31, gy - 34, 7, 4, PAL.r);
      rect(30, gy - 35, 1, 9, dark);
      break;
    }
    case "dome": {
      rect(12, gy - 12, 22, 12, wall);
      for (let i = 0; i < 6; i++) rect(11 + i, gy - 14 - Math.round(Math.sin((i / 5) * Math.PI) * 7), 22 - i * 2, 2, roof);
      rect(21, gy - 25, 3, 3, PAL.g); // dome finial
      rect(20, gy - 8, 6, 8, dark);
      win(14, gy - 9); win(29, gy - 9);
      break;
    }
    case "forge": {
      rect(10, gy - 13, 26, 13, wall);
      rect(9, gy - 15, 28, 3, roof); // flat roof
      rect(30, gy - 24, 5, 9, "#4a3a4a"); // chimney
      rect(19, gy - 8, 6, 8, dark);
      ctx.fillStyle = "#ff7847"; // forge fire glow
      ctx.fillRect(13, gy - 10, 4, 4);
      ctx.fillStyle = PAL.F;
      ctx.fillRect(14, gy - 9, 2, 2);
      break;
    }
    case "tent": {
      ctx.fillStyle = roof;
      for (let i = 0; i < 9; i++) rect(12 + i, gy - 2 - i * 2, 20 - i * 2, 2, roof);
      rect(21, gy - 8, 4, 8, dark);
      break;
    }
    case "stall": {
      rect(12, gy - 11, 22, 11, wall);
      // striped awning
      for (let i = 0; i < 11; i++) rect(10 + i * 2, gy - 16, 2, 5, i % 2 ? roof : "#eadfc2");
      rect(19, gy - 7, 6, 7, dark);
      break;
    }
    case "keep": {
      rect(8, gy - 18, 30, 18, wall);
      rect(6, gy - 26, 8, 26, wall); // left turret
      rect(32, gy - 26, 8, 26, wall); // right turret
      for (let i = 0; i < 3; i++) { rect(6 + i * 3, gy - 29, 2, 3, wall); rect(32 + i * 3, gy - 29, 2, 3, wall); }
      for (let i = 0; i < 4; i++) rect(9 + i * 7, gy - 21, 2, 3, wall); // merlons
      rect(20, gy - 9, 6, 9, dark);
      win(11, gy - 14); win(26, gy - 14); win(8, gy - 23); win(35, gy - 23);
      break;
    }
    case "pedestal": {
      rect(19, gy - 12, 6, 12, "#6b6b7e");
      rect(16, gy - 14, 12, 3, "#8a6420");
      rect(17, gy - 2, 10, 2, "#565066");
      break;
    }
    case "statue": {
      rect(15, gy - 4, 14, 4, "#565066"); // plinth
      rect(17, gy - 8, 10, 4, "#6b6b7e");
      // little monarch
      rect(19, gy - 16, 6, 8, "#8a86a0");
      rect(20, gy - 20, 4, 4, "#8a86a0");
      rect(19, gy - 22, 1, 2, PAL.g); rect(22, gy - 23, 1, 3, PAL.g); rect(25 - 4, gy - 22, 1, 2, PAL.g);
      break;
    }
    case "portal": {
      rect(12, gy - 3, 20, 3, "#565066");
      // oval swirl
      const cx = 22, cy = gy - 16;
      ctx.fillStyle = "#3d2f66";
      ctx.fillRect(cx - 6, cy - 10, 12, 20);
      ctx.fillStyle = "#8a6fd8";
      ctx.fillRect(cx - 4, cy - 8, 8, 16);
      ctx.fillStyle = "#c9b8ff";
      ctx.fillRect(cx - 2, cy - 6, 4, 12);
      ctx.fillStyle = "#efe6ff";
      ctx.fillRect(cx - 1, cy - 3, 2, 6);
      break;
    }
    case "spire": {
      rect(14, gy - 22, 16, 22, wall);
      for (let i = 0; i < 7; i++) rect(13 + i, gy - 24 - i * 2, 18 - i * 2, 2, roof);
      rect(19, gy - 7, 6, 7, dark);
      win(17, gy - 16); win(25, gy - 16);
      break;
    }
  }
}

export default function Building({
  kind, tint, scale = 4, lit = true, className,
}: {
  kind: BldKind; tint: number; scale?: number; lit?: boolean; className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = ref.current!.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, BW, BH);
    draw(ctx, kind, tint, lit);
  }, [kind, tint, lit]);
  return (
    <canvas
      ref={ref}
      width={BW}
      height={BH}
      className={className}
      style={{ width: BW * scale, height: BH * scale, imageRendering: "pixelated" }}
      aria-hidden
    />
  );
}
