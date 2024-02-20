// Puzzle Grid Props
export type Square = {
  id: string; // Unique identifier for the square.
  value: number; // Numeric value of the square, 0 for the empty square.
  isEmpty: boolean; // Flag indicating whether the square is the empty one.
  isCorrectPosition: boolean; // Flag indicating if the square is in its correct position based on its value.
};

export type PuzzleGridProps = {
  squares: Square[];
  onSquareClick: (squareId: string) => void;
};

// Generates an initial ordered grid of squares for a sliding puzzle game.
export const generateInitialSquares = (): Square[] =>
  // Create an array of 15 filled squares with sequential values and one empty square.
  Array.from({ length: 15 }, (_, index) => ({
    id: `square-${index + 1}`, // Assign a unique ID.
    value: index + 1, // Assign a value from 1 to 15.
    isCorrectPosition: true, // Initially, all squares are in the correct position.
    isEmpty: false, // These are filled squares, not the empty one.
  })).concat([
    {
      id: "square-16", // ID for the empty square.
      value: 0, // Empty square has a value of 0.
      isCorrectPosition: true, // The empty square is also considered in the correct position initially.
      isEmpty: true, // This is the empty square.
    },
  ]);

// Shuffles the square array to start the game with a random configuration.
export const shuffle = (squares: Square[]): Square[] => {
  const newSquares: Square[] = [...squares]; // Clone the array to avoid mutating the original.

  let currentIndex = newSquares.length; // Start from the last element.
  let temporaryValue, // Temporary variable to hold the value of the square being swapped.
    randomIndex; // Index of the square to swap with.

  // Iterate over the array and swap each square with a square at a random index.
  while (--currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * (currentIndex + 1)); // Choose a random index.
    // Swap the current square with the randomly chosen square.
    temporaryValue = newSquares[currentIndex];
    newSquares[currentIndex] = newSquares[randomIndex];
    newSquares[randomIndex] = temporaryValue;
  }
  return newSquares; // Return the shuffled array.
};

// Determines if a puzzle configuration is solvable to ensure a fair game.
export const isSolvable = (squares: Square[]): boolean => {
  let parity = 0; // Parity count to determine solvability.
  const gridWidth = Math.sqrt(squares.length); // Calculate the width of the square grid.
  let row = 0, // Row counter.
    blankRow = 0; // Row where the empty square is located.

  // Iterate through the squares to calculate the parity.
  for (let i = 0; i < squares.length; i++) {
    if (i % gridWidth === 0) row++; // Move to the next row after each grid width.
    if (squares[i].isEmpty) {
      blankRow = row; // Note the row containing the empty square.
      continue; // Skip the empty square.
    }
    // Count inversions for parity calculation.
    for (let j = i + 1; j < squares.length; j++) {
      if (squares[i].value > squares[j].value && squares[j].value !== 0) {
        parity++;
      }
    }
  }

  // Solvability rules vary based on the grid width (odd or even).
  if (gridWidth % 2 === 0) {
    // For even grid widths, the position of the empty square matters.
    return blankRow % 2 === 0 ? parity % 2 === 0 : parity % 2 !== 0;
  } else {
    // For odd grid widths, only the parity count matters.
    return parity % 2 === 0;
  }
};

// Swaps two squares in the grid, used for moving squares in the game.
export const swap = (squares: Square[], index1: number, index2: number): Square[] => {
  const newSquares = [...squares]; // Clone the array to avoid mutating the original.
  // Perform the swap.
  const temp = newSquares[index1];
  newSquares[index1] = newSquares[index2];
  newSquares[index2] = temp;
  return newSquares; // Return the array with swapped squares.
};

// Determines if two squares are adjacent and thus swappable.
export const isNeighbour = (index1: number, index2: number, gridSize = 4): boolean => {
  const row1 = Math.floor(index1 / gridSize); // Row of the first square.
  const col1 = index1 % gridSize; // Column of the first square.
  const row2 = Math.floor(index2 / gridSize); // Row of the second square.
  const col2 = index2 % gridSize; // Column of the second square.

  // Check if they are neighbors by being next to each other horizontally or vertically.
  return (row1 === row2 && Math.abs(col1 - col2) === 1) || (col1 === col2 && Math.abs(row1 - row2) === 1);
};

// Checks if the puzzle has been solved by verifying the order and position of squares.
export const isSolved = (squares: Square[]): boolean => {
  for (let i = 0; i < squares.length - 1; i++) {
    if (squares[i].value !== i + 1) return false; // Check if each square is in its correct position.
  }
  return squares[squares.length - 1].isEmpty; // Ensure the last square is the empty square.
};

// Verifies if a square is in its correct position based on its value.
export const isCorrectPosition = (square: Square, index: number): boolean => {
  return square.value === index + 1; // True if the value matches the expected position (index + 1).
};

// Updates each square's `isCorrectPosition` property based on its current position.
export const updateSquaresWithCorrectPosition = (squares: Square[]): Square[] => {
  return squares.map((square, index) => ({
    ...square,
    // Mark square as in correct position if its value matches the index + 1, or if it's the empty square in the last position.
    isCorrectPosition: square.value === index + 1 || (square.isEmpty && index === squares.length - 1),
  }));
};
