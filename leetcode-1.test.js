import { describe, it, expect } from "vitest";

/**
 * Given an array of integers nums and an integer target, return indices of the
 * two numbers such that they add up to target.
 * @param {number[]} nums - Numbers within which to search.
 * @param {number} target - The target sum for two numbers within array
 * @returns {[number, number]} Indices of the elements that add to target in nums
 */
export function twoSum(nums, target) {
  const indices = new Map();
  for (const [i, num] of nums.entries()) {
    const remainder = target - num;
    if (indices.has(remainder)) {
      return [indices.get(remainder), i];
    }
    indices.set(num, i);
  }
}

describe("twoSum", () => {
  it("example #1", () => {
    const nums = [2, 7, 11, 15];
    const target = 9;
    expect(twoSum(nums, target)).toStrictEqual([0, 1]);
  });

  it("example #2", () => {
    const nums = [3, 2, 4];
    const target = 6;
    expect(twoSum(nums, target)).toStrictEqual([1, 2]);
  });

  it("example #3", () => {
    const nums = [3, 3];
    const target = 6;
    expect(twoSum(nums, target)).toStrictEqual([0, 1]);
  });
});
