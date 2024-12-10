import { describe, it, expect } from "vitest";

/**
 * Determines the length of the longest substring within s that contains no
 * repeating characters.
 * @param {string} s - String within which to find length of longest substring.
 * @returns {number} The length of the longest substring without repeating characters.
 */
function lengthOfLongestSubstring(s) {
  if (!s) {
    return 0;
  }

  let start = 0;
  // The input is non-empty, so the length is at least 1.
  let maxLen = 1;
  // Initialize the char tracking set with the first char.
  const chars = new Set([s.charAt(0)]);
  for (let end = 1; end < s.length; ++end) {
    const c = s.charAt(end);

    while (chars.has(c)) {
      chars.delete(s.charAt(start++));
    }

    maxLen = Math.max(maxLen, end - start + 1);
    chars.add(c);
  }
  return maxLen;
}

describe("lengthOfLongestSubstring", () => {
  it("example #1", () => {
    expect(lengthOfLongestSubstring("abcabcbb")).toBe(3);
  });

  it("example #2", () => {
    expect(lengthOfLongestSubstring("bbbbb")).toBe(1);
  });

  it("example #3", () => {
    expect(lengthOfLongestSubstring("pwwkew")).toBe(3);
  });
});
