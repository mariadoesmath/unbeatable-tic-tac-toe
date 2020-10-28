import React from "react";
import PropTypes from "prop-types";
import { isGameOver, findBestSquareToPlay, getUpdatedBoard } from "./util.js";
import "./Board.css";

class Board extends React.PureComponent {
  componentDidUpdate(oldProps) {
    if (
      !this.props.isUsersTurn &&
      oldProps.isUsersTurn !== this.props.isUsersTurn &&
      !this.props.isGameOver
    ) {
      const selectedSquare = findBestSquareToPlay(this.props.data);
      this.makePlay(selectedSquare);
    }
  }

  makePlay = (selectedSquare) => {
    const newBoard = getUpdatedBoard(
      this.props.data,
      selectedSquare,
      this.props.isUsersTurn
    );
    this.props.updateBoard(newBoard);
    if (isGameOver(newBoard, this.props.isUsersTurn))
      this.props.updateGameOver(true);
  };

  getButton = (square) => (
    <button
      onClick={() => this.makePlay(square)}
      disabled={
        !!square.value || !this.props.isUsersTurn || this.props.isGameOver
      }
    >
      {square.value}
    </button>
  );

  render() {
    return (
      <div className="board">
        <div className="board__row">
          {this.getButton(this.props.data[0])}
          {this.getButton(this.props.data[1])}
          {this.getButton(this.props.data[2])}
        </div>
        <div className="board__row">
          {this.getButton(this.props.data[3])}
          {this.getButton(this.props.data[4])}
          {this.getButton(this.props.data[5])}
        </div>
        <div className="board__row">
          {this.getButton(this.props.data[6])}
          {this.getButton(this.props.data[7])}
          {this.getButton(this.props.data[8])}
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      id: PropTypes.number,
    })
  ),
  updateBoard: PropTypes.func.isRequired,
  isUsersTurn: PropTypes.bool.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  updateGameOver: PropTypes.func.isRequired,
};

export default Board;
