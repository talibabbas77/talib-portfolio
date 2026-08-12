import Link from "next/link";
import { getAllCaseStudiesAdmin } from "@/lib/cms/case-studies";
import { AdminTable, StatusBadge } from "@/components/admin/admin-shell";

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
          <p className="text-sm text-muted-foreground">Manage portfolio case studies.</p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-[var(--accent-brand)] px-4 text-sm font-bold text-white dark:text-[#06110c]"
        >
          New case study
        </Link>
      </div>

      <AdminTable>
        <table className="min-w-[32rem] w-full text-left text-sm">
          <thead className="border-b border-border/60 bg-background/40">
            <tr>
              <th className="px-4 py-3 font-bold">Title</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3 font-bold">Year</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-border/40 hover:bg-background/40">
                <td className="px-4 py-4">
                  <Link href={`/admin/case-studies/${item.id}`} className="font-bold hover:text-accent-brand">
                    {item.title}
                  </Link>
                </td>
                <td className="px-4 py-4"><StatusBadge status={item.status} /></td>
                <td className="px-4 py-4 text-muted-foreground">{item.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminTable>
    </div>
  );
}
