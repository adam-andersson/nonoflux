import { Grid } from "@/components/grid";
import { CellState } from "@/components/grid-cell";
import { InputMode, ModeToggle } from "@/components/mode-toggle";
import { Colors } from "@/constants/Colors";
import { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

const GRID_SIZE = 10;

export default function GameScreen() {
  const [inputMode, setInputMode] = useState<InputMode>("active");
  const [cellStates, setCellStates] = useState<Record<string, CellState>>({});

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Grid
          gridSize={GRID_SIZE}
          cellStates={cellStates}
          onCellPress={handleCellPress}
        />
        <ModeToggle mode={inputMode} onModeChange={setInputMode} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
