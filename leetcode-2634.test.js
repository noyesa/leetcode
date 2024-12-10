import { describe, it, expect } from "vitest";

/**
 * Given an integer array arr and a filtering function fn, return a filtered
 * array.
 * @param {number[]} arr - Array of numbers to filter.
 * @param {function(number): boolean} fn - A filter predicate
 * @returns {number[]} Array containing values of arr for which fn returned true.
 */
function filter(arr, fn) {
  const filtered = [];
  for (const [i, element] of arr.entries()) {
    if (fn(element, i)) {
      filtered.push(element);
    }
  }
  return filtered;
}

describe("filter", () => {
  it("solves test case #1", () => {
    function greaterThan10(n) {
      return n > 10;
    }
    expect(filter([0, 10, 20, 30], greaterThan10)).toStrictEqual([20, 30]);
  });

  it("solves test case #2", () => {
    function firstIndex(n, i) {
      return i === 0;
    }
    expect(filter([1, 2, 3], firstIndex)).toStrictEqual([1]);
  });

  it("solves test case #2", () => {
    function plusOne(n) {
      return n + 1;
    }
    expect(filter([-2, -1, 0, 1, 2], plusOne)).toStrictEqual([-2, 0, 1, 2]);
  });
});
