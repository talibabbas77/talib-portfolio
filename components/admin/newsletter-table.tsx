"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { StatusBadge, AdminTable } from "@/components/admin/admin-shell";
import type { NewsletterSubscriberRow } from "@/lib/cms/types";

export function NewsletterTable({ items }: { items: NewsletterSubscriberRow[] }) {
  const router = useRouter();

  const updateStatus = async (id: string, status: "active" | "unsubscribed") => {
    const response = await fetch(`/api/admin/newsletter/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      toast.error("Could not update subscriber.");
      return;
    }
    toast.success("Subscriber updated.");
    router.refresh();
  };

  const remove = async (id: string) => {
    const response = await fetch(`/api/admin/newsletter/${id}`, { method: "DELETE" });
    if (!response.ok) {
      toast.error("Could not delete subscriber.");
      return;
    }
    toast.success("Subscriber removed.");
    router.refresh();
  };

  return (
    <AdminTable>
      <table className="min-w-[40rem] w-full text-left text-sm">
        <thead className="border-b border-border/60 bg-background/40">
          <tr>
            <th className="px-4 py-3 font-bold">Email</th>
            <th className="px-4 py-3 font-bold">Status</th>
            <th className="px-4 py-3 font-bold">Source</th>
            <th className="px-4 py-3 font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-border/40">
              <td className="px-4 py-4 font-semibold">{item.email}</td>
              <td className="px-4 py-4"><StatusBadge status={item.status} /></td>
              <td className="px-4 py-4 text-muted-foreground">{item.source}</td>
              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  {item.status === "active" ? (
                    <button type="button" onClick={() => updateStatus(item.id, "unsubscribed")} className="text-xs font-bold">
                      Unsubscribe
                    </button>
                  ) : (
                    <button type="button" onClick={() => updateStatus(item.id, "active")} className="text-xs font-bold">
                      Reactivate
                    </button>
                  )}
                  <button type="button" onClick={() => remove(item.id)} className="text-xs font-bold text-destructive">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminTable>
  );
}
