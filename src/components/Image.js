
"use client"
import React, { useEffect, useState,useRef } from "react";
import placeholder from "./imagePlaceHolder";
import placeholders from "./placeholders.json";
//import { Box } from "@mui/material";
function Image({ title, imageUrl, marka, width, link }) {

    const imageEl = useRef(null);
  //  const [imageState, setImage] = useState(null);
    const imageSource =
    placeholders[marka].imagePrefix.trim() +
    placeholders[marka].imageHost.trim() +
    imageUrl+ placeholders[marka].imgPostFix;
    function handleClick({ e, url }) {
      e.preventDefault();
      window.open(url, "_blank").focus();
    }
  
    useEffect(() => {
      imageEl.current.src = placeholder;
      if (window.IntersectionObserver) {
        let observer = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target);
              }
            });
          },
          {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
          }
        );
        observer.observe(imageEl.current);
      }
    }, [marka, imageUrl]);
  
    // useEffect(() => {
    //   if (marka && placeholders[marka]) {
    //     const imageSource =
    //       placeholders[marka].imagePrefix.trim() +
    //       placeholders[marka].imageHost.trim() +
    //       imageUrl+ placeholders[marka].imgPostFix;
    //     // setImage(placeholders[marka].imageHost.trim()+imageUrl);
    //     setImage(imageSource);
    //   }
    // }, [marka, imageUrl]);
  
    return (
  
      <img
        src={placeholder}
        onClick={(e) =>
          handleClick({ e, url: placeholders[marka].detailHost.trim() + link })
        }
        className="image"
        style={{ width: "100%", borderRadius: 0, cursor: "pointer" }}
        ref={imageEl}
        data-src={imageSource}
        alt={title}
      />
     
    );
  }


  export default Image