import { useGridContext } from "@/store/grid-context";
import { useMemo } from "react";

export function useCol(col: number) {
  const { gridSize, cellStates } = useGridContext();

  return useMemo(() => {
    const colKeys = Array.from(
      { length: gridSize },
      (_, row) => `${row},${col}`,
    );
    const colVals = colKeys.map((key) => cellStates[key] ?? null);

    return { k: colKeys, v: colVals };
  }, [gridSize, col, cellStates]);
}
