import { WORK } from "@/lib/data";
import { ICON_BOOK } from "@/lib/sprites";
import Panel from "./Panel";

export default function Chronicle() {
  return (
    <Panel id="chronicle" quest="CHRONICLE — 02" title="Reign & Service" icon={ICON_BOOK}>
      <div className="chron">
        {WORK.map((w) => (
          <article key={w.id} className="chron-item rv">
            <header className="chron-top">
              <h3>
                {w.role}
                <span className="chron-org"> @ {w.org}</span>
                {w.current && <em className="chron-live">● ONGOING</em>}
              </h3>
              <p className="chron-meta">
                {w.period}
                {w.backing && <i> · backed by {w.backing}</i>}
              </p>
            </header>
            <ul className="chron-pts">
              {w.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Panel>
  );
}
