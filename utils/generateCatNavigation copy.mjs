import fsPromises from "fs";
import fs from "fs";
import path from "path";
import productTitleMatch from "./productTitleMatch.mjs";
import makeDir from "make-dir";
import { createRequire } from "module";
import deaccent from "./deaccent.mjs";
import getMetaSegments from "./getMetaSegments.mjs";
import negativeExists from "./negativeExists.mjs";
const require = createRequire(import.meta.url);
require("dotenv").config();
function generateNavigation({ gender, groupname, anakategori }) {
  const dataFilePath = path.join(
    process.cwd(),
    `data-product/${gender}/${gender}_${groupname}_${anakategori}.json`
  );
  const jsonData = fsPromises.readFileSync(dataFilePath);

  const categories = require(path.join(
    process.cwd(),
    `./data-meta-common/kategori.json`
  ));

  const objectData = JSON.parse(jsonData);

  const obj = {};

  for (let item of objectData) {
 
    const prodCatAsLongString = item.kategori.join(" ");

    for (let cat of categories) {
      for (let keyword of cat.keywords) {
        // const reg = new RegExp('\\s' + deaccent(keyword) + '\\s', 'i');

        // const test = reg.test(deaccent( prodCatAsLongString))
        if (
          deaccent(prodCatAsLongString).includes(deaccent(keyword)) &&
          !item.anaKategori.includes(keyword)
        ) {
    
            if (obj[keyword] === undefined) {
                obj[keyword] = { count: 1 };
              } else {
                obj[keyword].count = obj[keyword].count + 1;
              }
      }
    }
  }}

  fs.writeFileSync(
    `data-nav/${gender}/${gender}-${groupname}-${anakategori}-nav.json`,
    JSON.stringify({ groupname, gender, anakategori, nav: obj })
  );
  return { groupname, gender, anakategori, nav: obj };
}

function generateGenderCatNav({ gender }) {
  const metaSegments = getMetaSegments({ folder: gender });
  let nav = {};
  for (let segment of metaSegments) {
    const gender = segment[0];
    const groupname = segment[1];
    const anakategori = segment[2];

    // if(anakategori==='çanta' && groupname==='aksesuar'){
    const current = generateNavigation({ gender, groupname, anakategori });
    if (nav[groupname] === undefined) {
      nav[groupname] = { items: [current], groupname };
    } else {
      nav[groupname].items.push(current);
    }

    // }
  }
}

generateGenderCatNav({ gender: "kadin" });
generateGenderCatNav({ gender: "erkek" });
generateGenderCatNav({ gender: "kız-çocuk" });
generateGenderCatNav({ gender: "erkek-çocuk" });
