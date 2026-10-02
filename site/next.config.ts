import type { NextConfig } from "next";

// NEXT_PUBLIC_BASE_PATH is set to "/homepage" only in the GitHub Pages
// workflow; Vercel + local dev serve from root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
