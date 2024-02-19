"use client";

import React, { useEffect, useState } from "react";
import EndPuzzle from "./EndPuzzle";
import PuzzleGrid from "./PuzzleGrid";
import StartPuzzle from "./StartPuzzle";
import { useGlobalState } from "~~/services/store/store";
import { isNeighbour, isSolved, swap, updateSquaresWithCorrectPosition } from "~~/utils/puzzle/puzzleUtils";

const Puzzle: React.FC = () => {
  const { squares, setSquares, moves, setMoves, setPuzzleStatus, puzzleStatus } = useGlobalState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("Current puzzle status: ", puzzleStatus);
  }, [puzzleStatus]);

  const handleSquareClick = (squareId: string) => {
    const emptySquareIndex = squares.findIndex(square => square.isEmpty);
    const clickedSquareIndex = squares.findIndex(square => square.id === squareId);

    if (isNeighbour(emptySquareIndex, clickedSquareIndex)) {
      let newSquares = swap(squares, emptySquareIndex, clickedSquareIndex);
      newSquares = updateSquaresWithCorrectPosition(newSquares);
      setSquares(newSquares);
      setMoves(moves + 1);
      // console.log("Is the puzzle solved?", isSolved(newSquares));
      // console.log(newSquares);

      if (isSolved(newSquares)) {
        // console.log("Puzzle solved!");
        // console.log(puzzleStatus);
        setIsModalOpen(true);
        setPuzzleStatus("completed");
      }
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Congratulations!</h3>
            <p className="py-4">You&apos;ve solved the puzzle in {moves} moves.</p>
            <EndPuzzle />
            <div className="modal-action">
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <StartPuzzle />
        <div className="text-lg font-bold">Moves: {moves}</div>
      </div>
      <PuzzleGrid squares={squares} onSquareClick={handleSquareClick} />
      <p className="text-center">Organize the squares in order from 1 to 15 to solve the puzzle.</p>
    </div>
  );
};

export default Puzzle;
