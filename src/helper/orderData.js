export default function orderData(data) {
    try {
        const splittedByMarkaObj = {};
        const orderedArray = [];
      
        let maxMarkaCount = 0;
        const markaCounts = {};

        data.forEach((element) => {
            const marka = element.item.marka;
            if (!markaCounts[marka]) {
                markaCounts[marka] = 0;
                splittedByMarkaObj[marka] = [];
            }
            splittedByMarkaObj[marka].push(element);
            markaCounts[marka]++;
            maxMarkaCount = Math.max(maxMarkaCount, markaCounts[marka]);
        });

        const uniqueMarkaValues = Object.keys(markaCounts);
      
        for (let i = 0; i < maxMarkaCount; i++) {
            uniqueMarkaValues.forEach((marka) => {
                if (i < markaCounts[marka]) {
                    orderedArray.push(splittedByMarkaObj[marka][i]);
                }
            });
        }
      
        return orderedArray;
    } catch (error) {
        return undefined;
    }
}
// 2 optimized version 
// export default function orderData(data) {
//     try {
//         const splittedByMarkaObj = {};
//         const orderedArray = [];
//         const markaCounts = {};
      
//         data.forEach((element) => {
//             const marka = element.item.marka;
//             if (!splittedByMarkaObj[marka]) {
//                 splittedByMarkaObj[marka] = [];
//                 markaCounts[marka] = 0;
//             }
//             splittedByMarkaObj[marka].push(element);
//             markaCounts[marka]++;
//         });
      
//         const uniqueMarkaValues = Object.keys(splittedByMarkaObj);
      
//         let maxMarkaCount = Math.max(...Object.values(markaCounts));
      
//         for (let i = 0; i < maxMarkaCount; i++) {
//             uniqueMarkaValues.forEach((marka) => {
//                 if (i < markaCounts[marka]) {
//                     orderedArray.push(splittedByMarkaObj[marka][i]);
//                 }
//             });
//         }
      
//         return orderedArray;
//     } catch (error) {
//         return undefined;
//     }
// }


//1 version

// export default function orderData(data) {
//     try {
//         const splittedByMarkaObj = {};
//         const orderedArray = [];
      
//         data.forEach((element) => {
//             const marka = element.item.marka;
//             if (!splittedByMarkaObj[marka]) {
//                 splittedByMarkaObj[marka] = [];
//             }
//             splittedByMarkaObj[marka].push(element);
//         });
      
//         const uniqueMarkaValues = Object.keys(splittedByMarkaObj);
      
//         let index = 0;
//         let continueLooping = true;
      
//         while (continueLooping) {
//             continueLooping = false;
//             for (const marka of uniqueMarkaValues) {
//                 if (index < splittedByMarkaObj[marka].length) {
//                     orderedArray.push(splittedByMarkaObj[marka][index]);
//                     continueLooping = true;
//                 }
//             }
//             index++;
//         }
      
//         return orderedArray;
//     } catch (error) {
//         return undefined;
//     }
// }


