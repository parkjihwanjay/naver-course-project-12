/* eslint-disable no-param-reassign */
const swapItem = <T>(array: Array<T>, index1: number, index2: number): undefined => {
  if (!array || !array.length) return;
  if (index1 < 0 || index2 < 0) return;
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};

export default swapItem;
