import { BOARD_CONFIG } from "@/constants/board";
import { useGridContext } from "@/store/grid-context";

export function useRow(row: number) {
  const { blocks, cellStates } = useGridContext();
  const { BLOCK_SIZE } = BOARD_CONFIG;

  const blockWithRow = Math.floor(row / BLOCK_SIZE);
  const subRow = row % BLOCK_SIZE;

  const rowKeys = blocks[blockWithRow].flatMap((blockCol) => blockCol[subRow]);
  const rowVals = rowKeys.map((r) => cellStates[r]);

  return { k: rowKeys, v: rowVals };
}
