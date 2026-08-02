import { Colors } from "@/constants/colors";
import { memo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { CellContent } from "./cell-content";

export type CellState = "filled" | "crossed" | null;

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
  return (
    <Pressable
      onPress={() => onSelect(id)}
      disabled={!!state}
      style={[styles.cell, state === "filled" && styles.filledCell]}
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
  filledCell: {
    backgroundColor: Colors.surfaceActive,
  },
});
