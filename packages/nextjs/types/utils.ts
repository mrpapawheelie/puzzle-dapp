export type Tuple<T, MaxLength extends number = 10, Current extends T[] = []> = Current["length"] extends MaxLength
  ? Current
  : Current | Tuple<T, MaxLength, [T, ...Current]>;

// Puzzle types
export type Square = {
  id: string;
  value: number;
  isEmpty: boolean;
  isCorrectPosition: boolean;
};

export type PuzzleGridProps = {
  squares: Square[];
  onSquareClick: (squareId: string) => void;
};
