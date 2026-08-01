import { GRID_CONFIG } from "@/constants/grid";
import { useGridContext } from "@/store/grid-context";

export function useRow(row: number) {
  const { blocks, cellStates } = useGridContext();
  const { BLOCK_SIZE } = GRID_CONFIG;

  const blockWithRow = Math.floor(row / BLOCK_SIZE);
  const subRow = row % BLOCK_SIZE;

  const rowKeys = blocks[blockWithRow].flatMap((blockCol) => blockCol[subRow]);
  const rowVals = rowKeys.map((r) => cellStates[r] ?? "blank");

  return { k: rowKeys, v: rowVals };
}
