import { CellState } from "@/components/grid-cell";
import { useBoardDimensions } from "@/hooks/use-board-dimensions";
import { BoardProvider } from "@/store/board-context";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Grid } from "./grid";
import { LeftClues } from "./left-clues";
import { TopClues } from "./top-clues";

interface BoardProps {
  boardDimension: number;
  cellStates: Record<string, CellState>;
  onCellPress: (id: string) => void;
}

export function Board({ boardDimension, cellStates, onCellPress }: BoardProps) {
  const dimensions = useBoardDimensions(boardDimension);
  const contextValue = useMemo(
    () => ({
      ...dimensions,
      cellStates,
      onCellPress,
    }),
    [dimensions, cellStates, onCellPress],
  );

  return (
    <BoardProvider value={contextValue}>
      <View style={[styles.container, { width: boardDimension }]}>
        <View style={styles.horizontalRow}>
          <TopClues />
        </View>

        <View style={styles.horizontalRow}>
          <LeftClues />
          <Grid />
        </View>
      </View>
    </BoardProvider>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "flex-end" },
  horizontalRow: { flexDirection: "row" },
});
