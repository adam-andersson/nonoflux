import { BOARD_CONFIG } from "@/constants/board";
import { Colors } from "@/constants/colors";
import { useBoardContext } from "@/store/board-context";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Clue } from "./clue";
import { CellState } from "./grid-cell";

const { GRID_SIZE, BLOCK_SIZE, THICK_GAP, THIN_GAP, MARGIN_OFFSET } =
  BOARD_CONFIG;

function getRow(cellLookup: Record<string, CellState>, row: number) {
  return Array.from({ length: GRID_SIZE }).map(
    (_, col) => cellLookup[`${row},${col}`],
  );
}

export function LeftClues() {
  const { gridDimension, clueAreaDepth, cellStates } = useBoardContext();

  const rows = useMemo(() => {
    return Array.from({ length: GRID_SIZE }, (_, row) =>
      getRow(cellStates, row),
    );
  }, [cellStates]);

  return (
    <View
      style={[
        styles.container,
        {
          width: clueAreaDepth,
          height: gridDimension,
          marginRight: MARGIN_OFFSET,
        },
      ]}
    >
      {rows.map((rowState, row) => {
        const isTopThick = row % BLOCK_SIZE === 0;
        const isBottomThick = (row + 1) % BLOCK_SIZE === 0;
        const isFirst = row === 0;
        const isLast = row === GRID_SIZE - 1;

        return (
          <View
            key={`left-clue-row-${row}`}
            style={[
              styles.cell,
              {
                marginTop: isTopThick ? THICK_GAP / 2 : THIN_GAP / 2,
                marginBottom: isBottomThick ? THICK_GAP / 2 : THIN_GAP / 2,
              },
              {
                ...(isFirst && { marginTop: THICK_GAP }),
                ...(isLast && { marginBottom: THICK_GAP }),
              },
            ]}
          >
            <View style={styles.clueStack}>
              <Clue states={rowState} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  cell: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: Colors.surfaceSubtle,
    paddingRight: 4,
    borderRadius: 4,
  },
  clueStack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 3,
  },
});
