"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateStatusAction } from "@/app/admin/actions";
import type { SubmissionStatus } from "@/lib/admin/types";
import { StatusBadge } from "@/components/admin/admin-shell";
import { ConfirmModal } from "@/components/admin/confirm-modal";

const ACTIONS: { label: string; status: SubmissionStatus }[] = [
  { label: "Mark read", status: "read" },
  { label: "Mark replied", status: "replied" },
  { label: "Archive", status: "archived" },
  { label: "Mark new", status: "new" },
];

export function SubmissionActions({
  id,
  currentStatus,
  subject,
}: {
  id: string;
  currentStatus: SubmissionStatus;
  subject: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const deleteSubmission = async () => {
    setDeleting(true);
    try {
      const response = await fetch("/api/admin/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [id] }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Delete failed.");

      toast.success("Submission deleted.");
      setConfirmOpen(false);
      router.push("/admin/contact");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed.");
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={currentStatus} />
        {ACTIONS.filter((action) => action.status !== currentStatus).map(
          (action) => (
            <button
              key={action.status}
              type="button"
              disabled={pending || deleting}
              onClick={() =>
                startTransition(() => updateStatusAction(id, action.status))
              }
              className="inline-flex h-9 items-center rounded-md border border-border px-3 text-xs font-bold disabled:opacity-50"
            >
              {action.label}
            </button>
          )
        )}
        <button
          type="button"
          disabled={pending || deleting}
          onClick={() => setConfirmOpen(true)}
          className="inline-flex h-9 items-center rounded-md border border-destructive/30 px-3 text-xs font-bold text-destructive hover:bg-destructive/10 disabled:opacity-50"
        >
          Delete
        </button>
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Delete this submission?"
        description={`“${subject}” will be permanently deleted. This cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
        onCancel={() => {
          if (!deleting) setConfirmOpen(false);
        }}
        onConfirm={deleteSubmission}
      />
    </>
  );
}
