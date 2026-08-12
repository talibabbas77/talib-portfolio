import {
  getTurnstileHostnames,
  getTurnstileSecret,
  type TurnstileAction,
} from "@/lib/turnstile/config";

export type TurnstileVerifyResult =
  | { ok: true }
  | { ok: false; reason: string };

function isAllowedHostname(hostname: string, allowed: Set<string>) {
  if (allowed.has(hostname)) return true;

  // Accept Vercel preview URLs like project-git-branch-user.vercel.app
  if (hostname.endsWith(".vercel.app")) {
    for (const entry of allowed) {
      if (entry.endsWith(".vercel.app") || entry === "talibabbas.vercel.app") {
        return true;
      }
    }
  }

  return false;
}

export async function verifyTurnstileToken(
  token: string | undefined | null,
  expectedAction: TurnstileAction,
  remoteIp?: string | null
): Promise<TurnstileVerifyResult> {
  const secret = getTurnstileSecret();
  const expectedHostnames = new Set(getTurnstileHostnames());

  if (!secret) {
    return {
      ok: false,
      reason:
        "Turnstile is not configured. Set CLOUDFLARE_SECRET_KEY on the server.",
    };
  }

  if (
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > 2048 ||
    expectedHostnames.size === 0
  ) {
    return { ok: false, reason: "Invalid verification token." };
  }

  let result: {
    success?: boolean;
    action?: string;
    hostname?: string;
    "error-codes"?: string[];
  };

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    });

    if (remoteIp) {
      body.set("remoteip", remoteIp);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: AbortSignal.timeout(10_000),
        body,
      }
    );

    if (!response.ok) {
      return { ok: false, reason: "Verification service unavailable." };
    }

    result = await response.json();
  } catch {
    return { ok: false, reason: "Verification request failed." };
  }

  if (!result.success) {
    const codes = result["error-codes"]?.join(", ") || "unknown";
    return {
      ok: false,
      reason: `Bot verification failed (${codes}).`,
    };
  }

  // Action is optional on some Turnstile configs; enforce when Cloudflare returns it.
  if (result.action && result.action !== expectedAction) {
    return {
      ok: false,
      reason: `Unexpected Turnstile action "${result.action}".`,
    };
  }

  if (!result.hostname || !isAllowedHostname(result.hostname, expectedHostnames)) {
    return {
      ok: false,
      reason: `Hostname "${result.hostname ?? "unknown"}" is not allowed for Turnstile.`,
    };
  }

  return { ok: true };
}

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? null;
  }
  return request.headers.get("x-real-ip");
}
