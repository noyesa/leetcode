import { describe, it, expect } from "vitest";

/**
 * Implementation of the ListNode class from the leetcode question, with some
 * convenient helpers for declaring and comparing them..
 */
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }

  /**
   * Compares this list with another list. They are equal if they contain the
   * same node values in the same order.
   * @param {ListNode} otherList - Other list to compare this list to
   * @returns {boolean} Are the lists equal?
   */
  isEqual(otherList) {
    if (this === otherList) {
      return true;
    }

    if (!otherList) {
      return false;
    }

    let h1 = this;
    let h2 = otherList;
    while (h1 && h2) {
      if (h1.val !== h2.val) {
        return false;
      }
      h1 = h1.next;
      h2 = h2.next;
    }

    return !(h1 || h2);
  }

  /**
   * Builds a linked list of list nodes from an array.
   * @param {number[]} nums - Numbers from which to build list
   * @returns {ListNode} Root node of the output list
   */
  static fromArray(nums) {
    return !nums || nums.length === 0
      ? null
      : nums.reduceRight((next, num) => new ListNode(num, next), null);
  }
}

describe("ListNode", () => {
  it("sets its default values correctly", () => {
    // No arguments use defaults
    const node = new ListNode();
    expect(node.val).toBe(0);
    expect(node.next).toBeNull();
  });

  it("sets properties to the passed values", () => {
    const dummyNode = new ListNode();
    const val = Date.now();
    const node = new ListNode(val, dummyNode);
    expect(node.val).toBe(val);
    expect(node.next).toBe(dummyNode);
  });

  describe("isEqual", () => {
    it("returns false when an empty value is passed", () => {
      const list = ListNode.fromArray([1, 2, 3]);
      expect(list.isEqual()).toBe(false);
      expect(list.isEqual(null)).toBe(false);
    });

    it("returns false when different lists are passed", () => {
      const list1 = ListNode.fromArray([1, 2, 3]);
      const list2 = ListNode.fromArray([3, 4, 5]);
      expect(list1.isEqual(list2)).toBe(false);
    });

    it("returns true when the same list is passed", () => {
      const list = ListNode.fromArray([1, 2, 3]);
      expect(list.isEqual(list)).toBe(true);
    });

    it("returns true when different lists of equal length and values is passed", () => {
      const list1 = ListNode.fromArray([1, 2, 3]);
      const list2 = ListNode.fromArray([1, 2, 3]);
      expect(list1.isEqual(list2)).toBe(true);
    });
  });

  describe("fromArray", () => {
    it("returns null for an empty array", () => {
      expect(ListNode.fromArray([])).toBeNull();
    });

    it("correctly builds ListNode lists from array", () => {
      const list = ListNode.fromArray([1, 2, 3]);
      expect(list.val).toBe(1);
      expect(list.next.val).toBe(2);
      expect(list.next.next.val).toBe(3);
      expect(list.next.next.next).toBeNull();
    });
  });
});

/**
 * Adds together two numbers stored as reverse-order linked lists of their
 * digits.
 * @param {ListNode} l1 - The first number.
 * @param {ListNode} l2 - The second number.
 * @returns {ListNode} The digits of the sum of the two input numbers in
 *  reverse order
 */
function addTwoNumbers(l1, l2) {
  let h1 = l1;
  let h2 = l2;
  let carry = false;
  const dummyNode = new ListNode();
  let out = dummyNode;

  while (h1 || h2) {
    let sum = 0;

    if (carry) {
      sum += 1;
      carry = false;
    }

    if (h1) {
      sum += h1.val;
      h1 = h1.next;
    }

    if (h2) {
      sum += h2.val;
      h2 = h2.next;
    }

    if (sum > 9) {
      sum -= 10;
      carry = true;
    }

    const newNode = new ListNode(sum);
    out.next = newNode;
    out = newNode;
  }

  if (carry) {
    out.next = new ListNode(1);
  }

  return dummyNode.next;
}

describe("addTwoNumbers", () => {
  it("example #1", () => {
    expect(
      addTwoNumbers(
        ListNode.fromArray([2, 4, 3]),
        ListNode.fromArray([5, 6, 4]),
      ).isEqual(ListNode.fromArray([7, 0, 8])),
    ).toBe(true);
  });

  it("example #2", () => {
    expect(
      addTwoNumbers(ListNode.fromArray([0]), ListNode.fromArray([0])).isEqual(
        ListNode.fromArray([0]),
      ),
    );
  });

  it("example #3", () => {
    const l1 = ListNode.fromArray([9, 9, 9, 9, 9, 9, 9]);
    const l2 = ListNode.fromArray([9, 9, 9, 9]);
    const result = addTwoNumbers(l1, l2);
    expect(result.isEqual(ListNode.fromArray([8, 9, 9, 9, 0, 0, 0, 1]))).toBe(
      true,
    );
  });
});
