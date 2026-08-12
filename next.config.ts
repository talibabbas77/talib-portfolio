import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY:
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
      process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY ??
      process.env.CLOUDFLARE_SITE_KEY ??
      "",
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  transpilePackages: ["ogl"],
};

export default nextConfig;
