// StartPuzzle.tsx
import React from "react";
import { useGlobalState } from "~~/services/store/store";
// Zustand hook for state management.
import { generateInitialSquares, isSolvable, shuffle } from "~~/utils/puzzle/puzzleUtils";

// Utility functions for puzzle logic.

const StartPuzzle: React.FC = () => {
  // Destructuring state management functions from the global state.
  const { setSquares, setMoves, setPuzzleStatus } = useGlobalState();

  // Function to initialize or reset the puzzle game.
  const initializePuzzle = () => {
    let shuffledSquares; // Variable to hold the shuffled squares.
    do {
      // Generate and shuffle the initial squares until a solvable configuration is achieved.
      shuffledSquares = shuffle(generateInitialSquares());
    } while (!isSolvable(shuffledSquares)); // Ensure the shuffled squares form a solvable puzzle.
    // Update the global state with the new, solvable configuration.
    setSquares(shuffledSquares); // Set the puzzle squares.
    setMoves(0); // Reset the move counter.
    setPuzzleStatus("inProgress"); // Indicate the puzzle is now in progress.
    // console.log("Puzzle initialized!"); // Logging for debugging purposes.
  };

  // Render a button that, when clicked, initializes the puzzle.
  return (
    <button className="btn btn-primary" onClick={initializePuzzle}>
      Start Puzzle
    </button>
  );
};

export default StartPuzzle;
