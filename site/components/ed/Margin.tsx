"use client";

import { useEffect, useState } from "react";
import { scrollToSection } from "@/lib/scroll";

// Sticky margin rail: section markers that follow you + an ink progress rule.
const MARKERS = [
  { id: "profile", n: "01" },
  { id: "works", n: "02" },
  { id: "experience", n: "03" },
  { id: "research", n: "04" },
  { id: "proof", n: "05" },
  { id: "channel", n: "06" },
];

export default function Margin() {
  const [active, setActive] = useState("profile");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    MARKERS.forEach((m) => {
      const el = document.getElementById(m.id);
      if (el) io.observe(el);
    });

    // ink progress rule
    const bar = document.querySelector<HTMLElement>(".margin-progress-fill");
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (bar) bar.style.transform = `scaleY(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav className="margin" aria-label="Sections">
      <div className="margin-rail">
        {MARKERS.map((m) => (
          <button
            key={m.id}
            data-marker={m.id}
            className={`margin-item mono ${active === m.id ? "on" : ""}`}
            onClick={() => scrollToSection(m.id)}
          >
            <span className="margin-n">{m.n}</span>
            <span className="margin-word">{m.id}</span>
          </button>
        ))}
      </div>
      <div className="margin-progress">
        <div className="margin-progress-fill" />
      </div>
    </nav>
  );
}
