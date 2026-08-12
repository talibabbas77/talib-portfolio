import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  EditorialByline,
  EditorialHairline,
  EditorialKicker,
} from "@/components/editorial/editorial-meta";

type StoryCardProps = {
  href: string;
  kicker: string;
  title: string;
  summary: string;
  meta: string;
  featured?: boolean;
  className?: string;
};

export function StoryCard({
  href,
  kicker,
  title,
  summary,
  meta,
  featured = false,
  className,
}: StoryCardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col border border-border/80 bg-background/80 p-5 transition-colors hover:border-accent-brand/40 sm:p-6",
        featured && "md:p-8",
        className
      )}
    >
      <EditorialKicker>{kicker}</EditorialKicker>
      <h2
        className={cn(
          "mt-3 font-display font-medium tracking-tight text-foreground transition-colors group-hover:text-accent-brand",
          featured
            ? "text-[clamp(1.5rem,5vw,3rem)] leading-[1.15]"
            : "text-xl leading-snug sm:text-2xl"
        )}
      >
        <Link href={href} className="outline-none focus-visible:underline">
          {title}
        </Link>
      </h2>
      <p
        className={cn(
          "mt-3 text-muted-foreground",
          featured ? "max-w-2xl text-base leading-relaxed sm:text-lg" : "text-sm leading-relaxed"
        )}
      >
        {summary}
      </p>
      <EditorialByline className="mt-auto pt-6">{meta}</EditorialByline>
    </article>
  );
}

type StoryRowProps = {
  href: string;
  kicker: string;
  title: string;
  meta: string;
};

export function StoryRow({ href, kicker, title, meta }: StoryRowProps) {
  return (
    <div>
      <EditorialHairline />
      <Link
        href={href}
        className="group flex flex-col gap-2 py-5 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
      >
        <div className="min-w-0 space-y-1">
          <EditorialKicker className="text-[10px] text-muted-foreground">
            {kicker}
          </EditorialKicker>
          <h3 className="font-display text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-accent-brand sm:text-xl">
            {title}
          </h3>
        </div>
        <EditorialByline className="shrink-0 sm:text-right">{meta}</EditorialByline>
      </Link>
    </div>
  );
}
