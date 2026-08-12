import { NextRequest, NextResponse } from "next/server";

const CONTACT_GATE_COOKIE = "contact_verified";
const CONTACT_GATE_MAX_AGE = 60 * 60;

const DEFAULT_HOSTNAMES = new Set([
  "localhost",
  "127.0.0.1",
  "talibabbas.vercel.app",
  "www.talibabbas.vercel.app",
]);

function getSecret() {
  return (
    process.env.TURNSTILE_SECRET?.trim() ||
    process.env.CLOUDFLARE_SECRET_KEY?.trim() ||
    ""
  );
}

function getAllowedHostnames() {
  const fromEnv = (process.env.TURNSTILE_HOSTNAMES ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (fromEnv.length > 0) return new Set(fromEnv);
  return DEFAULT_HOSTNAMES;
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? null;
  return request.headers.get("x-real-ip");
}

function isAllowedHostname(hostname: string, allowed: Set<string>) {
  if (allowed.has(hostname)) return true;
  return hostname.endsWith(".vercel.app");
}

/** Lightweight health check so we can confirm the route boots on Vercel. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    hasSecret: Boolean(getSecret()),
  });
}

export async function POST(request: NextRequest) {
  try {
    const secret = getSecret();
    if (!secret) {
      return NextResponse.json(
        {
          error:
            "Turnstile secret missing. Set CLOUDFLARE_SECRET_KEY in Vercel (Production), then redeploy.",
        },
        { status: 500 }
      );
    }

    let token = "";
    try {
      const body = (await request.json()) as { token?: unknown };
      token = typeof body.token === "string" ? body.token.trim() : "";
    } catch {
      return NextResponse.json(
        { error: "Invalid verification payload." },
        { status: 400 }
      );
    }

    if (!token || token.length > 2048) {
      return NextResponse.json(
        { error: "Invalid verification token." },
        { status: 400 }
      );
    }

    const form = new URLSearchParams({
      secret,
      response: token,
    });
    const ip = getClientIp(request);
    if (ip) form.set("remoteip", ip);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);

    let result: {
      success?: boolean;
      action?: string;
      hostname?: string;
      "error-codes"?: string[];
    };

    try {
      const cfResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: form,
          signal: controller.signal,
        }
      );

      if (!cfResponse.ok) {
        return NextResponse.json(
          { error: "Verification service unavailable." },
          { status: 502 }
        );
      }

      result = (await cfResponse.json()) as typeof result;
    } catch {
      return NextResponse.json(
        { error: "Verification request failed." },
        { status: 502 }
      );
    } finally {
      clearTimeout(timer);
    }

    if (!result.success) {
      const codes = result["error-codes"]?.join(", ") || "unknown";
      return NextResponse.json(
        { error: `Bot verification failed (${codes}).` },
        { status: 403 }
      );
    }

    if (result.action && result.action !== "contact_page") {
      return NextResponse.json(
        { error: `Unexpected Turnstile action "${result.action}".` },
        { status: 403 }
      );
    }

    const hostname = result.hostname ?? "";
    if (!hostname || !isAllowedHostname(hostname, getAllowedHostnames())) {
      return NextResponse.json(
        { error: `Hostname "${hostname || "unknown"}" is not allowed.` },
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
