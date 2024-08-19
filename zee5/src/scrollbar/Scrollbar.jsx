import React, { useState,useEffect } from 'react'
import './scrollbar.css'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css"; 
import { Link } from 'react-router-dom';
import useStore from "../store";

function Scrollbar({ imageUrls}) {
  const [images, setImages] = useState([]);
  const { appConfig } = useStore();

 
  useEffect(() => {
    setImages(imageUrls);
  }, [imageUrls]);
  if (!appConfig?.heroSection) {
    return (
      <div>Loading heroSection Config</div>
    );
  }

  return (
    <div className="carousel-wrapper">
      <Splide
        options={{
          type: "loop", 
          perPage: 1,
          autoplay: true, 
          interval: 1000, 
          padding: '8rem',
          gap:5,
          breakpoints: {
            1000:{
              perPage: 1,
              padding:0,
              gap:1
            },
            768: {
              perPage: 1,
              padding:0,
              gap:1 
            }
          },
        }}
      >
        {images.map((imageUrl, index) => (
          <SplideSlide key={index}>
            <Link to={imageUrl.link}>
            {appConfig.heroSection.heroSectionImages && (

            <img
              className="carousel-item"
              src={imageUrl.img}
              alt={`Image ${index + 1}`}
            />
             )} 
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default Scrollbar;

