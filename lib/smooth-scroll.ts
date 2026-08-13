import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

type ScrollTarget = number | string | HTMLElement;

/** Programmatic scroll - short duration so anchors feel responsive. */
export function scrollToTarget(
  target: ScrollTarget,
  options?: { offset?: number; immediate?: boolean }
) {
  const { offset = 0, immediate = false } = options ?? {};

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset,
      immediate,
      duration: immediate ? 0 : 1.05,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
    return;
  }

  const el =
    typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  el?.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" });
}
