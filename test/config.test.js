const { configCheck } = require('../validator');

describe("Config check", () => {
  test("return false", () => {
    const args = ['-i', 'input.txt', '--input', 'input.txt'];
    expect(configCheck(args)).toBe(false);
  });
  test("return true", () => {
    const args = ['-c', 'C1-A', '--input', 'input.txt'];
    expect(configCheck(args)).toBe(true);
  });
  test("return true", () => {
    const args = ['-c', 'C1-A', '--config'];
    expect(configCheck(args)).toBe(true);
  });
});