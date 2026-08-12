"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "@/lib/admin/format";
import type { ContactSubmission } from "@/lib/admin/types";
import {
  AdminEmptyState,
  AdminTable,
  StatusBadge,
} from "@/components/admin/admin-shell";
import { BulkToolbar, RowCheckbox, SelectAllCheckbox } from "@/components/admin/bulk-toolbar";
import { ConfirmModal } from "@/components/admin/confirm-modal";
import { useRowSelection } from "@/components/admin/use-row-selection";

type PendingDelete =
  | { type: "single"; id: string; title: string }
  | { type: "bulk"; ids: string[] }
  | null;

export function ContactTable({ items }: { items: ContactSubmission[] }) {
  const router = useRouter();
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const selection = useRowSelection(ids);
  const [pending, setPending] = useState<PendingDelete>(null);
  const [loading, setLoading] = useState(false);

  const deleteIds = async (targetIds: string[]) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: targetIds }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Delete failed.");

      toast.success(
        targetIds.length === 1
          ? "Submission deleted."
          : `${targetIds.length} submissions deleted.`
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
        noun="submission"
      />

      <AdminTable>
        <table className="min-w-[52rem] w-full text-left text-sm">
          <thead className="border-b border-border/60 bg-background/40">
            <tr>
              <th className="w-10 px-4 py-3 sm:px-6">
                <SelectAllCheckbox
                  checked={selection.allSelected}
                  indeterminate={selection.someSelected}
                  onChange={selection.toggleAll}
                  label="Select all submissions"
                />
              </th>
              <th className="px-4 py-3 font-bold sm:px-6">From</th>
              <th className="px-4 py-3 font-bold sm:px-6">Subject</th>
              <th className="px-4 py-3 font-bold sm:px-6">Status</th>
              <th className="px-4 py-3 font-bold sm:px-6">Received</th>
              <th className="px-4 py-3 font-bold sm:px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border/40 hover:bg-background/40"
              >
                <td className="px-4 py-4 sm:px-6">
                  <RowCheckbox
                    checked={selection.isSelected(item.id)}
                    onChange={() => selection.toggleOne(item.id)}
                    label={`Select ${item.subject}`}
                  />
                </td>
                <td className="px-4 py-4 sm:px-6">
                  <Link
                    href={`/admin/submissions/${item.id}`}
                    className="font-bold hover:text-accent-brand"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{item.email}</p>
                </td>
                <td className="px-4 py-4 sm:px-6">
                  <Link
                    href={`/admin/submissions/${item.id}`}
                    className="font-semibold hover:text-accent-brand"
                  >
                    {item.subject}
                  </Link>
                </td>
                <td className="px-4 py-4 sm:px-6">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-4 py-4 text-xs text-muted-foreground sm:px-6">
                  {formatDistanceToNow(item.created_at)}
                </td>
                <td className="px-4 py-4 sm:px-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/admin/submissions/${item.id}`}
                      className="inline-flex h-8 items-center gap-1 rounded-md border border-border px-2.5 text-xs font-bold hover:bg-foreground/5"
                    >
                      <Eye className="h-3.5 w-3.5" strokeWidth={2} />
                      Open
                    </Link>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        setPending({
                          type: "single",
                          id: item.id,
                          title: item.subject,
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
              title="No submissions yet"
              body="Contact form messages will appear here."
            />
          </div>
        ) : null}
      </AdminTable>

      <ConfirmModal
        open={pending !== null}
        title={
          pending?.type === "bulk"
            ? `Delete ${pending.ids.length} submissions?`
            : "Delete this submission?"
        }
        description={
          pending?.type === "bulk"
            ? `This permanently removes ${pending.ids.length} selected messages. This cannot be undone.`
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
