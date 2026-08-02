import { CellState } from "@/components/grid-cell";
import { createContext, useContext } from "react";

interface GridContextType {
  gridDimension: number;
  clueAreaDepth: number;
  cellContentSize: number;
  singleCellSize: number;
  cellStates: Record<string, CellState>;
  onCellPress: (id: string) => void;
}

const GridContext = createContext<GridContextType | null>(null);

export const GridProvider = GridContext.Provider;

export function useGridContext() {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("Grid sub-components must be rendered inside <Board />");
  }
  return context;
}
