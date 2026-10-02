import SectionHead from "./SectionHead";
import { RESEARCH } from "@/lib/data";

export default function ResearchSec() {
  return (
    <section id="research" data-sec className="ed-sec">
      <SectionHead n="04" id="research" title="Research" aside="mphil thesis · hkust" />

      {RESEARCH.map((r) => (
        <article className="res-entry" key={r.id} data-reveal>
          <div className="res-head">
            <h3 className="res-title">{r.title}</h3>
            <span className="res-venue mono">
              {r.venue} · {r.period}
            </span>
          </div>
          <p className="res-sum">{r.summary}</p>
          <div className="res-metrics">
            {r.metrics.map((m) => (
              <div className="r-metric" key={m.k}>
                <span className="r-v">{m.v}</span>
                <span className="r-k mono">{m.k}</span>
              </div>
            ))}
          </div>
          <p className="res-tags mono">{r.tags.join(" · ")}</p>
        </article>
      ))}
    </section>
  );
}
