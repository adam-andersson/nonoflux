import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { memo } from "react";
import { Pressable, StyleSheet } from "react-native";

export type CellState = "blank" | "active" | "unactive";

export interface GridCellProps {
  id: string;
  state: CellState;
  cellSize: number;
  onSelect: (id: string) => void;
}

const CellContent = memo(({ state, size }: { state: CellState; size: number }) => {
  if (state === "unactive") {
    return <Feather name="x" size={size} color={Colors.active} />;
  }
  return null;
});

export const GridCell = memo(
  ({
    id,
    state,
    cellSize,
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
    backgroundColor: Colors.surface,
  },
  activeCell: {
    backgroundColor: Colors.active,
  },
});