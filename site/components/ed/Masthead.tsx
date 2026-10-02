import Stamp from "./Stamp";
import Scramble from "../fx/Scramble";
import { PROFILE } from "@/lib/data";

const TICKER = [
  "engineer",
  "researcher",
  "founder",
  "zkwasm",
  "local-first",
  "zero-knowledge",
  "defi",
  "cognitive science",
  "hackathons",
];

export default function Masthead() {
  return (
    <header className="masthead">
      <div className="masthead-top mono">
        <span>vol. 02 — the personal index</span>
        <span className="masthead-mid">remote · hong kong · edinburgh</span>
        <span>autumn mmxxvi</span>
      </div>

      <div className="masthead-hero">
        <h1 className="masthead-name">
          <span className="mh-line"><span>Jupiter</span></span>{" "}
          <span className="mh-line"><em>Yu</em></span>
        </h1>
        <Stamp />
      </div>

      <p className="masthead-tag" data-reveal>
        <Scramble
          text="Engineer building verifiable systems at the edge of AI & cryptography."
          speed={10}
        />
      </p>
      <p className="masthead-sub" data-reveal>
        Currently Ecosystem Director at <strong>Delphinus Lab</strong> — growing
        the zkWASM ecosystem, where off-chain zero-knowledge proofs trigger
        on-chain liquidity. MPhil Data Science @ HKUST · Cognitive Science @
        Edinburgh · 27× hackathon winner.
      </p>

      <div className="masthead-links mono" data-reveal>
        <a href={PROFILE.github} target="_blank" rel="noreferrer">github ↗</a>
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">linkedin ↗</a>
        <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        <a href={PROFILE.resume}>résumé ↓</a>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track mono">
          {[0, 1].map((n) => (
            <span key={n} className="marquee-run">
              {TICKER.map((t, i) => (
                <i key={i}>
                  {t} <b>✳</b>{" "}
                </i>
              ))}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
