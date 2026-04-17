import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";

  // Redirect non-www to www
  if (host === "efehanyildiz.com") {
    const url = req.nextUrl.clone();
    url.host = "www.efehanyildiz.com";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|sw.js|icon-.*|logo.*).*)",
};
