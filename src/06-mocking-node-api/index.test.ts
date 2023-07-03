import path from 'node:path';
import fs from 'node:fs';

import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(mockCallback, 1000);
    expect(setTimeout).toHaveBeenCalledWith(mockCallback, 1000);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();

    doStuffByTimeout(mockCallback, 1000);
    expect(mockCallback).not.toBeCalled();

    jest.runAllTimers();

    expect(mockCallback).toBeCalled();
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(mockCallback, 1000);
    expect(setInterval).toHaveBeenCalledWith(mockCallback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(mockCallback, 1000);

    expect(mockCallback).not.toBeCalled();

    jest.runOnlyPendingTimers();
    expect(mockCallback).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const filePath = jest.spyOn(path, 'join');

    await readFileAsynchronously('somename.txt');
    expect(filePath).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const file = await readFileAsynchronously('somename.txt');
    expect(file).toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue('somecontent');

    const fileContent = await readFileAsynchronously('somename.txt');
    expect(fileContent).toEqual('somecontent');
  });
});
