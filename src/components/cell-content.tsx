import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { CellState } from "./grid-cell";

interface CellContentProps {
  state: CellState;
  size: number;
}

export function CellContent({ state, size }: CellContentProps) {
  if (state === "unactive") {
    return <Feather name="x" size={size} color={Colors.active} />;
  }
  return null;
}
