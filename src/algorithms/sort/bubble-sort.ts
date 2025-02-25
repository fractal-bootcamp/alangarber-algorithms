export function bubbleSort<T>(array: T[]) {
  const newArray = [...array];

  // for each remaining pass through the entire array
  // for each "spot" on the right side of the array
  for (let i = newArray.length - 1; i > 0; i--) {
    // for each guy
    for (let j = 1; j <= i; j++) {
      // is the preceding guy bigger than me
      if (newArray[j - 1] > newArray[j]) {
        // if so, swap spots with him, so he takes my spot
        [newArray[j - 1], newArray[j]] = [newArray[j], newArray[j - 1]];
      }
    }
  }
  return newArray;
}
