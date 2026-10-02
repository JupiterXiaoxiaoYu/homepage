import { RESEARCH } from "@/lib/data";
import { ICON_FLASK } from "@/lib/sprites";
import Panel from "./Panel";

// metric value → rough bar fill (0..1)
function fill(v: string): number {
  if (v.includes("79")) return 0.79;
  if (v.includes("100")) return 0.85;
  if (v.includes("1.36")) return 0.9;
  if (v.includes("$0")) return 1;
  return 0.5;
}

export default function Grimoire() {
  return (
    <Panel id="grimoire" quest="GRIMOIRE — 03" title="Arcane Research" icon={ICON_FLASK}>
      <div className="grim">
        {RESEARCH.map((r) => (
          <article key={r.id} className="grim-item rv">
            <header>
              <h3>{r.title}</h3>
              <p className="grim-meta">
                {r.venue} · {r.period}
              </p>
            </header>
            <p className="grim-sum">{r.summary}</p>
            <div className="grim-bars">
              {r.metrics.map((m) => (
                <div key={m.k} className="gbar">
                  <span className="gbar-k">{m.k}</span>
                  <span className="gbar-track">
                    <i style={{ width: `${fill(m.v) * 100}%` }} />
                  </span>
                  <span className="gbar-v">{m.v}</span>
                </div>
              ))}
            </div>
            <p className="grim-tags">
              {r.tags.map((t) => (
                <b key={t}>{t}</b>
              ))}
            </p>
          </article>
        ))}
      </div>
    </Panel>
  );
}
