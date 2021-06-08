import { findById, updateValues } from '../utils';
import initialData from './initialData';

const afterUpdate = { id: '5', content: 'changed', title: 'changed', date: new Date('2021-02-07'), label: 'red' };

test('update object with existing object', () => {
  const testData = [...initialData];
  const column = findById(testData, '1');
  const item = column.item.items[0];
  updateValues(item, { title: 'changed', content: 'changed' });
  expect(item).toStrictEqual(afterUpdate);
});
