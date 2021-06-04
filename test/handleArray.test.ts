import { deleteById, swapItem } from '../utils';
import { IColumn } from '../interfaces/IColumn';

const initialData = [
  {
    title: 'group 1',
    items: [
      { id: '4', content: '2' },
      { id: '5', content: '2' },
      { id: '6', content: '2' },
    ],
    id: '1',
  },
  {
    title: 'group 2',
    items: [
      { id: '7', content: '2' },
      { id: '8', content: '2' },
    ],
    id: '2',
  },
  { title: 'group 3', items: [], id: '3' },
];

const afterDelete = [
  {
    title: 'group 1',
    items: [
      { id: '4', content: '2' },
      { id: '5', content: '2' },
      { id: '6', content: '2' },
    ],
    id: '1',
  },
  { title: 'group 3', items: [], id: '3' },
];

const afterSwap = [
  {
    title: 'group 2',
    items: [
      { id: '7', content: '2' },
      { id: '8', content: '2' },
    ],
    id: '2',
  },
  {
    title: 'group 1',
    items: [
      { id: '4', content: '2' },
      { id: '5', content: '2' },
      { id: '6', content: '2' },
    ],
    id: '1',
  },
  { title: 'group 3', items: [], id: '3' },
];

test('swap 0 index and 1 index in CardList', () => {
  const swapped = swapItem<IColumn>(initialData, 0, 1);
  expect(swapped).toStrictEqual(afterSwap);
});

test('delete array item that has id 2', () => {
  const deleted = deleteById(initialData, '2');
  expect(deleted).toStrictEqual(afterDelete);
});
