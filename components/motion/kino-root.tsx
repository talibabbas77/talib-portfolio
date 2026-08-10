"use client";

import { Kino, Reveal } from "react-kino";

type SoftRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/** Visibility-driven fade. No pinning, so scroll never waits on animation. */
export function SoftReveal({ children, className, delay = 0 }: SoftRevealProps) {
  return (
    <Reveal
      trigger="visibility"
      animation="fade-up"
      duration={280}
      delay={delay}
      className={className}
    >
      {children}
    </Reveal>
  );
}

export function KinoRoot({ children }: { children: React.ReactNode }) {
  return <Kino>{children}</Kino>;
}
