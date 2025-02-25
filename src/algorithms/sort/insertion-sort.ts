export function insertionSort<T>(array: T[]) {
  const sortedArray: T[] = [array[0]];

  for (let i = 1; i < array.length; i++) {
    if (array[i] < sortedArray[0]) {
      sortedArray.unshift(array[i]);
    } else if (array[i] > sortedArray[sortedArray.length - 1]) {
      sortedArray.push(array[i]);
    } else {
      for (let j = 1; j < sortedArray.length; j++) {
        if (array[i] < sortedArray[j]) {
          sortedArray.splice(j, 0, array[i]);
          break;
        }
      }
    }
  }
  return sortedArray;
}
