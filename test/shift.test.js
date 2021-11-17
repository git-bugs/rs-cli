const { getShift } = require('../cipher');

describe("get shift from code", () => {
  test("return config", () => {
    const code = 'A';
    expect(getShift(code,2)).toBe(21);
  });
  test("return null", () => {
    const code ='R0';
    expect(getShift(code)).toBe(-8);
  });
  test("return config", () => {
    const code = 'C1';
    expect(getShift(code)).toBe(1);
  });
});