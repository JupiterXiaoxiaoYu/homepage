import type { Metadata, Viewport } from "next";
import { Press_Start_2P, Silkscreen, IBM_Plex_Mono } from "next/font/google";
import { BASE_PATH } from "@/lib/site";
import "./globals.css";

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
  title: "Jupiter Yu — Engineer · Researcher · Founder",
  description:
    "Building verifiable systems at the edge of AI and cryptography. Ecosystem Director @ Delphinus Lab (zkWASM). 27× hackathon winner.",
  icons: { icon: `${BASE_PATH}/icon.jpg` },
};

export const viewport: Viewport = {
  themeColor: "#0d0b22",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
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
