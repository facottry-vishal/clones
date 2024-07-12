/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext} from 'react'
import { ShopContext } from './shopcontext'
import { RiDeleteBack2Line } from 'react-icons/ri'
import jsonData from "../config.json";
const cartitem = (props) => {

    const {id, name, price, image, brand} = props.data;
    const { addToCart, cartItems, removeToCart, updateCartItemCount, itemPrice} = useContext(ShopContext);
    const itemsInStock = id === 0 ? Math.ceil((id + 2.5) * 102 / 2) : Math.ceil((id * 102.5) / 2);
    const toggleConfig = (key) => {
      // No need to toggle appConfig if not using state
      // Directly manipulate the jsonData or use a local variable
      console.log(`Toggling ${key}`);
    };
  
    const cartitemConfig = jsonData.mappings.customConfig.cartitemConfig; // Accessing directly from JSON data
  return <>


<div className="container card my-3">
      <div className="row g-3">
        <div className="col-12 col-md-5">
          <div className="p-3">
            <div className="cart-item-image m-auto">
            {cartitemConfig.cartimage && (
              <img src={image} className="card-img-top img-fluid" alt="..." />
            )}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-7">
          <div className="p-3">
          {cartitemConfig.cartname && (
            <h2>{name}</h2>
          )}
          {cartitemConfig.cartbrand && (
            <p className="cart-item-id">Product Brand: <b className='text-center mb-1'>{brand}</b></p>
          )}
          {cartitemConfig.cartprice && (
            <p className="cart-item-id">Product Price: <b className='text-center mb-1'>${price}</b></p>
          )}
          {cartitemConfig.cartquantity && (
            <p className="cart-item-id">Product Number: <b className='text-center mb-3'>{id}</b></p>
          )}
          {cartitemConfig.cartstock && (
            <p className="cart-item-id">Items in Stock: <b className='text-danger'>{itemsInStock}</b></p>
          )}
          </div>
          <div className="p-3 d-flex justify-content-between align-items-center">
          {cartitemConfig.count && (
            <div className="count-handler">
              <button className="btn btn-outline-secondary" onClick={() => addToCart(id)}>+</button>
              <input className='text-danger fs-4 form-control' value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value), id)} />
              <button className="btn btn-outline-secondary" onClick={() => removeToCart(id)}>-</button>
            </div>
          )}
          {cartitemConfig.cartremove && (
            <button className="btn btn-outline-danger" onClick={() => removeToCart(id)}>
              
              <RiDeleteBack2Line />
            </button>
          )}
          </div>

          <div className="p-3">
          {cartitemConfig.coupancode && (
            <input type="text" className="form-control" id="coupon" placeholder="Enter coupon code..." />
          )}
          </div>
        </div>
      </div>
    </div>
  </>;
}

export default cartitem