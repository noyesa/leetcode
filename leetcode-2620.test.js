import { describe, it, expect } from "vitest";

function createCounter(n) {
  return function () {
    return n++;
  };
}

describe("createCounter", () => {
  it("solves test case #1", () => {
    const counter = createCounter(10);
    expect(counter()).toBe(10);
    expect(counter()).toBe(11);
    expect(counter()).toBe(12);
  });

  it("solves test case #2", () => {
    const counter = createCounter(-2);
    expect(counter()).toBe(-2);
    expect(counter()).toBe(-1);
    expect(counter()).toBe(0);
    expect(counter()).toBe(1);
    expect(counter()).toBe(2);
  });
});
