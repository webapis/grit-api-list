

'use client'
import { createTheme } from "@mui/material/styles";
//import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from './createEmotionCache';
// // Include only the reset
// import 'instantsearch.css/themes/reset.css';

// // Or include the full Satellite theme
// import 'instantsearch.css/themes/satellite.css';

const theme = createTheme({
  typography: {
    fontFamily:'Poppins , sans-serif'
  //fontFamily: "Roboto, roboto",
  },
});

export default function MyApp({ Component, children }) {
  return (

 
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>

  );
}
