
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import GenderTabs from "./GenderTabs";
import SearchBox from "./SearchBox";
import Container  from "@mui/material/Container";

import AsyncLink from "./AsyncLink";
export default async function CategoryNav({genderNavData,gender}) {

    
//   const dataFilePath = path.join(process.cwd(), `data-nav/${gender}-nav.json`);
//   const genderNavRaw = await fsPromises.readFile(dataFilePath);
//   const genderNavData = JSON.parse(genderNavRaw);
  let navAsArray = Object.entries(genderNavData);

  // Sort the navAsArray by the length of items in descending order
  navAsArray.sort((a, b) => b[1].items.length - a[1].items.length);

  return (
    <Container>
    <Grid container gap={2} justifyContent="center">
        
    <Grid item  xs={12} sx={{display:'flex',justifyContent:'center'}}>
        <GenderTabs gender={gender} />
      
        </Grid>
        <Grid item  xs={12} md={6}>
      
        <SearchBox slug={null} gender={gender} />
        </Grid>
      <Grid item xs={12}>{/* <h4 style={{textTransform:'capitalize',textAlign:'center'}}> {gender} Giyim, aksesuar, ayakkabı kategorileri.</h4> */}</Grid>
      {navAsArray.map((m, i) => {
        const groupname = m[0];
        const items = m[1].items;

        // Sort items within each group by the count value
        items.sort((a, b) => {
          const aContent = Object.entries(a.nav).find(item => item[0] !== "gender" && item[0] !== "groupname");
          const bContent = Object.entries(b.nav).find(item => item[0] !== "gender" && item[0] !== "groupname");
          const aCount = aContent ? aContent[1].count : 0;
          const bCount = bContent ? bContent[1].count : 0;
          return bCount - aCount;
        });

        return (
          <Grid item key={i}     style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "5px"
     
          }}>
         
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                width: 200,
                "@media (maxWidth: 768px)": {
                  width: "100%",
                },
                display:'flex',
                justifyContent:'center',
                padding:3
              }}
            >
              <Typography sx={{textTransform:'capitalize',fontWeight:600}}>{groupname.replace('-',' ')}</Typography>
              
              {items.map((m, i) => {
                const content = Object.entries(m.nav).filter(
                  (m) => m[0] !== "gender" && m[0] !== "groupname"
                );

                if (content.length > 0) {
                  const title = content[0][0];
                  const count = content[0][1].count;
                  return (
                    <li key={i} style={{display:'flex',justifyContent:'space-between',textTransform:'capitalize'}}>
                      <AsyncLink url ={`/${decodeURI( gender)}/${decodeURI( groupname)}/${title}/sayfa/1`} text={title.replace('-',' ')}/>
                    
                     <span>{count}</span>
                    </li>
                  );
                }
              })}
            </ul>
          </Grid>
        );
      })}
    </Grid>
    </Container>
  );
}

