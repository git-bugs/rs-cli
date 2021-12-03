const { configCheck } = require('../validator');

describe('Config check', () => {
  test('throw error', () => {
    const args = ['-i', 'input.txt', '--input', 'input.txt'];
    expect(()=>configCheck(args)).toThrow('No configuration set!');
  });
  test('', () => {
    const args = ['-c', 'C1-A', '--input', 'input.txt'];
    expect(()=>configCheck(args)).not.toThrow();
  });
  test('', () => {
    const args = ['--config', 'C1-A-R0-R1'];
    expect(()=>configCheck(args)).not.toThrow();
  });
});