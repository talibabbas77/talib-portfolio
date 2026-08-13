"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Section enter: one trigger per section, staggered children.
 * Opacity 0 -> 1 only. No blur, no half-opacity states that read as "black text".
 */
export function revealSection(
  scope: HTMLElement | null,
  selector = "[data-reveal]"
): (() => void) | undefined {
  if (!scope) return;
  registerGsap();

  const targets = scope.querySelectorAll(selector);
  if (!targets.length) return;

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0, clearProps: "all" });
    return;
  }

  gsap.set(targets, { opacity: 0, y: 20 });

  const ctx = gsap.context(() => {
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.55,
      stagger: 0.07,
      ease: "power3.out",
      scrollTrigger: {
        trigger: scope,
        start: "top 86%",
        once: true,
        toggleActions: "play none none none",
      },
      onComplete: () => {
        gsap.set(targets, { clearProps: "transform,opacity" });
      },
    });
  }, scope);

  return () => ctx.revert();
}

export { gsap, ScrollTrigger };
