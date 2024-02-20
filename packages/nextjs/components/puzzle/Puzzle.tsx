"use client";

// Parent scope is the client with "use client" directive.
import React, { useEffect, useState } from "react";
import EndPuzzle from "./EndPuzzle";
// Component to display upon puzzle completion.
import PuzzleGrid from "./PuzzleGrid";
// Component representing the grid of puzzle squares.
import StartPuzzle from "./StartPuzzle";
// Component to initiate the puzzle game.
import { useGlobalState } from "~~/services/store/store";
// Zustand store hook for global state management.
import { isNeighbour, isSolved, swap, updateSquaresWithCorrectPosition } from "~~/utils/puzzle/puzzleUtils";

// Puzzle utility functions.

const Puzzle: React.FC = () => {
  // State and functions from the global store, managing the puzzle's state and moves count.
  const { squares, setSquares, moves, setMoves, setPuzzleStatus, puzzleStatus } = useGlobalState();

  // Local state to control the visibility of the completion modal.
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Effect hook to log the puzzle status whenever it changes.
  useEffect(() => {
    console.log("Current puzzle status: ", puzzleStatus);
  }, [puzzleStatus]);

  // Handler for when a square is clicked in the puzzle grid.
  const handleSquareClick = (squareId: string) => {
    // Find the indices of the empty square and the clicked square.
    const emptySquareIndex = squares.findIndex(square => square.isEmpty);
    const clickedSquareIndex = squares.findIndex(square => square.id === squareId);

    // Check if the clicked square is adjacent to the empty square, allowing for a move.
    if (isNeighbour(emptySquareIndex, clickedSquareIndex)) {
      // Swap the clicked square with the empty square and update their positions.
      let newSquares = swap(squares, emptySquareIndex, clickedSquareIndex);
      // Check if each square is in its correct position after the swap.
      newSquares = updateSquaresWithCorrectPosition(newSquares);
      // Update the global state with the new squares and increment the move count.
      setSquares(newSquares);
      setMoves(moves + 1);

      // Check if the puzzle is solved with the new squares arrangement.
      if (isSolved(newSquares)) {
        // Open the completion modal and set the puzzle status to 'completed'.
        setIsModalOpen(true);
        setPuzzleStatus("completed");
      }
    }
  };

  return (
    <div>
      {/* Conditionally render the completion modal when the puzzle is solved. */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Congratulations!</h3>
            <p className="py-4">You&apos;ve solved the puzzle in {moves} moves.</p>
            <EndPuzzle /> {/* Render the EndPuzzle component allowing the user to finalize the game. */}
            <div className="modal-action">
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Layout for the start button, moves counter, and puzzle grid. */}
      <div className="flex justify-between items-center mb-4">
        <StartPuzzle /> {/* Button to start or reset the puzzle. */}
        <div className="text-lg font-bold">Moves: {moves}</div> {/* Display the current number of moves. */}
      </div>
      {/* The puzzle grid with squares. `onSquareClick` is passed to handle square clicks. */}
      <PuzzleGrid squares={squares} onSquareClick={handleSquareClick} />
      <p className="text-center">Organize the squares in order from 1 to 15 to solve the puzzle.</p>
    </div>
  );
};

export default Puzzle;
