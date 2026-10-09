"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Category, Lang } from "@/lib/data";
import Cover from "@/components/Cover";
import CaseLink from "./CaseLink";
import { CATEGORY_LABEL } from "@/lib/i18n";

type Item = {
  id: string;
  name: string;
  role: string;
  year: string;
  impact?: string;
  category: Category[];
  cover?: string;
  video?: string;
};

export default function WorkGrid({
  items,
  filters,
  lang,
  viewLabel,
  countSuffix,
}: {
  items: Item[];
  filters: { id: string; label: string }[];
  lang: Lang;
  viewLabel: string;
  countSuffix?: string;
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const cur = sp.get("c") ?? "all";

  const shown = useMemo(
    () =>
      cur === "all"
        ? items
        : items.filter((p) => p.category.includes(cur as Category)),
    [cur, items],
  );

  const count = (id: string) =>
    id === "all"
      ? items.length
      : items.filter((p) => p.category.includes(id as Category)).length;

  return (
    <>
      <div className="filters">
        {filters.map((f) => (
          <button
            key={f.id}
            className={`fchip ${cur === f.id ? "on" : ""}`}
            onClick={() =>
              router.replace(
                f.id === "all" ? `/${lang}/work` : `/${lang}/work?c=${f.id}`,
                { scroll: false },
              )
            }
          >
            {f.label}
            <span className="cnt">{count(f.id)}</span>
          </button>
        ))}
      </div>
      <div className="wgrid">
        {shown.map((p, i) => (
          <div key={p.id} className="wcard">
            <CaseLink href={`/${lang}/work/${p.id}`} label={viewLabel}>
              <div className="cover-mask">
                <Cover
                  id={p.id}
                  name={p.name}
                  year={p.year}
                  cats={p.category}
                  index={String(i + 1).padStart(2, "0")}
                  ratio="card"
                  lang={lang}
                  cover={p.cover}
                  video={p.video}
                />
              </div>
              <div className="wn">{p.name}</div>
              <div className="wm mono">
                {p.role} · {p.year}
              </div>
              {p.impact && <div className="wi">{p.impact}</div>}
            </CaseLink>
          </div>
        ))}
      </div>
    </>
  );
}
