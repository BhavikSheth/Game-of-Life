import { expect } from "chai";
import liveCellsReducer from "./liveCellsReducer";
import { ADD_LIVE_CELL, DELETE_LIVE_CELL } from "../constants/actionTypes";

describe("Live Cells Reducer", () => {
  it("handles action with unknown type", () => {
    expect(liveCellsReducer(undefined, {})).to.eql({});
  });

  it("handles action of type ADD_LIVE_CELL when the row does not exist", () => {
    const action = { type: ADD_LIVE_CELL, row: 1, column: 2 };
    expect(liveCellsReducer({}, action)).to.eql({ 1: [2] });
  });

  it("handles action of type ADD_LIVE_CELL when the row does exist", () => {
    const action = { type: ADD_LIVE_CELL, row: 1, column: 2 };
    expect(liveCellsReducer({ 1: [3, 4] }, action)).to.eql({ 1: [2, 3, 4] });
  });

  it("handles action of type DELETE_LIVE_CELL when length of column array is 1", () => {
    const action = { type: DELETE_LIVE_CELL, row: 1, column: 2 };
    expect(liveCellsReducer({ 1: [2] }, action)).to.eql({});
  });

  it("handles action of type DELETE_LIVE_CELL when length of column array is more than 1", () => {
    const action = { type: DELETE_LIVE_CELL, row: 1, column: 2 };
    expect(liveCellsReducer({ 1: [1, 2, 3, 4] }, action)).to.eql({ 1: [1, 3, 4] });
  });
});
