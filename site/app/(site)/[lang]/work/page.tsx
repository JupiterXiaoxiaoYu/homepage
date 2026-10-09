import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PROJECTS, type Lang, type Category } from "@/lib/data";
import { isLang, loc, ui, CATEGORY_LABEL } from "@/lib/i18n";
import WorkGrid from "@/components/site/WorkGrid";
import Reveal from "@/components/site/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Work" };

export default async function WorkPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const l: Lang = lang;
  const t = ui(l);

  const items = PROJECTS.map((p0) => {
    const p = loc(p0, l);
    return {
      id: p.id,
      name: p.name,
      role: p.role,
      year: p.year,
      impact: p.impact,
      category: p.category as Category[],
      cover: p.cover,
      video: p.video,
    };
  });
  const cats: Category[] = ["agent", "ai", "web3", "research", "hackathon"];
  const filters = [
    { id: "all" as const, label: t.filterAll },
    ...cats.map((c) => ({ id: c, label: CATEGORY_LABEL[l][c] })),
  ];

  return (
    <section className="sec wrap" style={{ paddingTop: "clamp(40px,6vw,80px)" }}>
      <div className="sec-head">
        <Reveal>
          <h1 className="sec-title">
            {l === "zh" ? (
              <>
                全部<em>作品</em>
              </>
            ) : (
              <>
                All <em>Work</em>
              </>
            )}
          </h1>
        </Reveal>
        <span className="sec-no">
          {PROJECTS.length} {t.projects}
        </span>
      </div>
      <Suspense>
        <WorkGrid items={items} filters={filters} lang={l} viewLabel={t.viewCase} countSuffix={t.projects} />
      </Suspense>
    </section>
  );
}
