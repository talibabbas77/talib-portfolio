import { NewsletterTable } from "@/components/admin/newsletter-table";
import { getNewsletterSubscribersAdmin } from "@/lib/cms/newsletter";

export default async function AdminNewsletterPage() {
  let items: Awaited<ReturnType<typeof getNewsletterSubscribersAdmin>> = [];
  try {
    items = await getNewsletterSubscribersAdmin();
  } catch {
    items = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Newsletter</h1>
        <p className="text-sm text-muted-foreground">
          Subscribers collected from the site newsletter form.
        </p>
      </div>
      <NewsletterTable items={items} />
    </div>
  );
}
