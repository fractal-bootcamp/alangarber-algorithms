export function linearSearch<T>(array: T[], searchTerm: T): T | undefined {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === searchTerm) {
            return searchTerm;
        } 
    }
    return undefined;
} 