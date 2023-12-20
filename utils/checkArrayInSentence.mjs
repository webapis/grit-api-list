
import deaccent from "./deaccent.mjs";
export default function checkArrayInSentence(array, sentence) {


    /// Check if all elements of the array are strings.
    if (!array.every(element => typeof element === "string")) {
      return false;
    }
 
    // Check if the sentence contains all elements of the array.
    for (const element of array) {
   

    // const reg = new RegExp('(\\s|\\b)'+deaccent(element)+'($|\\s)', 'i')
       const reg = new RegExp('\\s' + deaccent(element) + '\\s', 'i');
      const test = reg.test(deaccent(sentence))
      if (test===false) {
      
        return false;
      }
    }
  
    return true;
  }