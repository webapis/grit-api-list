
export default function findMatchingItems(firstArray, secondArray) {
  const skipGenderAndGroupName =firstArray.filter((f,i)=>i ===firstArray.length-1)
  debugger
    // Helper function to split values containing '-'
    function splitValue(value) {
      return value.split('-').map((m)=>decodeURI(m));
    }
  
    // Perform the search
    const matchedItems = [];
    for (const value of skipGenderAndGroupName) {
      const searchValues = value.includes('-') ? splitValue(value) : [decodeURI(value)];
  
      for (const item of secondArray) {
        if (searchValues.some(keyword => item.keywords.includes(keyword))) {
          matchedItems.push(item);
        }
      }
    }
  
    return matchedItems;
  }
  

  


  

  

  