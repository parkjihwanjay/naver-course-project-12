/* eslint-disable no-param-reassign */
interface Item {
  title: string;
  id: string;
}

export const findById = (array: Array<Item>, id: string): { item: Item; index: number } => {
  const item = array.find((el) => el.id === id);
  const index = array.findIndex((el) => el.id === id);
  return { item, index };
};

export const deleteById = (array: Array<Item>, id: string): undefined => {
  const { index } = findById(array, id);
  if (index < 0) return;
  array.splice(index, 1);
};

export const swapItem = <T>(array: Array<T>, index1: number, index2: number): undefined => {
  if (!array || !array.length) return;
  if (index1 < 0 || index2 < 0) return;
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};
