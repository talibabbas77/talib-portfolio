export type TurnstileAction = "contact_submit" | "contact_page";

export type TurnstileVerifyResult =
  | { ok: true }
  | { ok: false; reason: string };

const DEFAULT_HOSTNAMES = [
  "localhost",
  "127.0.0.1",
  "talibabbas.vercel.app",
  "www.talibabbas.vercel.app",
];

function getTurnstileSecret() {
  return (
    process.env.TURNSTILE_SECRET?.trim() ||
    process.env.CLOUDFLARE_SECRET_KEY?.trim() ||
    ""
  );
}

function getTurnstileHostnames() {
  const fromEnv = (process.env.TURNSTILE_HOSTNAMES ?? "")
    .split(",")
    .map((hostname) => hostname.trim())
    .filter(Boolean);

  if (fromEnv.length > 0) return fromEnv;
  return DEFAULT_HOSTNAMES;
}

function isAllowedHostname(hostname: string, allowed: Set<string>) {
  if (allowed.has(hostname)) return true;
  return hostname.endsWith(".vercel.app");
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

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: controller.signal,
        body,
      }
    );

    if (!response.ok) {
      return { ok: false, reason: "Verification service unavailable." };
    }

    result = await response.json();
  } catch {
    return { ok: false, reason: "Verification request failed." };
  } finally {
    clearTimeout(timer);
  }

  if (!result.success) {
    const codes = result["error-codes"]?.join(", ") || "unknown";
    return {
      ok: false,
      reason: `Bot verification failed (${codes}).`,
    };
  }

  if (result.action && result.action !== expectedAction) {
    return {
      ok: false,
      reason: `Unexpected Turnstile action "${result.action}".`,
    };
  }

  if (
    !result.hostname ||
    !isAllowedHostname(result.hostname, expectedHostnames)
  ) {
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
