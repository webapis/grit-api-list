import React from 'react';
import ProductList from './ProductList';
import SearchBox from './SearchBox';
import Grid from '@mui/material/Grid';
import AppBreadcrumb from './AppBreadcrumb';
import GenderTab from './GenderTabs'

const ProductPage = (props) => {
 
const { data, total, facets, params: { slug,gender } }=props

  return (
    <>
      <Grid container justifyContent="center" sx={{marginTop:2}} >
        <Grid item  xs={12}>
        <AppBreadcrumb {...props}/>
        </Grid>
        <Grid item  xs={12} sx={{display:'flex',justifyContent:'center'}}>
        <GenderTab gender={gender} />
      
        </Grid>
        <Grid item  xs={12} md={6}>
      
        <SearchBox slug={slug} gender={gender} />
        </Grid>
      </Grid>
 
        <ProductList data={data} total={total} facets={facets}   {...props} />
  
    </>
  );
};

export default ProductPage;
