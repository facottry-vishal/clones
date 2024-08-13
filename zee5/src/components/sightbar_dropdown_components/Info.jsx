import React from 'react'
import SightDropdown from './SightDropdownCreater';
import {sightDropIcontent} from '../../ConstentData'
function Info({onClose}) {
   
      const headder='Info';
      return (
        <>
          <SightDropdown heading={headder} content={sightDropIcontent} onClose={onClose} />
        </>
      );
}

export default Info