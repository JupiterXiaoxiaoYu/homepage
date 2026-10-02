import SectionHead from "./SectionHead";
import Count from "../fx/Count";

export default function ProfileSec() {
  return (
    <section id="profile" data-sec className="ed-sec">
      <SectionHead n="01" id="profile" title="Profile" aside="the short version" />
      <div className="prof-grid">
        <p className="prof-lede" data-reveal>
          I build systems that can be <em>verified</em> — zero-knowledge
          infrastructure at Delphinus Lab, local-first retrieval over
          decentralized social graphs, and a long string of hackathon projects
          that started as 48-hour bets and ended as shipped products.
        </p>
        <div className="prof-facts">
          <div className="fact" data-reveal>
            <Count v="27+" className="fact-v" />
            <span className="fact-k mono">hackathon wins</span>
          </div>
          <div className="fact" data-reveal>
            <Count v="15" className="fact-v" />
            <span className="fact-k mono">systems shipped</span>
          </div>
          <div className="fact" data-reveal>
            <Count v="1.36M" className="fact-v" />
            <span className="fact-k mono">posts indexed</span>
          </div>
          <div className="fact" data-reveal>
            <Count v="<100ms" className="fact-v" />
            <span className="fact-k mono">retrieval latency</span>
          </div>
        </div>
      </div>
      <p className="prof-interests mono" data-reveal>
        interests — defi · tokenomics · zk/fhe · local-first software ·
        decentralized social graphs · ai×crypto · quant
      </p>
    </section>
  );
}
