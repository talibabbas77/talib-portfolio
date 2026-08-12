import Link from "next/link";
import { CaseStudiesTable } from "@/components/admin/case-studies-table";
import { getAllCaseStudiesAdmin } from "@/lib/cms/case-studies";

export default async function AdminCaseStudiesPage() {
  let items: Awaited<ReturnType<typeof getAllCaseStudiesAdmin>> = [];
  try {
    items = await getAllCaseStudiesAdmin();
  } catch {
    items = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold">Case studies</h1>
          <p className="text-sm text-muted-foreground">
            Manage, edit, and delete portfolio case studies.
          </p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-[var(--accent-brand)] px-4 text-sm font-bold text-white dark:text-[#06110c]"
        >
          New case study
        </Link>
      </div>

      <CaseStudiesTable items={items} />
    </div>
  );
}
