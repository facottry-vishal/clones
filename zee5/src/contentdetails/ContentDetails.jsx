import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecommendedContent from '../recommendedContent/RecommendedContent';
import { BsFillCircleFill ,BsFillPlayCircleFill} from "react-icons/bs";
import { PiShareFat } from "react-icons/pi";
import WatchlistButton from './WatchlistButton';
import './contentdetails.css';
import ContentDetailsBottom from '../contentDetails-bottom/ContentDetailsBottom';
import ShareDropdown from '../carousal/ShareDropdown';

function ContentDetails() {
  const { id, type } = useParams();
  const [detailsUrl, setDetailsUrl] = useState('');
  const [videoKey, setVideoKey] = useState(0);
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
    const fetchDetailsUrl = async () => {
      try {
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/ott/show/${id}`,
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
        const detailsData = data.data;
      
        setDetailsUrl(detailsData);
        setVideoKey(prevKey => prevKey + 1);
      } catch (error) {
        console.error("Error fetching video URL", error);
      }
    };

    fetchDetailsUrl();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div>
      <div className='vid-container'>
        <div className="v-top">

          {detailsUrl && (
            <>
              <div className='v-cont'>
                <div className="vid-con">
                  <video controls key={videoKey} className='d-vid'>
                    <source src={detailsUrl.video_url} type="video/mp4" />
                  </video>
                </div>
                <div className="vid-det">
                  <h1 className='m-title'>{detailsUrl.title}</h1>
                  <div className="v-tca">
                    <h2>{detailsUrl.type}</h2>
                  </div>
                  <div className="v-genre">
                    <h2 className="v-genre-hed">2h 7m</h2>
                    {detailsUrl.keywords.map((keyword, index) => (
                      <h2 key={index} className="gen"><BsFillCircleFill className='g-icon'/> {keyword}</h2>
                    ))}
                    <h2 className="v-genre-hed"><BsFillCircleFill className='g-icon'/> U/A 16+</h2>
                  </div>
                  <div className="v-ac-con">
                  <div className="sa-btn-wrapper" >
                    <div className='v-ac-btn' onMouseEnter={openDropdown}><PiShareFat /> <span>share</span></div>
                    <div className='v-ac-share'>
                    <ShareDropdown  isOpen={isDropdownOpen} onClose={closeDropdown} onLinkClick={handleLinkClick} />
                    </div>
                    </div>
                    <WatchlistButton id={id} />
                    {/* <div className='v-ac-btn'><BsFillPlayCircleFill /> <span>watch Trailer</span></div> */}
                  </div>
                  <div className="v-descrip">
                    <h3 className='v-descrip-na'> {detailsUrl.description} {detailsUrl.description} {detailsUrl.description} {detailsUrl.description}</h3>
                  </div>
                  <div className="v-cast">
                    <h2 className='v-cast-hed'>Cast:</h2>
                  </div>
                  <div className="v-cast">
                    {detailsUrl.cast.map((cast, index) => (
                      <h2 key={index} className="gen"> {cast}</h2>
                    ))}
                  </div>
                  <div className="v-dir">
                    <h2 className='v-dir-hed'>Director:</h2>
                  </div>
                  <div className="v-dir">
                    <h2 className='v-dir-na'> {detailsUrl.director}</h2>
                  </div>
                  
                </div>
              </div>
              <div className="r-cont">
                <RecommendedContent type={type} />
              </div>
            </>
          )}
        </div>
        <div className="v-bottom">
         <ContentDetailsBottom />
        </div>

      </div>
    </div>
  );
}

export default ContentDetails;
