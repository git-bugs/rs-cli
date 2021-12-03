const { configValid } = require('../validator');

describe('Config validation', () => {
  test('return config', () => {
    const config = ['-c', 'A-C1-R0'];
    expect(configValid(config)).toBe('A-C1-R0');
  });
  test('throw error', () => {
    const config = ['-c', 'A-'];
    expect(() => configValid(config)).toThrow('Incorrect configuration!');
  });
  test('throw error', () => {
    const config = ['-c', 'c1'];
    expect(() => configValid(config)).toThrow('Incorrect configuration!');
  });
  test('return config', () => {
    const config = ['-c', 'R0'];
    expect(configValid(config)).toBe('R0');
  });
});