import { ADD_LIVE_CELL, DELETE_LIVE_CELL } from "../constants/actionTypes";

export default (state = {}, action) => {
  const { row, column, type } = action;
  switch (type) {
    case ADD_LIVE_CELL:
      if (state[row]) {
        return { ...state, [row]: [...state[row], column].sort((a, b) => a - b) };
      }
      return { ...state, [row]: [column] };
    case DELETE_LIVE_CELL:
      if (state[row].length === 1) {
        const newState = Object.keys(state).reduce((result, key) => (key !== row.toString() ? { ...result, [key]: state[key] } : result), {});
        return Object.assign({}, newState);
      }
      return { ...state, [row]: state[row].filter(liveColumnCell => liveColumnCell !== column) };
    default:
      return state;
  }
};
