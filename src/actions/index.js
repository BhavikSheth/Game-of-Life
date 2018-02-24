import { ADD_LIVE_CELL, DELETE_LIVE_CELL, EVOLVE_CELLS } from "../constants/actionTypes";

export const addLiveCell = (row, column) => ({
  type: ADD_LIVE_CELL,
  row,
  column,
});

export const deleteLiveCell = (row, column) => ({
  type: DELETE_LIVE_CELL,
  row,
  column,
});

export const evolveCells = () => ({
  type: EVOLVE_CELLS,
});
