export function selectionSort<T>(array: T[]) {
  const newArray: T[] = [...array];
  const sortedArray: T[] = [];

  function checkArray(array: T[]) {
    let min: T = array[0];
    let minIndex: number = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] < min) {
        min = array[i];
        minIndex = i;
      }
    }
    array.splice(minIndex, 1);
    return min;
  }

  for (let j = 0; j < array.length; j++) {
    const result: T = checkArray(newArray);
    sortedArray.push(result);
  }

  return sortedArray;
}
