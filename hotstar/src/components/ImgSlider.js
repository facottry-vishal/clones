import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { useState, useEffect } from "react";


const ImgSlider = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const [appConfig, setAppConfig] = useState(null); // State to hold configuration data

  // Fetch configuration from API on component mount
  useEffect(() => {
   const fetchConfig = async () => {
     try {
       const response = await fetch("https://facottry-server.onrender.com/scale/get-mapping", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           filter: {
             COUNTRY: "IN",
             SUBSCRIPTION: "PAID",
           },
           projectID: "vishal_72d8f604-cb87-4358-8dc8-1d53a96670c9",
         }),
       });

       const data = await response.json();
       if (data.code === "FOUND") {
         setAppConfig(data.mappings.appConfig); // Set appConfig state with API response
       }
     } catch (error) {
       console.error("Error fetching config:", error);
     }
   };

   fetchConfig();
 }, []);
  // Toggle feature flag
  const toggleFeature = (key) => {
    setAppConfig((prevConfig) => ({
      ...prevConfig,
      [key]: !prevConfig[key],
    }));
  };
  
  // Render loading state if appConfig is not yet loaded
  if (!appConfig) {
    return <div>Loading...</div>;
  }
  return (
    <Carousel {...settings}>
      {appConfig.imgone && (
        <Wrap>
          <a>
            <img src="/images/slider-badging.jpg" alt="imgone" />
          </a>
        </Wrap>
      )}

      {appConfig.imgtwo && (
        <Wrap>
          <a>
            <img src="/images/slider-scale.jpg" alt="imgtwo" />
          </a>
        </Wrap>
      )}

      {appConfig.imgthree && (
        <Wrap>
          <a>
            <img src="/images/slider-badag.jpg" alt="imgthree" />
          </a>
        </Wrap>
      )}

      {appConfig.imgfour && (
        <Wrap>
          <a>
            <img src="/images/slider-scales.jpg" alt="imgfour" />
          </a>
        </Wrap>
      )}
    </Carousel>
  );
};
const Carousel = styled(Slider)`
  margin-top: 20px;
  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;
    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }
  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }
  li.slick-active button:before {
    color: white;
  }
  .slick-list {
    overflow: initial;
  }
  .slick-prev {
    left: -75px;
  }
  .slick-next {
    right: -75px;
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      padding: 0;
      border: 4px solid rgba(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
`;

export default ImgSlider;