import { NextRequest, NextResponse } from "next/server";
import {
  CONTACT_GATE_COOKIE,
  CONTACT_GATE_MAX_AGE,
} from "@/lib/turnstile/config";
import { getClientIp, verifyTurnstileToken } from "@/lib/turnstile/verify";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = typeof body.token === "string" ? body.token : "";

    const verification = await verifyTurnstileToken(
      token,
      "contact_page",
      getClientIp(request)
    );

    if (!verification.ok) {
      return NextResponse.json({ error: verification.reason }, { status: 403 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(CONTACT_GATE_COOKIE, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: CONTACT_GATE_MAX_AGE,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Verification failed." }, { status: 403 });
  }
}
