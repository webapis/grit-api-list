

import path from 'path'
import getData from "@/helper/getData"
import ProductPage from "@/components/ProductPage"
import fsPromises from "fs/promises";

import capitalizeAllWords from '@/helper/capitalizeAllWords';

export async function generateMetadata({ params:{gender,category} }) {
 
 let originalString = `${decodeURI( gender.replace('kadin','kadın').replace('-',' '))}  ${decodeURI( category.replace('-',' '))} kategorileri`
let capitalizedString = capitalizeAllWords(originalString);


const navDatadataFilePath = path.join(process.cwd(), `data-nav/${decodeURI( gender)}/${decodeURI( gender)}-nav.json`);
const navDatajsonData = await fsPromises.readFile(navDatadataFilePath);
const navData = JSON.parse(navDatajsonData);
debugger
const keywordsObj =navData[decodeURI( category)]['items'].map(m=> m['nav']).map(m=>{
  const nextState =m
  delete nextState.groupname
  delete nextState.gender

  return  nextState})


  return {
    title: capitalizedString,
    description:new Date().toLocaleDateString('en-US')+" "+  capitalizedString,
    keywords: Object.entries( keywordsObj).map((m=> Object.keys( m[1])  )).flat().join(', ')
  }
}

export default async  function categoryPage(props) {

  const data = await getData(props)

const {params:{gender}}=props



const navDatadataFilePath = path.join(process.cwd(), `data-nav/${decodeURI( gender)}/${decodeURI( gender)}-nav.json`);
const navDatajsonData = await fsPromises.readFile(navDatadataFilePath);
const navData = JSON.parse(navDatajsonData);





debugger
  return <ProductPage  {...data} {...props} navData={navData} catNavData={navData}/>

}


export async function generateStaticParams() {
  const params = [
    { category: "abiye" },
    { category: "aksesuar" },
    { category: "alt-giyim" },
    { category: "ayakkabı" },
    { category: "büyük-beden" },
    { category: "dış-giyim" },
    { category: "hamile" },
    { category: "iç-giyim" },
    { category: "pantolon" },
    { category: "plaj" },
    { category: "spor" },
    { category: "üst-giyim" },
  ];

  return params;
}
