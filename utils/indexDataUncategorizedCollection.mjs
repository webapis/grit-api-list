

import path from 'path'
import fsPromise from "fs/promises";
import getMetaSegments from "./getMetaSegments.mjs";
import { createRequire } from "module";
import findMatchingCategory from './findMatchingCategory.mjs'
import uniqify from './uniqify.mjs';
const require = createRequire(import.meta.url);
import mapPrice from "./mapPrice.mjs";

function getObjectsNotInFirstArray(arr1, arr2) {
  debugger
  return arr2.filter(item2 => {
    return !arr1.some(item1 => item1.imageUrl === item2.imageUrl);
  });
}

export default async function indexDataUncategorized({ data }) {

  const segment = getMetaSegments()

  const cats = []
  for (let seg of segment) {
    const gender = seg[0]
    const groupname = seg[1]
    const anakategori = seg[2]

    const rawdata = await fsPromise.readFile(path.join(process.cwd(), `./data-meta/${gender}_${groupname}_${anakategori}.json`))
    const current = JSON.parse(rawdata);
    cats.push(current[0])
  }

  const marka = require(path.join(process.cwd(), `./data-meta/marka.json`))
  const renk = require(path.join(process.cwd(), `./data-meta/renk.json`))
  const kategori = require(path.join(process.cwd(), `./data-meta/kategori.json`))
  const mergedCats = [...cats, ...marka, ...renk, ...kategori]

  debugger

  const anaKategoriler = mergedCats.filter(f => f.type === 'anaKategori')
  debugger
  const mappedData = data.map((m => { return { ...m, gender: m.title.substring(m.title.lastIndexOf('_')) } })).map((m) => {
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
      anaKategori: findMatchingCategory(m.title, anaKategoriler) ? findMatchingCategory(m.title, anaKategoriler).title : 'diger',

    };
  })

  const filterKategorized = mappedData.filter(f => f.anaKategori !== 'diger')
const withoutDublicate = uniqify(filterKategorized,'imageUrl')
  debugger
  const resutl = getObjectsNotInFirstArray(withoutDublicate,  uniqify(data,'imageUrl'))
  debugger
  await fsPromise.writeFile(`data-product/diger.json`, JSON.stringify(resutl), { flag: 'a' })


}