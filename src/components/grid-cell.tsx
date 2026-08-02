import { Colors } from "@/constants/colors";
import { useBoardContext } from "@/store/board-context";
import { memo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { CellContent } from "./cell-content";

export type CellState = "filled" | "crossed" | null;

export interface GridCellProps {
  id: string;
}

export const GridCell = memo(function GridCell({ id }: GridCellProps) {
  const { cellStates, cellContentSize, singleCellSize, onCellPress } =
    useBoardContext();

  const state = cellStates[id];

  return (
    <Pressable
      onPress={() => onCellPress(id)}
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
