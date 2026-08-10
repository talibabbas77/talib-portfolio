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
    <div className={cn("editorial relative z-10 pb-24 pt-28", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {backLabel}
        </Link>

        <header className="mt-10 max-w-3xl">
          <EditorialKicker>{kicker}</EditorialKicker>
          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.12] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <EditorialByline className="mt-5">{meta}</EditorialByline>
        </header>

        <EditorialHairline className="mt-10" />

        <div
          className={cn(
            "mt-10 grid gap-12",
            aside && "lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16"
          )}
        >
          <div className="editorial-prose max-w-[65ch] space-y-5 text-[1.05rem] leading-relaxed text-muted-foreground">
            {children}
          </div>
          {aside ? (
            <aside className="space-y-6 text-sm text-muted-foreground lg:pt-1">
              {aside}
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  );
}
