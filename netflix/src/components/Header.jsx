import React, { useEffect } from "react";
import './Header.css';
import useStore from "../store";

const Header = ({ black}) => {
  const { appConfig } = useStore();
  if (!appConfig?.headerLogoSection) {
    return(
     <div>loading headerLogoSection Config</div>
    );
  }
  return (
    <header className={black ? 'black' : ''}>
            {appConfig.headerLogoSection.headerMainLogo && (

      <div className="header--logo">
          <a href="/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png" alt="Netflix Logo" />
          </a>
        
      </div>)}
      <div className="header--user">
        {appConfig. headerLogoSection.headerUserLogo && (
          <a href="/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="User Avatar" />
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
