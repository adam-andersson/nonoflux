import { BOARD_CONFIG } from "@/constants/board";
import { useMemo } from "react";

const { BLOCK_SIZE, CLUE_RATIO, THICK_GAP, THIN_GAP, MARGIN_OFFSET } =
  BOARD_CONFIG;

export function useBoardDimensions(gridSize: number, boardDimension: number) {
  return useMemo(() => {
    const numBlocks = Math.ceil(gridSize / BLOCK_SIZE);

    const outerThickBorders = THICK_GAP * 2;
    const innerThickBorders = (numBlocks - 1) * THICK_GAP;
    const innerBorders = (gridSize - numBlocks) * THIN_GAP;
    const totalBoardBorders =
      outerThickBorders + innerThickBorders + innerBorders;

    const availableSpace = boardDimension - MARGIN_OFFSET;
    const totalCellUnits = gridSize * (1 + CLUE_RATIO);
    const singleCellSize =
      (availableSpace - totalBoardBorders) / totalCellUnits;

    const gridDimension = gridSize * singleCellSize + totalBoardBorders;
    const clueAreaDepth = gridSize * singleCellSize * CLUE_RATIO;
    const cellContentSize = Math.round(singleCellSize * 0.7);

    return {
      gridDimension,
      clueAreaDepth,
      cellContentSize,
      singleCellSize,
    };
  }, [boardDimension, gridSize]);
}
