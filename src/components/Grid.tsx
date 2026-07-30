import { CellState, GridCell } from "@/components/GridCell";
import { Colors } from "@/constants/Colors";
import { useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const BOARD_SIZE = SCREEN_WIDTH - 32;
const BLOCK_SIZE = 5;

interface GridProps {
  gridSize: number;
  cellStates: Map<string, CellState>;
  onCellPress: (id: string) => void;
}

export function Grid({ gridSize, cellStates, onCellPress }: GridProps) {
  const cellSize = BOARD_SIZE / gridSize;

  const gridRows = useMemo(() => {
    return Array.from({ length: gridSize }, (_, row) =>
      Array.from({ length: gridSize }, (_, col) => ({
        id: `${row},${col}`,
        row,
        col,
        isThickRight: (col + 1) % BLOCK_SIZE === 0 && col < gridSize - 1,
        isThickBottom: (row + 1) % BLOCK_SIZE === 0 && row < gridSize - 1,
        isLastRow: row === gridSize - 1,
        isLastCol: col === gridSize - 1,
      })),
    );
  }, [gridSize]);

  const blockRows = useMemo(() => {
    return Array.from({ length: Math.ceil(gridSize / BLOCK_SIZE) }, (_, i) =>
      gridRows.slice(i * BLOCK_SIZE, (i + 1) * BLOCK_SIZE),
    );
  }, [gridRows, gridSize]);

  return (
    <View style={[styles.board, { width: BOARD_SIZE, height: BOARD_SIZE }]}>
      {blockRows.map((blockRowGroup, blockRowIndex) => (
        <View key={`block-row-${blockRowIndex}`} style={styles.blockRowBand}>
          {blockRows.map((_, blockColIndex) => {
            const colStart = blockColIndex * BLOCK_SIZE;
            return (
              <View
                key={`block-${blockRowIndex}-${blockColIndex}`}
                style={styles.block}
              >
                {blockRowGroup.map((row, rowIndex) => (
                  <View key={`row-${rowIndex}`} style={styles.row}>
                    {row.slice(colStart, colStart + BLOCK_SIZE).map((cell) => (
                      <GridCell
                        key={cell.id}
                        id={cell.id}
                        state={cellStates.get(cell.id) ?? "blank"}
                        cellSize={cellSize}
                        onSelect={onCellPress}
                      />
                    ))}
                  </View>
                ))}
              </View>
            );
          })}
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
