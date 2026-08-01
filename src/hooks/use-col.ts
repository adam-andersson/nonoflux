import { GRID_CONFIG } from "@/constants/grid";
import { useGridContext } from "@/store/grid-context";

export function useCol(col: number) {
  const { blocks, cellStates } = useGridContext();
  const { BLOCK_SIZE } = GRID_CONFIG;

  const blockWithCol = Math.floor(col / BLOCK_SIZE);
  const subCol = col % BLOCK_SIZE;

  const colKeys = blocks.flatMap((blockRow) => {
    const block = blockRow[blockWithCol];
    return block.map((blockSubRow) => blockSubRow[subCol]);
  });

  const colVals = colKeys.map((r) => cellStates[r] ?? "blank");

  return { k: colKeys, v: colVals };
}
