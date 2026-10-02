import { PROFILE } from "@/lib/data";
import { ICON_RAVEN } from "@/lib/sprites";
import Panel from "./Panel";
import PxIcon from "./PxIcon";

export default function Raven() {
  return (
    <>
      <Panel id="raven" quest="FINAL ACT — 06" title="Send a Raven" icon={ICON_RAVEN}>
        <p className="raven-lead">
          The realm is open for alliances — engineering, research collaborations,
          ecosystem work, or a quest worth taking.
        </p>
        <div className="raven-links">
          <a className="raven-main" href={`mailto:${PROFILE.email}`}>
            <PxIcon map={ICON_RAVEN} scale={4} />
            {PROFILE.email}
          </a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">
            GITHUB ↗
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
            LINKEDIN ↗
          </a>
          <a href={PROFILE.resume} target="_blank" rel="noreferrer">
            RESUME ↗
          </a>
        </div>
      </Panel>
      <footer className="realm-foot">
        <p>© MMXXVI JUPITER YU — A REALM BUILT BY HAND</p>
        <p className="realm-sub">NO COOKIES · NO TRACKERS · ONLY TORCHES</p>
      </footer>
    </>
  );
}
