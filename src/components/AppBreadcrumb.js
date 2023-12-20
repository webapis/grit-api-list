//'use client'
import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Breadcrumb = ({params:{slug,gender,category}}) => {



  const items =slug ? [...slug] .map(m=>decodeURI(m)) : [];

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {/* Home link */}
      <Link href="/" passHref>
        <Typography variant="body1" color="textPrimary">
          Anasayfa
        </Typography>
      </Link>
      <Link href={`/${gender}`} passHref>
            <Typography variant="body1" color="textPrimary">
              {decodeURI( gender)}
            </Typography>
          </Link>
    {category && <Link  href={`/${gender}/${decodeURI( category)}`} passHref>
            <Typography variant="body1" color="textPrimary">
              {decodeURI( category)}
            </Typography>
          </Link>}
      {/* Generate breadcrumb links dynamically */}
      {items.filter(f=> f!=='sayfa' &&  isNaN(f) && f!=='query' ).map((item, index) => {
        // Combine the previous items to get the current URL
        const url = `/${items.slice(0, index + 1).join('/')}`;

        return (
          <Link key={index} href={`/${gender}/${ category}${url}`} passHref>
            <Typography variant="body1" color="textPrimary">
              {decodeURI( item)}
            </Typography>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
