const { doubleCheck } = require('../validator');

describe('Double arguments check', () => {
  test('It should return false from this arguments', () => {
    const args = ['-c', 'C1-A', '-i', 'input.txt', '--input', 'input.txt'];
    expect(doubleCheck(args)).toBe(false);
  });
  test('It should return true from this arguments', () => {
    const args = ['-c', 'C1-A','--input', 'input.txt'];
    expect(doubleCheck(args)).toBe(true);
  });
  test('It should return false from this arguments', () => {
    const args = ['-c', 'C1-A', '--config'];
    expect(doubleCheck(args)).toBe(false);
  });
});