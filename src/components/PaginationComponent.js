"use client";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import  Grid  from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import FoundItems from "./FoundItems";
import { Typography } from "@mui/material";
export default function PaginationComponent({ total,slug,gender,category }) {

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    const updatedURL = `${window.location.href}`;
    if (updatedURL.indexOf("sayfa/") === -1) {
      setCurrentPage(1);
    } else {

  
   
      const curPage =parseInt(updatedURL.substring(updatedURL.indexOf('sayfa/')+6 ))

      setCurrentPage(curPage);

    }
  }, []);
  function pageChange(e, page) {
    setLoading(true)
 
    const updatedURL = `${window.location.href}`;

    if (updatedURL.indexOf("sayfa/") === -1) {
      let nextRoute = `${updatedURL + "/sayfa/"}${page}`;
      router.push(nextRoute);
    } else {
      let stripedPageNumber = updatedURL.substring(
        0,
        updatedURL.indexOf("sayfa/") + 6
      );
      let nextRoute = stripedPageNumber + page;
      router.push(nextRoute);
    }

    console.log("sayfa", page);
  }
if(slug){
  return (
    <Grid container justifyContent="space-between" sx={{marginTop:1}}>
      <Grid item>
        <FoundItems total={total}/>
      </Grid>
      <Grid item>
    <Typography variant="h1" style={{textTransform:"capitalize", fontSize:20}}>{ `${decodeURI(gender.replace('kadin','kadın'))} - ${decodeURI(slug.filter(f=>f !=='sayfa' &&  isNaN(f) && f!=='query').join(' ').replace('-',' ')) }`  }</Typography> 

      </Grid>
       <Grid item>
        <Pagination page={currentPage} onChange={pageChange} count={Math.round(total / 100)} />
    
        {loading &&     
        <Box sx={{ width: '100%' }}>
      <LinearProgress />  </Box>}
      </Grid>
    </Grid>
  
  );

}else 
if(category)
{

  return (
    <Grid container justifyContent="space-between" sx={{marginTop:1}}>
      <Grid item>
        <FoundItems total={total}/>
      </Grid>
      <Grid item>
     
   <Typography variant="h6" style={{textTransform:"capitalize"}}>{ `${decodeURI( gender)} ${decodeURI( category.replace('-',' '))}`}</Typography>
      </Grid>
       <Grid item>
        <Pagination page={currentPage} onChange={pageChange} count={Math.round(total / 100)} />
    
        {loading &&     
        <Box sx={{ width: '100%' }}>
      <LinearProgress />  </Box>}
      </Grid>
    </Grid>
  
  );

}
 else{
  return null
 }

}
