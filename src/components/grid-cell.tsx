import { Colors } from "@/constants/colors";
import { memo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { CellContent } from "./cell-content";

export type CellState = "filled" | "crossed" | null;

export interface GridCellProps {
  row: number;
  col: number;
  state: CellState;
  singleCellSize: number;
  cellContentSize: number;
  onPress: (col: number, row: number) => void;
}

export const GridCell = memo(function GridCell({
  row,
  col,
  state,
  singleCellSize,
  cellContentSize,
  onPress,
}: GridCellProps) {
  return (
    <Pressable
      onPress={() => onPress(col, row)}
      disabled={!!state}
      style={[
        styles.cell,
        { width: singleCellSize, height: singleCellSize },
        state === "filled" && styles.filledCell,
      ]}
    >
      <CellContent state={state} size={cellContentSize} />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  cell: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
  },
  filledCell: {
    backgroundColor: Colors.surfaceActive,
  },
});
