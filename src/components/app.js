import React from "react";
import GameBoard from "./gameBoard";

export default () => (
  <div className="app">
    <h1 style={{ textAlign: "center" }}>
      {"Conway's Game of Life"}
    </h1>
    <GameBoard />
  </div>
);
