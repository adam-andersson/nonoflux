import { BOARD_CONFIG } from "@/constants/board";
import { useGridContext } from "@/store/grid-context";
import { useMemo } from "react";

const { GRID_SIZE } = BOARD_CONFIG;

export function useCol(col: number) {
  const { cellStates } = useGridContext();

  return useMemo(() => {
    const colKeys = Array.from(
      { length: GRID_SIZE },
      (_, row) => `${row},${col}`,
    );
    const colVals = colKeys.map((key) => cellStates[key] ?? null);

    return { k: colKeys, v: colVals };
  }, [col, cellStates]);
}
