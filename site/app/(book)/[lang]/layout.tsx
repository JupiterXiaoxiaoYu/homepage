import type { Metadata, Viewport } from "next";
import "../../fonts.css";
import "../book.css";

export const metadata: Metadata = {
  title: "Jupiter Yu — A Working Manuscript",
  description: "The collected works of Jupiter Yu, bound as a book that answers its readers.",
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
