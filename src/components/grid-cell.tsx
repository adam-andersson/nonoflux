import { Colors } from "@/constants/Colors";
import { memo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { CellContent } from "./cell-content";

export type CellState = "blank" | "active" | "unactive";

export interface GridCellProps {
  id: string;
  cellContentSize: number;
  state: CellState;
  onSelect: (id: string) => void;
}

export const GridCell = memo(function GridCell({
  id,
  cellContentSize,
  state,
  onSelect,
}: GridCellProps) {
  const isBlank = state === "blank";

  return (
    <Pressable
      onPress={() => onSelect(id)}
      disabled={!isBlank}
      style={[styles.cell, state === "active" && styles.activeCell]}
    >
      <CellContent state={state} size={cellContentSize} />
    </Pressable>
  );
});

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
