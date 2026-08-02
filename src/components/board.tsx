import { CellState } from "@/components/grid-cell";
import { useBoardDimensions } from "@/hooks/use-board-dimensions";
import { GridProvider } from "@/store/grid-context";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Grid } from "./grid";
import { LeftClues } from "./left-clues";
import { TopClues } from "./top-clues";

interface BoardProps {
  gridSize: number;
  boardDimension: number;
  cellStates: Record<string, CellState>;
  onCellPress: (id: string) => void;
}

export function Board({
  gridSize,
  boardDimension,
  cellStates,
  onCellPress,
}: BoardProps) {
  const dimensions = useBoardDimensions(gridSize, boardDimension);
  const contextValue = useMemo(
    () => ({
      gridSize,
      ...dimensions,
      cellStates,
      onCellPress,
    }),
    [gridSize, dimensions, cellStates, onCellPress],
  );

  return (
    <GridProvider value={contextValue}>
      <View style={[styles.container, { width: boardDimension }]}>
        <View style={styles.horizontalRow}>
          <TopClues />
        </View>

        <View style={styles.horizontalRow}>
          <LeftClues />
          <Grid />
        </View>
      </View>
    </GridProvider>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "flex-end" },
  horizontalRow: { flexDirection: "row" },
});
