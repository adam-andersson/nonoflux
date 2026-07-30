import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CellState } from "./GridCell";

export type InputMode = Extract<CellState, "active" | "unactive">;

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
        onPress={() => handleSelect("active")}
        style={[styles.button, mode === "active" && styles.activeButton]}
      >
        <View style={styles.fillIcon} />
        <Text style={[styles.text, mode === "active" && styles.activeText]}>
          Fill
        </Text>
      </Pressable>

      <Pressable
        onPress={() => handleSelect("unactive")}
        style={[styles.button, mode === "unactive" && styles.activeButton]}
      >
        <Feather
          name="x"
          size={18}
          color={mode === "unactive" ? Colors.surface : Colors.borderThick}
        />
        <Text style={[styles.text, mode === "unactive" && styles.activeText]}>
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
    backgroundColor: Colors.borderThick,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.borderThick,
  },
  activeText: {
    color: Colors.surface,
  },
  fillIcon: {
    width: 14,
    height: 14,
    borderRadius: 3,
    backgroundColor: Colors.active,
  },
});
