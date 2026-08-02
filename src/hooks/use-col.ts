import { BOARD_CONFIG } from "@/constants/board";
import { useGridContext } from "@/store/grid-context";

export function useCol(col: number) {
  const { blocks, cellStates } = useGridContext();
  const { BLOCK_SIZE } = BOARD_CONFIG;

  const blockWithCol = Math.floor(col / BLOCK_SIZE);
  const subCol = col % BLOCK_SIZE;

  const colKeys = blocks.flatMap((blockRow) => {
    const block = blockRow[blockWithCol];
    return block.map((blockSubRow) => blockSubRow[subCol]);
  });

  const colVals = colKeys.map((r) => cellStates[r]);

  return { k: colKeys, v: colVals };
}
