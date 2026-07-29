import { Colors } from "@/constants/Colors";
import { useCallback, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { GridCell, type CellState } from "./GridCell";

const GRID_SIZE = 10;

const SCREEN_WIDTH = Dimensions.get("window").width;
const BOARD_SIZE = SCREEN_WIDTH - 32;
const CELL_SIZE = BOARD_SIZE / GRID_SIZE;

export interface CellData {
  id: string;
  row: number;
  col: number;
  isThickRight: boolean;
  isThickBottom: boolean;
  isLastRow: boolean;
  isLastCol: boolean;
}

const ROWS: CellData[][] = Array.from({ length: GRID_SIZE }, (_, row) =>
  Array.from({ length: GRID_SIZE }, (_, col) => ({
    id: `${row},${col}`,
    row,
    col,
    isThickRight: (col + 1) % 5 === 0 && col < GRID_SIZE - 1,
    isThickBottom: (row + 1) % 5 === 0 && row < GRID_SIZE - 1,
    isLastRow: row === GRID_SIZE - 1,
    isLastCol: col === GRID_SIZE - 1,
  }))
);

export default function Grid() {
  const [cellStates, setCellStates] = useState<Map<string, CellState>>(new Map());

  const handleCellPress = useCallback((id: string) => {
    setCellStates((prev) => {
      const currentState = prev.get(id) ?? "blank";

      if (currentState !== "blank") {
        return prev;
      }

      const next = new Map(prev);
      next.set(id, "active");
      return next;
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {ROWS.map((rowCells, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {rowCells.map((cell) => (
              <GridCell
                key={cell.id}
                id={cell.id}
                state={cellStates.get(cell.id) ?? "blank"}
                cellSize={CELL_SIZE}
                isThickRight={cell.isThickRight}
                isThickBottom={cell.isThickBottom}
                isLastRow={cell.isLastRow}
                isLastCol={cell.isLastCol}
                onSelect={handleCellPress}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
  },
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    borderWidth: 3,
    borderColor: Colors.borderThick,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
});