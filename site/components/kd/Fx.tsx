"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/scroll";

// Boots Lenis smooth scroll + intersection reveal for .rv elements.
export default function Fx() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = reduced ? null : new Lenis({ lerp: 0.11 });
    setLenis(lenis);
    let raf = 0;
    const loop = (t: number) => {
      lenis?.raf(t);
      raf = requestAnimationFrame(loop);
    };
    if (lenis) raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );
    document
      .querySelectorAll(".rv")
      .forEach((el, i) => {
        (el as HTMLElement).style.setProperty("--rd", `${Math.min(i % 6, 5) * 60}ms`);
        io.observe(el);
      });

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
