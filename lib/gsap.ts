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

export function revealSection(
  scope: HTMLElement | null,
  selector = "[data-reveal]"
) {
  if (!scope) return;
  registerGsap();

  const targets = scope.querySelectorAll(selector);
  if (!targets.length) return;

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0, filter: "none" });
    return;
  }

  gsap.fromTo(
    targets,
    { opacity: 0, y: 32, filter: "blur(6px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.85,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: scope,
        start: "top 78%",
        once: true,
      },
    }
  );
}

export { gsap, ScrollTrigger };
