import Link from "next/link";
import {
  getSubmissionStats,
  getSubmissions,
} from "@/lib/admin/queries";
import { getAllBlogPostsAdmin } from "@/lib/cms/blog";
import { getAllCaseStudiesAdmin } from "@/lib/cms/case-studies";
import { getNewsletterSubscribersAdmin } from "@/lib/cms/newsletter";
import { AdminStatCard, SetupNotice } from "@/components/admin/admin-shell";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  if (!isSupabaseConfigured()) {
    return <SetupNotice />;
  }

  let contactStats = { total: 0, new: 0, thisWeek: 0, read: 0, replied: 0, archived: 0 };
  let blogs = 0;
  let caseStudies = 0;
  let subscribers = 0;
  let recentContacts = 0;

  try {
    const [stats, blogRows, caseRows, newsletterRows, submissions] =
      await Promise.all([
        getSubmissionStats(),
        getAllBlogPostsAdmin(),
        getAllCaseStudiesAdmin(),
        getNewsletterSubscribersAdmin(),
        getSubmissions(5),
      ]);
    contactStats = stats;
    blogs = blogRows.length;
    caseStudies = caseRows.length;
    subscribers = newsletterRows.filter((row) => row.status === "active").length;
    recentContacts = submissions.length;
  } catch {
    return <SetupNotice variant="migration" />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h1>
        <p className="mt-2 text-sm font-medium text-muted-foreground">
          Manage contact, content, and newsletter from one place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="New contact" value={contactStats.new} tone="accent" />
        <AdminStatCard label="Blog posts" value={blogs} />
        <AdminStatCard label="Case studies" value={caseStudies} />
        <AdminStatCard label="Newsletter" value={subscribers} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { href: "/admin/contact", title: "Contact inbox", body: `${contactStats.total} total submissions` },
          { href: "/admin/blog", title: "Blog", body: "Create and publish posts" },
          { href: "/admin/case-studies", title: "Case studies", body: "Manage portfolio write-ups" },
          { href: "/admin/newsletter", title: "Newsletter", body: `${subscribers} active subscribers` },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="glass-panel rounded-xl p-5 transition-colors hover:border-accent-brand/40"
          >
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="mt-2 text-sm font-medium text-muted-foreground">{item.body}</p>
          </Link>
        ))}
      </div>

      {recentContacts === 0 ? null : (
        <p className="text-sm font-medium text-muted-foreground">
          Recent contact activity is available in the Contact section.
        </p>
      )}
    </div>
  );
}
