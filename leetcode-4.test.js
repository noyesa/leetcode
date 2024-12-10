import { describe, it, expect } from "vitest";

/**
 * Merges two sorted arrays into one sorted array.
 * @param {number[]} left - The left sorted array.
 * @param {number[]} right - The right sorted array.
 * @returns {number[]} The merged sorted array.
 */
function mergeSortedArrays(left, right) {
  const mergedLength = left.length + right.length;
  const merged = new Array(mergedLength);

  let i = 0;
  let j = 0;
  let k = 0;

  while (i < left.length && j < right.length) {
    // Copy the lesser item from the front of each array.
    if (left[i] <= right[j]) {
      merged[k++] = left[i++];
    } else {
      merged[k++] = right[j++];
    }
  }

  // If one array was longer, there will still be items left in it.
  while (i < left.length) {
    merged[k++] = left[i++];
  }

  while (j < right.length) {
    merged[k++] = right[j++];
  }

  return merged;
}

describe("mergeSortedArrays", () => {
  it("Merges two sorted arrays into one sorted array", () => {
    const left = [1, 3, 5];
    const right = [2, 4, 6];
    const merged = mergeSortedArrays(left, right);
    expect(merged).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });
});

/**
 * Finds the median of the combined sorted array from two separate sorted
 * arrays. Linear time solution. Problem requires O(log(n + m)).
 * @param {number[]} nums1 - The first sorted array.
 * @param {number[]} nums2 - The second sorted array.
 * @returns {number} The median of the combined sorted array.
 */
function findMedianSortedArraysLinear(nums1, nums2) {
  const merged = mergeSortedArrays(nums1, nums2);
  const mid = Math.floor(merged.length / 2);
  if (merged.length % 2 === 0) {
    return (merged[mid - 1] + merged[mid]) / 2;
  }
  return merged[mid];
}

describe("findMedianSortedArrays", () => {
  it("example #1", () => {
    expect(findMedianSortedArraysLinear([1, 3], [2])).toBeCloseTo(2.0);
  });

  it("example #2", () => {
    expect(findMedianSortedArraysLinear([1, 2], [3, 4])).toBeCloseTo(2.5);
  });
});
