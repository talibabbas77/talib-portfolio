const DEFAULT_HOSTNAMES = [
  "localhost",
  "127.0.0.1",
  "talibabbas.vercel.app",
  "www.talibabbas.vercel.app",
];

export function getTurnstileSiteKey() {
  return (
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
    process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY ??
    process.env.CLOUDFLARE_SITE_KEY ??
    ""
  );
}

export function getTurnstileSecret() {
  return (
    process.env.TURNSTILE_SECRET?.trim() ||
    process.env.CLOUDFLARE_SECRET_KEY?.trim() ||
    ""
  );
}

export function getTurnstileHostnames() {
  const fromEnv = (process.env.TURNSTILE_HOSTNAMES ?? "")
    .split(",")
    .map((hostname) => hostname.trim())
    .filter(Boolean);

  if (fromEnv.length > 0) return fromEnv;
  return DEFAULT_HOSTNAMES;
}

export const CONTACT_GATE_COOKIE = "contact_verified";
export const CONTACT_GATE_MAX_AGE = 60 * 60;

export type TurnstileAction = "contact_submit" | "contact_page";
