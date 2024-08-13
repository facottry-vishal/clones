import React,{useEffect} from 'react'
import './tvshows.css'
import { Link } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa6";
import Scrollbar from '../scrollbar/Scrollbar'
import Carousel from '../carousal/Carousal'
import {carouselTvShowData} from '../ConstentData'
import si13 from '../images/H-scroll-13.png'
import si14 from '../images/H-scroll-14.png'
import si15 from '../images/H-scroll-15.png'
import si16 from '../images/H-scroll-16.png'
import si17 from '../images/H-scroll-17.png'
import si6 from '../images/H-scroll-6.png'
import si18 from '../images/H-scroll-18.png'
import './tvshows.css'
const imageUrls = [{img:si13,link:'/details/tv%20show/64cffee700bad552e8dcd602'}, {img:si14,link:'/details/tv%20show/64cffee700bad552e8dcd513'}, {img:si15,link:'/details/tv%20show/64cffee700bad552e8dcd537'}, {img:si16,link:'/details/tv%20show/64cffee800bad552e8dcd684'}, {img:si17,link:'/details/movie/64cffeed00bad552e8dce668'}, {img:si6,link:'/details/web%20series/64cffeed00bad552e8dce6e0'}, {img:si18,link:'/details/web%20series/64cffeee00bad552e8dce8ec'}];

function TvShows() {
  useEffect(() => {
    
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="tvshow-container">
      <section className="slider">
        <Scrollbar imageUrls={imageUrls} />
      </section>

      {carouselTvShowData.map((item, index) => (
        <div className="tranding-nu" key={index}>
          <div className="cc-header">
            <h2>{item.heading}</h2>
            {/* A dynamic Link to more */}
            <Link to={`/more/${encodeURIComponent(item.apiEndpoint)}/${item.filterType}/${encodeURIComponent(item.heading)}`} className="m-btn">
              More <FaChevronRight />
            </Link>
          </div>
          <Carousel apiEndpoint={item.apiEndpoint} filterType={item.filterType} />
        </div>
      ))}

    </div>
  );
}

export default TvShows;