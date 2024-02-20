export type Tuple<T, MaxLength extends number = 10, Current extends T[] = []> = Current["length"] extends MaxLength
  ? Current
  : Current | Tuple<T, MaxLength, [T, ...Current]>;

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
