export function mergeSort<T>(array: T[]) {
  if (array.length < 2) {
    return array;
  }

  const leftHalf: T[] = array.slice(0, Math.floor(array.length / 2));
  const rightHalf: T[] = array.slice(Math.floor(array.length / 2));
  const sortedLeftHalf: T[] = mergeSort(leftHalf);
  const sortedRightHalf: T[] = mergeSort(rightHalf);
  return merge(sortedLeftHalf, sortedRightHalf);
}

export function merge<T>(firstArray: T[], secondArray: T[]) {
  const sortedArray: T[] = [];
  let i = 0;
  let j = 0;
  while (i < firstArray.length && j < secondArray.length) {
    if (firstArray[i] <= secondArray[j]) {
      sortedArray.push(firstArray[i]);
      i++;
    } else {
      sortedArray.push(secondArray[j]);
      j++;
    }
  }
  while (i < firstArray.length) {
    sortedArray.push(firstArray[i]);
    i++;
  }
  while (j < secondArray.length) {
    sortedArray.push(secondArray[j]);
    j++;
  }
  return sortedArray;
}
