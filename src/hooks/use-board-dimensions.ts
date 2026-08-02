import { BOARD_CONFIG } from "@/constants/board";
import { useMemo } from "react";

const {
  GRID_SIZE,
  BLOCK_SIZE,
  CLUE_RATIO,
  THICK_GAP,
  THIN_GAP,
  MARGIN_OFFSET,
} = BOARD_CONFIG;

export function useBoardDimensions(boardDimension: number) {
  return useMemo(() => {
    const numBlocks = Math.ceil(GRID_SIZE / BLOCK_SIZE);

    const outerThickBorders = THICK_GAP * 2;
    const innerThickBorders = (numBlocks - 1) * THICK_GAP;
    const innerBorders = (GRID_SIZE - numBlocks) * THIN_GAP;
    const totalBoardBorders =
      outerThickBorders + innerThickBorders + innerBorders;

    const availableSpace = boardDimension - MARGIN_OFFSET;
    const totalCellUnits = GRID_SIZE * (1 + CLUE_RATIO);
    const singleCellSize =
      (availableSpace - totalBoardBorders) / totalCellUnits;

    const gridDimension = GRID_SIZE * singleCellSize + totalBoardBorders;
    const clueAreaDepth = GRID_SIZE * singleCellSize * CLUE_RATIO;
    const cellContentSize = Math.round(singleCellSize * 0.7);

    return {
      gridDimension,
      clueAreaDepth,
      cellContentSize,
      singleCellSize,
    };
  }, [boardDimension]);
}
