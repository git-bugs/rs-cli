const { validator } = require('../validator');

describe('validation arguments', () => {
  test('return arguments', () => {
    const args = ['-c', 'C1-A', '--input', 'input.txt'];
    expect(validator(args)).toEqual({ input: 'input.txt', output: null, config: 'C1-A' });
  });
  test('return arguments', () => {
    const args = ['-c', 'C1-A-R0-R1'];
    expect(validator(args)).toEqual({ input: null, output: null, config: 'C1-A-R0-R1' });
  });
  test('return arguments', () => {
    const args = ['-c', 'C1-A-R1-A-A', '--input', 'input.txt', '-o', 'output.txt'];
    expect(validator(args)).toEqual({ input: 'input.txt', output: 'output.txt', config: 'C1-A-R1-A-A' });
  });
});