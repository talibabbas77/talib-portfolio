import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/editorial/article-shell";
import {
  EditorialHairline,
  EditorialKicker,
} from "@/components/editorial/editorial-meta";
import {
  caseStudies,
  getCaseStudy,
  getCaseStudySlugs,
  siteConfig,
} from "@/lib/site-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case study" };

  return {
    title: study.title,
    description: study.summary,
    openGraph: {
      title: study.title,
      description: study.summary,
      url: `${siteConfig.siteUrl}/case-studies/${study.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const related = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 3);

  return (
    <ArticleShell
      backHref="/case-studies"
      backLabel="All case studies"
      kicker={study.kicker}
      title={study.title}
      meta={`${study.year} · ${study.role} · ${study.clientType}`}
      aside={
        <>
          <div>
            <EditorialKicker className="mb-3 text-muted-foreground">
              Stack
            </EditorialKicker>
            <ul className="space-y-1.5">
              {study.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          {(study.liveUrl || study.githubUrl) && (
            <div>
              <EditorialKicker className="mb-3 text-muted-foreground">
                Links
              </EditorialKicker>
              <ul className="space-y-2">
                {study.liveUrl ? (
                  <li>
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-brand underline-offset-4 hover:underline"
                    >
                      Live site
                    </a>
                  </li>
                ) : null}
                {study.githubUrl ? (
                  <li>
                    <a
                      href={study.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-brand underline-offset-4 hover:underline"
                    >
                      GitHub
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          )}
          <div>
            <EditorialKicker className="mb-3 text-muted-foreground">
              More case studies
            </EditorialKicker>
            <ul className="space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/case-studies/${item.slug}`}
                    className="font-display text-base text-foreground transition-colors hover:text-accent-brand"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      }
    >
      <section className="space-y-3">
        <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
          Problem
        </h2>
        <p>{study.problem}</p>
      </section>

      <EditorialHairline className="my-8" />

      <section className="space-y-3">
        <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
          Approach
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          {study.approach.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <EditorialHairline className="my-8" />

      <section className="space-y-3">
        <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
          Outcomes
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          {study.outcomes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <EditorialHairline className="my-8" />

      {study.body.map((paragraph) => (
        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
      ))}
    </ArticleShell>
  );
}
