import { describe, it, expect, vi } from "vitest";

/**
 * Improves the performance of a function by caching previous results in
 * memory and looking them up rather than recomputing each time.
 * @param {function} fn - The function to memoize
 * @returns {function} A memoized copy of fn
 */
function memoize(fn) {
  // Map between arguments JSON and return values.
  const memo = new Map();
  return function () {
    const argString = JSON.stringify(arguments);
    if (memo.has(argString)) {
      return memo.get(argString);
    }
    const value = fn(...arguments);
    memo.set(argString, value);
    return value;
  };
}

describe("memoize", () => {
  it("solves test case #1", () => {
    const sum = vi.fn((a, b) => a + b);
    const memoized = memoize(sum);
    expect(memoized(2, 2)).toBe(4);
    expect(memoized(2, 2)).toBe(4);
    expect(sum).toHaveBeenCalledOnce();
    expect(memoized(1, 2)).toBe(3);
    expect(sum).toHaveBeenCalledTimes(2);
  });

  it("solves test case #2", () => {
    const factorial = (n) => (n <= 1 ? 1 : factorial(n - 1) * n);
    const factorialSpy = vi.fn(factorial);
    const memoized = memoize(factorialSpy);
    expect(memoized(2)).toBe(2);
    expect(memoized(3)).toBe(6);
    expect(memoized(2)).toBe(2);
    expect(factorialSpy).toHaveBeenCalledTimes(2);
    expect(memoized(3)).toBe(6);
    expect(factorialSpy).toHaveBeenCalledTimes(2);
  });

  it("solves test case #3", () => {
    const fib = (n) => (n <= 1 ? 1 : fib(n - 1) + fib(n - 2));
    const fibSpy = vi.fn(fib);
    const memoized = memoize(fibSpy);
    expect(memoized(5)).toBe(8);
    expect(fibSpy).toHaveBeenCalledOnce();
  });
});
