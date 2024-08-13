import React from 'react'
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { useLocation} from 'react-router-dom';
import {footerLists} from '../ConstentData';
import './footer.css';

function Footer() {
   
    const location=useLocation();
    const path=location.pathname;
    
    return (
        <>
        {!(path === '/login' || path === '/signup') && (
        <section id="footer">
            <hr />
            <div id="footerTop">
                <div id="f-Left">
                    <div>
                        <h3>Download Apps</h3>
                    </div>
                    <div>
                        <img src="https://www.zee5.com/images/play_store.png?ver=2.52.15" alt="" />
                    </div>
                    <div>
                        <img src="https://www.zee5.com/images/app_store.png?ver=2.52.15" alt="" />
                    </div>
                </div>
                <div id="f-Right">
                    <div>
                        <h3>Connect with us</h3>
                    </div>
                    <div className='f-icon'>
                        <a href="https://www.facebook.com/ZEE5/"><BsFacebook /></a>
                    </div>
                    <div className='f-icon'>
                        <a href="https://www.instagram.com/zee5/"><BsInstagram /></a>
                    </div>
                    <div className='f-icon'>
                        <a href="https://twitter.com/zee5india"><BsTwitter /></a>
                    </div>
                    <div className='f-icon'>
                        <a href="https://www.youtube.com/channel/UCXOgAl4w-FQero1ERbGHpXQ"><BsYoutube /></a>
                    </div>
                </div>
            </div>
            <div id="f-more">
                <h4>About Us</h4>
                <h4>|</h4>
                <h4>Help Center</h4>
                <h4>|</h4>
                <h4>Privacy Policy</h4>
                <h4>|</h4>
                <h4>Terms of Use</h4>
            </div>
            <div id="f-body">
                {footerLists.map((list, index) => (
                    <div key={index}>
                        <ul>
                            <li className="makeBold"><h3> {list.title}</h3></li>
                            {list.items.map((item, itemIndex) => (
                                <li className='op-list' key={itemIndex}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div id="f-bott">
                <p>Best viewed on Google Chrome 80+, Microsoft Edge 81+, Mozilla Firefox 75+, Safari 5.1.5+<br />
                    Copyright © 2022 Zee Entertainment Enterprises Ltd. All rights reserved.
                </p>
            </div>
        </section>
        )}
        </>
    );
}

export default Footer