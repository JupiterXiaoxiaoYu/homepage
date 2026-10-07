import Link from "next/link";
import { PROFILE, type Lang } from "@/lib/data";
import type { UIStrings } from "@/lib/i18n";
import EmailCopy from "./EmailCopy";
import Reveal from "./Reveal";

export default function Footer({ lang, t }: { lang: Lang; t: UIStrings }) {
  return (
    <footer className="foot wrap">
      <Reveal>
        <div className="mono">Jupiter Yu — {lang === "zh" ? "联系" : "Contact"}</div>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="foot-cta">
          {lang === "zh" ? (
            <>
              一起做<em>点东西。</em>
            </>
          ) : (
            <>
              Let&rsquo;s <em>build.</em>
            </>
          )}
        </h2>
      </Reveal>
      <Reveal delay={140}>
        <EmailCopy email={PROFILE.email} label={t.copied} />
      </Reveal>
      <div className="foot-links mono">
        <a href={PROFILE.github} target="_blank" rel="noreferrer" className="nav-link">
          GitHub ↗
        </a>
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="nav-link">
          LinkedIn ↗
        </a>
        <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="nav-link">
          {t.resume} ↗
        </a>
        <Link href="/play" className="nav-link">
          {t.play}
        </Link>
      </div>
      <div className="foot-colo mono">
        <span>© 2026 Jupiter Yu</span>
        <span>{t.colophon}</span>
      </div>
    </footer>
  );
}
