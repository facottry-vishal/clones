import React, { useState, useEffect, useRef } from 'react';
import "./carousal.css";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa6";
import { PiShareFat } from "react-icons/pi";
import { Link } from 'react-router-dom';
import ShareDropdown from './ShareDropdown';

function Carousel({ apiEndpoint, filterType }) {
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const contentRef = useRef(null);
  const prevButton = useRef(null);
  const nextButton = useRef(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  const openDropdown = () => {
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLinkClick = (url) => {
    setSelectedLink(url);
    closeDropdown();
  };

  const updateWidth = () => {
    const newWidth = carouselRef.current.offsetWidth;
    setWidth(newWidth);
  };

  const fetchImages = async () => {

    try {
      const response = await fetch(
        apiEndpoint,
        {
          method: "get",
          headers: new Headers({
            projectId: "qkwqr7ns3d9d",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const filteredData = data.data.filter(item => item.type === filterType);
      setImages(filteredData);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching Data", error);
    }
  };


  const handleNextClick = () => {
    const carousel = carouselRef.current;

    if (currentIndex < images.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);

      carousel.scrollBy({ left: width + 16, behavior: "smooth" });

      if (currentIndex === images.length - 2) {
        nextButton.current.style.display = "none";
      }

      prevButton.current.style.display = "flex";
    }
  };

  const handlePrevClick = () => {
    const carousel = carouselRef.current;

    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);

      carousel.scrollBy({ left: -(width + 16), behavior: "smooth" });

      if (currentIndex === 1) {
        prevButton.current.style.display = "none";
      }

      nextButton.current.style.display = "flex";
    }
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);


    fetchImages();

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);
  // console.log(images);
  return (
    <div id="wrapper">
      <div id="carousel" ref={carouselRef}>
        <div id="content" ref={contentRef}>
          {loading ? (
            <div className="looding-cont" >
              <p>Loading...</p>
            </div>
          ) : (
            images.map((imageUrl, index) => (
              <div className="image-cont" key={index}>
                <Link to={`/details/${imageUrl.type}/${imageUrl._id}`}>
                  <img
                    className="item"
                    src={imageUrl.thumbnail}
                    alt={`Image ${index + 1}`}
                  />
                </Link>
                <div className="details">
                  <h5 className='c-name'>{imageUrl.title}</h5>
                  <div className="a-btn">
                    <button className='wa-btn'>
                      <Link to={`/details/${imageUrl.type}/${imageUrl._id}`}><FaPlay className='wa-icon' /> Watch</Link>
                    </button>
                    <div className="sa-btn-wrapper" >
                      <button className='sa-btn'  onMouseEnter={openDropdown}>
                        <PiShareFat className='sa-icon' /> Share
                      </button>
                      <ShareDropdown isOpen={isDropdownOpen} onClose={closeDropdown} onLinkClick={handleLinkClick} />
                    </div>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <button
        id="prev"
        ref={prevButton}
        onClick={handlePrevClick}
        style={{ display: "none" }}
      >
        <BsFillArrowLeftCircleFill />
      </button>
      <button
        id="next"
        ref={nextButton}
        onClick={handleNextClick}
        style={{
          display: images.length === 0 ? "none" : "flex",
        }}
      >
        <BsFillArrowRightCircleFill />
      </button>
    </div>
  );
}

export default Carousel;
