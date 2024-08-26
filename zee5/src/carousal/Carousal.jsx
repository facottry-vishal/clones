import React, { useState, useEffect, useRef } from 'react';
import "./carousal.css";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa6";
import { PiShareFat } from "react-icons/pi";
import { Link } from 'react-router-dom';
import ShareDropdown from './ShareDropdown';
import useStore from "../store";

function Carousel({ apiEndpoint, filterType }) {
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const carouselRef = useRef(null);
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
    if (carouselRef.current) {
      const newWidth = carouselRef.current.offsetWidth;
      setWidth(newWidth);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          projectId: "qkwqr7ns3d9d",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const filteredData = data.data.filter(item => item.type === filterType);
      setImages(filteredData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Data", error);
      setError("Failed to load images.");
      setLoading(false); // Stop loading when an error occurs
    }
  };

  const handleNextClick = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
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

  const { appConfig } = useStore();

  if (!appConfig?.movieSection) {
    return <div>Loading movieSection Config</div>;
  }

  return (
    <div id="wrapper">
      {appConfig.movieSection.allMoviesection && (
        <>
          <div id="carousel" ref={carouselRef}>
            {loading ? (
              <div className="loading-cont">
                <p>Loading...</p>
              </div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
              <div id="content">
                {images.map((imageUrl, index) => (
                  <div className="image-cont" key={index}>
                    <Link to={`/details/${imageUrl.type}/${imageUrl._id}`}>
                      <img
                        className="item"
                        src={imageUrl.thumbnail}
                        alt={`Image ${index + 1}`}
                      />
                    </Link>
                    <div className="details">
                      <h5 className="c-name">{imageUrl.title}</h5>
                      <div className="a-btn">
                        <button className="wa-btn">
                          <Link to={`/details/${imageUrl.type}/${imageUrl._id}`}>
                            <FaPlay className="wa-icon" /> Watch
                          </Link>
                        </button>
                        <div className="sa-btn-wrapper">
                          <button
                            className="sa-btn"
                            onMouseEnter={openDropdown}
                          >
                            <PiShareFat className="sa-icon" /> Share
                          </button>
                          <ShareDropdown
                            isOpen={isDropdownOpen}
                            onClose={closeDropdown}
                            onLinkClick={handleLinkClick}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {currentIndex > 0 && (
            <button id="prev" onClick={handlePrevClick}>
              <BsFillArrowLeftCircleFill />
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button id="next" onClick={handleNextClick}>
              <BsFillArrowRightCircleFill />
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Carousel;
