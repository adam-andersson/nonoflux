import { Grid } from "@/components/Grid";
import { CellState } from "@/components/GridCell";
import { InputMode, ModeToggle } from "@/components/ModeToggle";
import { Colors } from "@/constants/Colors";
import { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

const GRID_SIZE = 10;

export default function GameScreen() {
  const [inputMode, setInputMode] = useState<InputMode>("active");
  const [cellStates, setCellStates] = useState<Map<string, CellState>>(new Map());

  const handleCellPress = useCallback((id: string) => {
    setCellStates((prev) => {
      const currentState = prev.get(id) ?? "blank";

      if (currentState !== "blank") {
        return prev;
      }

      const next = new Map(prev);
      next.set(id, inputMode);
      return next;
    });
  }, [inputMode]);

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
    paddingHorizontal: 16, // <-- Restores the 16px padding on left & right
    paddingVertical: 24,   // Adds vertical breathing room for toggle & top area
  },
});