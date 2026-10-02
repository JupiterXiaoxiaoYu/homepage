"use client";

import { FLOORS } from "@/lib/tower";
import PxIcon from "@/components/kd/PxIcon";
import { ICON_HEART, ICON_COIN } from "@/lib/sprites";

export default function HudG({ floor, seen, total }: { floor: number; seen: number; total: number }) {
  return (
    <>
      <header className="hud">
        <span className="hud-brand">★ JUPITER&rsquo;S REALM</span>
        <span className="hud-floor">
          {FLOORS[floor].name} <i>{FLOORS[floor].sub}</i>
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

      {/* tower minimap */}
      <aside className="minimap" aria-hidden>
        {FLOORS.map((f, i) => (
          <div key={f.id} className={`mm-row ${i === floor ? "on" : ""}`}>
            <i />
          </div>
        ))}
      </aside>
    </>
  );
}
