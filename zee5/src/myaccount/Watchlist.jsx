import React, { useState } from 'react';
import { WatchListTabs } from '../ConstentData';
function Watchlist() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className='my-sub-tab-acc-section'>
      <div className="sub-tab-header">
        {WatchListTabs.map((tab, index) => (
          <div
            key={index}
            className={`sub-tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="sub-tab-content">
        {WatchListTabs[activeTab].content}
      </div>
    </div>
  );
}

export default Watchlist;
