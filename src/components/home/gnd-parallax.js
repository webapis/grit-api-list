
"use client"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box } from '@mui/material';

import NavButton from './NavButtons';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Parallax, Pagination, Navigation,Autoplay } from 'swiper/modules';
import { Typography } from '@mui/material';
export default function GndParallax(){

    return      <>
    <Swiper
      style={{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',

      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      speed={600}
      parallax={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Parallax, Pagination, Navigation, Autoplay]}
      className="mySwiper"
    >
      <div
        slot="container-start"
        className="parallax-bg"
   
        data-swiper-parallax="-23%"
      ></div>
      <SwiperSlide >
        <Box sx={{backgroundImage: {xs: `url(/kadinmobile.png)`, md:`url(/kadin.webp)`, height:'100%' }, backgroundSize:'100%',backgroundRepeat:'no-repeat'}}>
<div>
        <Typography className="title" data-swiper-parallax="-300">
          Kadın  
        </Typography>
        <Typography className="subtitle" data-swiper-parallax="-200"  sx={{display:{xs:'none',sm:'block'}}}>
        Kadın giyim ve aksesuarları
        </Typography>
        <div className="text" data-swiper-parallax="-100">
   {/*        <Typography component="p" sx={{display:{xs:'none',sm:'block'}}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
            laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
            Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
            Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
            ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
            tincidunt ut libero. Aenean feugiat non eros quis feugiat.
          </Typography> */}
        </div>
        </div>
     <NavButton/>

        </Box>
      </SwiperSlide>
      <SwiperSlide >
          <Box sx={{backgroundImage: {xs: `url(/erkek-mobile.webp)`, md:`url(/erkek.webp)`, height:'100%' }, backgroundSize:'100%',backgroundRepeat:'no-repeat',position:'relative'}}>
        <div className="title" data-swiper-parallax="-300" style={{color:'black'}}>
          Erkek
        </div>
        <Typography className="subtitle" data-swiper-parallax="-200" style={{color:'black'}} sx={{display:{xs:'none',sm:'block'}}}>
        Erkek giyim ve aksesuarları
        </Typography>
        <div className="text" data-swiper-parallax="-100" style={{color:'black'}}>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
            laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
            Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
            Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
            ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
            tincidunt ut libero. Aenean feugiat non eros quis feugiat.
          </p> */}
            <div >
          <NavButton/>
          </div>
        </div>

        </Box>
      </SwiperSlide>
      <SwiperSlide>
      <Box sx={{backgroundImage: {xs: `url(/kiz-cocuk-mobile.webp)`, md:`url(/kiz-cocuk.webp)`, height:'100%' }, backgroundSize:'100%',backgroundRepeat:'no-repeat'}}>
        <div className="title" data-swiper-parallax="-300">
          Kız Çocuk 
        </div>
        <Typography className="subtitle" data-swiper-parallax="-200"  sx={{display:{xs:'none',sm:'block'}}}>
        Kız Çocuk giyim ve aksesuarları
        </Typography>
        <div className="text" data-swiper-parallax="-100">
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
            laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
            Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
            Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
            ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
            tincidunt ut libero. Aenean feugiat non eros quis feugiat.
          </p> */}
          <NavButton/>
        </div>
        </Box>
      </SwiperSlide>
      <SwiperSlide>
        <Box sx={{backgroundImage: {xs: `url(/erkek-cocuk-mobile.png)`, md:`url(/erkek-cocuk.webp)`, height:'100%' }, backgroundSize:'100%',backgroundRepeat:'no-repeat',position:'relative'}}>

      
        <div className="title" data-swiper-parallax="-300">
          Erkek Çocuk
        </div>
        <Typography className="subtitle" data-swiper-parallax="-200"  sx={{display:{xs:'none',sm:'block'}}}>
        Erkek Çocuk giyim ve aksesuarları
        </Typography>
        <div className="text" data-swiper-parallax="-100">
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
            laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
            Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
            Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
            ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
            tincidunt ut libero. Aenean feugiat non eros quis feugiat.
          </p> */}
          <div style={{position:'absolute',left:5}}>
          <NavButton/>
          </div>
         
        </div>
        </Box>
      </SwiperSlide>
    </Swiper>
  </>
}