"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROFILE, type Lang } from "@/lib/data";
import type { UIStrings } from "@/lib/i18n";

export function openAsk(question?: string) {
  window.dispatchEvent(new CustomEvent("ask:open", { detail: question }));
}

export default function Nav({ lang, t }: { lang: Lang; t: UIStrings }) {
  const path = usePathname() || `/${lang}`;
  const rest = path.replace(/^\/(en|zh)/, "") || "";
  const other: Lang = lang === "en" ? "zh" : "en";

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link href={`/${lang}`} className="nav-word">
          Jupiter Yu
        </Link>
        <Link className="nav-link" href={`/${lang}/work`}>
          {t.work}
        </Link>
        <Link className="nav-link hide-m" href={`/${lang}#about`}>
          {t.about}
        </Link>
        <button className="nav-link" onClick={() => openAsk()}>
          {t.ask}
        </button>
        <span className="nav-lang">
          <Link href={`/en${rest}`} className={lang === "en" ? "on" : ""}>
            EN
          </Link>
          <span className="muted">/</span>
          <Link href={`/zh${rest}`} className={lang === "zh" ? "on" : ""}>
            中
          </Link>
        </span>
        <a
          className="nav-link nav-resume"
          href={PROFILE.resume}
          target="_blank"
          rel="noreferrer"
        >
          {t.resume}
        </a>
      </div>
    </header>
  );
}
