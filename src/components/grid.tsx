import { GridCell } from "@/components/grid-cell";
import { BOARD_CONFIG } from "@/constants/board";
import { Colors } from "@/constants/colors";
import { useGridContext } from "@/store/grid-context";
import { StyleSheet, View } from "react-native";

export function Grid() {
  const {
    blocks,
    gridDimension: boardDimension,
    cellContentSize,
    cellStates,
    onCellPress,
  } = useGridContext();
  const { THICK_GAP, THIN_GAP } = BOARD_CONFIG;

  return (
    <View
      style={[
        styles.board,
        {
          width: boardDimension,
          height: boardDimension,
          borderWidth: THICK_GAP,
          gap: THICK_GAP,
        },
      ]}
    >
      {blocks.map((blockRow, bRowIdx) => {
        const rowCount = blockRow[0]?.length ?? 1;
        return (
          <View
            key={`block-row-${bRowIdx}`}
            style={[styles.blockRowBand, { flex: rowCount, gap: THICK_GAP }]}
          >
            {blockRow.map((block, bColIdx) => {
              const colCount = block[0]?.length ?? 1;
              return (
                <View
                  key={`block-${bRowIdx}-${bColIdx}`}
                  style={[styles.block, { flex: colCount, gap: THIN_GAP }]}
                >
                  {block.map((row, rIdx) => (
                    <View
                      key={`row-${rIdx}`}
                      style={[styles.row, { gap: THIN_GAP }]}
                    >
                      {row.map((cellId) => (
                        <GridCell
                          key={cellId}
                          id={cellId}
                          cellContentSize={cellContentSize}
                          state={cellStates[cellId]}
                          onSelect={onCellPress}
                        />
                      ))}
                    </View>
                  ))}
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
  board: {
    borderColor: Colors.borderStrong,
    backgroundColor: Colors.borderStrong,
  },
  blockRowBand: { flexDirection: "row" },
  block: { backgroundColor: Colors.border },
  row: { flex: 1, flexDirection: "row" },
});
