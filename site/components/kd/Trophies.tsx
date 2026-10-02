import { AWARDS } from "@/lib/data";
import { ICON_TROPHY } from "@/lib/sprites";
import Panel from "./Panel";
import PxIcon from "./PxIcon";

const gold = (r: string) =>
  /champion|1st|first prize/i.test(r);

export default function Trophies() {
  return (
    <Panel
      id="trophies"
      quest="TROPHY HALL — 04"
      title={`Achievements ×${AWARDS.length}`}
      icon={ICON_TROPHY}
    >
      <ul className="trophy-list">
        {AWARDS.map((a, i) => (
          <li key={i} className={`trophy rv ${gold(a.result) ? "gold" : ""}`}>
            <span className="trophy-yr">{a.year}</span>
            <span className="trophy-ev">{a.event}</span>
            <span className="trophy-rs">
              {gold(a.result) && <PxIcon map={ICON_TROPHY} scale={2} />}
              {a.result}
            </span>
          </li>
        ))}
      </ul>
      <p className="trophy-note">+ regional & university honours beyond count</p>
    </Panel>
  );
}
