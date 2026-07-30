import { CellState, GridCell } from "@/components/grid-cell";
import { Colors } from "@/constants/Colors";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

const BLOCK_SIZE = 5;

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

  const [, cellContentSize] = useMemo(() => {
    const outerThickBorders = 3 * 2;
    const innerThickBorders = (numBlocks - 1) * 3;
    const innerBorders = (gridSize - numBlocks) * 1;

    const availableWidth =
      gridDimension - outerThickBorders - innerThickBorders - innerBorders;
    const cellWidth = availableWidth / gridSize;
    const cellContentSize = Math.round(cellWidth * 0.7);
    return [cellWidth, cellContentSize];
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

  return (
    <View style={[styles.board]}>
      {blocks.map((blockRow, bRowIdx) => (
        <View key={`block-row-${bRowIdx}`} style={styles.blockRowBand}>
          {blockRow.map((block, bColIdx) => (
            <View key={`block-${bRowIdx}-${bColIdx}`} style={styles.block}>
              {block.map((row, rIdx) => (
                <View key={`row-${rIdx}`} style={styles.row}>
                  {row.map((cellId) => (
                    <GridCell
                      key={cellId}
                      id={cellId}
                      cellContentSize={cellContentSize}
                      state={cellStates[cellId] ?? "blank"}
                      onSelect={onCellPress}
                    />
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    borderWidth: 3,
    borderColor: Colors.borderThick, // outer thick borders
    backgroundColor: Colors.borderThick, // inner thick borders
    gap: 3,
  },
  blockRowBand: {
    flex: 1,
    flexDirection: "row",
    gap: 3,
  },
  block: {
    flex: 1,
    backgroundColor: Colors.border, // inner thin borders
    gap: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    gap: 1,
  },
});
