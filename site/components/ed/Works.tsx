import SectionHead from "./SectionHead";
import { PROJECTS } from "@/lib/data";

// Every shipped project, printed in full — no folding.
export default function Works() {
  return (
    <section id="works" data-sec className="ed-sec">
      <SectionHead n="02" id="works" title="Works" aside={`${PROJECTS.length} entries · 2021 — now`} />
      <ol className="works">
        {PROJECTS.map((p, i) => (
          <li className="work-entry" key={p.id} data-reveal>
            <span className="we-num">{String(i + 1).padStart(2, "0")}</span>
            <div className="we-main">
              <div className="we-top">
                <h3 className="we-name">{p.name}</h3>
                <span className="we-meta mono">
                  {p.year} · {p.role}
                </span>
              </div>
              <p className="we-sum">{p.summary}</p>
              <div className="we-foot mono">
                <span className="we-stack">{p.stack.join(" · ")}</span>
                <span className="we-links">
                  {p.links.map((l) => (
                    <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                      {l.label} ↗
                    </a>
                  ))}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
