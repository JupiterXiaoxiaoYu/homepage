import SectionHead from "./SectionHead";
import Scramble from "../fx/Scramble";
import { AWARDS, CERTS } from "@/lib/data";

export default function ProofSec() {
  return (
    <section id="proof" data-sec className="ed-sec">
      <SectionHead
        n="05"
        id="proof"
        title="Proof of Work"
        aside={`${AWARDS.length} results on the record`}
      />
      <div className="ledger mono" data-reveal>
        <div className="lg-row lg-head">
          <span>year</span>
          <span>competition</span>
          <span>result</span>
        </div>
        {AWARDS.map((a, i) => (
          <div className="lg-row" key={i}>
            <span className="lg-year">{a.year}</span>
            <span className="lg-event">
              <Scramble text={a.event} hoverable speed={34} />
            </span>
            <span className="lg-result">{a.result}</span>
          </div>
        ))}
      </div>
      <p className="certs mono" data-reveal>
        certifications — {CERTS}
      </p>
    </section>
  );
}
