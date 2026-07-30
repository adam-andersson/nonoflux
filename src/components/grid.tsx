import { CellState } from "@/components/grid-cell";
import { GridProvider } from "@/store/grid-context";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Board } from "./board";
import { LeftClues } from "./left-clues";
import { TopClues } from "./top-clues";

const BLOCK_SIZE = 5;
const CLUE_RATIO = 0.2;
const THICK_GAP = 3;
const THIN_GAP = 1;
const MARGIN_OFFSET = 3;

interface GridProps {
  gridSize: number;
  gridDimension: number;
  cellStates: Record<string, CellState>;
  onCellPress: (id: string) => void;
}

export function Grid({
  gridSize,
  gridDimension,
  cellStates,
  onCellPress,
}: GridProps) {
  const numBlocks = Math.ceil(gridSize / BLOCK_SIZE);

  const { boardDimension, clueAreaDepth, cellContentSize } = useMemo(() => {
    const outerThickBorders = THICK_GAP * 2;
    const innerThickBorders = (numBlocks - 1) * THICK_GAP;
    const innerBorders = (gridSize - numBlocks) * THIN_GAP;
    const totalBoardBorders =
      outerThickBorders + innerThickBorders + innerBorders;

    const availableSpace = gridDimension - MARGIN_OFFSET;

    const totalCellUnits = gridSize * (1 + CLUE_RATIO);
    const singleCellSize =
      (availableSpace - totalBoardBorders) / totalCellUnits;

    const boardDimension = gridSize * singleCellSize + totalBoardBorders;
    const clueAreaDepth = gridSize * singleCellSize * CLUE_RATIO;
    const cellContentSize = Math.round(singleCellSize * 0.7);

    return {
      singleCellSize,
      boardDimension,
      clueAreaDepth,
      cellContentSize,
    };
  }, [gridDimension, gridSize, numBlocks]);

  const gridMatrix = useMemo(() => {
    return Array.from({ length: gridSize }, (_, row) =>
      Array.from({ length: gridSize }, (_, col) => `${row},${col}`),
    );
  }, [gridSize]);

  const blocks = useMemo(() => {
    const blockArray = [];
    for (let bRow = 0; bRow < numBlocks; bRow++) {
      const rowGroup = [];
      for (let bCol = 0; bCol < numBlocks; bCol++) {
        const blockCells = [];
        for (let r = 0; r < BLOCK_SIZE; r++) {
          const actualRow = bRow * BLOCK_SIZE + r;
          if (actualRow >= gridSize) break;

          const rowCells = [];
          for (let c = 0; c < BLOCK_SIZE; c++) {
            const actualCol = bCol * BLOCK_SIZE + c;
            if (actualCol >= gridSize) break;
            rowCells.push(gridMatrix[actualRow][actualCol]);
          }
          blockCells.push(rowCells);
        }
        rowGroup.push(blockCells);
      }
      blockArray.push(rowGroup);
    }
    return blockArray;
  }, [gridMatrix, gridSize, numBlocks]);

  const contextValue = {
    gridSize,
    blocks,
    boardDimension,
    clueAreaDepth,
    cellContentSize,
    cellStates,
    onCellPress,
    THICK_GAP,
    THIN_GAP,
    MARGIN_OFFSET,
  };

  return (
    <GridProvider value={contextValue}>
      <View style={[styles.container, { width: gridDimension }]}>
        <View style={styles.horizontalRow}>
          <TopClues />
        </View>

        <View style={styles.horizontalRow}>
          <LeftClues />
          <Board />
        </View>
      </View>
    </GridProvider>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "flex-end" },
  horizontalRow: { flexDirection: "row" },
});
