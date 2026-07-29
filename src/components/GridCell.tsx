import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { memo } from "react";
import { Pressable, StyleSheet } from "react-native";

export type CellState = "blank" | "active" | "unactive";

export interface GridCellProps {
  id: string;
  state: CellState;
  cellSize: number;
  isThickRight: boolean;
  isThickBottom: boolean;
  isLastRow: boolean;
  isLastCol: boolean;
  onSelect: (id: string) => void;
}

const CellContent = memo(({ state, size }: { state: CellState; size: number }) => {
  if (state === "unactive") {
    return <Feather name="x" size={size} color={Colors.borderThick} />;
  }
  return null;
});

export const GridCell = memo(
  ({
    id,
    state,
    cellSize,
    isThickRight,
    isThickBottom,
    isLastRow,
    isLastCol,
    onSelect,
  }: GridCellProps) => {
    const isBlank = state === "blank";
    const iconSize = Math.round(cellSize * 0.75);

    return (
      <Pressable
        onPress={() => onSelect(id)}
        disabled={!isBlank}
        style={[
          styles.cell,
          isThickRight && styles.thickRight,
          isThickBottom && styles.thickBottom,
          isLastRow && styles.noBottomBorder,
          isLastCol && styles.noRightBorder,
          state === "active" && styles.activeCell,
        ]}
      >
        <CellContent state={state} size={iconSize} />
      </Pressable>
    );
  }
);

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
});