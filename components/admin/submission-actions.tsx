"use client";

import { useTransition } from "react";
import { updateStatusAction } from "@/app/admin/actions";
import type { SubmissionStatus } from "@/lib/admin/types";
import { StatusBadge } from "@/components/admin/admin-shell";

const ACTIONS: { label: string; status: SubmissionStatus }[] = [
  { label: "Mark read", status: "read" },
  { label: "Mark replied", status: "replied" },
  { label: "Archive", status: "archived" },
  { label: "Mark new", status: "new" },
];

export function SubmissionActions({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: SubmissionStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <StatusBadge status={currentStatus} />
      {ACTIONS.filter((action) => action.status !== currentStatus).map(
        (action) => (
          <button
            key={action.status}
            type="button"
            disabled={pending}
            onClick={() =>
              startTransition(() => updateStatusAction(id, action.status))
            }
            className="inline-flex h-9 items-center rounded-md border border-border px-3 text-xs font-bold disabled:opacity-50"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
