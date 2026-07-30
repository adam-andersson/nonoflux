import { useGridContext } from "@/store/grid-context";
import { StyleSheet, View } from "react-native";

export function TopClues() {
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
          width: boardDimension,
          height: clueAreaDepth,
          gap: THICK_GAP,
          paddingHorizontal: THICK_GAP,
          marginBottom: MARGIN_OFFSET,
        },
      ]}
    >
      {blocks[0]?.map((block, bColIdx) => {
        const colCount = block[0]?.length ?? 1;
        return (
          <View
            key={`top-clue-block-${bColIdx}`}
            style={[{ flex: colCount, gap: THIN_GAP }, styles.block]}
          >
            {block[0]?.map((_, colIdx) => (
              <View
                key={`top-clue-cell-${bColIdx}-${colIdx}`}
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
  container: { flexDirection: "row" },
  block: { flexDirection: "row" },
  cell: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
});
