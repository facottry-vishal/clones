import React, { useEffect } from 'react';
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import logo from '../images/zee5-logo-A4464FCB2C-seeklogo.com.png';
import Explore from './sightbar_dropdown_components/Explore';
import Plans from './sightbar_dropdown_components/Plans';
import Setting from './sightbar_dropdown_components/Setting';
import MyAccountDropdown from './sightbar_dropdown_components/MyAccountDropdown';
import Info from './sightbar_dropdown_components/Info';
import Auth from '../auth';
import { FaCircleUser } from 'react-icons/fa6';
import { RiCloseLine } from "react-icons/ri";
import { IoChevronForwardOutline } from 'react-icons/io5';
const SightBarModal = ({ isOpen, onClose }) => {
  const isAuthenticated = Auth.isAuthenticated();
  const storedUserName = sessionStorage.getItem('userInfoN');
  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (e.target.classList.contains('sight-bar-modal')) {
        onClose();

      }

    };

    window.addEventListener('click', closeOnOutsideClick);

    return () => {
      window.removeEventListener('click', closeOnOutsideClick);
    };
  }, [isOpen]);

  const handleCloseModal = () => {
    onClose();
  };


  return (
    <div className={`sight-bar-modal ${isOpen ? 'open' : ''}`}>
      <button className="sight-close-button" onClick={onClose}>
        <AiFillCloseCircle />
      </button>
      <div className="sight-bar-modal-content">
        <div className="sight-auth-head">
          <div className="sight-bar-header">
            <button className="sight-close-btn" onClick={onClose}>
              <RiCloseLine />
            </button>
            <div className="logo">
              <Link to="/" onClick={handleCloseModal}>
                <img className="logo" src={logo} alt="Logo" />
              </Link>
            </div>
            <div className="sight-dummy" ></div>
            
          </div>
          {isAuthenticated ? (
            <div className="uma-sec">
              <Link onClick={handleCloseModal} to="/account/profile" className="umc-head">
                <div className="umc-pi-un">
                  <FaCircleUser className="umc-icon" />
                  <p className="umc-name">{storedUserName}</p>
                </div>
                <IoChevronForwardOutline className="umc-icon-ar" />
              </Link>
            </div>
          ) : (
            <div className="bp-dtn-3">
              <Link onClick={handleCloseModal} to="/login" className='lin-btn'>Login</Link>
              <Link  className='bp-btn' onClick={handleCloseModal} to="/signup" >Sign up for free</Link>
            </div>

          )}
        </div>
        <div className="sight-scroll-pert">
          <div style={{ marginTop: '10px', paddingLeft: '15px' }}><Link onClick={handleCloseModal} style={{ textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/'>Home</Link></div>
          <hr className='tab-item-hr' />
          <Explore onClose={handleCloseModal} />
          <hr className='tab-item-hr' />
          <Plans onClose={handleCloseModal} />
          <hr className='tab-item-hr' />
          <Setting onClose={handleCloseModal} />
          <hr className='tab-item-hr' />
          {isAuthenticated && (
            <div className="op-hi-drop">
              <MyAccountDropdown onClose={handleCloseModal} />
              <hr className="tab-item-hr" />
            </div>
          )}
          <div style={{ marginTop: '10px', paddingLeft: '15px' }}><Link onClick={handleCloseModal} style={{ textDecoration: 'none', fontSize: '16px', color: 'white' }} to='/Refer_Earn_Discount'>Refer and Earn and Discount</Link></div>
          <hr className='tab-item-hr' />
          <Info onClose={handleCloseModal} />
          <hr className='tab-item-hr' />
          <div style={{ marginTop: '10px', textAlign: 'center' }}>Version 4.6.3</div>
        </div>
      </div>

    </div>
  );
};

export default SightBarModal;