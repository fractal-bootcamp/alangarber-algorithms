type UnknownDepthArray<T> = T | UnknownDepthArray<T>[];

export function depthFirstSearch<T>(array: UnknownDepthArray<T>[], searchTerm: T): T | undefined {
    function innerDepthFirstSearch(array: UnknownDepthArray<T>[]): T | undefined {
        if (array.length === 0) {
            return undefined;
        }

        for (let i = 0; i < array.length; i++) {
            if (!Array.isArray(array[i])) {
                if (array[i] == searchTerm) {
                    return searchTerm;
                } 
            } else {
                const recursiveResult = innerDepthFirstSearch(array[i] as UnknownDepthArray<T>[])
                if (recursiveResult !== undefined) {
                    return recursiveResult;
                }
            }
        }
    }
    innerDepthFirstSearch(array);
    return undefined;
}