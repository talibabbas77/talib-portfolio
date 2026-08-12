"use client";

import { useCallback, useMemo, useState } from "react";

export function useRowSelection(ids: string[]) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const idSet = useMemo(() => new Set(ids), [ids]);

  const selectedIds = useMemo(
    () => [...selected].filter((id) => idSet.has(id)),
    [idSet, selected]
  );

  const selectedCount = selectedIds.length;
  const allSelected = ids.length > 0 && selectedCount === ids.length;
  const someSelected = selectedCount > 0 && !allSelected;

  const toggleOne = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelected((prev) => {
      const visibleSelected = ids.every((id) => prev.has(id));
      if (visibleSelected) return new Set();
      return new Set(ids);
    });
  }, [ids]);

  const clear = useCallback(() => setSelected(new Set()), []);

  const isSelected = useCallback((id: string) => selected.has(id), [selected]);

  return {
    selectedIds,
    selectedCount,
    allSelected,
    someSelected,
    isSelected,
    toggleOne,
    toggleAll,
    clear,
  };
}
