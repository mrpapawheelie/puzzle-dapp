import create from "zustand";
import scaffoldConfig from "~~/scaffold.config";
import { Square } from "~~/utils/puzzle/puzzleUtils";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type GlobalState = {
  nativeCurrencyPrice: number;
  setNativeCurrencyPrice: (price: number) => void;
  targetNetwork: ChainWithAttributes;
  setTargetNetwork: (network: ChainWithAttributes) => void;
  moves: number;
  setMoves: (moves: number) => void;
  squares: Square[];
  setSquares: (squares: Square[]) => void;
  puzzleStatus: "notStarted" | "inProgress" | "completed";
  setPuzzleStatus: (status: "notStarted" | "inProgress" | "completed") => void;
  isSolvable: boolean;
  setIsSolvable: (solvable: boolean) => void;
};

export const useGlobalState = create<GlobalState>(set => ({
  nativeCurrencyPrice: 0,
  setNativeCurrencyPrice: price => set({ nativeCurrencyPrice: price }),
  targetNetwork: scaffoldConfig.targetNetworks[0],
  setTargetNetwork: network => set({ targetNetwork: network }),
  moves: 0,
  setMoves: moves => set({ moves: moves }),
  puzzleStatus: "notStarted",
  setPuzzleStatus: status => set({ puzzleStatus: status }),
  squares: [],
  setSquares: squares => set({ squares }),
  isSolvable: true,
  setIsSolvable: solvable => set({ isSolvable: solvable }),
}));
