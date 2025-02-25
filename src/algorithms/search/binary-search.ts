export function binarySearchWithSorting<T>(
  array: T[],
  searchTerm: T,
  sortingFunction: (arr: T[]) => T[],
): T | undefined {
  // 1. you need to implement a sorting function here so that the array is sorted
  const sortedArray = sortingFunction(array);

  // 2. actually search
  function innerBinarySearch<T>(array: T[], searchTerm: T): T | undefined {
    if (array.length === 0) {
      return undefined;
    }

    const pivot: T = array[Math.floor(array.length / 2)];
    const leftHalf: T[] = array.slice(0, Math.floor(array.length / 2));
    const rightHalf: T[] = array.slice(Math.floor(array.length / 2) + 1);
    if (pivot === searchTerm) {
      return searchTerm;
    } else if (pivot > searchTerm) {
      return innerBinarySearch(leftHalf, searchTerm);
    } else if (pivot < searchTerm) {
      return innerBinarySearch(rightHalf, searchTerm);
    }
  }

  return innerBinarySearch(sortedArray, searchTerm);
}

export function binarySearch<T>(
  array: T[],
  searchTerm: T,
  offset: number = 0,
): number | undefined {
  if (array.length === 0) {
    return undefined;
  }

  const pivotIdx = Math.floor(array.length / 2);
  const pivot: T = array[pivotIdx];

  // offset is required to understand where our current array is
  // as an offset from the original array passed at the top of the recursion tree
  if (pivot === searchTerm) return pivotIdx + offset;
  if (pivot > searchTerm)
    return binarySearch(array.slice(0, pivotIdx), searchTerm);
  if (pivot < searchTerm)
    return binarySearch(array.slice(pivotIdx + 1), searchTerm, pivotIdx + 1);
}
