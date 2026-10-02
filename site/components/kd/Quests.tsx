import { PROJECTS } from "@/lib/data";
import { ICON_SWORD, PROJECT_ICONS } from "@/lib/sprites";
import Panel from "./Panel";
import PxIcon from "./PxIcon";

export default function Quests() {
  return (
    <Panel id="quests" quest="QUEST LOG — 01" title="Selected Works" icon={ICON_SWORD}>
      <ol className="quest-list">
        {PROJECTS.map((p, i) => (
          <li key={p.id} className={`quest ${p.featured ? "rare" : ""}`}>
            <span className="quest-no">{String(i + 1).padStart(2, "0")}</span>
            <PxIcon
              map={PROJECT_ICONS[p.id] ?? ICON_SWORD}
              scale={4}
              className="quest-icon"
            />
            <div className="quest-body">
              <header className="quest-top">
                <h3>{p.name}</h3>
                {p.featured && <em className="quest-rare">★ RARE</em>}
                <span className="quest-meta">
                  {p.year} · {p.role}
                </span>
              </header>
              <p className="quest-desc">{p.summary}</p>
              <footer className="quest-foot">
                <span className="quest-loot">
                  {p.stack.map((s) => (
                    <b key={s}>{s}</b>
                  ))}
                </span>
                <span className="quest-links">
                  {p.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                      ▶ {l.label}
                    </a>
                  ))}
                </span>
              </footer>
            </div>
          </li>
        ))}
      </ol>
    </Panel>
  );
}
