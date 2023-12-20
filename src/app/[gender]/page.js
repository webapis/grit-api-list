
import fsPromises from "fs/promises";

import path from 'path'
import CategoryNav from "@/components/CategoryNav";

const domainname=process.env.domainname
import capitalizeAllWords from '@/helper/capitalizeAllWords';

export async function generateMetadata({ params:{gender} }) {
 
 let originalString = `${decodeURI( gender.replace('-',' '))} giyim, ayakkabı, aksesuar | ${domainname}`
let capitalizedString = capitalizeAllWords(originalString);
  return {
    title: capitalizedString,
    description:new Date().toLocaleDateString('en-US')+" "+  capitalizedString
  }
}

export default async function genderPage(props) {
  const { params: { gender } } = props;
  const dataFilePath = path.join(process.cwd(), `data-nav/${decodeURI( gender)}/${decodeURI( gender)}-nav.json`);
  const genderNavRaw = await fsPromises.readFile(dataFilePath);
  const genderNavData = JSON.parse(genderNavRaw);

  return <CategoryNav genderNavData={genderNavData} gender={gender} />
}
