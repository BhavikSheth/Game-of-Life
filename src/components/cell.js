import React from "react";
import PropTypes from "prop-types";

const Cell = (props) => {
  const { rowIndex, columnIndex } = props;
  return (
    <button className="cell">
      {`${rowIndex},${columnIndex}`}
    </button>
  );
};

Cell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
};

export default Cell;
