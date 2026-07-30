import { GridCell } from "@/components/grid-cell";
import { Colors } from "@/constants/Colors";
import { useGridContext } from "@/store/grid-context";
import { StyleSheet, View } from "react-native";

export function Board() {
  const {
    blocks,
    boardDimension,
    cellContentSize,
    cellStates,
    onCellPress,
    THICK_GAP,
    THIN_GAP,
  } = useGridContext();

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
                          state={cellStates[cellId] ?? "blank"}
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
    borderColor: Colors.borderThick,
    backgroundColor: Colors.borderThick,
  },
  blockRowBand: { flexDirection: "row" },
  block: { backgroundColor: Colors.border },
  row: { flex: 1, flexDirection: "row" },
});
