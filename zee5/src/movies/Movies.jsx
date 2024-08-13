import React,{useEffect} from 'react'
import './movies.css'
import { Link } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa6";
import Scrollbar from '../scrollbar/Scrollbar'
import Carousel from '../carousal/Carousal'
import {carouselMovieData} from '../ConstentData'
import si8 from '../images/H-scroll-8.png'
import si2 from '../images/H-scroll-2.jpg'
import si9 from '../images/H-scroll-9.png'
import si10 from '../images/H-scroll-10.png'
import si11 from '../images/H-scroll-11.png'
import si12 from '../images/H-scroll-12.png'
import si7 from '../images/H-scroll-7.png'
const imageUrls = [{img:si8,link:'/details/movie/64cffeee00bad552e8dce9fc'}, {img:si2,link:'/details/movie/64cffee700bad552e8dcd590'}, {img:si9,link:'/details/web%20series/64cffeed00bad552e8dce7a4'}, {img:si10,link:'/details/trailer/64cffeec00bad552e8dce2c6'}, {img:si11,link:'/details/trailer/64cffee700bad552e8dcd527'}, {img:si12,link:'/details/movie/64cffeef00bad552e8dcec34'}, {img:si7,link:'/details/web%20series/64cffeee00bad552e8dcea10'}
  // Add more image URLs as needed
];

function Movies() {
  useEffect(() => {
    
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="home-container">
      <section className="slider">
        <Scrollbar imageUrls={imageUrls} />
      </section>

      {carouselMovieData.map((item, index) => (
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

export default Movies;