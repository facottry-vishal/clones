/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../components/shopcontext';
import { CiMail } from 'react-icons/ci';
import { BiPhoneCall } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { VscAccount } from 'react-icons/vsc';
import { CgShoppingCart, CgProductHunt } from 'react-icons/cg';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link, NavLink, useLocation } from 'react-router-dom';
import compare from "../assets/images/compare.svg";
import wishlist from "../assets/images/wishlist.svg";
import user from "../assets/images/user.svg";
import logo from '../assets/images/apneck.png';
import { MdOutlineToggleOff, MdOutlineToggleOn } from "react-icons/md";
import useStore from "../store";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { getTotalCartProducts, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const totalProducts = getTotalCartProducts();
  const location = useLocation();
  const [mode, setMode] = useState(false);
  const [full, setFull] = useState(false);
  const { appConfig } = useStore();

  // Render loading state if appConfig is not yet loaded

  if (!appConfig?.headerConfig) {
    return (
      <div>Loading Header Config</div>
    );
  }


  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <header className='navbar-top p-2'>
        <div className="container-xxl">
          <div className="row">
            <div className="d-flex align-items-center justify-content-between d-none d-md-flex">
              <div className="col-md-8 me-auto">
                {appConfig.headerConfig.heading1 && (
                  <p className='text-black'>The trending outfits at 100% off</p>
                )}
              </div>
              <div className="col-md-2">
                {appConfig.headerConfig.telephone && (
                  <a href="tel:+">Call us at +1 (234) 567-890</a>
                )}
              </div>
              <div className="col-md">
                {appConfig.headerConfig.email && (
                  <Link className='links fs-4'><CiMail /></Link>
                )}
                {appConfig.headerConfig.call && (
                  <Link className='links fs-4'><BiPhoneCall /></Link>
                )}
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between d-md-none">
              <div className="col-md-6 me-auto">
                <p>Save Upto 100%</p>
              </div>
              <div className="col-md-2 m-auto">
                <a href="tel:+">Call us</a>
              </div>
              <div className="col-md-2 m-auto">
                <Link className='links fs-4'><CiMail /></Link>
                <Link className='links fs-4'><BiPhoneCall /></Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className='navbar-middle sticky-top p-2 p-md-2 p-lg-2'>
        <div className="container-xxl">
          <div className="row align-items-center m-0">
            <div className="col-md-2 d-flex justify-content-center">
              <button className="navbar-toggler d-md-none" type="button" onClick={toggleMenu}>
                <span className="navbar-toggler-icon">{showMenu ? <AiOutlineClose /> : <AiOutlineMenu />}</span>
              </button>
              <Link to='/'>
                {appConfig.headerConfig.logo && (
                  <img src={logo} alt="logo" className='img-fluid logo' />
                )}
              </Link>
              {appConfig.headerConfig.cart && (
                <button className="cart-span fs-3 d-md-none">
                  <Link to='/cart' className={location.pathname === '/cart' ? 'active' : ''}>
                    <CgShoppingCart />
                    <b><span>{totalProducts} </span></b>
                  </Link>
                </button>
              )}
              {appConfig.headerConfig.login && (
                <button className='cart-span-2 fs-3 d-md-none'>
                  <Link to='/login' className={location.pathname === '/login' ? 'active' : ''}>
                    <VscAccount />
                  </Link>
                </button>
              )}
            </div>
            <div className="col-md-10 row col-lg-10">
              <div className="col-md-3 m-auto">
                {appConfig.headerConfig.search && (
                  <div className="input-group d-none d-md-flex">
                    <input type="text" className="form-control" placeholder="Find products ..." aria-label="Find products ..." aria-describedby="basic-addon2" />
                    <button className="input-group-text" id="basic-addon2">search</button>
                  </div>
                )}
              </div>
              <div className="col-md-6 m-auto">
                <div className='menu-links mt-2 d-none d-md-flex d-lg-flex'>
                  {appConfig.headerConfig.home && (
                    <div className='ms-auto gap-3'>
                      <NavLink to="/" className={location.pathname === '/' ? 'active' : ''} onClick={toggleMenu}>HOME</NavLink>
                    </div>
                  )}
                  {appConfig.headerConfig.shop && (
                    <div className='ms-auto gap-3'>
                      <NavLink to="/shop" className={location.pathname === '/shop' ? 'active' : ''} onClick={toggleMenu}>SHOP</NavLink>
                    </div>
                  )}
                  {appConfig.headerConfig.blog && (
                    <div className='ms-auto gap-3'>
                      <NavLink to="/blog" className={location.pathname === '/blog' ? 'active' : ''} onClick={toggleMenu}>BLOG</NavLink>
                    </div>
                  )}
                  {appConfig.headerConfig.about && (
                    <div className='ms-auto gap-3'>
                      <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={toggleMenu}>ABOUT</NavLink>
                    </div>
                  )}
                  {appConfig.headerConfig.contact && (
                    <div className='ms-auto gap-3'>
                      <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={toggleMenu}>CONTACT</NavLink>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-3">
                <div className="row d-flex justify-content-center">
                  <div className="col-12 col-md-2 d-none d-md-flex d-lg-flex m-auto">
                    {appConfig.headerConfig.carticon && (
                      <div className={location.pathname === '/' ? 'active' : ''}>
                        <Link to="/" onClick={toggleMenu} className="d-flex align-items-center color-nav me-3">
                          <CgProductHunt className='me-1 fs-2' />
                        </Link>
                      </div>
                    )}
                    {appConfig.headerConfig.loginicon && (
                      <div className={location.pathname === '/login' ? 'active' : ''}>
                        <Link to="/login" onClick={toggleMenu} className="d-flex align-items-center color-nav me-3">
                          <VscAccount className='me-1 fs-2' />
                        </Link>
                      </div>
                    )}
                    {appConfig.headerConfig.tollyicon && (
                      <div className={location.pathname === '/cart' ? 'active' : ''}>
                        <Link to="/cart" onClick={toggleMenu} className="d-flex align-items-center color-nav me-3 cart-span-one">
                          <CgShoppingCart className='me-1 fs-2' />
                          <div>
                            <p><b><span>{totalProducts}</span></b></p>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {showMenu && (
              <div className="col-md-10 d-md-none mt-3">
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="Find products ..." aria-label="Find products ..." aria-describedby="basic-addon2" />
                  <button className="input-group-text" id="basic-addon2">search</button>
                </div>
                <div className='menu-links mt-2'>
                  <div className='mb-2'><NavLink className={location.pathname === '/' ? 'active' : ''} to="/" onClick={toggleMenu}>HOME</NavLink></div>
                  <div className='mb-2'><NavLink className={location.pathname === '/shop' ? 'active' : ''} to="/shop" onClick={toggleMenu}>SHOP</NavLink></div>
                  <div className='mb-2'><NavLink className={location.pathname === '/blog' ? 'active' : ''} to="/blog" onClick={toggleMenu}>BLOG</NavLink></div>
                  <div className='mb-2'><NavLink className={location.pathname === '/about' ? 'active' : ''} to="/about" onClick={toggleMenu}>ABOUT</NavLink></div>
                  <div className='mb-2'><NavLink className={location.pathname === '/contact' ? 'active' : ''} to="/contact" onClick={toggleMenu}>CONTACT</NavLink></div>
                </div>

                <div className="menu-bar__actions">
                  <div className='mb-2'>
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={toggleMenu}>
                      <img src={compare} alt="compare" className='d-none' />
                      <span>New</span>
                    </Link>
                  </div>
                  <div className='mb-2'>
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={toggleMenu}>
                      <img src={wishlist} alt="wishlist" className='d-none' />
                      <span>Wishlist</span>
                    </Link>
                  </div>
                  <div className='mb-2'>
                    <Link to="/login" className={location.pathname === '/login' ? 'active' : ''} onClick={toggleMenu}>
                      <img src={user} alt="user" className='d-none' />
                      <span>Account</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
