import { describe, it, expect as e } from "vitest";

function expect(val) {
  return {
    toBe(otherVal) {
      if (val !== otherVal) {
        throw new Error("Not Equal");
      }
      return true;
    },

    notToBe(otherVal) {
      if (val === otherVal) {
        throw new Error("Equal");
      }
      return true;
    },
  };
}

describe("expect", () => {
  describe("toBe", () => {
    it("solves test case 1", () => {
      e(expect(5).toBe(5)).toBe(true);
    });

    it("solves test case 2", () => {
      e(() => {
        expect(5).toBe(null);
      }).toThrowError("Not Equal");
    });
  });

  describe("notToBe", () => {
    it("solves test case 3", () => {
      e(expect(5).notToBe(null)).toBe(true);
    });
  });
});
