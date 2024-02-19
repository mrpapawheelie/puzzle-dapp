import React from "react";
import { PuzzleGridProps } from "~~/types/utils";

const PuzzleGrid: React.FC<PuzzleGridProps> = ({ squares, onSquareClick }) => {
  return (
    <div className="grid grid-cols-4 place-items-center gap-4">
      {squares.map(square => (
        <div
          key={square.id}
          onClick={() => square.value !== 0 && onSquareClick(square.id)} // Only allow clicks on non-empty squares
          className={`w-24 h-24 md:w-32 md:h-32 border-2 bg-white rounded-md flex items-center justify-center cursor-pointer`}
        >
          {square.value !== 0 && ( // Only display the value for non-empty squares
            <span className="text-7xl text-black">{square.value}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default PuzzleGrid;
