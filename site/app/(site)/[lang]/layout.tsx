import type { Metadata, Viewport } from "next";
import {
  Instrument_Serif,
  Inter_Tight,
  JetBrains_Mono,
  Noto_Serif_SC,
  Noto_Sans_SC,
} from "next/font/google";
import { notFound } from "next/navigation";
import { isLang, ui } from "@/lib/i18n";
import { PROFILE, type Lang } from "@/lib/data";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Lenis from "@/components/site/Lenis";
import Ask from "@/components/ask/AskPanel";
import "../globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  style: ["normal", "italic"],
});
const body = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-body",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});
const displayZh = Noto_Serif_SC({
  variable: "--font-display-zh",
  weight: ["400", "600"],
  preload: false,
});
const bodyZh = Noto_Sans_SC({
  variable: "--font-body-zh",
  weight: ["400", "500"],
  preload: false,
});

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export const metadata: Metadata = {
  title: {
    default: "Jupiter Yu — AI & Web3 Engineer",
    template: "%s — Jupiter Yu",
  },
  description: PROFILE.positioning.en,
  icons: { icon: "/icon.jpg" },
};

export const viewport: Viewport = {
  themeColor: "#f2f0eb",
  width: "device-width",
  initialScale: 1,
};

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const l: Lang = lang;
  const t = ui(l);

  return (
    <html
      lang={l === "zh" ? "zh-CN" : "en"}
      className={`${display.variable} ${body.variable} ${mono.variable} ${displayZh.variable} ${bodyZh.variable}`}
    >
      <body>
        <Lenis />
        <div className="grain" aria-hidden />
        <Nav lang={l} t={t} />
        <Ask lang={l} t={t}>
          <main>{children}</main>
          <Footer lang={l} t={t} />
        </Ask>
        <div id="toast" className="toast" role="status" />
      </body>
    </html>
  );
}
