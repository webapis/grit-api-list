

import path from 'path'
import fs from 'fs'
import { createRequire } from "module";
import findMatchingCategory from './findMatchingCategory.mjs'

const require = createRequire(import.meta.url);
import mapPrice from "./mapPrice.mjs";
import deaccent from './deaccent.mjs';
//import negativeExists from './negativeExists.mjs';

function findMatchingCategories (title,cats){


  const found =[]
  const searchKeywords =[]

  for (const item of cats) {

    for (const sarr of item.keywords) {
      const reg = new RegExp('\\s' + deaccent(sarr) + '\\s', 'i');
              const test = reg.test(deaccent(title));
      if (test) {
     
        if (!item.negative && !item.positive) {
  
          searchKeywords.push(...item.keywords)
          found.push(item.title)
        } else {
          let negativeExist =false
          if (item.negative && !item.positive) {
        
            for (let neg of item.negative) {
              // const reg = new RegExp('\\s' + deaccent(neg) + '\\s', 'i');
              // const test = reg.test();
              if (
                deaccent(title).toLocaleLowerCase().indexOf(deaccent(neg).toLocaleLowerCase() )===-1
              ) {
             
                searchKeywords.push(...item.keywords)
                found.push(item.title)
                
              }

              
            }
          } else if (item.negative && item.positive){
            for (let neg of item.negative) {
              const reg = new RegExp('\\s' + deaccent(neg) + '\\s', 'i');
            //  const test = reg.test(deaccent(title));
              if (
                deaccent(title).toLocaleLowerCase().indexOf(deaccent(neg).toLocaleLowerCase() )!==-1
              ) {
             
                negativeExist=true
                
              }

              
            }
           
          }
          
          if (item.positive) {
         
            for (let neg of item.positive) {

           
              const reg = new RegExp('\\s' + deaccent(neg) + '\\s', 'i');
              const test = reg.test(deaccent(title));
          
              if (test && negativeExist===false) {
            
                searchKeywords.push(...item.keywords)
                found.push(item.title)
              }
            }
          
        
          }
       

    
          }
        }
      }
    
  }

const keywords =[...new Set(found)]
return  {keywords,searchKeywords}

}

export default async function indexDataCollection({gender,groupname,anakategori,data}){

      
     const categories = require(path.join(process.cwd(), `./data-meta/${gender}/${gender}_${groupname}_${anakategori}.json`))
     const marka = require(path.join(process.cwd(), `./data-meta-common/marka.json`))
     const renk = require(path.join(process.cwd(), `./data-meta-common/renk.json`))
     const kategoriler = require(path.join(process.cwd(), `./data-meta-common/kategori.json`) )
     let groupSpecific= []

     if (fs.existsSync(path.join(process.cwd(), `data-meta-common/${groupname}.json`))){
  
      groupSpecific = require(path.join(process.cwd(), `data-meta-common/${groupname}.json`) )
  
     }
     const mergedCats =[...categories,...marka,...renk,...kategoriler,...groupSpecific]
   

     const anaKategoriler = mergedCats.filter(f=> f.type==='anaKategori')
     const renkler =  mergedCats.filter(f=> f.type==='renk')
     const mappedData=   data.filter(m=>findMatchingCategory(m.title.replace('-',' '),anaKategoriler)).map((m => { return { ...m, gender: m.title.substring(m.title.lastIndexOf('_')) } })).map((m) => {
             return {
               marka: m.marka,
               gender: m.gender
                 ? m.gender
                     .replace("kcocuk", "kız çocuk")
                     .replace("ecocuk", "erkek çocuk")
                     .replace("kadin", "kadın")
                 : "unknown",
               title: m.title
                 .substr(m.title.indexOf(" "))
                 .replace("_kcocuk", "")
                 .replace("_ecocuk", "")
                 .replace("_erkek", "")
                 .replace("_kadin", "")
                 .toLowerCase(),
               link: m.link,
               imageUrl: m.imageUrl,
               groupname,
               price: m.priceNew ? mapPrice(m.priceNew.toString()) : 0,
               anaKategori: findMatchingCategory(m.title,anaKategoriler)?findMatchingCategory(m.title,anaKategoriler).title:'diger',
               kategori: findMatchingCategories(m.title,mergedCats).keywords,
               search: findMatchingCategories(m.title,mergedCats).searchKeywords,
               renk:findMatchingCategory(m.title,renkler)?findMatchingCategory(m.title,renkler).title:'diger',
               //altKategori:'depicated'
             };
           })
   

     const fiterData =  mappedData.filter(f=>f.anaKategori=== anaKategoriler[0].title)

   return fiterData
  
   }






