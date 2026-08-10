"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 10;
      const rotateX = (0.5 - py) * 8;

      gsap.to(el, {
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformOrigin: "center",
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });

      const shine = el.querySelector<HTMLElement>("[data-shine]");
      if (shine) {
        gsap.to(shine, {
          opacity: 0.35,
          background: `radial-gradient(600px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.22), transparent 40%)`,
          duration: 0.2,
          overwrite: "auto",
        });
      }
    };

    const onLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.55,
        ease: "power3.out",
        overwrite: "auto",
      });
      const shine = el.querySelector<HTMLElement>("[data-shine]");
      if (shine) {
        gsap.to(shine, { opacity: 0, duration: 0.35, overwrite: "auto" });
      }
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative transform-gpu will-change-transform", className)}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        data-shine
        className="pointer-events-none absolute inset-0 z-10 opacity-0"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
