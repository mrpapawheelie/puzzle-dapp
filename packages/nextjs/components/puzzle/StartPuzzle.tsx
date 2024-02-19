// StartPuzzle.tsx
import React from "react";
import { useGlobalState } from "~~/services/store/store";
import { generateInitialSquares, isSolvable, shuffle } from "~~/utils/puzzle/puzzleUtils";

const StartPuzzle: React.FC = () => {
  const { setSquares, setMoves, setPuzzleStatus } = useGlobalState();

  const initializePuzzle = () => {
    let shuffledSquares;
    do {
      shuffledSquares = shuffle(generateInitialSquares());
    } while (!isSolvable(shuffledSquares));
    setSquares(shuffledSquares);
    setMoves(0);
    setPuzzleStatus("inProgress");
    console.log("Puzzle initialized!");
  };

  return (
    <button className="btn btn-primary" onClick={initializePuzzle}>
      Start Puzzle
    </button>
  );
};

export default StartPuzzle;
