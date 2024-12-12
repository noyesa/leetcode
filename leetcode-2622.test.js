import { describe, it, vi, expect } from "vitest";

const CACHE_CHECK_RESPONSES = Object.freeze({
  FOUND: 1,
  NOT_FOUND: 2,
  EXPIRED: 3,
});

class TimeLimitedCache {
  #cache = new Map();

  /**
   * @param {number} key - Key for the record
   * @param {number} value - Value to add for key
   * @param {number} duration - time in ms until expiration
   * @returns {boolean} True if the set already had key, false otherwise
   */
  set(key, value, duration) {
    const response = this.#removeIfExpired(key);
    this.#cache.set(key, {
      value,
      expiresAt: Date.now() + duration,
    });
    return response === CACHE_CHECK_RESPONSES.FOUND;
  }

  /**
   * Returns value associated with key if it exists, otherwise -1.
   * @param {number} key - The key to look up the value of.
   * @returns {number} Value associated with key, or -1
   */
  get(key) {
    if (this.#removeIfExpired(key) === CACHE_CHECK_RESPONSES.FOUND) {
      return this.#cache.get(key).value;
    }
    return -1;
  }

  /**
   * Determines the number of elements present in the cache.
   * @returns {number} The number of elements in the cache.
   */
  count() {
    let count = 0;
    this.#cache.forEach(({ expiresAt }, key) => {
      // We know the entry exists because we're iterating over it, but we need
      // to check if it's expired.
      if (this.#removeIfExpired(key) !== CACHE_CHECK_RESPONSES.EXPIRED) {
        ++count;
      }
    });
    return count;
  }

  /**
   * Removes an entry from the cache if it has expired.
   * @param {number} key - The key of the cache item to remove if expired.
   * @returns {boolean} True if the element was found and removed, false otherwise.
   */
  #removeIfExpired(key) {
    if (this.#cache.has(key)) {
      const { expiresAt } = this.#cache.get(key);
      if (Date.now() > expiresAt) {
        this.#cache.delete(key);
        return CACHE_CHECK_RESPONSES.EXPIRED;
      }
      return CACHE_CHECK_RESPONSES.FOUND;
    }
    return CACHE_CHECK_RESPONSES.NOT_FOUND;
  }
}

describe("TimeLimitedCache", () => {
  it("solves test case #1", () => {
    vi.useFakeTimers();

    // t=0
    const tlc = new TimeLimitedCache();
    expect(tlc.set(1, 42, 100)).toBe(false);

    // t=50
    vi.advanceTimersByTime(50);
    expect(tlc.get(1)).toBe(42);

    vi.advanceTimersByTime(49);
    expect(tlc.count()).toBe(1);

    vi.advanceTimersByTime(151);
    expect(tlc.get(1)).toBe(-1);

    vi.useRealTimers();
  });

  it("solves test case #2", () => {
    vi.useFakeTimers();

    // t=0
    const tlc = new TimeLimitedCache();
    expect(tlc.set(1, 42, 50)).toBe(false);

    // t=40
    vi.advanceTimersByTime(40);
    expect(tlc.set(1, 50, 100)).toBe(true);

    // t=50
    vi.advanceTimersByTime(10);
    expect(tlc.get(1)).toBe(50);

    // t=120
    vi.advanceTimersByTime(70);
    expect(tlc.get(1)).toBe(50);

    // t=200
    vi.advanceTimersByTime(80);
    expect(tlc.get(1)).toBe(-1);

    // t=250
    vi.advanceTimersByTime(50);
    expect(tlc.count()).toBe(0);

    vi.useRealTimers();
  });
});
