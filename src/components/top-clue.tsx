import { useCol } from "@/hooks/use-col";
import { StyleSheet, View } from "react-native";
import { Clue } from "./clue";

interface TopClueProps {
  index: number;
}

export function TopClue({ index }: TopClueProps) {
  const { v: colStates } = useCol(index);

  return (
    <View style={styles.clueStack}>
      <Clue states={colStates} />
    </View>
  );
}

const styles = StyleSheet.create({
  clueStack: {
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 3,
  },
});
