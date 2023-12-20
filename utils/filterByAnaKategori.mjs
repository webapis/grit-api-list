export default function filterByAnaKategori(firstArray, secondArray) {
    const matchingTitles = new Set(secondArray.map(item => item.title));
    return firstArray.filter(item => matchingTitles.has(item.anaKategori));
  }