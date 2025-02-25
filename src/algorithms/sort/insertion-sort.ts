export function insertionSort<T>(array: T[]) {
  const sortedArray: T[] = [];

  // for each ELEMENT
  for (let i = 0; i < array.length; i++) {
    // FIND THE SPOT IN sortedArray where it belongs
    let spot = 0;
    while (spot < sortedArray.length) {
      const elementCantMoveFurther = sortedArray[spot] >= array[i];
      if (elementCantMoveFurther) break;
      spot++;
    }
    // put that ELEMENT in the SPOT it belongs.
    sortedArray[spot] = array[i];
  }

  return sortedArray;
}
