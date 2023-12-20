

import path from "path";

import filterData from "./filterData";
import fsPromises from "fs/promises";
import getMetaSegments from "../../utils/getMetaSegments.mjs";
import orderData from "./orderData";
const cjson = require('compressed-json')
export default async function getData(props) {
   const { params: { gender, category } } = props

   if (props.params.slug) {
      const slg = props.params.slug ? decodeURI(props.params.slug).split(',') : null

      const dataFilePath = path.join(process.cwd(), `data-product/${decodeURI(gender)}/${decodeURI(gender)}_${decodeURI(category)}_${decodeURI(slg[0].replaceAll(' ', '-'))}.json`);
      const jsonData = await fsPromises.readFile(dataFilePath);
      const objectData = JSON.parse(jsonData);
      const restored = cjson.decompress(objectData)

      return filterData(props.params.slug, restored);
   } else {
      const segments = getMetaSegments({folder:gender}).filter(f => f[1].includes(decodeURI( category)))
  
      let data = []
      for (let segment of segments) {
         const anakategori = segment[2]
         const dataFilePath = path.join(process.cwd(), `data-product/${decodeURI(gender)}/${gender}_${decodeURI(category)}_${anakategori}.json`);
         const jsonData = await fsPromises.readFile(dataFilePath);
         const objectData = JSON.parse(jsonData);
         const restored = cjson.decompress(objectData)
         debugger
         data = [...data, ...restored]




      }
      return { data: orderData(data.map(m => { return { item: { ...m } } })), total: data.length }
   }







}