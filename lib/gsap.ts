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

/** Fast, low-friction reveals so scrolling never feels blocked. */
export function revealSection(
  scope: HTMLElement | null,
  selector = "[data-reveal]"
) {
  if (!scope) return;
  registerGsap();

  const targets = scope.querySelectorAll(selector);
  if (!targets.length) return;

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0, clearProps: "filter" });
    return;
  }

  gsap.fromTo(
    targets,
    { opacity: 0.35, y: 12 },
    {
      opacity: 1,
      y: 0,
      duration: 0.35,
      stagger: 0.03,
      ease: "power2.out",
      scrollTrigger: {
        trigger: scope,
        start: "top 92%",
        once: true,
        toggleActions: "play none none none",
      },
      onComplete: () => {
        gsap.set(targets, { clearProps: "transform,opacity" });
      },
    }
  );
}

export { gsap, ScrollTrigger };
