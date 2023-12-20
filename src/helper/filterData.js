
import orderData from "./orderData";




export default async function filterData(slug, markaProducts) {
  const slicedSlug = slug.includes("sayfa")
    ? [...slug].splice(0, slug.indexOf("sayfa"))
    : slug;
  const slugsliced = slicedSlug.map((m) => decodeURI(m)).slice(0);
  const slugLength = slugsliced.length;



  let result = [];

  if (slugLength >= 2) {
    const searchValue = [...slug].map(m=> decodeURI(m)).splice(0, slug.indexOf("sayfa"));

console.log('searchValue',searchValue)
debugger
    
    result = markaProducts
      .filter((f) => {
        const searchLength = searchValue.length;
        
        let totalMatch = 0;
        for (let s of searchValue) {
          const search = Array.from( new Set([...f.search,markaProducts[0].anaKategori]))
          if (search.indexOf(s) !== -1) {
      console.log(s)
            totalMatch = totalMatch + 1;
          }
        }
  
        if (searchLength === totalMatch) {
          return true;
        } else {
          return false;
        }
      })
      .map((m) => {
        return { item: m };
      });
  }

  if (slugLength === 1) {
    result = markaProducts.map((m) => {
      return { item: m };
    });

  }

  console.log("result", result.length);

  return { data: orderData(result), total: result.length };
}
