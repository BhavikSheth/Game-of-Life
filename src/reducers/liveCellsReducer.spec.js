import { expect } from "chai";
import liveCellsReducer from "./liveCellsReducer";
import { ADD_LIVE_CELL, DELETE_LIVE_CELL, EVOLVE_CELLS } from "../constants/actionTypes";

describe("Live Cells Reducer", () => {
  it("handles action with unknown type", () => {
    expect(liveCellsReducer(undefined, {})).to.eql({});
  });

  it("ADD_LIVE_CELL: creates new row when row does not exist", () => {
    const action = { type: ADD_LIVE_CELL, row: 1, column: 2 };
    expect(liveCellsReducer({}, action)).to.eql({ 1: [2] });
  });

  it("ADD_LIVE_CELL: adds new column to row when row does exist", () => {
    const action = { type: ADD_LIVE_CELL, row: 1, column: 2 };
    expect(liveCellsReducer({ 1: [3, 4] }, action)).to.eql({ 1: [2, 3, 4] });
  });

  it("DELETE_LIVE_CELL: deletes row when length of column array of row is 1", () => {
    const action = { type: DELETE_LIVE_CELL, row: 1, column: 2 };
    expect(liveCellsReducer({ 1: [2] }, action)).to.eql({});
  });

  it("DELETE_LIVE_CELL: deletes column when length of column array of row is more than 1", () => {
    const action = { type: DELETE_LIVE_CELL, row: 1, column: 2 };
    expect(liveCellsReducer({ 1: [1, 2, 3, 4] }, action)).to.eql({ 1: [1, 3, 4] });
  });

  it("EVOLVE_CELLS: live cell with fewer than two live neighbours dies", () => {
    const action = { type: EVOLVE_CELLS };
    expect(liveCellsReducer({ 1: [0] }, action)).to.eql({});
    expect(liveCellsReducer({ 1: [0, 1] }, action)).to.eql({});
    expect(liveCellsReducer({ 1: [0, 1, 2] }, action)[1].indexOf(0)).to.equal(-1);
    expect(liveCellsReducer({ 1: [0, 1, 2] }, action)[1].indexOf(2)).to.equal(-1);
    expect(liveCellsReducer({ 1: [1], 2: [1], 3: [1] }, action)).to.not.have.property(1);
    expect(liveCellsReducer({ 1: [1], 2: [1], 3: [1] }, action)).to.not.have.property(3);
  });

  it("EVOLVE_CELLS: live cell with two or three live neighbours lives", () => {
    const action = { type: EVOLVE_CELLS };
    expect(liveCellsReducer({ 1: [0, 1, 2] }, action)[1].indexOf(1)).to.not.equal(-1);
    expect(liveCellsReducer({ 1: [0, 1], 2: [1] }, action)[1].indexOf(1)).to.not.equal(-1);
    expect(liveCellsReducer({ 1: [0, 1], 2: [2] }, action)[1].indexOf(1)).to.not.equal(-1);
    expect(liveCellsReducer({ 1: [1, 2], 2: [1, 2] }, action)).to.eql({ 1: [1, 2], 2: [1, 2] });
  });

  it("EVOLVE_CELLS: live cell with more than three live neighbours dies", () => {
    const action = { type: EVOLVE_CELLS };
    expect(liveCellsReducer({ 1: [1, 2, 3], 2: [1, 2] }, action)[2].indexOf(1)).to.not.eql(-1);
    expect(liveCellsReducer({ 1: [1, 2, 3], 2: [1, 2] }, action)[2].indexOf(3)).to.not.eql(-1);
    expect(liveCellsReducer({ 1: [1, 2, 3], 2: [1, 2] }, action)[2]).to.eql([1, 3]);
    expect(liveCellsReducer({ 1: [1, 2, 3], 2: [1, 2, 3], 3: [1, 2, 3] }, action)[2].indexOf(2)).to.eql(-1);
  });

  it("EVOLVE_CELLS: dead cell with exactly three live neighbours becomes a live cell", () => {
    const action = { type: EVOLVE_CELLS };
    expect(liveCellsReducer({ 1: [0, 1, 2] }, action)[2].indexOf(1)).to.not.equal(-1);
    expect(liveCellsReducer({ 1: [1, 3], 3: [1] }, action)[2].indexOf(2)).to.not.equal(-1);
  });

  it("EVOLVE_CELLS: testing for correct new generation", () => {
    const action = { type: EVOLVE_CELLS };
    expect(liveCellsReducer({ 1: [1, 2, 3], 2: [1, 2, 3], 3: [1, 2, 3] }, action)).to.eql({
      0: [2], 1: [1, 3], 2: [0, 4], 3: [1, 3], 4: [2],
    });
  });

  it("EVOLVE_CELLS: cells become alive and die at the opposite side of the board when at the edge of the game board", () => {
    const action = { type: EVOLVE_CELLS };
    expect(liveCellsReducer({ 0: [0, 1, 2] }, action)).to.eql({ 0: [1], 1: [1], 9: [1] });
    expect(liveCellsReducer({ 0: [0, 8, 9], 8: [0, 8, 9], 9: [0, 8, 9] }, action)).to.eql({
      0: [0, 8], 1: [9], 7: [9], 8: [0, 8], 9: [1, 7],
    });
  });
});
