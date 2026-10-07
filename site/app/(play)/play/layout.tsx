import type { Metadata, Viewport } from "next";
import { Press_Start_2P, Silkscreen, IBM_Plex_Mono } from "next/font/google";
import "./dungeon.css";

const px = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-px",
  weight: "400",
});

const head = Silkscreen({
  subsets: ["latin"],
  variable: "--font-head",
  weight: ["400", "700"],
});

const body = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Jupiter Yu — the dungeon",
  description: "A playable pixel descent through Jupiter Yu's work.",
  icons: { icon: "/icon.jpg" },
};

export const viewport: Viewport = {
  themeColor: "#0d0b22",
  width: "device-width",
  initialScale: 1,
};

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${px.variable} ${head.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
