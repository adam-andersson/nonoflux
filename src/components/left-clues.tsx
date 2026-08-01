import { Colors } from "@/constants/colors";
import { GRID_CONFIG } from "@/constants/grid";
import { useGridContext } from "@/store/grid-context";
import { StyleSheet, View } from "react-native";
import { LeftClue } from "./left-clue";

export function LeftClues() {
  const { blocks, boardDimension, clueAreaDepth } = useGridContext();
  const { THICK_GAP, THIN_GAP, MARGIN_OFFSET, BLOCK_SIZE } = GRID_CONFIG;

  return (
    <View
      style={[
        styles.container,
        {
          width: clueAreaDepth,
          height: boardDimension,
          gap: THICK_GAP,
          paddingVertical: THICK_GAP,
          marginRight: MARGIN_OFFSET,
        },
      ]}
    >
      {blocks.map((blockRow, bRowIdx) => {
        const rowCount = blockRow[0]?.length ?? 1;
        return (
          <View
            key={`left-clue-block-${bRowIdx}`}
            style={[{ flex: rowCount, gap: THIN_GAP }, styles.block]}
          >
            {blockRow[0]?.map((_, rIdx) => {
              const globalColIndex = bRowIdx * BLOCK_SIZE + rIdx;

              return (
                <View
                  key={`left-clue-cell-${bRowIdx}-${rIdx}`}
                  style={styles.cell}
                >
                  <LeftClue index={globalColIndex} />
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
  container: { flexDirection: "column" },
  block: { flexDirection: "column" },
  cell: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: Colors.clue,
    paddingRight: 4,
    marginBlock: 5,
    borderRadius: 4,
  },
});
