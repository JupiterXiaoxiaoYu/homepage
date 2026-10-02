import SectionHead from "./SectionHead";
import Scramble from "../fx/Scramble";
import { PROFILE } from "@/lib/data";

export default function Channel() {
  return (
    <section id="channel" data-sec className="ed-sec ed-last">
      <SectionHead n="06" id="channel" title="Channel" aside="handshake protocol" />
      <div className="channel-body" data-reveal>
        <a className="ch-mail" href={`mailto:${PROFILE.email}`}>
          <Scramble text="say hello →" hoverable speed={24} />
        </a>
        <p className="ch-addr mono">{PROFILE.email}</p>
        <div className="ch-links mono">
          <a href={PROFILE.github} target="_blank" rel="noreferrer">github ↗</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">linkedin ↗</a>
          <a href={PROFILE.resume}>résumé ↓</a>
        </div>
      </div>
      <footer className="colophon mono" data-reveal>
        <span>set in space grotesk, instrument serif & jetbrains mono</span>
        <span>built by hand · no cookies · mmxxvi</span>
      </footer>
    </section>
  );
}
