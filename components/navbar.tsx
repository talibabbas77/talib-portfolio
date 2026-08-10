"use client";

import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { GsapButton } from "@/components/ui/gsap-button";
import { cn } from "@/lib/utils";
import { ctaLabels, navItems, siteConfig } from "@/lib/site-content";

export function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const scrollToSection = useCallback((sectionId: string) => {
    setOpen(false);
    setActive(sectionId);
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const sections = navItems.map((n) => n.href.replace("#", ""));

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      const probe = y + window.innerHeight * 0.3;
      if (y < window.innerHeight * 0.4) {
        setActive("home");
        return;
      }
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (probe >= top && probe < bottom) {
          setActive(id);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center gap-3 rounded-md border px-2 pl-2.5 pr-2 transition-all duration-300 sm:h-14 sm:gap-4 sm:pl-3 sm:pr-2.5",
          scrolled
            ? "border-border/70 bg-background/85 shadow-[0_12px_40px_-24px_rgba(15,110,86,0.25)] backdrop-blur-xl"
            : "border-border/50 bg-background/70 shadow-sm backdrop-blur-lg dark:border-white/10 dark:bg-black/40"
        )}
      >
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="group flex h-10 shrink-0 cursor-pointer items-center gap-2.5 rounded-md px-1.5 transition-opacity hover:opacity-90"
          aria-label={`${siteConfig.name} home`}
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-[var(--accent-brand)] to-[#0a4a3a] text-xs font-bold tracking-tight text-[#06110c] ring-1 ring-accent-brand/30">
            <span className="relative z-10">TA</span>
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
          </span>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-sm font-semibold tracking-tight text-foreground">
              Talib Abbas
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Full-stack
            </span>
          </span>
        </button>

        <nav className="hidden min-w-0 flex-1 justify-center md:flex">
          <ul className="flex h-10 items-center gap-0.5 rounded-md bg-foreground/[0.04] p-1 ring-1 ring-inset ring-border/60">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className={cn(
                      "h-8 cursor-pointer rounded-md px-3.5 text-[13px] font-medium transition-all duration-200",
                      isActive
                        ? "bg-foreground text-background shadow-sm"
                        : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex h-10 items-center gap-1.5 md:ml-0">
          <AnimatedThemeToggler className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-foreground transition-colors hover:bg-foreground/8" />
          <GsapButton
            variant="brand"
            size="sm"
            className="hidden min-w-0 sm:inline-flex"
            onClick={() => scrollToSection("contact")}
          >
            {ctaLabels.bookCall}
          </GsapButton>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-foreground transition-colors hover:bg-foreground/8 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-md border border-border/60 bg-background/95 p-2 shadow-xl backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              return (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className={cn(
                      "w-full cursor-pointer rounded-md px-4 py-3 text-left text-sm",
                      active === id
                        ? "bg-accent-brand/15 font-medium text-foreground"
                        : "text-foreground hover:bg-foreground/5"
                    )}
                  >
                    {item.name}
                  </button>
                </li>
              );
            })}
            <li>
              <GsapButton
                variant="brand"
                size="md"
                fullWidth
                className="mt-1"
                onClick={() => scrollToSection("contact")}
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
