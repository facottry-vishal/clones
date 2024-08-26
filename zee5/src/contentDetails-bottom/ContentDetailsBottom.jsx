import React from 'react'
import './contentDetailsBottom.css'
import { Link } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa6";
import Carousel from '../carousal/Carousal'
import {carouselData} from '../ConstentData'

function ContentDetails_Bottom() {
  

  return (
    <div className="CDB-container">
      {carouselData.map((item, index) => (
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
  )
}

export default ContentDetails_Bottom