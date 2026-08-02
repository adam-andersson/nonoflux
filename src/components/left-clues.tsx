import { BOARD_CONFIG } from "@/constants/board";
import { Colors } from "@/constants/colors";
import { useGridContext } from "@/store/grid-context";
import { StyleSheet, View } from "react-native";
import { LeftClue } from "./left-clue";

const { GRID_SIZE, BLOCK_SIZE, THICK_GAP, THIN_GAP, MARGIN_OFFSET } =
  BOARD_CONFIG;

export function LeftClues() {
  const { gridDimension, clueAreaDepth } = useGridContext();

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
      {Array.from({ length: GRID_SIZE }, (_, row) => {
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
            <LeftClue index={row} />
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
});
