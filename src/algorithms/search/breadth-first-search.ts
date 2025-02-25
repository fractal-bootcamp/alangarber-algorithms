type NestedArray<T> = Array<T | NestedArray<T>>;

export function breadthFirstSearch<T>(
  array: NestedArray<T>,
  searchTerm: T,
): T | undefined {
  const queue = [...array];
  for (let i = 0; i < queue.length; i++) {
    const ele = queue[i];
    if (Array.isArray(ele)) {
      queue.push(...ele);
    } else {
      if (ele === searchTerm) {
        return searchTerm;
      }
    }
  }
  return undefined;
}
