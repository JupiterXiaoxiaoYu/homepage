import type { Metadata, Viewport } from "next";
import "../../fonts.css";
import "./dungeon.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
