import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accept = req.headers.get("accept-language") ?? "";
  const lang = accept.trim().toLowerCase().startsWith("zh") ? "zh" : "en";
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}`;
  return NextResponse.redirect(url, 307);
}

export const config = { matcher: "/" };
