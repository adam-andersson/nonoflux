import { BOARD_CONFIG } from "@/constants/board";
import { Colors } from "@/constants/colors";
import { useBoardContext } from "@/store/board-context";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Clue } from "./clue";
import { CellState } from "./grid-cell";

const { GRID_SIZE, BLOCK_SIZE, THICK_GAP, THIN_GAP, MARGIN_OFFSET } =
  BOARD_CONFIG;

function getColumn(cellLookup: Record<string, CellState>, column: number) {
  return Array.from({ length: GRID_SIZE }).map(
    (_, row) => cellLookup[`${row},${column}`],
  );
}

export function TopClues() {
  const { gridDimension, clueAreaDepth, cellStates } = useBoardContext();

  const columns = useMemo(() => {
    return Array.from({ length: GRID_SIZE }, (_, col) =>
      getColumn(cellStates, col),
    );
  }, [cellStates]);

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
      {columns.map((columnState, col) => {
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
              },
              {
                ...(isFirst && { marginLeft: THICK_GAP }),
                ...(isLast && { marginRight: THICK_GAP }),
              },
            ]}
          >
            <View style={styles.clueStack}>
              <Clue states={columnState} />
            </View>
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
