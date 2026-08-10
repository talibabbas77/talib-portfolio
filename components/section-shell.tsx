"use client";

import { cn } from "@/lib/utils";

type SectionShellProps = {
  id: string;
  index: string;
  className?: string;
  children: React.ReactNode;
};

export function SectionShell({
  id,
  index,
  className,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex min-h-dvh items-center py-24",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-20 select-none text-[clamp(5rem,18vw,14rem)] font-semibold leading-none tracking-tighter text-foreground/[0.035] md:right-10 md:top-16"
      >
        {index}
      </span>
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
