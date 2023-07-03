import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 6, b: 3, action: Action.Add, expected: 9 },
  { a: 6, b: 3, action: Action.Subtract, expected: 3 },
  { a: 6, b: 3, action: Action.Multiply, expected: 18 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 6, b: 3, action: Action.Exponentiate, expected: 216 },
  { a: 6, b: 3, action: 'Action.Add', expected: null },
  { a: '6', b: '3', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected when a = $a, b = $b, action = $action',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
