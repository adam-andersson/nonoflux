import { CellState, GridCell } from "@/components/grid-cell";
import { Colors } from "@/constants/Colors";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

const BLOCK_SIZE = 5;
const CLUE_RATIO = 0.2; // Ratio of clue depth relative to the main board width

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

  return (
    <View style={[styles.container, { width: gridDimension }]}>
      <View style={styles.horizontalRow}>
        <View
          style={[
            styles.topCluesContainer,
            { width: boardDimension, height: clueAreaDepth },
          ]}
        >
          {blocks[0]?.map((block, bColIdx) => {
            const colCount = block[0]?.length ?? 1;
            return (
              <View
                key={`top-clue-block-${bColIdx}`}
                style={[styles.topClueBlock, { flex: colCount }]}
              >
                {block[0]?.map((_, colIdx) => (
                  <View
                    key={`top-clue-cell-${bColIdx}-${colIdx}`}
                    style={styles.topClueCell}
                  />
                ))}
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.horizontalRow}>
        <View
          style={[
            styles.leftCluesContainer,
            { width: clueAreaDepth, height: boardDimension },
          ]}
        >
          {blocks.map((blockRow, bRowIdx) => {
            const rowCount = blockRow[0]?.length ?? 1;
            return (
              <View
                key={`left-clue-block-${bRowIdx}`}
                style={[styles.leftClueBlock, { flex: rowCount }]}
              >
                {blockRow[0]?.map((_, rIdx) => (
                  <View
                    key={`left-clue-cell-${bRowIdx}-${rIdx}`}
                    style={styles.leftClueCell}
                  />
                ))}
              </View>
            );
          })}
        </View>

        <View
          style={[
            styles.board,
            { width: boardDimension, height: boardDimension },
          ]}
        >
          {blocks.map((blockRow, bRowIdx) => {
            const rowCount = blockRow[0]?.length ?? 1;
            return (
              <View
                key={`block-row-${bRowIdx}`}
                style={[styles.blockRowBand, { flex: rowCount }]}
              >
                {blockRow.map((block, bColIdx) => {
                  const colCount = block[0]?.length ?? 1;
                  return (
                    <View
                      key={`block-${bRowIdx}-${bColIdx}`}
                      style={[styles.block, { flex: colCount }]}
                    >
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
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
  },
  horizontalRow: {
    flexDirection: "row",
  },

  topCluesContainer: {
    flexDirection: "row",
    gap: THICK_GAP,
    paddingHorizontal: THICK_GAP,
    marginBottom: MARGIN_OFFSET,
  },
  topClueBlock: {
    flexDirection: "row",
    gap: THIN_GAP,
  },
  topClueCell: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "lightgray",
  },

  leftCluesContainer: {
    flexDirection: "column",
    gap: THICK_GAP,
    paddingVertical: THICK_GAP,
    marginRight: MARGIN_OFFSET,
  },
  leftClueBlock: {
    flexDirection: "column",
    gap: THIN_GAP,
  },
  leftClueCell: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "lightgray",
  },

  board: {
    borderWidth: THICK_GAP,
    borderColor: Colors.borderThick, // outer thick borders
    backgroundColor: Colors.borderThick, // inner thick borders
    gap: THICK_GAP,
  },
  blockRowBand: {
    flexDirection: "row",
    gap: THICK_GAP,
  },
  block: {
    backgroundColor: Colors.border, // inner thin borders
    gap: THIN_GAP,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    gap: THIN_GAP,
  },
});
