const { fileCheck } = require('../validator');

describe('testing file access', () => {
  test('return true for "input.txt" access', () => {
    const file = 'input.txt';
    expect(() => fileCheck(file)).not.toThrow();
  });
  test('throw error to "output/output.txt" access', () => {
    const file = 'output/output.txt';
    expect(() => fileCheck(file)).toThrow('No Read or Write access to "output/output.txt"!');
  });
  test('throw error to "only-read-example.txt" access', () => {
    const file = 'only-read-example.txt';
    expect(() => fileCheck(file)).toThrow('No Read or Write access to "only-read-example.txt"!');
  });
});