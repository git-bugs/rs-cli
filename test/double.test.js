const { doubleCheck } = require('../validator');

describe('Double arguments check', () => {
  test('throw error', () => {
    const args = ['-c', 'C1-A', '-i', 'input.txt', '--input', 'input.txt'];
    expect(() => doubleCheck(args)).toThrow('Duplicate argument - "input"!');
  });
  test('', () => {
    const args = ['-c', 'C1-A', '--input', 'input.txt'];
    expect(() => doubleCheck(args)).not.toThrow();
  });
  test('throw error', () => {
    const args = ['-c', 'C1-A', '--config'];
    expect(() => doubleCheck(args)).toThrow('Duplicate argument - "config"!');
  });
});