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
  transpilePackages: ["ogl", "react-simple-maps"],
  serverExternalPackages: ["sanitize-html"],
  experimental: {
    optimizePackageImports: [
      "@phosphor-icons/react",
      "lucide-react",
      "react-icons",
    ],
  },
};

export default nextConfig;
