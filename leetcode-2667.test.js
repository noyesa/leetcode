import { describe, it, expect } from "vitest";

function createHelloWorld() {
  return function (...args) {
    return "Hello World";
  };
}

describe('Write a function that always returns a new function that returns "hello world"', () => {
  it('always returns a function that returns "Hello, World"', () => {
    const f = createHelloWorld();
    expect(f).toBeTypeOf("function");
    expect(f()).toBe("Hello World");
  });

  it('returns "hello world" regardless of arguments', () => {
    const f = createHelloWorld();
    expect(f({}, null, 42)).toBe("Hello World");
  });
});
