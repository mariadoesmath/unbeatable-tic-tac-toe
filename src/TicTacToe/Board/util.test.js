import { isGameOver, findBestSquareToPlay, getUpdatedBoard } from "./util";

describe("utils", () => {
  describe("isGameOver", () => {
    it("returns true if all the squares are filled", () => {
      const board = [
        { value: "X", id: 1 },
        { value: "X", id: 2 },
        { value: "O", id: 3 },
        { value: "O", id: 4 },
        { value: "O", id: 5 },
        { value: "X", id: 6 },
        { value: "X", id: 7 },
        { value: "O", id: 8 },
        { value: "X", id: 9 },
      ];
      const isUserTurn = false;
      expect(isGameOver(board, isUserTurn)).toBe(true);
    });
    it("returns true the passed in user has a winning run", () => {
      const board = [
        { value: "X", id: 1 },
        { value: "O", id: 2 },
        { value: "O", id: 3 },
        { value: "X", id: 4 },
        { value: "", id: 5 },
        { value: "", id: 6 },
        { value: "X", id: 7 },
        { value: "", id: 8 },
        { value: "", id: 9 },
      ];
      const isUserTurn = false;
      expect(isGameOver(board, isUserTurn)).toBe(true);
    });
    it("returns false if there is not a tie and the passed in user has not won", () => {
      const board = [
        { value: "X", id: 1 },
        { value: "", id: 2 },
        { value: "O", id: 3 },
        { value: "", id: 4 },
        { value: "", id: 5 },
        { value: "", id: 6 },
        { value: "X", id: 7 },
        { value: "", id: 8 },
        { value: "", id: 9 },
      ];
      const isUserTurn = false;
      expect(isGameOver(board, isUserTurn)).toBe(false);
    });
  });
  describe("findBestSquareToPlay", () => {
    it("returns the best square to play given the current board", () => {
      const board = [
        { value: "X", id: 1 },
        { value: "O", id: 2 },
        { value: "", id: 3 },
        { value: "", id: 4 },
        { value: "O", id: 5 },
        { value: "X", id: 6 },
        { value: "O", id: 7 },
        { value: "X", id: 8 },
        { value: "", id: 9 },
      ];
      expect(findBestSquareToPlay(board)).toEqual({ value: "", id: 3 });
    });
  });

  describe("getUpdatedBoard", () => {
    it("returns a new board with the passed in square marked for the passed in user", () => {
      const board = [
        { value: "X", id: 1 },
        { value: "O", id: 2 },
        { value: "O", id: 3 },
        { value: "X", id: 4 },
        { value: "", id: 5 },
        { value: "", id: 6 },
        { value: "X", id: 7 },
        { value: "", id: 8 },
        { value: "", id: 9 },
      ];
      const square = { value: "", id: 5 };
      const isUserTurn = true;

      const expectedBoard = [
        { value: "X", id: 1 },
        { value: "O", id: 2 },
        { value: "O", id: 3 },
        { value: "X", id: 4 },
        { value: "O", id: 5 },
        { value: "", id: 6 },
        { value: "X", id: 7 },
        { value: "", id: 8 },
        { value: "", id: 9 },
      ];

      expect(getUpdatedBoard(board, square, isUserTurn)).toEqual(expectedBoard);
    });
  });
});
