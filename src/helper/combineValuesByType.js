export default function combineValuesByType(matches) {
    const combinedMatches = {};
    for (const match of matches) {
      if (match.type in combinedMatches) {
        combinedMatches[match.type].push(...match.keywords);
      } else {
        combinedMatches[match.type] = [...match.keywords];
      }
    }
  
    // Remove duplicates from 'keywords' arrays
    for (const type in combinedMatches) {
      combinedMatches[type] = [...new Set(combinedMatches[type])];
    }
  
    return combinedMatches;
  }
  

  
// export default function combineValuesByType(matches) {
//     const combinedMatches = {};
//     for (const match of matches) {
//       if (match.type in combinedMatches) {
//         combinedMatches[match.type].keywords.push(...match.keywords);
//       } else {
//         // Create a shallow copy of the match object and remove the 'title' property
//         const { title, ...rest } = match;
//         combinedMatches[match.type] = { ...rest };
//       }
//     }
  
//     // Remove duplicates from 'keywords' arrays
//     for (const type in combinedMatches) {
//       combinedMatches[type].keywords = [...new Set(combinedMatches[type].keywords)];
//     }
  
//     return Object.values(combinedMatches);
//   }
  