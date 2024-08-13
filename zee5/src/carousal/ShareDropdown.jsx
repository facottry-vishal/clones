import React, { useState } from 'react';
import {shareLinks} from '../ConstentData'

function ShareDropdown({ isOpen, onClose, onLinkClick }) {
      return (
        isOpen && (
          <div onMouseLeave={onClose} className="shate-dropdown-modal">
            <ul>
              {shareLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url+encodeURIComponent('https://zee5-vcys.vercel.app/')} onClick={() => onLinkClick(link.url + encodeURIComponent('https://zee5-vcys.vercel.app/'))}
                target="_blank" >
                  {link.icon}
                  </a>
                </li>
              ))}
            </ul>
            
          </div>
        )
      );
}

export default ShareDropdown