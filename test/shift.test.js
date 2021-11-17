const { getShift } = require('../cipher');

describe('get shift from code', () => {
  test('return shift', () => {
    const code = 'A';
    expect(getShift(code, 12)).toBe(1);
  });
  test('return shift', () => {
    const code = 'R0';
    expect(getShift(code)).toBe(-8);
  });
  test('return shift', () => {
    const code = 'C1';
    expect(getShift(code)).toBe(1);
  });
});