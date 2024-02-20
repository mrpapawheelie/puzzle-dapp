import React from "react";
import { PuzzleGridProps } from "~~/types/utils";

// Importing the type definition for props.

// The PuzzleGrid component displays the grid of puzzle squares.
const PuzzleGrid: React.FC<PuzzleGridProps> = ({ squares, onSquareClick }) => {
  return (
    // Grid container with 4 columns, centering items with a gap between them.
    <div className="grid grid-cols-4 place-items-center gap-4">
      {/* Mapping over the squares array to render each square. */}
      {squares.map(square => (
        // Each square is a div with a click handler and stylings for appearance.
        <div
          key={square.id} // Unique key for React's rendering algorithm.
          onClick={() => square.value !== 0 && onSquareClick(square.id)} // Click handler that triggers only for non-empty squares.
          className={`w-24 h-24 md:w-32 md:h-32 border-2 bg-white rounded-md flex items-center justify-center cursor-pointer`} // Styling classes for the square.
        >
          {/* Conditionally render the square's value if it's not the empty square. */}
          {square.value !== 0 && (
            <span className="text-7xl text-black">{square.value}</span> // Display the square's value.
          )}
        </div>
      ))}
    </div>
  );
};

export default PuzzleGrid;
