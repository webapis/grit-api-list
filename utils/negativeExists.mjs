import deaccent from "./deaccent.mjs";
export default function negativeExists(item, longString) {

  let exits =false

  for (let neg of item.negative) {
    // const result =
    //   deaccent(longString)
    //     .trim()
    //     .toLowerCase()
    //     .indexOf(deaccent(neg.trim()).toLowerCase()) !==-1 ;

    if(item.title==='uzun' && longString.includes('uzun kollu')){
    
    }
    const reg = new RegExp('\\s' + deaccent(neg) + '\\s', 'i');
    const test = reg.test(deaccent(longString));
    if (test) {
    

      exits =test
      break;
    }else{
   
    }

  }

  return exits;
}
