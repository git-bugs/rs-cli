const CustomError = require('../error');
const { errorHandler } = require('../validator');

describe('testing custom error', () => {
  test('custom error', () => {
    const error = new CustomError('new custom error');
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { });
    const mockStdout = jest.spyOn(process.stderr, 'write').mockImplementation(() => { });
    errorHandler(error);
    expect(mockStdout).toHaveBeenCalledWith('new custom error\n');
    expect(mockExit).toHaveBeenCalledWith(1);
    mockExit.mockRestore();
    mockStdout.mockRestore();
  });
  test('throw not custom error', () => {
    const error = 'not custom error';
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { });
    const mockStdout = jest.spyOn(process.stderr, 'write').mockImplementation(() => { });
    expect(() => errorHandler(error)).toThrow('not custom error');
    expect(mockExit).not.toHaveBeenCalled();
    mockExit.mockRestore();
    mockStdout.mockRestore();
  });
});