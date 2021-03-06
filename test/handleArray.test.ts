import { deleteById, swapItem, findById } from '../utils';
import { IColumn } from '../interfaces/IColumn';
import initialData from './initialData';

const afterDelete = [
  {
    title: 'group 1',
    items: [
      { id: '5', content: '2', title: 'title', date: new Date('2021-02-07'), label: 'red' },
      { id: '4', content: '2', title: 'title', date: new Date('2021-02-07'), label: 'red' },
      { id: '6', content: '2', title: 'title', date: new Date('2021-02-07'), label: 'red' },
    ],
    id: '1',
  },
  { title: 'group 3', items: [], id: '3' },
];

const afterSwap = [
  {
    title: 'group 2',
    items: [
      { id: '7', content: '2', title: 'title', date: new Date('2021-02-07'), label: 'red' },
      { id: '8', content: '2', title: 'title', date: new Date('2021-02-07'), label: 'red' },
    ],
    id: '2',
  },
  {
    title: 'group 1',
    items: [
      { id: '5', content: '2', title: 'title', date: new Date('2021-02-07'), label: 'red' },
      { id: '4', content: '2', title: 'title', date: new Date('2021-02-07'), label: 'red' },
      { id: '6', content: '2', title: 'title', date: new Date('2021-02-07'), label: 'red' },
    ],
    id: '1',
  },
  { title: 'group 3', items: [], id: '3' },
];

test('swap 0 index and 1 index in CardList', () => {
  const testData = [...initialData];
  swapItem<IColumn>(testData, 0, 1);
  expect(testData).toStrictEqual(afterSwap);
});

test('delete array item that has id 2', () => {
  const testData = [...initialData];
  deleteById(testData, '2');
  expect(testData).toStrictEqual(afterDelete);
});

test('find element that has id 2 in array', () => {
  const testData = [...initialData];
  const { item, index } = findById(testData, '1');
  expect(index).toBe(0);
  expect(item).toStrictEqual({
    title: 'group 1',
    items: [
      { id: '5', content: '2', title: 'title', date: new Date('2021-02-07'), label: 'red' },
      { id: '4', content: '2', title: 'title', date: new Date('2021-02-07'), label: 'red' },
      { id: '6', content: '2', title: 'title', date: new Date('2021-02-07'), label: 'red' },
    ],
    id: '1',
  });
});
