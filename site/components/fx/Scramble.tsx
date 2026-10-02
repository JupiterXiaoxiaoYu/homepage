"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const GLYPHS = "01!#$%&*+-/<=>?@^_|~αβδλπψ";

// Text that decodes from noise. Re-scrambles on hover when `hoverable`.
export default function Scramble({
  text,
  className,
  hoverable = false,
  speed = 28,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  hoverable?: boolean;
  speed?: number;
  as?: "span" | "div" | "h1" | "h2" | "h3" | "p" | "a";
}) {
  const [out, setOut] = useState(text);
  const raf = useRef(0);
  const mounted = useRef(true);

  const run = useCallback(() => {
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const dur = speed * text.length + 220;
    const tick = (now: number) => {
      if (!mounted.current) return;
      const p = Math.min(1, (now - start) / dur);
      const settled = Math.floor(p * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " ") {
          s += " ";
          continue;
        }
        s +=
          i < settled
            ? ch
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text, speed]);

  useEffect(() => {
    mounted.current = true;
    run();
    return () => {
      mounted.current = false;
      cancelAnimationFrame(raf.current);
    };
  }, [run]);

  const Comp = Tag as "span";
  return (
    <Comp
      className={className}
      onMouseEnter={hoverable ? run : undefined}
      aria-label={text}
    >
      {out}
    </Comp>
  );
}
