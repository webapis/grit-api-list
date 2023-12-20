
import { createRequire } from "module";

import fspromises from "fs/promises";
import fs from 'fs'
import path from "path";
import getMetaSegments from "./getMetaSegments.mjs";

import walkSync from "./walkSync.mjs";
import makeDir from "make-dir";
import uniqify from "./uniqify.mjs";
const require = createRequire(import.meta.url);

require("dotenv").config();
function getObjectsNotInFirstArray(arr1, arr2) {
  debugger
  return arr2.filter(item2 => {
    return !arr1.some(item1 => item1.imageUrl === item2.imageUrl);
  });
}


console.log("process.env.marka------", process.env.marka === true);



async function getUncategorizedData({gender}){
  await makeDir(path.join(process.cwd(),`diger-product/${gender}`))
  const metaSegments = getMetaSegments({folder:gender});
  let data =[]
  for(let s of metaSegments){
  const gender =s[0]
  const groupname=s[1]
  const anaKategori=s[2]
  
    const rawdata = await fspromises.readFile(`data-product/${gender}/${gender}_${groupname}_${anaKategori}.json`);
  
    const current = JSON.parse(rawdata);
  
    data=[...data,...current];
  }
  
  const uniqueCategorizedData = uniqify(data,'imageUrl')
  
  const paths =[]
  walkSync(path.join(process.cwd(), `temp-${gender}/unzipped-data`), async (filepath) => {
    paths.push(filepath)
  
  });
  
  
  let initialdata=[]
  for (let p of paths) {
  
    console.log("filepath", p);
    const rawdata = await fspromises.readFile(p);
  
    const current = JSON.parse(rawdata);
  
    initialdata=[...initialdata,...current];
  }
  
  debugger
  const difference = getObjectsNotInFirstArray(uniqueCategorizedData,initialdata)
  debugger
  await fspromises.writeFile(`diger-product/${gender}/diger.json`, JSON.stringify(difference), { flag: 'a' })
}

//await getUncategorizedData({gender:'kadin'})
await getUncategorizedData({gender:'erkek'})
//await getUncategorizedData({gender:'kız-çocuk'})
//await getUncategorizedData({gender:'erkek-çocuk'})