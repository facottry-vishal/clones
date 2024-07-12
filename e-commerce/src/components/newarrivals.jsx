/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

import { Link } from 'react-router-dom';
import { PRODUCTS } from './products';
import { PRODUCTS1 } from './products';
import ReactStars from "react-rating-stars-component";
import React, { useState, useEffect } from 'react';


const newarrivals = () => {
  const [appConfig, setAppConfig] = useState(null);

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
              COUNTRY: "US",
              SUBSCRIPTION: "FREE",
            },
            projectID: "vishal_72d8f604-cb87-4358-8dc8-1d53a96670c9",
          }),
        });

        const data = await response.json();
        if (data.code === "FOUND") {
          setAppConfig(data.mappings.appConfig);
        }
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    };

    fetchConfig();
  }, []);

  if (!appConfig) {
    return <div>Loading...</div>;
  }
  return <>
    {appConfig.newarrival && (
    <div  className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 p-3">
      {PRODUCTS1.slice(1, 5).map((product, index) => (
        <div key={index} className="col mb-5">
        <div key={product.id} className="card h-100 m-auto">
          <img src={product.image} className="card-img-top img-fluid" alt="..." />
          <div className="card-body">
            <p className="card-text mb-2">{product.brand}</p>
            <h5 className='mb-3'>{product.name} </h5>
            <div className="card-footer text-center m-auto">
            <p className="fs-4 text-danger">{product.status} </p>
            <p className="price"><span className="red"></span><strike>{product.rate} </strike></p>
            </div>
            <div className="card-footer d-md-none">
                <div className="d-flex justify-content-between align-items-center">
                  <Link to='shop' className='m-auto'>View products</Link>
                </div>
              </div>

          </div>
          
        </div>
        </div>
        ))}
      
     
    </div>
    )}
  </>;
      
}

export default newarrivals