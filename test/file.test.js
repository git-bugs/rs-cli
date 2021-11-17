const { fileCheck } = require('../validator');

describe('file access', () => {
  test('return true for "input.txt" access', () => {
    const file = 'input.txt';
    expect(fileCheck(file)).toBe(true);
  });
  test('return false to "output/output.txt" access', () => {
    const file = 'output/output.txt';
    expect(fileCheck(file)).toBe(false);
  });
  test('return false to "only-read-example.txt" access', () => {
    const file = 'only-read-example.txt';
    expect(fileCheck(file)).toBe(false);
  });
});