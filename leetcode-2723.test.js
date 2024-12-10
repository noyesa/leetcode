import { describe, it, expect } from "vitest";

/**
 * Given two promises, return a new promise that resolves to the sum of the
 * values of the input promises.
 * @param {Promise} promise1 - The first promise.
 * @param {Promise} promise2 - The second promise.
 * @returns {Promise} A promise that resolves to the sume of promise1 and promise2
 */
function addTwoPromises(promise1, promise2) {
  return Promise.all([promise1, promise2]).then(([v1, v2]) => v1 + v2);
}

describe("addTwoPromises", () => {
  it("solves test case #1", async () => {
    const promise1 = new Promise((resolve) => setTimeout(() => resolve(2), 20));
    const promise2 = new Promise((resolve) => setTimeout(() => resolve(5), 60));
    expect(await addTwoPromises(promise1, promise2)).toBe(7);
  });

  it("solves test case #2", async () => {
    const promise1 = new Promise((resolve) =>
      setTimeout(() => resolve(10), 50),
    );
    const promise2 = new Promise((resolve) =>
      setTimeout(() => resolve(-12), 30),
    );
    expect(await addTwoPromises(promise1, promise2)).toBe(-2);
  });
});
