import { CellState, GridCell } from "@/components/grid-cell";
import { BOARD_CONFIG } from "@/constants/board";
import { Colors } from "@/constants/colors";
import { useBoardContext } from "@/store/board-context";
import { memo } from "react";
import { StyleSheet, View } from "react-native";

const { GRID_SIZE, BLOCK_SIZE, THICK_GAP, THIN_GAP } = BOARD_CONFIG;

interface GridRowProps {
  row: number;
  rowState: CellState[];
  singleCellSize: number;
  cellContentSize: number;
  onCellPress: (col: number, row: number) => void;
}

const GridRow = memo(function GridRow({
  row,
  rowState,
  singleCellSize,
  cellContentSize,
  onCellPress,
}: GridRowProps) {
  const isTopThick = row % BLOCK_SIZE === 0;
  const isBottomThick = (row + 1) % BLOCK_SIZE === 0;

  return (
    <View style={styles.row}>
      {rowState.map((state, col) => {
        const cellId = `${row},${col}`;

        const isLeftThick = col % BLOCK_SIZE === 0;
        const isRightThick = (col + 1) % BLOCK_SIZE === 0;

        return (
          <View
            key={cellId}
            style={{
              borderTopWidth: isTopThick ? THICK_GAP : THIN_GAP,
              borderTopColor: isTopThick ? Colors.borderStrong : Colors.border,

              borderLeftWidth: isLeftThick ? THICK_GAP : THIN_GAP,
              borderLeftColor: isLeftThick
                ? Colors.borderStrong
                : Colors.border,

              borderRightWidth:
                col === GRID_SIZE - 1
                  ? isRightThick
                    ? THICK_GAP
                    : THIN_GAP
                  : 0,
              borderRightColor: Colors.borderStrong,

              borderBottomWidth:
                row === GRID_SIZE - 1
                  ? isBottomThick
                    ? THICK_GAP
                    : THIN_GAP
                  : 0,
              borderBottomColor: Colors.borderStrong,
            }}
          >
            <GridCell
              row={row}
              col={col}
              state={state}
              singleCellSize={singleCellSize}
              cellContentSize={cellContentSize}
              onPress={onCellPress}
            />
          </View>
        );
      })}
    </View>
  );
});

export function Grid() {
  const { gridDimension, singleCellSize, cellContentSize, grid, onCellPress } =
    useBoardContext();

  return (
    <View
      style={[styles.grid, { width: gridDimension, height: gridDimension }]}
    >
      {grid.map((rowState, row) => (
        <GridRow
          key={`row-${row}`}
          row={row}
          rowState={rowState}
          singleCellSize={singleCellSize}
          cellContentSize={cellContentSize}
          onCellPress={onCellPress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
});
