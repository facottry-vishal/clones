import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay } from "react-icons/fa6";
import { PiShareFat } from "react-icons/pi";
import ShareDropdown from '../carousal/ShareDropdown';
import './recommendedContent.css';

function RecommendedContent({ type }) {
  const [recommendedContent, setRecommendedContent] = useState([]);
  const [loading, setLoading] = useState(true); 
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

  useEffect(() => {
    const fetchRecommendedContent = async () => {
      try {
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/ott/show?limit=20&type=${type}`,
          {
            method: "GET",
            headers: new Headers({
              projectId: "qkwqr7ns3d9d",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const recommendedData = data.data;

        setRecommendedContent(recommendedData);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching recommended content", error);
        setLoading(false); 
      }
    };

    fetchRecommendedContent();
  }, [type]);

  // Return early if still loading content or config
  if (loading) {
    return <div>Loading content...</div>;
  }



 
  return (
    <div className='reco-section'>
        <h1 className='re-heading'>Recommended {type} For You</h1>
      
      <div className="rc-Container">
        {recommendedContent.map((data, index) => (
          <div className="image-cont" key={index}>
            <Link to={`/details/${data.type}/${data._id}`}>
              <img
                className="item"
                src={data.thumbnail}
                alt={`Image ${index + 1}`}
              />
            </Link>
            <div className="details">
              <h5 className='c-name'>{data.title}</h5>
              <div className="a-btn">
                <button className='wa-btn'>
                  <Link to={`/details/${data.type}/${data._id}`}>
                    <FaPlay className='wa-icon' /> Watch
                  </Link>
                </button>
                <div className="sa-btn-wrapper">
                  <button className='sa-btn' onMouseEnter={openDropdown}>
                    <PiShareFat className='sa-icon' /> Share
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
    </div>
  );
}

export default RecommendedContent;
