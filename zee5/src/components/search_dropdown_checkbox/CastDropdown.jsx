import React from 'react';
import DropdownCheckboxBuilder from './DropdownCheckboxBuilder';
import {castOptions} from '../../ConstentData'
function CastDropdown({ selectedOptions, onSelect }) {

  const head='Cast';
  return (
    <DropdownCheckboxBuilder
      head={head}
      options={castOptions}
      selectedOptions={selectedOptions}
      onSelect={onSelect}
    />
  );
}

export default CastDropdown;
