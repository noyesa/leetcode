import { describe, it, expect } from "vitest";

/**
 * Creates a counter object with increment, decrement and reset methods
 * for manipulating the internal value.
 * @param {number} init - Initial value for the counter
 * @returns {{ increment(): number, decrement(): number, reset(): void}} Counter object.
 */
function createCounter(init) {
  /**
   * Stores the current value of the timer.
   * @type {number}
   */
  let value = init;

  return {
    /**
     * Resets counter back to the initial value.
     * @returns {number} New value for the counter.
     */
    reset() {
      return (value = init);
    },

    /**
     * Increments the current value by one.
     * @returns {number} The new value of the counter.
     */
    increment() {
      return ++value;
    },

    /**
     * Decrements the current value by one.
     * @returns {number} The new value of the counter.
     */
    decrement() {
      return --value;
    },
  };
}

describe("Counter II", () => {
  it("solves testcase #1", () => {
    const counter = createCounter(5);
    expect(counter.increment()).toBe(6);
    expect(counter.reset()).toBe(5);
    expect(counter.decrement()).toBe(4);
  });

  it("solves testcase #2", () => {
    const counter = createCounter(0);
    expect(counter.increment()).toBe(1);
    expect(counter.increment()).toBe(2);
    expect(counter.decrement()).toBe(1);
    expect(counter.reset()).toBe(0);
    expect(counter.reset()).toBe(0);
  });
});
