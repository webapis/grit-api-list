export default function isEmptyObject(obj) {
    if (obj === null || obj === undefined) {
      return true;
    }
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
  
    return true;
  }
  
