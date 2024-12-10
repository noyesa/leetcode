import { describe, it, expect } from "vitest";

/**
 * Given an integer array and a mapping function, return a new array with a
 * transformation applied to each element.
 * @param {number[]} arr - The array of numbers fo map
 * @param {function(number): number} fn - The mapping function
 * @returns {number[]} Array of results of applying fn to each number in arr
 */
function map(arr, fn) {
  const output = new Array(arr.length);
  for (const [i, num] of arr.entries()) {
    output[i] = fn(num, i);
  }
  return output;
}

describe("map", () => {
  it("solves test case #1", () => {
    function plusone(n) {
      return n + 1;
    }
    expect(map([1, 2, 3], plusone)).toStrictEqual([2, 3, 4]);
  });

  it("solves test case #2", () => {
    function plusI(n, i) {
      return n + i;
    }
    expect(map([1, 2, 3], plusI)).toStrictEqual([1, 3, 5]);
  });

  it("solves test case #3", () => {
    function constant(n, i) {
      return 42;
    }
    expect(map([10, 20, 30], constant)).toStrictEqual([42, 42, 42]);
  });
});
