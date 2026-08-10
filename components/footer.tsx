"use client";

import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SiGithub, SiUpwork } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import {
  ctaLabels,
  footerNavItems,
  siteConfig,
  socialLinks,
} from "@/lib/site-content";
import { GsapButton } from "@/components/ui/gsap-button";

const SOCIAL_ICONS = {
  GitHub: SiGithub,
  LinkedIn: FaLinkedin,
  Upwork: SiUpwork,
} as const;

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHomeTop = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push("/");
  };

  return (
    <footer className="relative z-0 mt-10 w-full">
      <div className="w-full overflow-hidden rounded-t-[2rem] border border-b-0 border-border/60 bg-background shadow-[0_-24px_70px_-40px_rgba(15,110,86,0.3)] sm:rounded-t-[2.5rem]">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div className="space-y-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[var(--accent-brand)] text-sm font-bold text-white dark:text-[#06110c]">
                  TA
                </span>
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {siteConfig.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{siteConfig.role}</p>
                </div>
              </div>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                {siteConfig.tagline}
              </p>
              <p className="text-sm text-muted-foreground">
                {siteConfig.availability}
              </p>
              <GsapButton
                variant="brand"
                size="md"
                onClick={() => router.push("/contact")}
              >
                {ctaLabels.bookCall}
              </GsapButton>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent-brand">
                  Navigate
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {footerNavItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="transition-colors hover:text-foreground"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent-brand">
                  Connect
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {socialLinks.map((link) => {
                    const Icon =
                      SOCIAL_ICONS[link.name as keyof typeof SOCIAL_ICONS];
                    return (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                        >
                          {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                          {link.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="sm:col-span-1">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent-brand">
                  Contact
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="inline-flex max-w-full items-start gap-2 break-all transition-colors hover:text-foreground"
                    >
                      <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-brand" />
                      {siteConfig.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-accent-brand" />
                      {siteConfig.phoneDisplay}
                    </a>
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-accent-brand" />
                    {siteConfig.location}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col justify-between gap-3 border-t border-border/50 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
            <p className="min-w-0">
              © 2026 {siteConfig.name}. Built with Next.js.
            </p>
            <p className="shrink-0">Lahore · Remote-friendly</p>
          </div>
        </div>

        <div className="relative w-full overflow-hidden border-t border-border/40 px-2 pb-1 pt-8 sm:px-6 sm:pb-2 sm:pt-10">
          <p
            aria-hidden="true"
            className="footer-wordmark-text select-none text-center text-[clamp(4.5rem,22vw,14rem)] font-normal leading-[0.85] tracking-[0.28em] sm:tracking-[0.34em]"
          >
            TALIB
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label="Back to top"
        onClick={goHomeTop}
        className={`fixed bottom-5 right-4 z-50 rounded-md border border-border bg-background p-3 shadow-sm transition-opacity sm:bottom-8 sm:right-8 ${
          isVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </footer>
  );
}
