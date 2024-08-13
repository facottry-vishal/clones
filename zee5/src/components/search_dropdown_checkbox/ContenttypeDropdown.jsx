import React from 'react';
import DropdownCheckboxBuilder from './DropdownCheckboxBuilder';
import { ctypeOptions } from '../../ConstentData';

const head='Content Type';
function ContenttypeDropdown({ selectedOptions, onSelect }) {
  return (
    <DropdownCheckboxBuilder
      head={head}
      options={ctypeOptions}
      selectedOptions={selectedOptions}
      onSelect={onSelect}
    />
  );
}

export default ContenttypeDropdown;
