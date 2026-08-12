"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminEmptyState, AdminTable, StatusBadge } from "@/components/admin/admin-shell";
import { BulkToolbar, RowCheckbox, SelectAllCheckbox } from "@/components/admin/bulk-toolbar";
import { ConfirmModal } from "@/components/admin/confirm-modal";
import { useRowSelection } from "@/components/admin/use-row-selection";
import type { BlogPostRow } from "@/lib/cms/types";

type PendingDelete =
  | { type: "single"; id: string; title: string }
  | { type: "bulk"; ids: string[] }
  | null;

export function BlogTable({ items }: { items: BlogPostRow[] }) {
  const router = useRouter();
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const selection = useRowSelection(ids);
  const [pending, setPending] = useState<PendingDelete>(null);
  const [loading, setLoading] = useState(false);

  const deleteIds = async (targetIds: string[]) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: targetIds }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Delete failed.");

      toast.success(
        targetIds.length === 1
          ? "Post deleted."
          : `${targetIds.length} posts deleted.`
      );
      selection.clear();
      setPending(null);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <BulkToolbar
        selectedCount={selection.selectedCount}
        totalCount={items.length}
        onClear={selection.clear}
        onBulkDelete={() =>
          setPending({ type: "bulk", ids: selection.selectedIds })
        }
        disabled={loading}
        noun="post"
      />

      <AdminTable>
        <table className="min-w-[42rem] w-full text-left text-sm">
          <thead className="border-b border-border/60 bg-background/40">
            <tr>
              <th className="w-10 px-4 py-3">
                <SelectAllCheckbox
                  checked={selection.allSelected}
                  indeterminate={selection.someSelected}
                  onChange={selection.toggleAll}
                  label="Select all posts"
                />
              </th>
              <th className="px-4 py-3 font-bold">Title</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3 font-bold">Updated</th>
              <th className="px-4 py-3 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border/40 hover:bg-background/40"
              >
                <td className="px-4 py-4">
                  <RowCheckbox
                    checked={selection.isSelected(item.id)}
                    onChange={() => selection.toggleOne(item.id)}
                    label={`Select ${item.title}`}
                  />
                </td>
                <td className="px-4 py-4">
                  <Link
                    href={`/admin/blog/${item.id}`}
                    className="font-bold hover:text-accent-brand"
                  >
                    {item.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">/{item.slug}</p>
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-4 py-4 text-xs text-muted-foreground">
                  {item.updated_at.slice(0, 10)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/admin/blog/${item.id}`}
                      className="inline-flex h-8 items-center gap-1 rounded-md border border-border px-2.5 text-xs font-bold hover:bg-foreground/5"
                    >
                      <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
                      Edit
                    </Link>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        setPending({
                          type: "single",
                          id: item.id,
                          title: item.title,
                        })
                      }
                      className="inline-flex h-8 items-center gap-1 rounded-md border border-destructive/30 px-2.5 text-xs font-bold text-destructive hover:bg-destructive/10 disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 ? (
          <div className="p-8">
            <AdminEmptyState
              title="No blog posts yet"
              body="Create a post to publish on the public blog."
            />
          </div>
        ) : null}
      </AdminTable>

      <ConfirmModal
        open={pending !== null}
        title={
          pending?.type === "bulk"
            ? `Delete ${pending.ids.length} posts?`
            : "Delete this post?"
        }
        description={
          pending?.type === "bulk"
            ? `This permanently removes ${pending.ids.length} selected posts. This cannot be undone.`
            : `“${pending?.type === "single" ? pending.title : ""}” will be permanently deleted.`
        }
        confirmLabel="Delete"
        loading={loading}
        onCancel={() => {
          if (!loading) setPending(null);
        }}
        onConfirm={() => {
          if (!pending) return;
          if (pending.type === "bulk") deleteIds(pending.ids);
          else deleteIds([pending.id]);
        }}
      />
    </div>
  );
}
