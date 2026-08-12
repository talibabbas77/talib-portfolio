import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  EditorialByline,
  EditorialHairline,
  EditorialKicker,
} from "@/components/editorial/editorial-meta";

type ArticleShellProps = {
  backHref: string;
  backLabel: string;
  kicker: string;
  title: string;
  meta: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
};

export function ArticleShell({
  backHref,
  backLabel,
  kicker,
  title,
  meta,
  children,
  aside,
  className,
}: ArticleShellProps) {
  return (
    <div className={cn("editorial relative z-10 pb-16 pt-[calc(5.5rem+env(safe-area-inset-top,0px))] sm:pb-24 sm:pt-28", className)}>
      <div className="page-gutter">
        <Link
          href={backHref}
          className="inline-flex max-w-full items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {backLabel}
        </Link>

        <header className="mt-10 max-w-3xl">
          <EditorialKicker>{kicker}</EditorialKicker>
          <h1 className="mt-4 font-display text-[clamp(1.875rem,6vw,3.75rem)] font-medium leading-[1.12] tracking-tight text-foreground">
            {title}
          </h1>
          <EditorialByline className="mt-5">{meta}</EditorialByline>
        </header>

        <EditorialHairline className="mt-10" />

        <div
          className={cn(
            "mt-8 grid gap-10 sm:mt-10 sm:gap-12",
            aside && "lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16"
          )}
        >
          <div className="editorial-prose min-w-0 max-w-[65ch] space-y-5 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
            {children}
          </div>
          {aside ? (
            <aside className="min-w-0 space-y-6 border-t border-border/60 pt-8 text-sm text-muted-foreground lg:border-t-0 lg:pt-1">
              {aside}
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  );
}
