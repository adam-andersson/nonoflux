import { BOARD_CONFIG } from "@/constants/board";
import { useBoardContext } from "@/store/board-context";
import { useMemo } from "react";

const { GRID_SIZE } = BOARD_CONFIG;

export function useCol(col: number) {
  const { cellStates } = useBoardContext();

  return useMemo(() => {
    const colKeys = Array.from(
      { length: GRID_SIZE },
      (_, row) => `${row},${col}`,
    );
    const colVals = colKeys.map((key) => cellStates[key] ?? null);

    return { k: colKeys, v: colVals };
  }, [col, cellStates]);
}
