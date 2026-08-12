import Link from "next/link";
import {
  EditorialHairline,
  EditorialKicker,
} from "@/components/editorial/editorial-meta";
import { StoryCard, StoryRow } from "@/components/editorial/story-card";

type IndexItem = {
  href: string;
  kicker: string;
  title: string;
  summary: string;
  meta: string;
  featured?: boolean;
};

type EditorialIndexProps = {
  kicker: string;
  title: string;
  description: string;
  items: IndexItem[];
};

export function EditorialIndex({
  kicker,
  title,
  description,
  items,
}: EditorialIndexProps) {
  const featured = items.find((i) => i.featured) ?? items[0];
  const rest = items.filter((i) => i.href !== featured.href);
  const secondary = rest.slice(0, 2);
  const rows = rest.slice(2);

  return (
    <div className="editorial relative z-10 pb-16 pt-[calc(5.5rem+env(safe-area-inset-top,0px))] sm:pb-24 sm:pt-28">
      <div className="page-gutter">
        <div className="border-y border-border py-5 sm:py-6">
          <EditorialKicker>{kicker}</EditorialKicker>
          <h1 className="mt-3 font-display text-[clamp(1.875rem,6vw,3.75rem)] font-medium tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>

        <div className="mt-10">
          <StoryCard
            href={featured.href}
            kicker={featured.kicker}
            title={featured.title}
            summary={featured.summary}
            meta={featured.meta}
            featured
          />
        </div>

        {secondary.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {secondary.map((item) => (
              <StoryCard
                key={item.href}
                href={item.href}
                kicker={item.kicker}
                title={item.title}
                summary={item.summary}
                meta={item.meta}
              />
            ))}
          </div>
        ) : null}

        {rows.length > 0 ? (
          <div className="mt-10">
            <EditorialHairline />
            {rows.map((item) => (
              <StoryRow
                key={item.href}
                href={item.href}
                kicker={item.kicker}
                title={item.title}
                meta={item.meta}
              />
            ))}
            <EditorialHairline />
          </div>
        ) : null}

        <p className="mt-12 text-sm text-muted-foreground">
          Looking for something specific?{" "}
          <Link
            href="/#contact"
            className="font-medium text-accent-brand underline-offset-4 hover:underline"
          >
            Tell me about the project
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
