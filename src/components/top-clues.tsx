import { BOARD_CONFIG } from "@/constants/board";
import { Colors } from "@/constants/colors";
import { useBoardContext } from "@/store/board-context";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Clue } from "./clue";
import { CellState } from "./grid-cell";

const { GRID_SIZE, BLOCK_SIZE, THICK_GAP, THIN_GAP, MARGIN_OFFSET } =
  BOARD_CONFIG;

const TopClueColumn = memo(
  function TopClueColumn({ col, grid }: { col: number; grid: CellState[][] }) {
    const columnStates: CellState[] = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      columnStates.push(grid[row][col]);
    }

    return (
      <View style={styles.clueStack}>
        <Clue states={columnStates} />
      </View>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.col !== nextProps.col) return false;
    for (let row = 0; row < GRID_SIZE; row++) {
      if (
        prevProps.grid[row][prevProps.col] !==
        nextProps.grid[row][nextProps.col]
      ) {
        return false;
      }
    }
    return true;
  },
);

export function TopClues() {
  const { gridDimension, clueAreaDepth, grid } = useBoardContext();

  return (
    <View
      style={[
        styles.container,
        {
          width: gridDimension,
          height: clueAreaDepth,
          marginBottom: MARGIN_OFFSET,
        },
      ]}
    >
      {Array.from({ length: GRID_SIZE }, (_, col) => {
        const isLeftThick = col % BLOCK_SIZE === 0;
        const isRightThick = (col + 1) % BLOCK_SIZE === 0;
        const isFirst = col === 0;
        const isLast = col === GRID_SIZE - 1;

        return (
          <View
            key={`top-clue-col-${col}`}
            style={[
              styles.cell,
              {
                marginLeft: isLeftThick ? THICK_GAP / 2 : THIN_GAP / 2,
                marginRight: isRightThick ? THICK_GAP / 2 : THIN_GAP / 2,
                ...(isFirst && { marginLeft: THICK_GAP }),
                ...(isLast && { marginRight: THICK_GAP }),
              },
            ]}
          >
            <TopClueColumn col={col} grid={grid} />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: Colors.surfaceSubtle,
    paddingBottom: 4,
    borderRadius: 4,
  },
  clueStack: {
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 3,
  },
});
