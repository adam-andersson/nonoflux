import { GridCell } from "@/components/grid-cell";
import { BOARD_CONFIG } from "@/constants/board";
import { Colors } from "@/constants/colors";
import { useBoardContext } from "@/store/board-context";
import { StyleSheet, View } from "react-native";

const { GRID_SIZE, BLOCK_SIZE, THICK_GAP, THIN_GAP } = BOARD_CONFIG;

export function Grid() {
  const { gridDimension } = useBoardContext();

  return (
    <View
      style={[styles.grid, { width: gridDimension, height: gridDimension }]}
    >
      {Array.from({ length: GRID_SIZE }, (_, row) => {
        return (
          <View key={`row-${row}`} style={styles.row}>
            {Array.from({ length: GRID_SIZE }, (_, col) => {
              const cellId = `${row},${col}`;

              const isTopThick = row % BLOCK_SIZE === 0;
              const isBottomThick = (row + 1) % BLOCK_SIZE === 0;
              const isLeftThick = col % BLOCK_SIZE === 0;
              const isRightThick = (col + 1) % BLOCK_SIZE === 0;

              return (
                <View
                  key={cellId}
                  style={{
                    borderTopWidth: isTopThick ? THICK_GAP : THIN_GAP,
                    borderTopColor: isTopThick
                      ? Colors.borderStrong
                      : Colors.border,

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
                  <GridCell row={row} col={col} />
                </View>
              );
            })}
          </View>
        );
      })}
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
