

import SelectedChip,{NotSelectedChip} from './SelectedChip';
import Link from 'next/link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import  Container  from '@mui/material/Container';
export default function Categories(props){
    const {catNavData,params}=props

  if( catNavData && catNavData.nav){
    const decodedSlug= params.slug? [...params.slug.map(m=> decodeURI(m))]:[]
    const {gender,groupname,anakategori}=catNavData


    const slugWithoutSayfa =[...decodedSlug].slice(1, decodedSlug.indexOf('sayfa')).join('/')
  

 
    const value = (catNavData && catNavData.nav)? Object.entries (catNavData.nav).sort((a,b)=>{
        const count1 =a[1]['count']
        const count2 =b[1]['count']
        return count2 -count1
        }):''

    const value1 =value ? value.findIndex((f,i)=>decodedSlug.includes(f[0])) :1000000
    return   <Container>  <Tabs value={value1}
    scrollButtons
    allowScrollButtonsMobile
    variant="scrollable"


  >
   {value.map((m,i)=><Tab key={i} sx={{textTransform:'capitalize'}} label={<CustomChip key={i} selectedValue={m} slug={slugWithoutSayfa} anakategori={anakategori} gender={gender} groupname={groupname}/> } /> )}
  </Tabs>
  </Container> 
  }
  else{

    return null
  }


}


function CustomChip({slug,gender,groupname,anakategori,selectedValue}){

  const isSelected = slug.split('/').filter(f=>f===selectedValue[0]).length>0
  if(isSelected){
      return <Link  href={`/${gender}/${groupname}/${anakategori}/${slug.split('/').filter(f=>f!==selectedValue[0]).join('/')}/sayfa/1`}><SelectedChip  value ={selectedValue[0]} count ={selectedValue[1]['count']}  size='medium'    variant="outlined"  /> </Link>
 
 
  }
  
  return <NotSelectedChip href={`/${gender}/${groupname}/${anakategori}/${slug}/${selectedValue[0]}/sayfa/1`}  value ={selectedValue[0]} count ={selectedValue[1]['count']}  />
  
  //<Link  href={`/${gender}/${groupname}/${anakategori}/${slug}/${selectedValue[0]}/sayfa/1`}><Chip size='medium'   label={`${selectedValue[0]} (${(selectedValue[1]['count'])})`} variant="outlined" sx={{backgroundColor:isSelected ?'#007BFF':'',color:isSelected?'white':""}} /> </Link>


}