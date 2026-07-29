import { CellState, GridCell } from "@/components/GridCell";
import { Colors } from "@/constants/Colors";
import { useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const BOARD_SIZE = SCREEN_WIDTH - 32;

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
        isThickRight: (col + 1) % 5 === 0 && col < gridSize - 1,
        isThickBottom: (row + 1) % 5 === 0 && row < gridSize - 1,
        isLastRow: row === gridSize - 1,
        isLastCol: col === gridSize - 1,
      }))
    );
  }, [gridSize]);

  return (
    <View style={[styles.board, { width: BOARD_SIZE, height: BOARD_SIZE }]}>
      {gridRows.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((cell) => (
            <GridCell
              key={cell.id}
              id={cell.id}
              state={cellStates.get(cell.id) ?? "blank"}
              cellSize={cellSize}
              isThickRight={cell.isThickRight}
              isThickBottom={cell.isThickBottom}
              isLastRow={cell.isLastRow}
              isLastCol={cell.isLastCol}
              onSelect={onCellPress}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    borderWidth: 3,
    borderColor: Colors.borderThick,
    backgroundColor: Colors.surface,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
});