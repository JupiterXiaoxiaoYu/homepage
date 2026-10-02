"use client";

import { LEVELS } from "@/lib/dungeon";
import PxIcon from "@/components/kd/PxIcon";
import { ICON_HEART, ICON_COIN } from "@/lib/sprites";

export default function HudG({ level, seen, total }: { level: number; seen: number; total: number }) {
  return (
    <>
      <header className="hud">
        <span className="hud-brand">★ JUPITER&rsquo;S DUNGEON</span>
        <span className="hud-floor">
          <b>{LEVELS[level].depth}</b> {LEVELS[level].name} <i>{LEVELS[level].sub}</i>
        </span>
        <div className="hud-stats">
          <span className="hud-hearts">
            <PxIcon map={ICON_HEART} scale={2} />
            <PxIcon map={ICON_HEART} scale={2} />
            <PxIcon map={ICON_HEART} scale={2} />
          </span>
          <span className="hud-coin">
            <PxIcon map={ICON_COIN} scale={2} />
            <em>{seen}/{total}</em>
          </span>
        </div>
      </header>

      {/* depth gauge — the dungeon cross-section */}
      <aside className="minimap" aria-hidden>
        {LEVELS.map((l, i) => (
          <div key={l.id} className={`mm-row ${i === level ? "on" : ""}`}>
            <span className="mm-depth">{l.depth}</span>
            <i />
          </div>
        ))}
      </aside>
    </>
  );
}
