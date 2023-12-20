
"use client"
import React, { useEffect, useRef } from "react";
import placeholder from "./imagePlaceHolder";
import placeholders from "./placeholders.json";

function Image({ title, imageUrl, marka, link }) {
  const imageEl = useRef(null);
  const imageSource =
    placeholders[marka].imagePrefix.trim() +
    placeholders[marka].imageHost.trim() +
    imageUrl +
    placeholders[marka].imgPostFix;

  const handleImageIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver(handleImageIntersection, {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      });
      observer.observe(imageEl.current);
    }
  }, [imageUrl, imageSource]);

  const handleImageClick = (e) => {
    e.preventDefault();
    window.open(
      placeholders[marka].detailHost.trim() + link,
      "_blank"
    ).focus();
  };

  return (
    <img
      src={placeholder}
      onClick={handleImageClick}
      className="image"
      style={{ width: "100%", borderRadius: 0, cursor: "pointer" }}
      ref={imageEl}
      data-src={imageSource}
      alt={title}
    />
  );
}

export default Image;
