import { describe, it, expect } from 'vitest';

/**
  * Given an array of numbers sorted in ascending order, use binary search to
  * find the index of the number in the array. If the value is not found,
  * return -1.
  * @param {number[]} nums - Numbers within which to search for target.
  * @param {number} target - Target number to find in input array.
  * @returns {number} The index of the value if found in nums, -1 otherwise.
  */
function search(nums, target) {
  let l = 0;
  let r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    const midValue = nums[mid];
    if (midValue === target) {
      return mid;
    } else if (target < midValue) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  return (nums[l] === target) ? l : -1;
}

describe('search', () => {
  it('solves example #1', () => {
    const nums = [-1, 0, 3, 5, 9, 12];
    const target = 9;
    expect(search(nums, target)).toBe(4);
  });

  it('solves example #2', () => {
    const nums = [-1, 0, 3, 5, 9, 12];
    const target = 2;
    expect(search(nums, target)).toBe(-1);
  });
});
