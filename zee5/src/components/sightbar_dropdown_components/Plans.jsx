import React from 'react'
import SightDropdown from './SightDropdownCreater';
import {sightDropPcontent} from '../../ConstentData'
function Plans({onClose}) {
   
      const headder='Plans';
      return (
        <>
          <SightDropdown heading={headder} content={sightDropPcontent} onClose={onClose} />
        </>
      );
}

export default Plans