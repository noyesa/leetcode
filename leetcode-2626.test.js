import { describe, it, expect } from "vitest";

/**
 * Execute a function on each element of an array, passing the previous return
 * value as the first parameter of the call on the next element.
 * @param {number[]} nums - List of numbers to call reducer on.
 * @param {function(number, number): number} fn - Function that computers a
 *  number from previous and current elements.
 * @param {number} init - The initial value of the accumulator parameter
 * @returns {number} A number computed from the elements in the array
 */
function reduce(nums, fn, init) {
  let value = init;
  for (const num of nums) {
    value = fn(value, num);
  }
  return value;
}

describe("reduce", () => {
  it("solves test case #1", () => {
    const nums = [1, 2, 3, 4];
    function sum(accum, curr) {
      return accum + curr;
    }
    expect(reduce(nums, sum, 0)).toBe(10);
  });

  it("solves test case #2", () => {
    const nums = [1, 2, 3, 4];
    function sum(accum, curr) {
      return accum + curr * curr;
    }
    expect(reduce(nums, sum, 100)).toBe(130);
  });

  it("solves test case #3", () => {
    const nums = [];
    function sum(accum, curr) {
      return 0;
    }
    expect(reduce(nums, sum, 25)).toBe(25);
  });
});
