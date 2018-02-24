import { ADD_LIVE_CELL, DELETE_LIVE_CELL, EVOLVE_CELLS } from "../constants/actionTypes";

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
    case EVOLVE_CELLS: {
      const newGeneration = {};
      for (let i = 0; i < 10; i += 1) {
        for (let j = 0; j < 10; j += 1) {
          const rowAbove = (i === 0 ? 10 - 1 : i - 1);
          const rowBelow = (i === 10 - 1 ? 0 : i + 1);
          const columnLeft = (j === 0 ? 10 - 1 : j - 1);
          const columnRight = (j === 10 - 1 ? 0 : j + 1);
          const cellIsAlive = Boolean(state[i] && state[i].indexOf(j) !== -1);
          const neighbours =
            Boolean(state[rowAbove] && state[rowAbove].indexOf(columnLeft) !== -1)
            + Boolean(state[rowAbove] && state[rowAbove].indexOf(j) !== -1)
            + Boolean(state[rowAbove] && state[rowAbove].indexOf(columnRight) !== -1)
            + Boolean(state[i] && state[i].indexOf(columnLeft) !== -1)
            + Boolean(state[i] && state[i].indexOf(columnRight) !== -1)
            + Boolean(state[rowBelow] && state[rowBelow].indexOf(columnLeft) !== -1)
            + Boolean(state[rowBelow] && state[rowBelow].indexOf(j) !== -1)
            + Boolean(state[rowBelow] && state[rowBelow].indexOf(columnRight) !== -1);
          // console.log(state, i, j, rowAbove, rowBelow, columnLeft, columnRight);
          // console.log(cellIsAlive, neighbours);
          // console.log((state[rowAbove] && state[rowAbove].indexOf(columnLeft) !== -1));
          // console.log((state[rowAbove] && state[rowAbove].indexOf(j) !== -1));
          // console.log((state[rowAbove] && state[rowAbove].indexOf(columnRight) !== -1));
          // console.log((state[i] && state[i].indexOf(columnLeft) !== -1));
          // console.log((state[i] && state[i].indexOf(columnRight) !== -1));
          // console.log((state[rowBelow] && state[rowBelow].indexOf(columnLeft) !== -1));
          // console.log((state[rowBelow] && state[rowBelow].indexOf(j) !== -1));
          // console.log((state[rowBelow] && state[rowBelow].indexOf(columnRight) !== -1));
          
          // if (cellIsAlive && neighbours < 2) {
          //   // if (state[i].length === 1) {
          //   //   const newState = Object.keys(state).reduce((result, key) => (key !== i.toString() ? { ...result, [key]: state[key] } : result), {});
          //   //   return Object.assign({}, newState);
          //   // }
          //   // return { ...state, [i]: state[i].filter(liveColumnCell => liveColumnCell !== j) };
          // }

          if (cellIsAlive && (neighbours === 2 || neighbours === 3)) {
            // console.log("test1");
            // console.log(state, i, j, rowAbove, rowBelow, columnLeft, columnRight);
            // console.log(cellIsAlive, neighbours);
            newGeneration[i] = newGeneration[i] ? [...newGeneration[i], j] : [j];
            // console.log(newGeneration);
          }

          if (!cellIsAlive && neighbours === 3) {
            // console.log("test2");
            // console.log(state, i, j, rowAbove, rowBelow, columnLeft, columnRight);
            // console.log(cellIsAlive, neighbours);
            newGeneration[i] = newGeneration[i] ? [...newGeneration[i], j] : [j];
            // console.log(newGeneration);            
          }

          // if (cellIsAlive && neighbours > 3) {
          //   if (state[i].length === 1) {
          //     const newState = Object.keys(state).reduce((result, key) => (key !== i.toString() ? { ...result, [key]: state[key] } : result), {});
          //     return Object.assign({}, newState);
          //   }
          //   return { ...state, [i]: state[i].filter(liveColumnCell => liveColumnCell !== j) };
          // }

          // if (!cellIsAlive && neighbours === 3) {
          //   if (state[i]) {
          //     return { ...state, [i]: [...state[i], j].sort((a, b) => a - b) };
          //   }
          //   return { ...state, [i]: [j] };
          // }
        }
      }
      // console.log(newGeneration);
      return newGeneration;
    }
    default:
      return state;
  }
};
