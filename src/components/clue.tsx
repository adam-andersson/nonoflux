import { Text } from "react-native";
import { CellState } from "./grid-cell";

interface ClueProps {
  states: CellState[];
}

export function Clue({ states }: ClueProps) {
  const result: number[] = [];
  let count = 0;

  for (const item of states) {
    if (item === "filled") {
      count++;
    } else if (count > 0) {
      result.push(count);
      count = 0;
    }
  }
  if (count > 0) {
    result.push(count);
  } else {
    if (result.length === 0) {
      result.push(count);
    }
  }

  return (
    <>
      {result.map((clue, i) => (
        <Text key={`${i}-${clue}`}>{clue}</Text>
      ))}
    </>
  );
}
