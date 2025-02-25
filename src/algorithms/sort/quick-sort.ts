export function quickSortWrapper<T>(array: T[]): T[] {
  quickSort(array, 0, array.length - 1);
  return array;
}

export function quickSort<T>(array: T[], low: number, high: number): T[] {
  if (low < high) {
    const pivot = partition(array, low, high);
    quickSort(array, low, pivot - 1);
    quickSort(array, pivot + 1, high);
  }
  return array;
}

export function partition<T>(array: T[], low: number, high: number): number {
  const pivot = array[high];
  let i = low;
  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      i++;
    }
  }
  const temp = array[i];
  array[i] = array[high];
  array[high] = temp;
  return i;
}
