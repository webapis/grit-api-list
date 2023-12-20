import path from "path";

import getMetaSegments from "../../utils/getMetaSegments.mjs";
import fsPromises from "fs/promises";
import Fuse from "fuse.js";
import orderData from "./orderData";
import walkSync from "../../utils/walkSync.mjs";
const options = {
  keys: ["title", "marka", "gender", "anaKategori", "kategori", "renk","groupname"],
  includeScore: true,
  threshold: 0.3,
  useExtendedSearch: true,
};
export default async function searchData(props) {
  const {
    params:{
      slug,
      gender
    },

  } = props;
console.log('slug',slug[1])
 // const segments = getMetaSegments({folder:gender})
  let data = []
  let filepathes =[]
  walkSync(path.join(process.cwd(),`temp-${gender}/unzipped-data` ),(filepath)=>{
    filepathes.push(filepath)
  })
  for (let file of filepathes) {
    debugger
    // const anakategori = segment[2]
    /// const category=segment[1]
   //   const dataFilePath = path.join(process.cwd(), `data-product/${decodeURI(gender)}/${gender}_${decodeURI(category)}_${anakategori}.json`);
      const jsonData = await fsPromises.readFile(file);
      const objectData = JSON.parse(jsonData);
debugger
 data = [...data, ...objectData]

  }


  const fuse = new Fuse(data, options);
  const result= fuse.search(decodeURI( slug[1]))

  return  { data: orderData(result), total:result.length }; // filterData(seachq, objectData);
}
