import algoliasearch from "algoliasearch";
import { createRequire } from "module";
import path from "path";
import fs from "fs";
import walkSync from "./walkSync.mjs";
const require = createRequire(import.meta.url);
import mapPrice from "./mapPrice.mjs";
require("dotenv").config();

const client = algoliasearch("7JF244QSZZ", process.env.ALGOLIAKEY);


function importData({gender}){

  const index = client.initIndex(gender);
  index.clearObjects()
  let data = [];
  let filepathes = [];
  walkSync(path.join(process.cwd(), `temp-${gender}/unzipped-data`), (filepath) => {
    filepathes.push(filepath);
  });
  for (let file of filepathes) {
    const jsonData = fs.readFileSync(file);
    const objectData = JSON.parse(jsonData).map((m) => {
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
        price: m.priceNew ? mapPrice(m.priceNew.toString()) : 0,
        // anaKategori: findMatchingCategory(m.title,anaKategoriler)?findMatchingCategory(m.title,anaKategoriler).title:'diger',
        // kategori: kategoriler.find((f)=>m.title.split(' ').includes(f))?kategoriler.find((f)=>m.title.split(' ').includes(f)):'diger',
        // renk:renkler.find((f)=>m.title.split(' ').includes(f))?renkler.find((f)=>m.title.split(' ').includes(f)):'diger',
      };
    });
  
    data = [...data, ...objectData];
  }
  
  index.saveObjects(data, { autoGenerateObjectIDIfNotExist: true });

}


importData({gender:'kadin'})
importData({gender:'erkek'})
importData({gender:'kız-çocuk'})
importData({gender:'erkek-çocuk'})