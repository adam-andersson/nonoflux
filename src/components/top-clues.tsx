import { Colors } from "@/constants/colors";
import { GRID_CONFIG } from "@/constants/grid";
import { useGridContext } from "@/store/grid-context";
import { StyleSheet, View } from "react-native";
import { TopClue } from "./top-clue";

export function TopClues() {
  const { blocks, boardDimension, clueAreaDepth } = useGridContext();
  const { THICK_GAP, THIN_GAP, MARGIN_OFFSET, BLOCK_SIZE } = GRID_CONFIG;

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
            {block[0]?.map((_, colIdx) => {
              const globalColIndex = bColIdx * BLOCK_SIZE + colIdx;

              return (
                <View
                  key={`top-clue-cell-${bColIdx}-${colIdx}`}
                  style={styles.cell}
                >
                  <TopClue index={globalColIndex} />
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
  container: { flexDirection: "row" },
  block: { flexDirection: "row" },
  cell: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: Colors.clue,
    paddingBottom: 4,
    marginInline: 5,
    borderRadius: 4,
  },
});
