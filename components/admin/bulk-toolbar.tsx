"use client";

import { Trash2 } from "lucide-react";

type BulkToolbarProps = {
  selectedCount: number;
  totalCount: number;
  onClear: () => void;
  onBulkDelete: () => void;
  disabled?: boolean;
  noun?: string;
};

export function BulkToolbar({
  selectedCount,
  totalCount,
  onClear,
  onBulkDelete,
  disabled = false,
  noun = "item",
}: BulkToolbarProps) {
  if (selectedCount === 0) return null;

  const label = selectedCount === 1 ? noun : `${noun}s`;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-accent-brand/30 bg-accent-brand/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-bold">
        {selectedCount} of {totalCount} {label} selected
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={disabled}
          onClick={onClear}
          className="inline-flex h-9 items-center rounded-md border border-border px-3 text-xs font-bold disabled:opacity-50"
        >
          Clear selection
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={onBulkDelete}
          className="inline-flex h-9 items-center gap-1.5 rounded-md bg-destructive px-3 text-xs font-bold text-white disabled:opacity-50"
        >
          <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
          Delete selected
        </button>
      </div>
    </div>
  );
}

type SelectAllCheckboxProps = {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  label?: string;
};

export function SelectAllCheckbox({
  checked,
  indeterminate = false,
  onChange,
  label = "Select all",
}: SelectAllCheckboxProps) {
  return (
    <input
      type="checkbox"
      aria-label={label}
      checked={checked}
      ref={(node) => {
        if (node) node.indeterminate = indeterminate;
      }}
      onChange={onChange}
      className="h-4 w-4 rounded border-border accent-[var(--accent-brand)]"
    />
  );
}

type RowCheckboxProps = {
  checked: boolean;
  onChange: () => void;
  label: string;
};

export function RowCheckbox({ checked, onChange, label }: RowCheckboxProps) {
  return (
    <input
      type="checkbox"
      aria-label={label}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-border accent-[var(--accent-brand)]"
    />
  );
}
