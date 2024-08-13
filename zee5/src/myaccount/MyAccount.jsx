import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import {AccountTabs} from '../ConstentData'
import './myaccount.css';

function MyAccount() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  // console.log(activeTab,'active')
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const segments = path.split('/');
    const lastSegment = segments[segments.length - 1];
    setActiveTab(lastSegment)
  }, [location]);
  
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    navigate(`/account/${tabName}`); // Change the route when a tab is clicked
  };

  return (
    <div className='my-acc-container'>
      <div className='my-acc-section'>
        <div className='tab-header'>
          {AccountTabs.map((tab) => (
            <div
              key={tab.tabName}
              className={`tab ${activeTab === tab.tabName ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.tabName)}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className='tab-content'>
          <h1 className='tab-item-head'>{AccountTabs.find((tab) => tab.tabName === activeTab).heading}</h1>
          <hr className='tab-item-hr' />
          {/* Render the content based on the active tab */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
