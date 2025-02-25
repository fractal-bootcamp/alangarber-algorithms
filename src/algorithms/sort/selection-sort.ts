export function selectionSort<T>(array: T[]) {
  const newArray: T[] = [...array];
  const sortedArray: T[] = [];

  // using as a closure because I wanrt it to directly splice newArray
  function findAndRemoveMin(array: T[]) {
    let minIndex: number = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] < array[minIndex]) {
        minIndex = i;
      }
    }
    return array.splice(minIndex)[0];
  }

  for (let j = 0; j < array.length; j++) {
    const min: T = findAndRemoveMin(newArray);
    sortedArray.push(min);
  }

  return sortedArray;
}
