import { useGridContext } from "@/store/grid-context";
import { useMemo } from "react";

export function useRow(row: number) {
  const { gridSize, cellStates } = useGridContext();

  return useMemo(() => {
    const rowKeys = Array.from(
      { length: gridSize },
      (_, col) => `${row},${col}`,
    );
    const rowVals = rowKeys.map((key) => cellStates[key] ?? null);

    return { k: rowKeys, v: rowVals };
  }, [gridSize, row, cellStates]);
}
