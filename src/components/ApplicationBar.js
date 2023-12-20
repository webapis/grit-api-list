
import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";

import ScrollToTopButton from "./ScrollToTopBtn";

import HomeIcon from "@mui/icons-material/Home";
const domainname=process.env.domainname
export default function ApplicationBar({ navData, params }) {

  return (
    <Box sx={{ flexGrow: 1 }}>
{/*       <Drawer
        toggleDrawer={toggleDrawer}
        isDrawerOpen={isDrawerOpen}
        navData={navData}
      /> */}
      <ScrollToTopButton />
      <AppBar position="static" sx={{ backgroundColor: "#007BFF" }}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <IconButton
            component={Link}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/"
          >
            <HomeIcon />
          </IconButton>
          {/* <IconButton
            component={Link}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/filter"
          >
            <FilterAltIcon />
          </IconButton> */}
          <Typography
            variant="h5"
            component={Link}
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
            href="/"
          >
            {domainname}
          </Typography>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <SearchIcon />
          </IconButton> */}

          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <LoginIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
