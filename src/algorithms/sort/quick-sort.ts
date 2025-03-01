export function partitionedQuickSort<T>(
  array: T[],
  low: number = 0,
  high: number = array.length - 1,
): T[] {
  if (low < high) {
    const pivot = partition(array, low, high);
    partitionedQuickSort(array, low, pivot - 1);
    partitionedQuickSort(array, pivot + 1, high);
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

export function quickSort<T>(array: T[]): T[] {
  const newArray = [...array]; // don't modify array
  if (newArray.length <= 1) return newArray; // handle base case (no need to sort an array of 1 or 0 eles)

  // choose a pivot (last element is typically good if you don't know anything)
  const pivot = newArray.pop() as T; // typecast is okay because we just checked!

  // partition left and right
  const left: T[] = [];
  const right: T[] = [];
  newArray.forEach((e) => {
    if (e <= pivot) {
      left.push(e);
      return;
    }
    if (e > pivot) {
      right.push(e);
      return;
    }
  });

  // sort the left, sort the right, and return the result.
  return [...quickSort(left), pivot, ...quickSort(right)];
}
