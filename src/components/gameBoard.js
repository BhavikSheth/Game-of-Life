/* eslint-disable */

import React, { Component } from "react";
import BoardRow from "./boardRow";

class GameBoard extends Component {
  // renderRow = row => <BoardRow row={row} />
  // renderRow = row => <li>{row}</li>

  // constructor() {
  //   super();

  //   this.renderRow = this.renderRow.bind(this);
  // }
  // renderRow(row) {
  //   return <li>{row}</li>;
  // }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          {
            Array.from({ length: 50 }, (row, index) => <BoardRow rowIndex={index}/>)
          }
        </div>
      </div>
    );
  }
}

export default GameBoard;
