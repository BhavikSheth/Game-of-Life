import { ADD_LIVE_CELL, DELETE_LIVE_CELL } from "../constants/actionTypes";

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
