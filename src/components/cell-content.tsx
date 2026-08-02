import { Colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { CellState } from "./grid-cell";

interface CellContentProps {
  state: CellState;
  size: number;
}

export function CellContent({ state, size }: CellContentProps) {
  if (state === "crossed") {
    return <Feather name="x" size={size} color={Colors.surfaceActive} />;
  }
  return null;
}
