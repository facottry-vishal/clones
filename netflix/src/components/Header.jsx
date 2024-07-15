import React, { useEffect } from "react";
import './Header.css';

const Header = ({ black, appConfig }) => {
  return (
    <header className={black ? 'black' : ''}>
      <div className="header--logo">
        {appConfig && appConfig.biglogo && (
          <a href="/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png" alt="Netflix Logo" />
          </a>
        )}
      </div>
      <div className="header--user">
        {appConfig && appConfig.smalllogo && (
          <a href="/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="User Avatar" />
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
