import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCircleUser } from 'react-icons/fa6';
import { IoChevronForwardOutline } from 'react-icons/io5';
import UserDropdownSelect from './UserDropdownSelect';
import Auth from '../auth'; // Import your Auth module

const UserModal = ({ onClose }) => {
  const storedUserName = sessionStorage.getItem('userInfoN');
  const isAuthenticated = Auth.isAuthenticated();

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (e.target.classList.contains('user-modal')) {
        onClose();
      }
    };

    window.addEventListener('click', closeOnOutsideClick);

    return () => {
      window.removeEventListener('click', closeOnOutsideClick);
    };
  }, []);
  
  const handleClose=()=>{
     onClose();
  }
 
  if (!isAuthenticated) {
    return null; // If not authenticated, don't render the modal
  }

  return (
    <div className="user-modal">
      <div className="modal-content">
        <div className="uma-sec">
          <Link onClick={handleClose} to="/account/profile" className="umc-head">
            <div className="umc-pi-un">
              <FaCircleUser className="umc-icon" />
              <p className="umc-name">{storedUserName}</p>
            </div>
            <IoChevronForwardOutline className="umc-icon-ar" />
          </Link>
        </div>
        <div className="umaf-sec">
          <UserDropdownSelect onClose={handleClose}/>
          <hr className='tab-item-hr' />
          <div style={{ marginTop: '10px' }}>Version 4.6.3</div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
