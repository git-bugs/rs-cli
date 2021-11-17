const { encryption } = require('../cipher');

describe('encryption data', () => {
  test('return new data', () => {
    const code = 'A';
    const data = 'This is secret!!!'
    expect(encryption(data, code)).toBe('Gsrh rh hvxivg!!!');
  });
  test('return new data', () => {
    const code = 'C1';
    const data = 'This is secret!!!'
    expect(encryption(data, code)).toBe('Uijt jt tfdsfu!!!');
  });
  test('return new data', () => {
    const code = 'R0';
    const data = 'This is secret!!!'
    expect(encryption(data, code)).toBe('Lzak ak kwujwl!!!');
  });
});