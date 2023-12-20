
// import GndParallax from "@/components/home/gnd-parallax"
// const domainname=process.env.domainname
// export async function generateMetadata({ params:{gender,category} }) {
 

//    return {
//      title: `Kadin, Erkek, Kız Çocuk, Erkek Çocuk giyim ve aksesuarları | ${domainname}`,
//      description:`${new Date().toLocaleDateString('en-US')}  Kadin, Erkek, Kız Çocuk, Erkek Çocuk giyim ve aksesuarları | ${domainname}`,
  
//    }
//  }
// export default function HomePage(){


//   return <div>

// <GndParallax/>

//   </div>
// }


import fsPromises from "fs/promises";

import path from 'path'
import CategoryNav from "@/components/CategoryNav";

import capitalizeAllWords from '@/helper/capitalizeAllWords';

export async function generateMetadata() {
 
 let originalString = `kadın giyim, ayakkabı, aksesuar | Biraradamoda`
let capitalizedString = capitalizeAllWords(originalString);
  return {
    title: capitalizedString,
    description:capitalizedString
  }
}
export default async function indexPage(props) {
//console.log('props',props)
  const dataFilePath = path.join(process.cwd(), `data-nav/kadin/kadin-nav.json`);
  const genderNavRaw = await fsPromises.readFile(dataFilePath);
  const genderNavData = JSON.parse(genderNavRaw);


  return <CategoryNav genderNavData={genderNavData} gender="kadin" />
}




// export async function generateStaticParams() {

//   const params = [{ slug: ["elbise"] }];


//   return params;
// }
