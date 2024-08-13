import React from 'react'
import SightDropdown from './SightDropdownCreater';
import {sightDropScontent} from '../../ConstentData'
function Setting({onClose}) {
    
      const headder='Setting';
      return (
        <>
          <SightDropdown heading={headder} content={sightDropScontent} onClose={onClose} />
        </>
      );
}

export default Setting