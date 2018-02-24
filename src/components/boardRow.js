/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Cell from "./cell";

class BoardRow extends Component {
  // renderCell = (row, column) => <Cell row={row} column={column} />
  render() {
    // console.log("test", this.props.rowIndex, typeof this.props.rowIndex);
    // console.log(this.props);
    return (
      <div className="board-row">
        {
          // Array.from({ length: 50 }, (cell, index) => this.renderCell(this.props.rowIndex, index))
          Array.from({length: 10 }, (column, index) => <Cell key={index} rowIndex={this.props.rowIndex} columnIndex={index}/>)
        }
      </div>
    );
  }
}

BoardRow.propTypes = {
  rowIndex: PropTypes.number.isRequired,
};

export default BoardRow;
