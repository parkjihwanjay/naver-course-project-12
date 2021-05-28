import { IColumn } from '../interfaces/IColumn';
import { cardList } from '../data';
import { swapItem } from '../utils';

const beforeSwap = [
  { title: 'group 1', items: ['1', '2', '3'] },
  { title: 'group 2', items: ['4', '5'] },
  { title: 'group 3', items: [] },
];
const afterSwap = [
  { title: 'group 2', items: ['4', '5'] },
  { title: 'group 1', items: ['1', '2', '3'] },
  { title: 'group 3', items: [] },
];

test('swap 0 index and 1 index in CardList', () => {
  expect(cardList).toStrictEqual(beforeSwap);
  swapItem<IColumn>(cardList, 0, 1);
  expect(cardList).toStrictEqual(afterSwap);
});
