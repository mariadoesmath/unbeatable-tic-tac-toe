export const WINNING_OPTIONS = [
  [1, 2, 3], // top row
  [4, 5, 6], // middle row
  [7, 8, 9], // bottom row
  [1, 4, 7], // first column
  [2, 5, 8], // second column
  [3, 6, 9], // third column
  [1, 5, 9], // forward diagonal
  [3, 5, 7], // backward diagonal
];

export const DEFAULT_BOARD_STATE = [
  { value: "X", id: 1, won: false },
  { value: "", id: 2, won: false },
  { value: "", id: 3, won: false },
  { value: "", id: 4, won: false },
  { value: "", id: 5, won: false },
  { value: "", id: 6, won: false },
  { value: "", id: 7, won: false },
  { value: "", id: 8, won: false },
  { value: "", id: 9, won: false },
];
