//'use client'
import React from "react";
import { Drawer, Box } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';



import Link from "next/link";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";

export default function CustomDrawer({ toggleDrawer, isDrawerOpen, navData }) {
  //const { nav, gender, groupname: topgroup } = navData;

  return (
    <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
      <Box sx={{ width: 300 }}>
{Object.entries( navData).map((m,i)=>{
const groupname=m[0]
const {items} =m[1]

return      <Accordion key={i}>
<AccordionSummary
  expandIcon={<ExpandMoreIcon />}
  aria-controls="panel1a-content"
  id="panel1a-header"
>
  <Typography>{groupname}</Typography>
</AccordionSummary>
<AccordionDetails>
<List
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ flexGrow: 1, maxWidth: 400 }}
        >
          {items.map((m,i) => {
            const { nav, gender, groupname: topgroup } = m;
            return Object.entries(nav).map((m, i) => {
              const groupname = m[0];
              const total = Object.entries(m[1])[0][1];
              if (total > 2) {
                return (
                  <ListItemButton
                    key={i}
                    onClick={toggleDrawer}
                    component={Link}
                    href={`/${gender}/${topgroup}/${groupname}`}
                  >
                    <ListItemText
                      primary={
                        <div
                          style={{
                            textTransform: "capitalize",
                            width: 180,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>{groupname}</span>
                          <span>{total}</span>
                        </div>
                      }
                    />
                  </ListItemButton>
                );
              }
            });
          })}
        </List>
</AccordionDetails>
</Accordion>
})}
   
    
      </Box>
    </Drawer>
  );
}
