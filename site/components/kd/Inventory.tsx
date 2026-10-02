import { SKILLS, EDUCATION, CERTS, PROFILE } from "@/lib/data";
import { ICON_KEY } from "@/lib/sprites";
import Panel from "./Panel";

export default function Inventory() {
  return (
    <Panel id="inventory" quest="INVENTORY — 05" title="Character Sheet" icon={ICON_KEY}>
      <div className="inv">
        <div className="inv-col">
          <h3 className="inv-h">SKILL TREES</h3>
          {SKILLS.map((s) => (
            <div key={s.label} className="inv-skill rv">
              <p className="inv-label">{s.label}</p>
              <p className="inv-items">
                {s.items.map((it) => (
                  <b key={it}>{it}</b>
                ))}
              </p>
            </div>
          ))}
        </div>
        <div className="inv-col">
          <h3 className="inv-h">TRAINING GROUNDS</h3>
          {EDUCATION.map((e) => (
            <div key={e.school} className="inv-edu rv">
              <p className="inv-school">{e.school}</p>
              <p className="inv-degree">{e.degree}</p>
              <p className="inv-period">{e.period}</p>
            </div>
          ))}
          <h3 className="inv-h" style={{ marginTop: 22 }}>SCROLLS & SEALS</h3>
          <p className="inv-certs">{CERTS}</p>
          <h3 className="inv-h" style={{ marginTop: 22 }}>BASE OF OPERATIONS</h3>
          <p className="inv-certs">{PROFILE.location}</p>
        </div>
      </div>
    </Panel>
  );
}
