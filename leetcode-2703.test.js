import { describe, it, expect } from "vitest";

/**
 * Returns the number of arguments passed.
 * @returns {number} The number of arguments passed
 */
function argumentsLength() {
  return arguments.length;
}

describe("argumentsLength", () => {
  it("solves test case #1", () => {
    expect(argumentsLength(5)).toBe(1);
  });

  it("solves test case #2", () => {
    expect(argumentsLength({}, null, "3")).toBe(3);
  });
});
