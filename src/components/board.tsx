import { CellState } from "@/components/grid-cell";
import { BOARD_CONFIG } from "@/constants/board";
import { useBoardDimensions } from "@/hooks/use-board-dimensions";
import { BoardProvider } from "@/store/board-context";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Grid } from "./grid";
import { LeftClues } from "./left-clues";
import { InputMode } from "./mode-toggle";
import { TopClues } from "./top-clues";

const { GRID_SIZE } = BOARD_CONFIG;

const createInitialGrid = () =>
  Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => null as CellState),
  );

interface BoardProps {
  boardDimension: number;
  inputMode: InputMode;
}

export function Board({ boardDimension, inputMode }: BoardProps) {
  const dimensions = useBoardDimensions(boardDimension);
  const [grid, setGrid] = useState<CellState[][]>(createInitialGrid);

  const inputModeRef = useRef(inputMode);
  useEffect(() => {
    inputModeRef.current = inputMode;
  }, [inputMode]);

  // Fast single-cell update maintaining row reference stability
  const handleCellPress = useCallback((col: number, row: number) => {
    setGrid((prevGrid) => {
      const currentState = prevGrid[row][col];

      if (currentState) {
        return prevGrid;
      }

      // Clone ONLY target row array to preserve reference stability for all other rows
      const nextGrid = [...prevGrid];
      nextGrid[row] = [...prevGrid[row]];
      nextGrid[row][col] = inputModeRef.current as CellState;

      return nextGrid;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      ...dimensions,
      grid,
      onCellPress: handleCellPress,
    }),
    [dimensions, grid, handleCellPress],
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
