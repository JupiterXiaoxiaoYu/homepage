"use client";

import { useEffect, useRef, useState } from "react";

// Number that counts up when it scrolls into view.
export default function Count({
  v,
  className,
}: {
  v: string; // e.g. "27+", "1.36M", "<100ms"
  className?: string;
}) {
  const [out, setOut] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const m = v.match(/^([^0-9]*)([0-9.]+)(.*)$/);
    if (!m || reduced) {
      setOut(v);
      return;
    }
    const [, pre, num, suf] = m;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1400;
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 4);
          setOut(`${pre}${(target * eased).toFixed(decimals)}${suf}`);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [v]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}
