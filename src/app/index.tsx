import { Grid } from "@/components/grid";
import { CellState } from "@/components/grid-cell";
import { InputMode, ModeToggle } from "@/components/mode-toggle";
import { Colors } from "@/constants/Colors";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const GRID_SIZE = 10;

export default function GameScreen() {
  const [inputMode, setInputMode] = useState<InputMode>("active");
  const [cellStates, setCellStates] = useState<Record<string, CellState>>({});

  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const inputModeRef = useRef(inputMode);
  useEffect(() => {
    inputModeRef.current = inputMode;
  }, [inputMode]);

  const handleCellPress = useCallback((id: string) => {
    setCellStates((prev) => {
      const currentState = prev[id] ?? "blank";

      if (currentState !== "blank") {
        return prev;
      }

      return {
        ...prev,
        [id]: inputModeRef.current,
      };
    });
  }, []);

  const gridDimension = Math.min(width - 32, height * 0.5);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, 16),
          paddingBottom: Math.max(insets.bottom, 16),
          paddingLeft: Math.max(insets.left, 16),
          paddingRight: Math.max(insets.right, 16),
        },
      ]}
    >
      <View style={[styles.gridContainer]}>
        <View
          style={[
            styles.gridSquare,
            { width: gridDimension, height: gridDimension },
          ]}
        >
          <Grid
            gridSize={GRID_SIZE}
            gridDimension={gridDimension}
            cellStates={cellStates}
            onCellPress={handleCellPress}
          />
        </View>
      </View>

      <View>
        <ModeToggle mode={inputMode} onModeChange={setInputMode} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.surface,
  },
  gridContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gridSquare: {
    overflow: "hidden",
  },
});
