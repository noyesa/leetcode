import { describe, it, expect, vi } from "vitest";

/**
 * Takes a function and returns another function that calls the first
 * function exactly once.
 * @param {function} fn - Function to call only once.
 * @returns {function} Function that calls fn at most once
 */
function once(fn) {
  let isCalled = false;
  return function () {
    if (!isCalled) {
      isCalled = true;
      return fn(...arguments);
    }
  };
}

describe("once", () => {
  it("solves test case #1", () => {
    const fn = vi.fn((a, b, c) => a + b + c);
    const onceified = once(fn);
    expect(onceified(1, 2, 3)).toBe(6);
    expect(onceified(2, 3, 4)).toBeUndefined();
    expect(fn).toHaveBeenCalledOnce();
  });

  it("solves test case #2", () => {
    const fn = vi.fn((a, b, c) => a * b * c);
    const onceified = once(fn);
    expect(onceified(5, 7, 4)).toBe(140);
    expect(onceified(2, 3, 6)).toBeUndefined();
    expect(onceified(4, 6, 8)).toBeUndefined();
    expect(fn).toHaveBeenCalledOnce();
  });
});
