export type Square = {
  id: string;
  value: number;
  isEmpty: boolean;
  isCorrectPosition: boolean;
};

/**
 * Generates an array of initial squares.
 * Each square has an id, value, correctPosition, and isEmpty property.
 * The array contains 15 squares with values from 1 to 15, and one empty square with value 0.
 * @returns {Square[]} The array of initial squares.
 */
export const generateInitialSquares = (): Square[] =>
  Array.from({ length: 15 }, (_, index) => ({
    id: `square-${index + 1}`,
    value: index + 1,
    isCorrectPosition: true,
    isEmpty: false,
  })).concat([
    {
      id: "square-16",
      value: 0,
      isCorrectPosition: true,
      isEmpty: true,
    },
  ]);

/**
 * Shuffles an array of squares using the Fisher-Yates shuffle algorithm.
 *
 * @param squares - The array of squares to be shuffled.
 * @returns The shuffled array of squares.
 */
export const shuffle = (squares: Square[]): Square[] => {
  // Make a copy of the squares array to avoid mutating the original array
  const newSquares: Square[] = [...squares];

  /**
   * The current index of the squares array.
   */
  let currentIndex = newSquares.length,
    temporaryValue,
    /**
     * Represents a random index.
     */
    randomIndex;
  while (--currentIndex > 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    // Swap it with the current element
    temporaryValue = newSquares[currentIndex];
    newSquares[currentIndex] = newSquares[randomIndex];
    newSquares[randomIndex] = temporaryValue;
  }
  return newSquares; // Return the shuffled array
};

/**
 * Checks if a given puzzle configuration is solvable.
 *
 * @param squares - An array of Square objects representing the puzzle configuration.
 * @returns A boolean indicating whether the puzzle is solvable or not.
 */
export const isSolvable = (squares: Square[]): boolean => {
  let parity = 0;
  const gridWidth = Math.sqrt(squares.length);
  let row = 0; // the current row we are on
  let blankRow = 0; // the row with the blank square

  for (let i = 0; i < squares.length; i++) {
    if (i % gridWidth === 0) {
      // advance to next row
      row++;
    }
    if (squares[i].isEmpty) {
      // the blank square
      blankRow = row; // save the row on which encountered
      continue;
    }
    for (let j = i + 1; j < squares.length; j++) {
      if (squares[i].value > squares[j].value && squares[j].value !== 0) {
        parity++;
      }
    }
  }

  if (gridWidth % 2 === 0) {
    // even grid
    if (blankRow % 2 === 0) {
      // blank on odd row; counting from bottom
      return parity % 2 === 0;
    } else {
      // blank on even row; counting from bottom
      return parity % 2 !== 0;
    }
  } else {
    // odd grid
    return parity % 2 === 0;
  }
};

/**
 * Swaps two elements in an array of squares.
 *
 * @param squares - The array of squares.
 * @param index1 - The index of the first element to swap.
 * @param index2 - The index of the second element to swap.
 * @returns A new array with the elements swapped.
 */
export const swap = (squares: Square[], index1: number, index2: number): Square[] => {
  // Swap logic
  const newSquares = [...squares];
  const temp = newSquares[index1];
  newSquares[index1] = newSquares[index2];
  newSquares[index2] = temp;
  return newSquares;
};

/**
 * Checks if two indices in a grid are neighbors.
 * @param index1 - The first index.
 * @param index2 - The second index.
 * @param gridSize - The size of the grid. Defaults to 4.
 * @returns True if the indices are neighbors, false otherwise.
 */
export const isNeighbour = (index1: number, index2: number, gridSize = 4): boolean => {
  const row1 = Math.floor(index1 / gridSize);
  const col1 = index1 % gridSize;
  const row2 = Math.floor(index2 / gridSize);
  const col2 = index2 % gridSize;

  // Check if squares are in the same row and adjacent columns, or in the same column and adjacent rows
  return (row1 === row2 && Math.abs(col1 - col2) === 1) || (col1 === col2 && Math.abs(row1 - row2) === 1);
};

/**
 * Calculates the move based on the number of moves and time left.
 * @param moves The number of moves made.
 * @param timeLeft The time left in milliseconds.
 * @returns The calculated move.
 */
export const calculateMove = (moves: number, timeLeft: number): number => {
  // Scoring logic
  const timeBonus = Math.max(0, timeLeft);
  const movePenalty = Math.max(0, moves - 100);
  return Math.round(1000 + timeBonus - movePenalty);
};

/**
 * Checks if the puzzle is solved.
 * @param squares - The array of squares representing the puzzle.
 * @returns A boolean indicating whether the puzzle is solved or not.
 */
export const isSolved = (squares: Square[]): boolean => {
  // Check if all numbered squares are in ascending order
  for (let i = 0; i < squares.length - 1; i++) {
    if (squares[i].value !== i + 1) return false;
  }
  // Check if the last square is the empty square
  return squares[squares.length - 1].isEmpty;
};

/**
 * Formats the given time in seconds into a string representation of minutes and seconds.
 * @param timeInSeconds - The time in seconds to format.
 * @returns The formatted time string in the format "MM:SS".
 */
export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = seconds.toString().padStart(2, "0");
  return `${paddedMinutes}:${paddedSeconds}`;
};

export const isCorrectPosition = (square: Square, index: number): boolean => {
  return square.value === index + 1;
};

export const updateSquaresWithCorrectPosition = (squares: Square[]): Square[] => {
  return squares.map((square, index) => ({
    ...square,
    isCorrectPosition: square.value === index + 1 || (square.isEmpty && index === squares.length - 1),
  }));
};
