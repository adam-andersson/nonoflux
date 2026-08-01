import { useRow } from "@/hooks/use-row";
import { StyleSheet, View } from "react-native";
import { Clue } from "./clue";

interface LeftClueProps {
  index: number;
}

export function LeftClue({ index }: LeftClueProps) {
  const { v: rowStates } = useRow(index);

  return (
    <View style={styles.clueStack}>
      <Clue states={rowStates} />
    </View>
  );
}

const styles = StyleSheet.create({
  clueStack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 3,
  },
});
