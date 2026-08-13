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
import { NewsletterSubscribeForm } from "@/components/newsletter-subscribe-form";
import { scrollToTarget } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

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
      scrollToTarget(0);
      return;
    }
    router.push("/");
  };

  return (
    <footer className="relative z-10 mt-16 w-full">
      <div className="glass-panel glass-panel-strong w-full overflow-hidden rounded-t-[2rem] border-x-0 border-b-0 sm:rounded-t-[2.5rem]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div className="space-y-5">
              <div className="min-w-0">
                <p className="truncate text-xl font-bold tracking-tight text-foreground">
                  {siteConfig.name}
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-brand">
                  {siteConfig.role}
                </p>
              </div>
              <p className="max-w-md text-sm font-medium leading-relaxed text-foreground/80">
                {siteConfig.tagline}
              </p>
              <p className="text-sm font-semibold text-foreground/70">
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

            <div className="grid grid-cols-1 gap-8 min-[480px]:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-accent-brand">
                  Navigate
                </p>
                <ul className="space-y-3">
                  {footerNavItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm font-semibold text-foreground/75 transition-colors hover:text-foreground"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-accent-brand">
                  Connect
                </p>
                <ul className="space-y-3">
                  {socialLinks.map((link) => {
                    const Icon =
                      SOCIAL_ICONS[link.name as keyof typeof SOCIAL_ICONS];
                    return (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/75 transition-colors hover:text-foreground"
                        >
                          {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                          {link.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="min-[480px]:col-span-2 lg:col-span-1">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-accent-brand">
                  Contact
                </p>
                <ul className="space-y-3">
                  <li>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="inline-flex max-w-full items-start gap-2 break-all text-sm font-semibold text-foreground/75 transition-colors hover:text-foreground"
                    >
                      <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-brand" />
                      {siteConfig.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/75 transition-colors hover:text-foreground"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-accent-brand" />
                      {siteConfig.phoneDisplay}
                    </a>
                  </li>
                  <li className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/75">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-accent-brand" />
                    {siteConfig.location}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-foreground/10 pt-10">
            <NewsletterSubscribeForm className="max-w-xl" />
          </div>

          <div className="mt-12 flex flex-col justify-between gap-3 border-t border-foreground/10 pt-6 sm:flex-row sm:items-center">
            <p className="min-w-0 text-sm font-semibold text-foreground/70">
              © 2026 {siteConfig.name}. Built with Next.js.
            </p>
            <p className="shrink-0 text-sm font-bold text-foreground/80">
              Lahore · Remote-friendly
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Back to top"
        onClick={goHomeTop}
        className={cn(
          "glass-panel fixed bottom-5 right-4 z-50 rounded-lg p-3 transition-opacity max-sm:bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:bottom-8 sm:right-8",
          isVisible ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <ArrowUp className="h-4 w-4 font-bold text-foreground" strokeWidth={2.25} />
      </button>
    </footer>
  );
}
