"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/smooth-scroll";

type LenisProviderProps = {
  children: ReactNode;
};

function shouldUseLenis(pathname: string) {
  return !pathname.startsWith("/admin") && pathname !== "/contact/verify";
}

export function LenisProvider({ children }: LenisProviderProps) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const tickRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    registerGsap();

    const lenis = new Lenis({
      lerp: 0.14,
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
      autoRaf: false,
    });

    lenisRef.current = lenis;
    setLenis(lenis);
    document.documentElement.classList.add("lenis", "lenis-smooth");

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    tickRef.current = onTick;
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      if (tickRef.current) gsap.ticker.remove(tickRef.current);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (shouldUseLenis(pathname)) {
      lenis.start();
      lenis.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    } else {
      lenis.stop();
    }
  }, [pathname]);

  return <>{children}</>;
}
