import React,{useEffect} from 'react'
import { Link } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa6";
import Scrollbar from '../scrollbar/Scrollbar'
import Carousel from '../carousal/Carousal'
import si1 from '../images/H-scroll-1.jpg'
import si2 from '../images/H-scroll-2.jpg'
import si3 from '../images/H-scroll-3.jpg'
import si4 from '../images/H-scroll-4.png'
import si5 from '../images/H-scroll-5.png'
import si6 from '../images/H-scroll-6.png'
import si7 from '../images/H-scroll-7.png'
import {carouselHomeData} from '../ConstentData';
import './home.css'
import useStore from "../store";


const imageUrls = [{img:si1,link:'/details/movie/64cffee700bad552e8dcd52d'}, {img:si2,link:'/details/movie/64cffeee00bad552e8dce9f4'}, {img:si3,link:'/details/movie/64cffee700bad552e8dcd59e'}, {img:si4,link:'/details/web%20series/64cffee700bad552e8dcd551'}, {img:si5,link:'/details/web%20series/64cffeed00bad552e8dce6e8'}, {img:si6,link:'/details/web%20series/64cffee700bad552e8dcd614'}, {img:si7,link:'/details/web%20series/64cffee800bad552e8dcd63a'}
  // Add more image URLs as needed
];
  
function Home() {
  useEffect(() => {
    
    window.scrollTo(0, 0);
  }, []);
  const { appConfig } = useStore();

  if (!appConfig?.movieSection) {
    return <div>Loading movieSection Config</div>;
  }
  return (
    <div className="home-container">
      <section className="slider">
        <Scrollbar imageUrls={imageUrls} />
      </section>

      {carouselHomeData.map((item, index) => (
        <div className="tranding-nu" key={index}>
          <div className="cc-header">
          {appConfig.movieSection.movieRommendedheading && (

            <h2>{item.heading}</h2>
          )}
            {/* A dynamic Link to more */}
            {appConfig.movieSection.watchAndshareButton && (
            <Link to={`/more/${encodeURIComponent(item.apiEndpoint)}/${item.filterType}/${encodeURIComponent(item.heading)}`} className="m-btn">
              More <FaChevronRight />
            </Link>
            )}
          </div>
          <Carousel apiEndpoint={item.apiEndpoint} filterType={item.filterType} />
        </div>
      ))}

     
    </div>
  );
}

export default Home;



// "status":"success","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDliNjNhOThlOGExZGZlYWY4YTIxZCIsImlhdCI6MTY5NTEzNTI5MCwiZXhwIjoxNzI2NjcxMjkwfQ.kzU0gyBnqPvKAC8pXiQGYl72tbK3K7jm5g7BSiDwMpU","data":{"user":{"_id":"6509b63a98e8a1dfeaf8a21d","name":"subham","email":"subham@gmail.com","profileImage":null,"address":[],"paymentDetails":[],"education":[],"skills":[]}}}