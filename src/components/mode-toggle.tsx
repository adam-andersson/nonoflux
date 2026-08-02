import { Colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CellState } from "./grid-cell";

export type InputMode = Extract<CellState, "filled" | "crossed">;

interface ModeToggleProps {
  mode: InputMode;
  onModeChange: (mode: InputMode) => void;
}

export const ModeToggle = memo(function ModeToggle({
  mode,
  onModeChange,
}: ModeToggleProps) {
  const handleSelect = (nextMode: InputMode) => {
    if (mode !== nextMode) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onModeChange(nextMode);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => handleSelect("filled")}
        style={[styles.button, mode === "filled" && styles.activeButton]}
      >
        <View style={styles.fillIcon} />
        <Text style={[styles.text, mode === "filled" && styles.activeText]}>
          Fill
        </Text>
      </Pressable>

      <Pressable
        onPress={() => handleSelect("crossed")}
        style={[styles.button, mode === "crossed" && styles.activeButton]}
      >
        <Feather
          name="x"
          size={18}
          color={mode === "crossed" ? Colors.surface : Colors.borderStrong}
        />
        <Text style={[styles.text, mode === "crossed" && styles.activeText]}>
          Cross
        </Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    alignSelf: "center",
    marginTop: 24,
    gap: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  activeButton: {
    backgroundColor: Colors.borderStrong,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.borderStrong,
  },
  activeText: {
    color: Colors.surface,
  },
  fillIcon: {
    width: 14,
    height: 14,
    borderRadius: 3,
    backgroundColor: Colors.surfaceActive,
  },
});
