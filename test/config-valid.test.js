const { configValid } = require('../validator');

describe("Config validation", () => {
  test("return config", () => {
    const config = ['-c','A-C1-R0'];
    expect(configValid(config)).toBe('A-C1-R0');
  });
  test("return null", () => {
    const config = ['-c','A-'];
    expect(configValid(config)).toBe(null);
  });
  test("return config", () => {
    const config = ['-c','R0'];
    expect(configValid(config)).toBe('R0');
  });
});