import { describe, it, expect, vi } from "vitest";

/**
 * Resolves a promise after the passed number of milliseconds.
 * @param {number} millis - Milliseconds to wait
 * @returns {Promise<void>} A promise resolved after millis time.
 */
function sleep(millis) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, millis);
  });
}

describe("sleep", () => {
  it("solves test case #1", async () => {
    vi.useFakeTimers();

    const start = Date.now();
    const promise = sleep(100);

    // Move timers so sleep resolves.
    vi.advanceTimersToNextTimer();

    await promise;
    const end = Date.now();
    const time = end - start;
    expect(time).toBeGreaterThanOrEqual(100);

    vi.useRealTimers();
  });

  it("solves test case #2", async () => {
    vi.useFakeTimers();

    const start = Date.now();
    const promise = sleep(200);

    // Move timers so sleep resolves.
    vi.advanceTimersToNextTimer();

    await promise;
    const end = Date.now();
    const time = end - start;
    expect(time).toBeGreaterThanOrEqual(200);
  });
});
