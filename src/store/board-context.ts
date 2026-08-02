// board-context.tsx
import { CellState } from "@/components/grid-cell";
import { createContext, useContext } from "react";

export interface BoardContextType {
  gridDimension: number;
  clueAreaDepth: number;
  cellContentSize: number;
  singleCellSize: number;
  grid: CellState[][];
  onCellPress: (col: number, row: number) => void;
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
