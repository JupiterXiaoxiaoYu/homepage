import SectionHead from "./SectionHead";
import { WORK, SKILLS, EDUCATION } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" data-sec className="ed-sec">
      <SectionHead n="03" id="experience" title="Experience & Stack" aside="founding teams → ecosystem scale" />

      <ol className="xlist">
        {WORK.map((w) => (
          <li className={`xrow ${w.current ? "is-current" : ""}`} key={w.id} data-reveal>
            <span className="x-period mono">{w.period}</span>
            <div className="x-main">
              <div className="x-role-line">
                <h3 className="x-org">{w.org}</h3>
                <span className="x-role mono">{w.role}</span>
                {w.current && <span className="x-live mono">● current</span>}
              </div>
              {w.backing && <p className="x-backing mono">backed by {w.backing}</p>}
              <ul className="x-points">
                {w.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="ed-sub-grid">
        <div className="ed-sub" data-reveal>
          <h4 className="ed-sub-title mono">stack</h4>
          {SKILLS.map((s) => (
            <p className="sk-line mono" key={s.label}>
              <span className="sk-label">{s.label}</span>
              <span className="sk-items">{s.items.join(" · ")}</span>
            </p>
          ))}
        </div>
        <div className="ed-sub" data-reveal>
          <h4 className="ed-sub-title mono">education</h4>
          {EDUCATION.map((e) => (
            <p className="edu-line" key={e.school}>
              <span className="edu-school">{e.school}</span>
              <span className="edu-degree">{e.degree}</span>
              <span className="edu-period mono">{e.period}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
