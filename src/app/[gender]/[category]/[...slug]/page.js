
import path from 'path'
import getData from "@/helper/getData"
import ProductPage from "@/components/ProductPage"
import fsPromises from "fs/promises";
import capitalizeAllWords from '@/helper/capitalizeAllWords';

export async function generateMetadata(props) {
const { params:{gender,slug,category} }=props
let  altcategory = decodeURI(slug.join(' ')).replace('-',' ').replace(/\d/,'' ).replace(/Sayfa/i,'')  
let originalString = `${decodeURI( gender.replace('-',' '))}  ${decodeURI(altcategory).replace('-',' ')} - ${decodeURI( category.replace('-',' '))}`
// let originalString = `${decodeURI(altcategory).replace('-',' ')} - ${decodeURI( gender.replace('kadin','kadın').replace('-',' '))}`
let capitalizedString = capitalizeAllWords(originalString);
//const data = await getData(props)
const slg= props.params.slug? props.params.slug.map(m=> decodeURI(m)):[]

// const obj = {};

// for (let it of data.data) {
// const item =it.item
//   for(let keyword of item.search){
// if(!slg[0].includes(keyword) &&  keyword!==null )
//     if (obj[keyword] === undefined) {
//       obj[keyword] = { count: 1 };
//     } else {
//       obj[keyword].count = obj[keyword].count + 1;
//     }
//   }
// }

// const keywords =Object.keys (obj)

  return {
    title: capitalizedString,
    description:capitalizedString,
   // keywords:keywords.join(', ')
  }
}
export default async function HomePage(props) {
  const { params}=props

const data = await getData(props)
const slg= params.slug? params.slug.map(m=> decodeURI(m)):[]
const {params:{gender,category}}=props
const obj = {};


for (let it of data.data) {
const item =it.item
  for(let keyword of item.kategori){
if(keyword!==null && keyword.replace('-',' ').indexOf( slg[0].replace('-',' '))===-1   && keyword !==decodeURI( category))
{

  if (obj[keyword] === undefined) {
    obj[keyword] = { count: 1 };
  } else {
    obj[keyword].count = obj[keyword].count + 1;
  }
}
    
  }
}
const mapNav ={nav:obj,anakategori:slg[0],groupname:decodeURI(category),gender}

const navDatadataFilePath = path.join(process.cwd(), `data-nav/${decodeURI(gender)}/${decodeURI(gender)}-nav.json`);
const navDatajsonData = await fsPromises.readFile(navDatadataFilePath);
const navData = JSON.parse(navDatajsonData);

  return <ProductPage  {...data} {...props} navData={navData} catNavData={mapNav}/>

}


 export async function generateStaticParams() {

  const kadindataFilePath = path.join(process.cwd(), `data-nav/kadin/kadin-nav.json`);
  const kadinNavRaw = await fsPromises.readFile(kadindataFilePath);
  const kadinNavData = JSON.parse(kadinNavRaw);

  const erkekdataFilePath = path.join(process.cwd(), `data-nav/erkek/erkek-nav.json`);
  const erkekNavRaw = await fsPromises.readFile(erkekdataFilePath);
  const erkekNavData = JSON.parse(erkekNavRaw);
  
  const kcocukdataFilePath = path.join(process.cwd(), `data-nav/kız-çocuk/kız-çocuk-nav.json`);
  const kcocukNavRaw = await fsPromises.readFile(kcocukdataFilePath);
  const kcocukNavData = JSON.parse(kcocukNavRaw);

  const ecocukdataFilePath = path.join(process.cwd(), `data-nav/erkek-çocuk/erkek-çocuk-nav.json`);
  const ecocukNavRaw = await fsPromises.readFile(ecocukdataFilePath);
  const ecocukNavData = JSON.parse(ecocukNavRaw);

  let kadin =  Object.values(kadinNavData).map(m=> m.items).flat().map(m=> {return {gender:m.gender,category:m.groupname,slug:[Object.keys(m.nav)[2],'sayfa','1'] }} ).filter(f=>f.slug[0]!==undefined )
  let erkek =  Object.values(erkekNavData).map(m=> m.items).flat().map(m=> {return {gender:m.gender,category:m.groupname,slug:[Object.keys(m.nav)[2],'sayfa','1'] }} ).filter(f=>f.slug[0]!==undefined )
  let kcocuk =  Object.values(kcocukNavData).map(m=> m.items).flat().map(m=> {return {gender:m.gender,category:m.groupname,slug:[Object.keys(m.nav)[2],'sayfa','1'] }} ).filter(f=>f.slug[0]!==undefined )
  let ecocuk =  Object.values(ecocukNavData).map(m=> m.items).flat().map(m=> {return {gender:m.gender,category:m.groupname,slug:[Object.keys(m.nav)[2],'sayfa','1'] }} ).filter(f=>f.slug[0]!==undefined )




  return [...kadin,...erkek, ...kcocuk,...ecocuk];
 }
