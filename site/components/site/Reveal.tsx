"use client";

import { useEffect, useRef } from "react";

export default function Reveal({
  children,
  className = "",
  clip = false,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  clip?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`rv ${className}`}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      {clip ? <div className="clip">{children}</div> : children}
    </div>
  );
}
