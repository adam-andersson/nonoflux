import { Colors } from "@/constants/Colors";
import { Feather } from '@expo/vector-icons';
import { memo } from "react";
import { Pressable, StyleSheet } from "react-native";

export type CellState = "blank" | "active" | "unactive";

interface GridCellProps {
  id: string;
  row: number;
  col: number;
  gridSize: number;
  cellSize: number;
  state: CellState,
  onSelect: (id: string) => void;
}

export const GridCell = memo(({ id, row, col, gridSize, cellSize, state, onSelect }: GridCellProps) => {
  // Sudoku-style thick borders every 5 cells
  const isThickRight = (col + 1) % 5 === 0 && col < gridSize - 1;
  const isThickBottom = (row + 1) % 5 === 0 && row < gridSize - 1;

  const isLastRow = row === gridSize - 1;
  const isLastCol = col === gridSize - 1;
  
  const handlePress = () => {
    if (state === "blank") {
      onSelect(id);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={state !== "blank"}
      style={() => [
        styles.cell,
        isThickRight && styles.thickRight,
        isThickBottom && styles.thickBottom,
        isLastRow && styles.noBottomBorder,
        isLastCol && styles.noRightBorder,
        state === "active" && styles.activeCell,
        state === "unactive" && styles.unactiveCell,
      ]}
    >
      {state === "unactive" && (
        <Feather name="x" size={Math.round(cellSize * 0.75)} color={Colors.borderThick} />
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  thickRight: {
    borderRightWidth: 3,
    borderRightColor: Colors.borderThick,
  },
  thickBottom: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.borderThick,
  },
  noBottomBorder: {
    borderBottomWidth: 0,
  },
  noRightBorder: {
    borderRightWidth: 0,
  },
  activeCell: {
    backgroundColor: Colors.active,
  },
  unactiveCell: {
    backgroundColor: Colors.surface, 
  },
});