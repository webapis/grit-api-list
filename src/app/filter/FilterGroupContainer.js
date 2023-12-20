"use client";
import { useState } from "react";
import FilterGroup from "./FilterGroup";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useRouter} from 'next/navigation'
export default function FilterGroupContainer(props) {
  const { facets } = props;
 
  const [state, setState] = useState({anaKategori:[],kategori:[],marka:[],renk:[],price:[]});
const router =useRouter()
  function handlerFilter(props) {
    const { e, name, groupName } = props;


    if (e.target.checked) {
      setState((prevState) => {
    
       
        return {
          ...prevState,
          [groupName]: [...prevState[groupName],name],
        };
      });
    } else {
      setState((prevState) => {
        return {
          ...prevState,
          [groupName]:prevState[groupName].filter((f) => f !== name) }
      });
    }
  }

  function generateURL (){
const url = Object.entries(state).filter(f=> f[1].length> 0 ).map((m) =>{
    return m[0]+'/'+m[1].join('-')
}).join('/')

router.push(url)

debugger
  }
  return (
    <Grid container justifyContent="center" sx={{ marginTop: 1 }} gap={1}>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
        <Button onClick={generateURL}>Filtre Uygula</Button>
      </Grid>
      {Object.entries(facets).map((m, g) => {
        const groupName = m[0];
        const groupValues = m[1];

        return (
          <Grid key={g} item xs={12} sm={5} md={2} xl={2} >
            <Paper elevation={2}>
              {" "}
              <FilterGroup
              state={state}
                handlerFilter={handlerFilter}
                groupName={groupName}
                groupValues={groupValues}
              />
            </Paper>{" "}
          </Grid>
        );
      })}
    </Grid>
  );
}
