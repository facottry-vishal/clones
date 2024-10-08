import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from './products';
import useStore from "../store";

const FeaturedProducts = () => {
  const { appConfig } = useStore();

  if (!appConfig?.homePageInfeaturedProductSection) {
    return (
      <div>Loading FeaturedProduct Config</div>
    );
  }

  return (
    <>
      {appConfig.homePageInfeaturedProductSection.featuredProduct4ImagesSection && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 p-3">
          {PRODUCTS.slice(2, 6).map((product, index) => (
            <div key={index} className="col mb-5">
              <div className="card h-100 m-auto">
                <img src={product.image} className="card-img-top img-fluid" alt="Product" />
                <div className="card-body">
                  <p className="card-text mb-2">{product.brand}</p>
                  <h5 className='mb-3'>{product.name}</h5>
                  <div className="card-footer m-auto text-center">
                    <p className='text-danger fs-4'>{product.status}</p>
                    <p className="price"><span className="red"></span> <strike>${product.rate}</strike></p>
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
    </>
  );
};

export default FeaturedProducts;
