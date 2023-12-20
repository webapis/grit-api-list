import checkArrayInSentence from "./checkArrayInSentence.mjs";
import deaccent from "./deaccent.mjs";


export default function findMatchingCategory(longString, arrayOfStrings) {
  for (const item of arrayOfStrings) {

    for (const sarr of item.keywords) {
  
      if (checkArrayInSentence(sarr.split(" "), longString)) {
     
        if (!item.negative && !item.positive) {
      
          return item;
        } else {
      
          if (item.negative) {
        
            for (let neg of item.negative) {
              if (
                deaccent(longString)
                  .trim()
                  .toLowerCase()
                  .indexOf(deaccent(neg.trim()).toLowerCase()) !== -1
              ) {
                return false;
              }

              
            }
          } 
          
          if (item.positive) {
         
            for (let neg of item.positive) {

           

              // const reg = new RegExp(
              //   "(\\s|\\b)" + deaccent(neg) + "($|\\s)",
              //   "i"
              // );
              const reg = new RegExp('\\s' + deaccent(neg) + '\\s', 'i');
              const test = reg.test(deaccent(longString));
          
              if (test) {
              
                return item;
              }
            }
          
            return false;
          }
       

            return item;
          }
        }
      }
    
  }
  return false;
}
