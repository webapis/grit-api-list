
import fsPromises from "fs";
import fs from 'fs'
import path from 'path'
import productTitleMatch from "./productTitleMatch.mjs";
import { createRequire } from "module";
import makeDir from "make-dir";
import getMetaSegments from "./getMetaSegments.mjs";
const require = createRequire(import.meta.url);
const cjson = require('compressed-json')
require('dotenv').config()
     function generateNavigation({gender,groupname,anakategori}){
        makeDir.sync(path.join(process.cwd(),`data-product/${gender}`))
        makeDir.sync(path.join(process.cwd(),`data-nav/${gender}`))
        const dataFilePath = path.join(process.cwd(), `data-product/${gender}/${gender}_${groupname}_${anakategori}.json`);
        const jsonData =  fsPromises.readFileSync(dataFilePath);
        const categories = require(path.join(process.cwd(), `./data-meta/${gender}/${gender}_${groupname}_${anakategori}.json`))
        const marka = require(path.join(process.cwd(), `./data-meta-common/marka.json`))
        const renk = require(path.join(process.cwd(), `./data-meta-common/renk.json`))
        const kategori = require(path.join(process.cwd(), `./data-meta-common/kategori.json`))
        const mergedCats =[...categories,...marka,...renk,...kategori]
        
        const anaKategoriJson = mergedCats.filter(f => f.type === 'anaKategori')
   
        const objectData = JSON.parse(jsonData);
        const restored = cjson.decompress(objectData)
        debugger
            const obj = {gender,groupname}
            for(let element of restored){

                for(let cat of anaKategoriJson){


                    if (productTitleMatch(cat.keywords, element.title.replace('-',' '), [])) {
                  
                        if (obj[cat.title] === undefined) {
            
                            obj[cat.title] = { count: 1 }
     
                        }
                        else {
                            obj[cat.title].count = obj[cat.title].count + 1
            
                        }
            
                    }
                }
      
            }
     
       // fs.writeFileSync(`data-nav/${gender}-${groupname}-${anakategori}-nav.json`, JSON.stringify({groupname,gender,nav:obj}))    
        return {groupname,gender,nav:obj}

    }





function generateGenderNav({gender}){
    const metaSegments= getMetaSegments({folder:gender})
    let nav={}
for(let segment of metaSegments ){

const gender =segment[0]
const groupname=segment[1]
const anakategori =segment[2]

//if(anakategori==='bikini'){
    const current =     generateNavigation({gender,groupname,anakategori})
     if(   nav[groupname] ===undefined){
        nav[groupname]={items:[current],groupname}
     }else{
        nav[groupname].items.push(current)
     }
   
//}
 
  
   

}


fs.writeFileSync(`data-nav/${gender}/${gender}-nav.json`, JSON.stringify(nav)) 

}

generateGenderNav({gender:"kadin"})
generateGenderNav({gender:"erkek"})
 generateGenderNav({gender:"kız-çocuk"})
 generateGenderNav({gender:"erkek-çocuk"})