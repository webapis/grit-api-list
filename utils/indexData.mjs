
import { createRequire } from "module";

import fspromises from "fs/promises";
import fs from "fs";

import path from "path";
import getMetaSegments from "./getMetaSegments.mjs";
import makeDir from "make-dir";
import walkSync from "./walkSync.mjs";

import indexDataCollection from "./indexDataCollection.mjs";
const require = createRequire(import.meta.url);
const cjson = require('compressed-json')
require("dotenv").config();



console.log("process.env.marka------", process.env.marka === true);

async function indexData({gender}){
  const genderWithoutTemp=gender.replace('temp-','')
  await makeDir(path.join(process.cwd(),`data-product/${genderWithoutTemp}` ))

const metaSegments = getMetaSegments({folder:genderWithoutTemp});
for (let s of metaSegments) {
  const oldFile = path.join(
    process.cwd(),
    `data-product/${genderWithoutTemp}/${s[0]}_${s[1]}_${s[2]}.json`
  );

  if (fs.existsSync(oldFile)) {
    fs.unlinkSync(oldFile);
  }
}
const digerFilePath = path.join(process.cwd(), `data-product/${genderWithoutTemp}/diger.json`);
if (fs.existsSync(digerFilePath)) {
  fs.unlinkSync(digerFilePath);
}

const paths = [];
walkSync(path.join(process.cwd(), `${gender}/unzipped-data`), async (filepath) => {
  paths.push(filepath);
});
let data = [];

for (let p of paths) {
  console.log("filepath", p);
  const rawdata = await fspromises.readFile(p);
  const current = JSON.parse(rawdata);
  data=[...data,...current];
}



for (let segment of metaSegments) {

  const gender = segment[0];
  const groupname = segment[1];
  const anakategori = segment[2];


  //if(anakategori==='elbise'){

  const result = await indexDataCollection({
    gender,
    groupname,
    anakategori,
    data,
    unrelatedData: ["dddddd"],
  });

 

  await fspromises.writeFile(`data-product/${genderWithoutTemp}/${genderWithoutTemp}_${groupname}_${anakategori}.json`, JSON.stringify( cjson.compress(result)))

}
//}


}


await indexData({gender:'temp-kadin'})
await indexData({gender:'temp-erkek'})
 await indexData({gender:'temp-kız-çocuk'})
await indexData({gender:'temp-erkek-çocuk'})