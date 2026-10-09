import type { Metadata, Viewport } from "next";
import "../../fonts.css";
import "../book.css";

export const metadata: Metadata = {
  title: "Jupiter Yu — Agent Engineer · Full-Stack",
  description: "Jupiter Yu builds production agent systems and the full-stack products around them. Projects, research and awards, bound as a book that answers its readers.",
  icons: { icon: "/icon.jpg" },
};

export const viewport: Viewport = {
  themeColor: "#17140e",
  width: "device-width",
  initialScale: 1,
};

export default async function BookLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang === "zh" ? "zh-CN" : "en"}>
      <body>{children}</body>
    </html>
  );
}
