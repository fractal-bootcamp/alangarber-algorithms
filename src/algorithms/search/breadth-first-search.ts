type UnknownDepthArray<T> = T | UnknownDepthArray<T>[];

export function breadthFirstSearch<T>(array: UnknownDepthArray<T>[], searchTerm: T): T | undefined {
    const queue: UnknownDepthArray<T>[] = [...array];
    for (let i = 0; i < queue.length; i++) {
        if (!Array.isArray(queue[i])) {
            if (queue[i] === searchTerm) {
                return searchTerm;
            }
        } else {
            for (let j = 0; j < (queue[i] as UnknownDepthArray<T>[]).length; j++) {
                queue.push((queue[i] as UnknownDepthArray<T>[])[j])
            }
        }
    }
    return undefined
}