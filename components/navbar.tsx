"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { GsapButton } from "@/components/ui/gsap-button";
import { cn } from "@/lib/utils";
import { ctaLabels, navItems, siteConfig } from "@/lib/site-content";

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const goContact = useCallback(() => {
    setOpen(false);
    router.push("/contact");
  }, [router]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "glass-nav mx-auto flex h-[3.75rem] max-w-6xl items-center gap-2 rounded-xl px-2 pl-2.5 pr-2 transition-all duration-300 sm:gap-3 sm:pl-3 sm:pr-2.5",
          scrolled && "glass-nav-scrolled"
        )}
      >
        <Link
          href="/"
          className="group flex h-10 shrink-0 items-center gap-2.5 rounded-lg px-1.5 transition-opacity hover:opacity-90"
          aria-label={`${siteConfig.name} home`}
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[var(--accent-brand)] to-[#0a4a3a] text-xs font-bold tracking-tight text-[#06110c] ring-1 ring-accent-brand/30">
            <span className="relative z-10">TA</span>
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
          </span>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-sm font-bold tracking-tight text-foreground">
              Talib Abbas
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-accent-brand">
              Full-stack
            </span>
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 justify-center lg:flex">
          <ul className="flex h-10 items-center gap-0.5 rounded-lg border border-foreground/8 bg-foreground/[0.04] p-1 backdrop-blur-md">
            {navItems.map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex h-8 items-center rounded-md px-2.5 text-[12px] font-bold transition-all duration-200 xl:px-3.5 xl:text-[13px]",
                      active
                        ? "bg-foreground text-background shadow-sm"
                        : "text-foreground/70 hover:bg-foreground/6 hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex h-10 items-center gap-1.5">
          <AnimatedThemeToggler className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-foreground/8" />
          <GsapButton
            variant="brand"
            size="sm"
            className="hidden min-w-0 font-bold sm:inline-flex"
            onClick={goContact}
          >
            {ctaLabels.bookCall}
          </GsapButton>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-foreground/8 lg:hidden"
          >
            {open ? (
              <X className="h-4 w-4" strokeWidth={2.25} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={2.25} />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div className="glass-nav glass-nav-scrolled mx-auto mt-2 max-w-6xl overflow-hidden rounded-xl p-2 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block w-full rounded-lg px-4 py-3 text-left text-sm font-bold",
                      active
                        ? "bg-accent-brand/15 text-foreground"
                        : "text-foreground/80 hover:bg-foreground/6 hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
            <li>
              <GsapButton
                variant="brand"
                size="md"
                fullWidth
                className="mt-1 font-bold"
                onClick={goContact}
              >
                {ctaLabels.bookCall}
              </GsapButton>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
