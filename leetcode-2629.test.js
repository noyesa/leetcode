import { describe, it, expect } from "vitest";

/**
 * Composes functions f[0], f[1], f[2] such that the result of calling the
 * returned function is f[0](f[1](f[2](x))).
 * @param {function[]} functions - List of functions to compose.
 * @returns {function} Composition of functions
 */
function compose(functions) {
  return (x) => functions.reduceRight((value, fn) => fn(value), x);
}

describe("compose", () => {
  it("solves test case #1", () => {
    const functions = [(x) => x + 1, (x) => x * x, (x) => 2 * x];
    const composed = compose(functions);
    expect(composed(4)).toBe(65);
  });

  it("solves test case #2", () => {
    const functions = [(x) => 10 * x, (x) => 10 * x, (x) => 10 * x];
    const composed = compose(functions);
    expect(composed(1)).toBe(1000);
  });

  it("solves test case #3", () => {
    const functions = [];
    const composed = compose(functions);
    expect(composed(42)).toBe(42);
  });
});
