import { describe, it, expect, vi } from "vitest";

/**
 * @param {function} fn - Function to call on interval.
 * @param {*[]} args - Arguments to supply to call
 * @param {number} t - Interval in milliseconds
 * @returns {function} A function to cancel the interval
 */
function cancelableInterval(fn, args, t) {
  const interval = setInterval(() => {
    fn(...args);
  }, t);

  setTimeout(() => {
    fn(...args);
  }, 0);

  return () => {
    clearInterval(interval);
  };
}

describe("cancelableInterval", () => {
  it("solves test case #1", () => {
    vi.useFakeTimers();

    const fn = vi.fn((x) => x * 2);

    const cancel = vi.fn(cancelableInterval(fn, [4], 35));
    setTimeout(cancel, 190);

    expect(fn).not.toHaveBeenCalled();
    expect(cancel).not.toHaveBeenCalled();

    // t=1
    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenLastCalledWith(4);

    // t=35
    vi.advanceTimersByTime(34);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(4);
    expect(cancel).not.toHaveBeenCalled();

    // t=70
    vi.advanceTimersByTime(35);
    expect(fn).toHaveBeenCalledTimes(3);
    expect(fn).toHaveBeenLastCalledWith(4);
    expect(cancel).not.toHaveBeenCalled();

    // t=105
    vi.advanceTimersByTime(35);
    expect(fn).toHaveBeenCalledTimes(4);
    expect(fn).toHaveBeenLastCalledWith(4);
    expect(cancel).not.toHaveBeenCalled();

    // t=140
    vi.advanceTimersByTime(35);
    expect(fn).toHaveBeenCalledTimes(5);
    expect(fn).toHaveBeenLastCalledWith(4);
    expect(cancel).not.toHaveBeenCalled();

    // t=175
    vi.advanceTimersByTime(35);
    expect(fn).toHaveBeenCalledTimes(6);
    expect(fn).toHaveBeenLastCalledWith(4);
    expect(cancel).not.toHaveBeenCalled();

    // t=200
    vi.advanceTimersByTime(35);
    // Should not have more calls than the last tick.
    expect(fn).toHaveBeenCalledTimes(6);
    expect(cancel).toHaveBeenCalledOnce();

    vi.useRealTimers();
  });

  it("solves test case #2", () => {
    vi.useFakeTimers();

    const fn = vi.fn((x1, x2) => x1 * x2);
    const cancel = vi.fn(cancelableInterval(fn, [2, 5], 30));
    setTimeout(cancel, 165);

    // t=0
    expect(fn).not.toHaveBeenCalled();
    expect(cancel).not.toHaveBeenCalled();

    // t=1
    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenLastCalledWith(2, 5);
    expect(cancel).not.toHaveBeenCalled();

    // t=30
    vi.advanceTimersByTime(29);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(2, 5);
    expect(cancel).not.toHaveBeenCalled();

    // t=60
    vi.advanceTimersByTime(30);
    expect(fn).toHaveBeenCalledTimes(3);
    expect(fn).toHaveBeenLastCalledWith(2, 5);
    expect(cancel).not.toHaveBeenCalled();

    // t=90
    vi.advanceTimersByTime(30);
    expect(fn).toHaveBeenCalledTimes(4);
    expect(fn).toHaveBeenLastCalledWith(2, 5);
    expect(cancel).not.toHaveBeenCalled();

    // t=120
    vi.advanceTimersByTime(30);
    expect(fn).toHaveBeenCalledTimes(5);
    expect(fn).toHaveBeenLastCalledWith(2, 5);
    expect(cancel).not.toHaveBeenCalled();

    // t=150
    vi.advanceTimersByTime(30);
    expect(fn).toHaveBeenCalledTimes(6);
    expect(fn).toHaveBeenLastCalledWith(2, 5);
    expect(cancel).not.toHaveBeenCalled();

    // t=180
    vi.advanceTimersByTime(30);
    // Number of calls should not have changed.
    expect(fn).toHaveBeenCalledTimes(6);
    expect(cancel).toHaveBeenCalled();

    vi.useRealTimers();
  });

  it("solves test case #3", () => {
    vi.useFakeTimers();

    const fn = vi.fn((x1, x2, x3) => x1 + x2 + x3);
    const cancel = vi.fn(cancelableInterval(fn, [5, 1, 3], 50));
    setTimeout(cancel, 180);

    // t=0
    expect(fn).not.toHaveBeenCalled();
    expect(cancel).not.toHaveBeenCalled();

    // t=1
    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenLastCalledWith(5, 1, 3);
    expect(fn).toHaveLastReturnedWith(9);
    expect(cancel).not.toHaveBeenCalled();

    // t=50
    vi.advanceTimersByTime(49);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(5, 1, 3);
    expect(fn).toHaveLastReturnedWith(9);
    expect(cancel).not.toHaveBeenCalled();

    // t=100
    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(3);
    expect(fn).toHaveBeenLastCalledWith(5, 1, 3);
    expect(fn).toHaveLastReturnedWith(9);
    expect(cancel).not.toHaveBeenCalled();

    // t=150
    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(4);
    expect(fn).toHaveBeenLastCalledWith(5, 1, 3);
    expect(fn).toHaveLastReturnedWith(9);
    expect(cancel).not.toHaveBeenCalled();

    // t=200
    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(4);
    expect(cancel).toHaveBeenCalled();

    vi.useRealTimers();
  });
});
