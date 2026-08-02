import { CellState } from "@/components/grid-cell";
import { createContext, useContext } from "react";

interface BoardContextType {
  gridDimension: number;
  clueAreaDepth: number;
  cellContentSize: number;
  singleCellSize: number;
  cellStates: Record<string, CellState>;
  onCellPress: (id: string) => void;
}

const BoardContext = createContext<BoardContextType | null>(null);

export const BoardProvider = BoardContext.Provider;

export function useBoardContext() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("Board sub-components must be rendered inside <Board />");
  }
  return context;
}
