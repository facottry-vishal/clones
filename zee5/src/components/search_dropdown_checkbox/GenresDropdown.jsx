import React from 'react';
import DropdownCheckboxBuilder from './DropdownCheckboxBuilder';
import {genresOptions} from '../../ConstentData'
const head='Genres';
function GenresDropdown({ selectedOptions, onSelect }) {
  return (
    <DropdownCheckboxBuilder
      head={head}
      options={genresOptions}
      selectedOptions={selectedOptions}
      onSelect={onSelect}
    />
  );
}

export default GenresDropdown;
