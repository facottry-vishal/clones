import React, { useState } from "react"
import "./header.css"
import useStore from "../../store";

const Header = () => {
  const [Mobile, setMobile] = useState(false)
  const { appConfig } = useStore();
  if (!appConfig?.header) {
    return <div>Loading header Config...</div>;
  }

  return (

    
<>
    
{appConfig.navBarButtons.fullHeaderHide &&(

      <header>

        <div className='container flexSB'>

          <nav className='flexSB'>
            <div className='logo'>
            {appConfig.header.headerMainLogo &&(
              <img src='./images/logo.png' alt='' />
            )}
            </div>

            {/*<ul className='flexSB'>*/}
            <ul className={Mobile ? "navMenu-list" : "flexSB"} onClick={() => setMobile(false)}>
              <li>
              {appConfig.navBarButtons.homeButton &&(
                <a href='/'>Home</a>
              )}
              </li>
              <li>
              {appConfig.navBarButtons.seriesButton &&(
                <a href='/'>Series</a>
              )}
              </li>
              <li>
              {appConfig.navBarButtons.movieButton &&(
                <a href='/'>Movies</a>
              )}
              </li>
              <li>
              {appConfig.navBarButtons.pageButton &&(
                <a href='/'>Pages</a>
              )}
              </li>
              <li>
              {appConfig.navBarButtons.princingButton &&(
                <a href='/'>Pricing</a>
              )}
              </li>
              <li>
              {appConfig.navBarButtons.contactbutton &&(
                <a href='/'>Contact</a>
              )}
              </li>
            </ul>
            <button className='toggle' onClick={() => setMobile(!Mobile)}>
              {Mobile ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </nav>

          <div className='account flexSB'>
            <i className='fa fa-search'></i>
            <i class='fas fa-bell'></i>
            <i className='fas fa-user'></i>
            <button>Subscribe Now</button>
          </div>
        </div>

      </header>
)}
</>
    
  )
}

export default Header
