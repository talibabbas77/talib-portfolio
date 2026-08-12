import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { CONTACT_GATE_COOKIE } from "@/lib/turnstile/config";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
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
