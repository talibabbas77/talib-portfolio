"use client";

import { usePathname } from "next/navigation";
import { SiteBackground } from "@/components/site-background";

export function ConditionalBackground() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname === "/contact/verify") return null;
  return <SiteBackground />;
}
