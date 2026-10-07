import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS, type Lang } from "@/lib/data";
import { isLang, loc, ui, CATEGORY_LABEL } from "@/lib/i18n";
import Cover from "@/components/Cover";
import Reveal from "@/components/site/Reveal";

export function generateStaticParams() {
  return ["en", "zh"].flatMap((lang) =>
    PROJECTS.map((p) => ({ lang, slug: p.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.id === slug);
  return { title: p ? p.name : "Work" };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const l: Lang = lang;
  const t = ui(l);
  const p0 = PROJECTS.find((x) => x.id === slug);
  if (!p0) notFound();
  const p = loc(p0, l);

  const i = PROJECTS.indexOf(p0);
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  return (
    <article>
      <Reveal clip>
        <Cover
          id={p.id}
          name={p.name}
          year={p.year}
          cats={p.category}
          ratio="wide"
          lang={l}
          cover={p.cover}
          video={p.video}
        />
      </Reveal>

      <header className="case-head wrap">
        <Reveal>
          <h1 className="case-name">{p.name}</h1>
        </Reveal>
        <Reveal delay={80}>
          <p className="case-sum">{p.summary}</p>
        </Reveal>
        <div className="meta-grid">
          <div className="meta-cell">
            <div className="lb mono">{t.role}</div>
            <div className="vl">{p.role}</div>
          </div>
          <div className="meta-cell">
            <div className="lb mono">{t.year}</div>
            <div className="vl">{p.year}</div>
          </div>
          <div className="meta-cell">
            <div className="lb mono">{t.category}</div>
            <div className="vl">
              {p.category.map((c) => CATEGORY_LABEL[l][c]).join(" · ")}
            </div>
          </div>
          <div className="meta-cell">
            <div className="lb mono">{t.stack}</div>
            <div className="vl">{p.stack.join(", ")}</div>
          </div>
        </div>
      </header>

      <div className="wrap">
        <div className="case-body">
          <p>{p.summary}</p>
          {p.detail && <p>{p.detail}</p>}
          {p.impact && <p className="pimpact">{p.impact}</p>}
        </div>
        <div className="case-stack">
          {p.stack.map((s) => (
            <span key={s} className="ptag">
              {s}
            </span>
          ))}
        </div>
        {p.links.length > 0 && (
          <div className="case-links">
            <div className="mono" style={{ marginBottom: 6 }}>
              {t.links}
            </div>
            {p.links.map((lnk) => (
              <a
                key={lnk.href}
                href={lnk.href}
                target="_blank"
                rel="noreferrer"
                className="link-row"
              >
                <span>
                  <em>{lnk.label}</em>
                </span>
                <span>↗</span>
              </a>
            ))}
          </div>
        )}
      </div>

      <nav className="pn wrap" style={{ paddingBottom: 60 }}>
        <Link href={`/${l}/work/${prev.id}`}>
          <div className="mono">← {t.prev}</div>
          <div className="t">{loc(prev, l).name}</div>
        </Link>
        <Link href={`/${l}/work/${next.id}`}>
          <div className="mono">{t.next} →</div>
          <div className="t">{loc(next, l).name}</div>
        </Link>
      </nav>
    </article>
  );
}
