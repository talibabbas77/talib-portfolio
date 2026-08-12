import { NextRequest, NextResponse } from "next/server";
import {
  CONTACT_GATE_COOKIE,
  CONTACT_GATE_MAX_AGE,
  getTurnstileSecret,
} from "@/lib/turnstile/config";
import { getClientIp, verifyTurnstileToken } from "@/lib/turnstile/verify";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    if (!getTurnstileSecret()) {
      return NextResponse.json(
        {
          error:
            "Turnstile secret is missing on the server. Add CLOUDFLARE_SECRET_KEY (or TURNSTILE_SECRET) in Vercel env vars and redeploy.",
        },
        { status: 500 }
      );
    }

    let token = "";
    try {
      const body = (await request.json()) as { token?: unknown };
      token = typeof body.token === "string" ? body.token : "";
    } catch {
      return NextResponse.json(
        { error: "Invalid verification payload." },
        { status: 400 }
      );
    }

    const verification = await verifyTurnstileToken(
      token,
      "contact_page",
      getClientIp(request)
    );

    if (!verification.ok) {
      return NextResponse.json(
        { error: verification.reason },
        { status: 403 }
      );
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
  } catch (error) {
    console.error("[turnstile/verify-gate]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Verification failed unexpectedly.",
      },
      { status: 500 }
    );
  }
}
