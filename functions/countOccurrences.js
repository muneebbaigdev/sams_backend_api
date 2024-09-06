export default function countOccurrences(array, value) {
    return Object.values(array).reduce((count, element) => count + (element === value ? 1 : 0), 0);
  }