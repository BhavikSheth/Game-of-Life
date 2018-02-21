import { combineReducers } from "redux";
import LiveCellsReducer from "./liveCellsReducer";

const rootReducer = () => {
  combineReducers({
    liveCells: LiveCellsReducer,
  });
};

export default rootReducer;
