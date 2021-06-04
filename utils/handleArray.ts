/* eslint-disable no-param-reassign */
interface Item {
  id: string;
}

const deleteById = (array: Array<Item>, id: string): undefined => {
  const deleteIndex = array.findIndex((el) => el.id === id);
  if (deleteIndex < 0) return;
  array.splice(deleteIndex, 1);
};

const swapItem = <T>(array: Array<T>, index1: number, index2: number): undefined => {
  if (!array || !array.length) return;
  if (index1 < 0 || index2 < 0) return;
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};

export { swapItem, deleteById };
