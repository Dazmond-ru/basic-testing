import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const linkedArr = [1, 2, 3, 4];
  const linkedList = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: {
            value: null,
            next: null,
          },
        },
      },
    },
  };

  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(linkedArr)).toStrictEqual(linkedList);
  });

  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(linkedArr)).toMatchSnapshot();
  });
});
