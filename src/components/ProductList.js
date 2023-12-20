

import Image from "./Image";
import { formatMoney } from "accounting-js";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PaginationComponent from "./PaginationComponent";
import getPageItems from './getPageItems'
import Categories from './Categories';
import TopCategories from "./TopCategories";
import ViewMode from "./ViewMode";
import  Container  from "@mui/material/Container";
import deaccent from "../../utils/deaccent.mjs";
export default function ProductList(props) {
  const { data, total, params: { slug,category,gender } } = props

  const currentPage = (slug === undefined || !slug.includes('sayfa')) ? 1 : parseInt(slug[slug.length - 1]);

  const itemsForPage = (slug &&  slug.includes('query'))? data: getPageItems(data, currentPage, 100);

  return (
    <>
      <Grid gap={1} justifyContent='center'
        container
      >
        <Grid item xs={12}>
          <Container style={{ display: 'flex',justifyContent:'space-around' }}>
          
            <PaginationComponent total={total}  slug={slug} gender={gender} category={category}/>
            {/* <ViewMode /> */}
          </Container>
        </Grid>

        <Grid item xs={12}>
          <Categories {...props} />
          <TopCategories {...props} />
        </Grid>
        {
          itemsForPage
            .map((c, i) => {
              const m = c.item;
             
              return (
                <Grid item
                  key={i}
                  style={{
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                >
                  <Box sx={{ width: { xs: 140, sm: 150, md: 200, lg: 250, xl: 250 } }}>
                    <Image
                      imageUrl={m.imageUrl}
                      title={m.title}
                      marka={m.marka}
                      link={m.link}
                    />
                    <Typography ><span style={{ textTransform: 'uppercase', opacity: 0.8, fontSize: 12 }}>{m.marka}</span> </Typography>
                    <Typography style={{ textTransform: 'capitalize', fontSize: 12 }}> {m.title.split(' ').map(m=>{return <span style={{fontWeight:((slug && deaccent(decodeURI(slug.join(' ').replace('-',' ').split(' '))).toLocaleLowerCase().includes( deaccent(m.toLocaleLowerCase()))) || (category && category.replace('-',' '))===m )&&'bold',color:((slug && deaccent(decodeURI(slug)).toLocaleLowerCase().includes( deaccent(m.toLocaleLowerCase()))) || (category&&  category===m) )&&'#007BFF'}}> {m} </span> })}</Typography>

                    <Typography style={{ fontSize: 14 }}>
                      {formatMoney(m.price, {
                        symbol: "₺ ",
                        decimal: ".",
                        thousand: ",",
                        precision: 2,
                      })}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
      </Grid>
  
      <PaginationComponent total={total}  slug={slug} gender={gender} category={category}/>

    </>
  );
}
