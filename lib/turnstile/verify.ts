import {
  getTurnstileHostnames,
  getTurnstileSecret,
  type TurnstileAction,
} from "@/lib/turnstile/config";

export type TurnstileVerifyResult =
  | { ok: true }
  | { ok: false; reason: string };

export async function verifyTurnstileToken(
  token: string | undefined | null,
  expectedAction: TurnstileAction,
  remoteIp?: string | null
): Promise<TurnstileVerifyResult> {
  const secret = getTurnstileSecret();
  const expectedHostnames = new Set(getTurnstileHostnames());

  if (!secret) {
    return { ok: false, reason: "Turnstile is not configured." };
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

  if (
    !result.success ||
    result.action !== expectedAction ||
    !result.hostname ||
    !expectedHostnames.has(result.hostname)
  ) {
    return { ok: false, reason: "Bot verification failed." };
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
