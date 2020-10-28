import React, { useState } from "react";
import Board from "./Board";
import { DEFAULT_BOARD_STATE } from "./Constants";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [board, updateBoard] = useState(DEFAULT_BOARD_STATE);
  const [isGameOver, updateGameOver] = useState(false);

  const onResetButtonClick = () => {
    updateBoard(DEFAULT_BOARD_STATE);
    updateGameOver(false);
  };

  const isUsersTurn =
    board.filter((square) => square.value === "X") >
    board.filter((square) => square.value === "O");

  return (
    <>
      <h1>Unbeatable Tic Tac Toe</h1>
      <Board
        data={board}
        updateBoard={updateBoard}
        isUsersTurn={isUsersTurn}
        isGameOver={isGameOver}
        updateGameOver={updateGameOver}
      />
      <button
        onClick={onResetButtonClick}
        disabled={board === DEFAULT_BOARD_STATE}
        className="reset-button"
      >
        Reset
      </button>
      {isGameOver && <h5>Game Over!</h5>}
    </>
  );
};

export default TicTacToe;
