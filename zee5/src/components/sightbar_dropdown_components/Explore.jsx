import React from 'react';
import SightDropdown from './SightDropdownCreater';
import {sightDropEcontent} from '../../ConstentData'
function Explore({onClose}) {
 
  const headder='Explore';
  return (
    <>
      <SightDropdown heading={headder} content={sightDropEcontent} onClose={onClose}/>
    </>
  );
}

export default Explore;