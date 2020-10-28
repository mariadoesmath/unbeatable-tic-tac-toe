import { WINNING_OPTIONS } from "../Constants";

/**
 * Returns true if all the squares have been played
 *
 * @param {Array} board
 */
const allSquaresArePlayed = (board) => {
  const numOfPlays = board.filter((square) => !square.value);

  return numOfPlays.length === 0;
};

/**
 * Returns true if the game has been won by whoevers turn it is
 *
 * @param {Array} board
 * @param {Boolean} isUsersTurn
 */
const gameIsWon = (board, isUsersTurn) => {
  const marker = isUsersTurn ? "O" : "X";
  const indeces = board
    .filter((square) => square.value === marker)
    .map((square) => square.id);

  if (indeces.length < 3) return false;
  return WINNING_OPTIONS.some((winningOption) =>
    winningOption.every((square) => indeces.includes(square))
  );
};

/**
 * Uses the minimax algorithm to return the best possible score for the
 * square passed in
 *
 * @param {Object} square
 * @param {Array} board
 * @param {Number} depth
 * @param {Boolean} isUsersTurn
 */
const minimax = (square, board, depth, isUsersTurn) => {
  const tempBoard = getUpdatedBoard(board, square, isUsersTurn);
  if (gameIsWon(tempBoard, isUsersTurn)) {
    return -1 * depth + (isUsersTurn ? -10 : 10);
  } else if (allSquaresArePlayed(tempBoard)) {
    return -1 * depth;
  } else {
    const openSquares = tempBoard.filter((square) => !square.value);
    let scores = [];
    openSquares.forEach((square) => {
      const score = minimax(square, tempBoard, depth + 1, !isUsersTurn);
      scores.push(score);
    });

    // the list of scores returned is for the next user, so if the current player
    // is the user then we want the highest possible bot score, if the current player is the
    // bot we want the lowest possible user score
    return isUsersTurn ? Math.max(...scores) : Math.min(...scores);
  }
};

/**
 * Returns true if the game is over
 *
 * @param {Array} board
 * @param {Boolean} isUsersTurn
 */
export const isGameOver = (board, isUsersTurn) => {
  return allSquaresArePlayed(board) || gameIsWon(board, isUsersTurn);
};

/**
 * Returns the a new board with the selected square marked for whoevers
 * turn it is
 *
 * @param {Array} board
 * @param {Object} selectedSquare
 * @param {Boolean} isUsersTurn
 */
export const getUpdatedBoard = (board, selectedSquare, isUsersTurn) => {
  const selectedIndex = board.findIndex(
    (square) => square.id === selectedSquare.id
  );
  return [
    ...board.slice(0, selectedIndex),
    { value: isUsersTurn ? "O" : "X", id: selectedSquare.id },
    ...board.slice(selectedIndex + 1, board.length),
  ];
};

/**
 * Returns the square with the highest possible score value
 *
 * @param {Array} board
 */
export const findBestSquareToPlay = (board) => {
  const openSquares = board.filter((square) => !square.value);
  let bestOption = { score: -10000, square: undefined };
  openSquares.forEach((square) => {
    const score = minimax(square, board, 1, false);
    if (score > bestOption.score) {
      bestOption = {
        score,
        square,
      };
    }
  });
  return bestOption.square;
};
