import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PROFILE,
  PROJECTS,
  FEATURED,
  WORK,
  RESEARCH,
  AWARDS,
  EDUCATION,
  EDUCATION_ZH,
  SKILLS,
  ORGS,
  type Lang,
} from "@/lib/data";
import { isLang, loc, ui, CATEGORY_LABEL } from "@/lib/i18n";
import Cover from "@/components/Cover";
import Reveal from "@/components/site/Reveal";
import CaseLink from "@/components/site/CaseLink";
import HeroAsk from "@/components/site/HeroAsk";
import LocalTime from "@/components/site/LocalTime";
import Count from "@/components/fx/Count";

const idx2 = (i: number) => String(i + 1).padStart(2, "0");

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const l: Lang = lang;
  const t = ui(l);
  const bio = l === "zh" ? PROFILE.zh.bio : PROFILE.bio;

  const featured = FEATURED.map((id) => PROJECTS.find((p) => p.id === id)!).map(
    (p) => loc(p, l),
  );
  const all = PROJECTS.map((p) => loc(p, l));
  const rag = loc(RESEARCH[0], l);
  const defi = loc(RESEARCH[1], l);
  const edu = l === "zh" ? EDUCATION_ZH : EDUCATION;

  return (
    <>
      {/* ── hero ── */}
      <section className="hero wrap">
        <div className="hero-meta mono">
          <span>{PROFILE.location}</span>
          <span>
            <span className="dot">●</span> {t.openTo}
          </span>
          <span className="hide-m">
            <LocalTime />
          </span>
        </div>
        <Reveal>
          <h1 className="hero-name">
            <span className="line-mask">
              <span>
                Jupiter <em>Yu</em>
              </span>
            </span>
          </h1>
        </Reveal>
        <div className="hero-sub">
          <Reveal className="hero-pos" delay={120}>
            <p>{PROFILE.positioning[l]}</p>
          </Reveal>
          <Reveal className="hero-ask" delay={200}>
            <HeroAsk placeholder={t.askPlaceholder} chips={t.chips} />
          </Reveal>
        </div>
        <div className="hero-stats">
          {PROFILE.stats.map((s, i) => (
            <Reveal key={s.k} className="hero-stat" delay={i * 80}>
              <div className="v">
                <Count v={s.v} />
              </div>
              <div className="k mono">{s.k}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── marquee ── */}
      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[0, 1].map((rep) => (
            <div key={rep} style={{ display: "flex" }}>
              {ORGS.map((o) => (
                <span key={o} style={{ display: "flex" }}>
                  <span className="marquee-item">{o}</span>
                  <span className="marquee-star">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── selected works ── */}
      <section className="sec wrap" id="work">
        <div className="sec-head">
          <Reveal>
            <h2 className="sec-title">
              {l === "zh" ? (
                <>
                  精选<em>作品</em>
                </>
              ) : (
                <>
                  Selected <em>Works</em>
                </>
              )}
            </h2>
          </Reveal>
          <span className="sec-no">01 — 08</span>
        </div>

        {featured.map((p, i) => {
          const full = i % 3 === 2;
          const mirrored = i % 2 === 1;
          const href = `/${l}/work/${p.id}`;
          const meta = (
            <>
              <span className="idx">{idx2(i)}</span>
              <h3 className="pname">{p.name}</h3>
              <div className="pmeta mono">
                {p.role} · {p.year}
              </div>
              <p className="psum">{p.summary}</p>
              {p.impact && <p className="pimpact">{p.impact}</p>}
              <div className="ptags">
                {p.category.map((c) => (
                  <span key={c} className="ptag">
                    {CATEGORY_LABEL[l][c]}
                  </span>
                ))}
              </div>
              <span className="readcase">{t.readCase}</span>
            </>
          );
          if (full) {
            return (
              <div className="spread full" key={p.id}>
                <CaseLink href={href} label={t.viewCase}>
                  <Reveal clip>
                    <div className="cover-mask">
                      <Cover
                        id={p.id}
                        name={p.name}
                        year={p.year}
                        cats={p.category}
                        index={idx2(i)}
                        ratio="wide"
                        lang={l}
                        cover={p.cover}
                        video={p.video}
                      />
                    </div>
                  </Reveal>
                  <Reveal className="txt" delay={100}>
                    {meta}
                  </Reveal>
                </CaseLink>
              </div>
            );
          }
          return (
            <div className={`spread ${mirrored ? "b" : ""}`} key={p.id}>
              <CaseLink href={href} label={t.viewCase} className="coverbox">
                <Reveal clip>
                  <div className="cover-mask">
                    <Cover
                      id={p.id}
                      name={p.name}
                      year={p.year}
                      cats={p.category}
                      index={idx2(i)}
                      ratio={mirrored ? "tall" : "spread"}
                      lang={l}
                      cover={p.cover}
                      video={p.video}
                    />
                  </div>
                </Reveal>
              </CaseLink>
              <Reveal className="txt" delay={120}>
                <CaseLink href={href} label={t.viewCase}>
                  {meta}
                </CaseLink>
              </Reveal>
            </div>
          );
        })}
      </section>

      {/* ── index of everything ── */}
      <section className="sec wrap">
        <div className="sec-head">
          <Reveal>
            <h2 className="sec-title">
              {l === "zh" ? (
                <>
                  全部<em>索引</em>
                </>
              ) : (
                <>
                  Full <em>Index</em>
                </>
              )}
            </h2>
          </Reveal>
          <Link href={`/${l}/work`} className="sec-no">
            {t.allWork}
          </Link>
        </div>
        {all.map((p, i) => (
          <Link key={p.id} href={`/${l}/work/${p.id}`} className="idx-row">
            <span className="n">{idx2(i)}</span>
            <span className="nm">{p.name}</span>
            <span className="mono hide-m">
              {p.category.map((c) => CATEGORY_LABEL[l][c]).join(" · ")}
            </span>
            <span className="mono hide-m">{p.year}</span>
            <span className="arr">→</span>
          </Link>
        ))}
      </section>

      {/* ── about / experience ── */}
      <section className="sec wrap" id="about">
        <div className="sec-head">
          <Reveal>
            <h2 className="sec-title">
              {l === "zh" ? (
                <>
                  关于<em>经历</em>
                </>
              ) : (
                <>
                  About &amp; <em>Experience</em>
                </>
              )}
            </h2>
          </Reveal>
          <span className="sec-no">{t.aboutTitle}</span>
        </div>
        <Reveal>
          <p
            className="psum"
            style={{ maxWidth: "56ch", fontSize: "clamp(15px,1.3vw,18px)", marginBottom: "clamp(24px,3vw,44px)" }}
          >
            {bio}
          </p>
        </Reveal>
        {WORK.map((w0) => {
          const w = loc(w0, l);
          return (
            <Reveal key={w.id} className="job">
              <div className="job-per mono">{w.period}</div>
              <div className="job-main">
                <div className="job-role">{w.role}</div>
                <div className="job-org">{w.org}</div>
                <ul className="job-points">
                  {w.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
              <div className="job-side mono">{w.backing}</div>
            </Reveal>
          );
        })}
        <div className="edu-grid">
          <div className="edu-card">
            <div className="mono" style={{ marginBottom: 14 }}>
              {t.education}
            </div>
            {edu.map((e) => (
              <div key={e.school} style={{ marginBottom: 16 }}>
                <div className="edu-school">{e.school}</div>
                <div className="muted" style={{ fontSize: 14 }}>{e.degree}</div>
                <div className="mono" style={{ marginTop: 4 }}>{e.period}</div>
              </div>
            ))}
          </div>
          <div className="edu-card" style={{ gridColumn: "span 2" }}>
            <div className="mono" style={{ marginBottom: 14 }}>
              {t.skills}
            </div>
            {SKILLS.map((s) => (
              <div key={s.label} className="skill-line">
                <span className="lb mono">{s.label}</span>
                <span className="it">{s.items.join(" · ")}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── research ── */}
      <section className="sec wrap">
        <div className="sec-head">
          <Reveal>
            <h2 className="sec-title">
              {l === "zh" ? (
                <>
                  研究<em>论文</em>
                </>
              ) : (
                <>
                  Re<em>search</em>
                </>
              )}
            </h2>
          </Reveal>
          <span className="sec-no">{t.research}</span>
        </div>
        <div className="res-grid">
          <Reveal className="res-main">
            <div className="mono" style={{ marginBottom: 10 }}>
              {rag.venue} · {rag.period}
            </div>
            <h3 className="res-title">{rag.title}</h3>
            <p className="psum" style={{ marginTop: 18 }}>
              {rag.summary}
            </p>
            <div className="res-metrics">
              {rag.metrics.map((m) => (
                <div key={m.k} className="res-metric">
                  <div className="v">{m.v}</div>
                  <div className="k mono">{m.k}</div>
                </div>
              ))}
            </div>
            <Link
              href={`/${l}/work/sovereign-rag`}
              className="readcase"
              style={{ marginTop: 24 }}
            >
              {t.readCase}
            </Link>
          </Reveal>
          <Reveal className="res-side" delay={120}>
            <div className="mono" style={{ marginBottom: 10 }}>
              {defi.venue} · {defi.period}
            </div>
            <h3 className="res-title" style={{ fontSize: "clamp(24px,2.6vw,40px)" }}>
              {defi.title}
            </h3>
            <p className="psum" style={{ marginTop: 14 }}>
              {defi.summary}
            </p>
            <div className="ptags" style={{ marginTop: 18 }}>
              {defi.tags.map((x) => (
                <span key={x} className="ptag">
                  {x}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── recognition ── */}
      <section className="sec wrap">
        <div className="sec-head">
          <Reveal>
            <h2 className="sec-title">
              {l === "zh" ? (
                <>
                  竞赛<em>荣誉</em>
                </>
              ) : (
                <>
                  Proof of <em>Work</em>
                </>
              )}
            </h2>
          </Reveal>
          <span className="sec-no">{t.recognition}</span>
        </div>
        <div className="aw-grid">
          <Reveal>
            <div className="aw-big">
              27<sup>+</sup>
            </div>
            <div className="mono" style={{ marginTop: 14 }}>
              {t.hackathonWins}
            </div>
          </Reveal>
          <div className="aw-list">
            {AWARDS.map((a) => (
              <div
                key={a.event + a.result}
                className={`aw-row ${/champion|1st|first/i.test(a.result) ? "top" : ""}`}
              >
                <div className="ev">
                  <span className="yr">{a.year}</span>
                  {a.event}
                </div>
                <div className="rs">{a.result}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
