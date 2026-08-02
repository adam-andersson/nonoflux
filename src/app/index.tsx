import { Board } from "@/components/board";
import { InputMode, ModeToggle } from "@/components/mode-toggle";
import { Colors } from "@/constants/colors";
import { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GameScreen() {
  const [inputMode, setInputMode] = useState<InputMode>("filled");

  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const maxBoardDimension = Math.min(
    width - 32 - insets.left - insets.right,
    height * 0.55,
  );

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
      <View style={styles.gridContainer}>
        <Board boardDimension={maxBoardDimension} inputMode={inputMode} />
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
});
