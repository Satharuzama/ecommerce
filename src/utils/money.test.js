import { describe, expect, it } from "vitest";
import { formatMoney } from "./money";

describe("formatMoney", () => {
  it("formats cents as rounded Indian rupees", () => {
    expect(formatMoney(1999)).toBe("₹20");
  });

  it("divides cents by 100 and rounds to whole rupees", () => {
    expect(formatMoney(1090)).toBe("₹11");
    expect(formatMoney(100)).toBe("₹1");
  });
  it("formats 0 cents as zero rupees", () => {
    expect(formatMoney(0)).toBe("₹0");
  });
  it("formats negative amounts as Indian rupees", () => {
    expect(formatMoney(-999)).toBe("-₹10");
    expect(formatMoney(-100)).toBe("-₹1");
  });
});
