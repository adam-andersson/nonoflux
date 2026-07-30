import { useGridContext } from "@/store/grid-context";
import { StyleSheet, View } from "react-native";

export function LeftClues() {
  const {
    blocks,
    boardDimension,
    clueAreaDepth,
    THICK_GAP,
    THIN_GAP,
    MARGIN_OFFSET,
  } = useGridContext();

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
            {blockRow[0]?.map((_, rIdx) => (
              <View
                key={`left-clue-cell-${bRowIdx}-${rIdx}`}
                style={styles.cell}
              />
            ))}
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
    backgroundColor: "lightgray",
  },
});
