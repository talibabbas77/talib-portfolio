import { NextResponse, type NextRequest } from "next/server";

/** Kept inline so contact routes never pull Supabase into the middleware bundle. */
const CONTACT_GATE_COOKIE = "contact_verified";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const { updateSession } = await import("@/lib/supabase/middleware");
    return updateSession(request);
  }

  const verified = request.cookies.get(CONTACT_GATE_COOKIE)?.value === "1";

  if (pathname === "/contact") {
    if (!verified) {
      const url = request.nextUrl.clone();
      url.pathname = "/contact/verify";
      return NextResponse.redirect(url);
    }
  }

  if (pathname === "/contact/verify" && verified) {
    const url = request.nextUrl.clone();
    url.pathname = "/contact";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/contact", "/contact/verify"],
};
