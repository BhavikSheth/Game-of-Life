import { expect } from "chai";

import { ADD_LIVE_CELL, DELETE_LIVE_CELL, EVOLVE_CELLS } from "../constants/actionTypes";
import { addLiveCell, deleteLiveCell, evolveCells } from "./index";

describe("actions", () => {
  describe("addLiveCell", () => {
    it("has the correct type", () => {
      const action = addLiveCell();
      expect(action.type).to.equal(ADD_LIVE_CELL);
    });

    it("has the correct row and column", () => {
      const action = addLiveCell(1, 2);
      expect(action.row).to.equal(1);
      expect(action.column).to.equal(2);
    });
  });

  describe("deleteLiveCell", () => {
    it("has the correct type", () => {
      const action = deleteLiveCell();
      expect(action.type).to.equal(DELETE_LIVE_CELL);
    });

    it("has the correct row and column", () => {
      const action = deleteLiveCell(3, 4);
      expect(action.row).to.equal(3);
      expect(action.column).to.equal(4);
    });
  });

  describe("evolveCells", () => {
    it("has the correct type", () => {
      const action = evolveCells();
      expect(action.type).to.equal(EVOLVE_CELLS);
    });
  });
});
