import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { formatDateTime } from "@/lib/admin/format";
import { getSubmission, updateSubmissionStatus } from "@/lib/admin/queries";
import { StatusBadge } from "@/components/admin/admin-shell";
import { SubmissionActions } from "@/components/admin/submission-actions";
import { siteConfig } from "@/lib/site-content";

export default async function AdminSubmissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let submission;
  try {
    submission = await getSubmission(id);
  } catch {
    notFound();
  }

  if (submission.status === "new") {
    await updateSubmissionStatus(id, "read");
    submission.status = "read";
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/admin/contact"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        Back to contact inbox
      </Link>

      <div className="glass-panel glass-panel-strong rounded-xl p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <StatusBadge status={submission.status} />
            <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              {submission.subject}
            </h1>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              Received {formatDateTime(submission.created_at)}
            </p>
          </div>
          <SubmissionActions id={submission.id} currentStatus={submission.status} />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border/60 bg-background/40 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Name</p>
            <p className="mt-2 font-bold">{submission.name}</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-background/40 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Email</p>
            <a
              href={`mailto:${submission.email}?subject=${encodeURIComponent(`Re: ${submission.subject}`)}`}
              className="mt-2 inline-flex items-center gap-2 font-bold text-accent-brand hover:underline"
            >
              <Mail className="h-4 w-4" strokeWidth={1.75} />
              {submission.email}
            </a>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-border/60 bg-background/40 p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Message</p>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed font-medium">{submission.message}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-border/60 pt-6">
          <a
            href={`mailto:${submission.email}?subject=${encodeURIComponent(`Re: ${submission.subject}`)}`}
            className="inline-flex h-11 items-center rounded-md bg-[var(--accent-brand)] px-5 text-sm font-bold text-white dark:text-[#06110c]"
          >
            Reply by email
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-bold"
          >
            <Phone className="h-4 w-4" strokeWidth={1.75} />
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
