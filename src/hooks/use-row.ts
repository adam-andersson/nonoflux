import { BOARD_CONFIG } from "@/constants/board";
import { useGridContext } from "@/store/grid-context";
import { useMemo } from "react";

const { GRID_SIZE } = BOARD_CONFIG;

export function useRow(row: number) {
  const { cellStates } = useGridContext();

  return useMemo(() => {
    const rowKeys = Array.from(
      { length: GRID_SIZE },
      (_, col) => `${row},${col}`,
    );
    const rowVals = rowKeys.map((key) => cellStates[key] ?? null);

    return { k: rowKeys, v: rowVals };
  }, [row, cellStates]);
}
