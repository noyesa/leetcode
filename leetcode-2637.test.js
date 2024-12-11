import { describe, it, vi, expect } from "vitest";

/**
 * Given an async function and a time in milliseconds, return a new time
 * limited version of the input function.
 * @param {function} fn - Async function that will be time limited.
 * @param {number} t - Time limit for the async function.
 */
function timeLimit(fn, t) {
  return function (...args) {
    return new Promise((res, rej) => {
      const timeout = setTimeout(() => {
        rej("Time Limit Exceeded");
      }, t);

      fn(...args)
        .then(res)
        .catch(rej)
        .finally(() => {
          clearTimeout(timeout);
        });
    });
  };
}

describe("timeLimit", () => {
  it("solves test case #1", async () => {
    vi.useFakeTimers();

    const fn = vi.fn(async (n) => {
      await new Promise((res) => setTimeout(res, 100));
      return n * n;
    });

    const limited = timeLimit(fn, 50);
    const limitedResponse = limited(5);
    vi.advanceTimersByTime(50);
    await expect(limitedResponse).rejects.toThrowError();

    vi.useRealTimers();
  });

  it("solves test case #2", async () => {
    vi.useFakeTimers();

    const fn = vi.fn(async (n) => {
      await new Promise((res) => setTimeout(res, 100));
      return n * n;
    });

    const limited = timeLimit(fn, 150);
    const limitedResponse = limited(5);
    vi.advanceTimersByTime(101);
    await expect(limitedResponse).resolves.toBe(25);

    vi.useRealTimers();
  });

  it("solves test case #3", async () => {
    vi.useFakeTimers();

    const fn = vi.fn(async (a, b) => {
      await new Promise((res) => setTimeout(res, 120));
      return a + b;
    });

    const limited = timeLimit(fn, 150);
    const limitedResponse = limited(5, 10);

    // t=120
    vi.advanceTimersByTime(120);
    await expect(limitedResponse).resolves.toBe(15);

    vi.useRealTimers();
  });

  it("solves test case #4", async () => {
    vi.useFakeTimers();

    const fn = vi.fn(async () => {
      throw "Error";
    });

    const limited = timeLimit(fn, 1000);
    const limitedResponse = limited();
    vi.advanceTimersByTime(1);
    await expect(limitedResponse).rejects.toThrowError();

    vi.useRealTimers();
  });
});
