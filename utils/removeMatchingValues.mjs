export default function removeMatchingValues(array, wordsToExclude) {
    return array.filter(item => !wordsToExclude.some(word => item.title.includes(word)));
  }
  