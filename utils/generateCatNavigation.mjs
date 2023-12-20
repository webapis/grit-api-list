import fsPromises from "fs";
import fs from "fs";
import path from "path";

import { createRequire } from "module";
import deaccent from "./deaccent.mjs";
import getMetaSegments from "./getMetaSegments.mjs";

const require = createRequire(import.meta.url);
require("dotenv").config();


function findMatchingCategory(title, cat) {


    for (const sarr of cat.keywords) {
  
      if (title.indexOf(sarr)!==-1  ) {
     
        if (!cat.negative && !cat.positive) {
      
          return true;
        } else {
      
          if (cat.negative) {
        
            for (let neg of cat.negative) {
              if (
                deaccent(title)
                  .trim()
                  .toLowerCase()
                  .indexOf(deaccent(neg.trim()).toLowerCase()) !== -1
              ) {
                return false;
              }

              
            }
          } 
          
          if (cat.positive) {
         
            for (let neg of cat.positive) {

           
              const reg = new RegExp('\\s' + deaccent(neg) + '\\s', 'i');
              const test = reg.test(deaccent(title));
          
              if (test) {
              
                return true;
              }
            }
          
            return false;
          }
       

           
          }
        }
      }
    
  
  return false;
}


function generateNavigation({ gender, groupname, anakategori }) {
  const dataFilePath = path.join(
    process.cwd(),
    `data-product/${gender}/${gender}_${groupname}_${anakategori}.json`
  );
  const jsonData = fsPromises.readFileSync(dataFilePath);


  const objectData = JSON.parse(jsonData)

  const obj = {};

  for (let item of objectData) {
    debugger
    for(let keyword of item.kategori){
if(keyword !== anakategori && keyword!==null)
      if (obj[keyword] === undefined) {
        obj[keyword] = { count: 1 };
      } else {
        obj[keyword].count = obj[keyword].count + 1;
      }
    }
  }

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
// generateGenderCatNav({ gender: "kız-çocuk" });
// generateGenderCatNav({ gender: "erkek-çocuk" });
//