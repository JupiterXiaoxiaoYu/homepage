"use client";

import { useEffect, useState } from "react";
import PxIcon from "./PxIcon";
import { ICON_HEART, ICON_COIN } from "@/lib/sprites";

const ACTS = [
  { id: "origin", n: "00", label: "ORIGIN" },
  { id: "quests", n: "01", label: "QUESTS" },
  { id: "chronicle", n: "02", label: "CHRONICLE" },
  { id: "grimoire", n: "03", label: "GRIMOIRE" },
  { id: "trophies", n: "04", label: "TROPHIES" },
  { id: "inventory", n: "05", label: "INVENTORY" },
  { id: "raven", n: "06", label: "RAVEN" },
];

export default function HUD() {
  const [act, setAct] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = ACTS.findIndex((a) => a.id === e.target.id);
            if (i >= 0) setAct(i);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    ACTS.forEach((a) => {
      const el = document.getElementById(a.id);
      if (el) obs.observe(el);
    });
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="hud">
      <a href="#origin" className="hud-brand">
        ★ JUPITER&rsquo;S REALM
      </a>
      <nav className="hud-nav">
        {ACTS.map((a, i) => (
          <a
            key={a.id}
            href={`#${a.id}`}
            className={`hud-act ${i === act ? "on" : ""}`}
            title={a.label}
          >
            {a.n}
          </a>
        ))}
      </nav>
      <div className="hud-stats">
        <span className="hud-hearts">
          <PxIcon map={ICON_HEART} scale={2} />
          <PxIcon map={ICON_HEART} scale={2} />
          <PxIcon map={ICON_HEART} scale={2} />
        </span>
        <span className="hud-coin">
          <PxIcon map={ICON_COIN} scale={2} />
          <em>{String(pct).padStart(2, "0")}</em>
        </span>
      </div>
    </header>
  );
}
