export function bubbleSort<T>(array: T[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    for (let j = 1; j <= i; j++) {
      if (newArray[j - 1] > newArray[j]) {
        const temp = newArray[j - 1];
        newArray[j - 1] = newArray[j];
        newArray[j] = temp;
      }
    }
  }
  return newArray;
}
