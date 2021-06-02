import { IColumn } from '../interfaces/IColumn';
import { swapItem } from '../utils';

const beforeSwap = [
  { title: 'group 1', items: ['1', '2', '3'], id: '1' },
  { title: 'group 2', items: ['4', '5'], id: '2' },
  { title: 'group 3', items: [], id: '3' },
];
const afterSwap = [
  { title: 'group 2', items: ['4', '5'], id: '2' },
  { title: 'group 1', items: ['1', '2', '3'], id: '1' },
  { title: 'group 3', items: [], id: '3' },
];

test('swap 0 index and 1 index in CardList', () => {
  swapItem<IColumn>(beforeSwap, 0, 1);
  expect(beforeSwap).toStrictEqual(afterSwap);
});
