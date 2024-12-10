import { describe, it, expect, vi } from "vitest";

/**
 * Sets a function to be called at the end of a timer if it is not cancelled
 * first. Return value is a function that can be invoked to cancel the timer
 * any time before it is invoked.
 * @param {function} fn - Function to call.
 * @param {*[]} args - Args to supply to function when invoked.
 * @param {number} t - Time in milliseconds to wait before calling fn.
 * @returns {function(): boolean} Function that can be called to cancel timer
 */
function cancellable(fn, args, t) {
  let isCancelled = false;

  setTimeout(() => {
    if (!isCancelled) {
      fn(...args);
    }
  }, t);

  return () => {
    isCancelled = true;
  };
}

describe("cancellable", () => {
  it("passes test case #1", () => {
    const fn = vi.fn((x) => x * 5);

    vi.useFakeTimers();

    const cancelFn = vi.fn(cancellable(fn, [2], 20));
    setTimeout(cancelFn, 50);

    // Advance to after the cancellable firing but before the cancel.
    vi.advanceTimersByTime(25);

    expect(fn).toHaveBeenCalledOnce();
    expect(cancelFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(25);
    expect(cancelFn).toHaveBeenCalled();

    vi.useRealTimers();
  });

  it("passes test case #2", () => {
    const fn = vi.fn((x) => x ** 2);

    vi.useFakeTimers();
    const cancelFn = vi.fn(cancellable(fn, [2], 100));

    setTimeout(cancelFn, 50);
    vi.advanceTimersByTime(25);

    expect(fn).not.toHaveBeenCalled();
    expect(cancelFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(25);
    expect(fn).not.toHaveBeenCalled();
    expect(cancelFn).toHaveBeenCalled();

    // Advance past when the function was supposed to be called.
    vi.advanceTimersByTime(100);
    expect(fn).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it("passes test case #3", () => {
    const fn = vi.fn((x1, x2) => x1 * x2);

    vi.useFakeTimers();
    const cancelFn = vi.fn(cancellable(fn, [2, 4], 30));

    setTimeout(cancelFn, 100);

    vi.advanceTimersByTime(29);
    expect(fn).not.toHaveBeenCalled();
    expect(cancelFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalled();
    expect(cancelFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(cancelFn).toHaveBeenCalled();

    vi.useRealTimers();
  });
});
