import { PROFILE } from "@/lib/data";
import PxIcon from "./PxIcon";
import { ICON_CROWN } from "@/lib/sprites";

const TICKER =
  "27× HACKATHON CHAMPION · ZKWASM · SOVEREIGN RAG · DEFI · AI × CRYPTO · LOCAL-FIRST · ";

export default function Banner() {
  return (
    <section id="origin" className="banner">
      <p className="banner-over">— A REALM OF VERIFIABLE SYSTEMS —</p>
      <div className="banner-crown">
        <PxIcon map={ICON_CROWN} scale={7} />
      </div>
      <h1 className="banner-title">
        <span>JUPITER</span>
        <span className="banner-yu">YU</span>
      </h1>
      <p className="banner-tag">{PROFILE.tagline}</p>
      <p className="banner-bio">{PROFILE.bio}</p>

      <div className="banner-badges">
        {PROFILE.stats.map((s) => (
          <div key={s.k} className="bbadge">
            <b>{s.v}</b>
            <i>{s.k}</i>
          </div>
        ))}
      </div>

      <nav className="banner-links">
        <a href={PROFILE.github} target="_blank" rel="noreferrer">GITHUB</a>
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LINKEDIN</a>
        <a href={`mailto:${PROFILE.email}`}>EMAIL</a>
        <a href={PROFILE.resume} target="_blank" rel="noreferrer">RESUME</a>
      </nav>

      <p className="banner-start">▼ SCROLL TO BEGIN THE PATROL ▼</p>

      <div className="banner-ticker" aria-hidden>
        <div className="banner-ticker-in">
          <span>{TICKER.repeat(3)}</span>
        </div>
      </div>
    </section>
  );
}
