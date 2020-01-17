import { Component } from "vue";

function add(num1: number, num2: number): number {
  return num1 + num2;
}

describe("kaikeba", () => {
  it("测试add函数", function() {
    expect(add(1, 3)).toBe(4);
    expect(add(1, 3)).toBe(4);
    expect(add(-2, 3)).toBe(1);
  });
});

import KaikebaComp from "@/components/Kaikeba.vue";

describe("KaikebaComp", () => {
  it("created生命周期", () => {
    let kkb: Component = new KaikebaComp();
    expect(typeof kkb.message).toBe("string");
  });
});
