import React, { useState, useEffect } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { AiOutlineClose } from "react-icons/ai";
import './searchdropdowncheckbox.css';

const DropdownCheckboxBuilder = ({ head, options, selectedOptions, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle "Select All" checkbox
  const handleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      onSelect([]);
    } else {
      onSelect(options.map((option) => option.value));
    }
  };

  // Function to handle individual checkbox clicks and close the dropdown
  const handleCheckboxChange = (value) => {
    if (selectedOptions.includes(value)) {
      onSelect(selectedOptions.filter((item) => item !== value));
    } else {
      onSelect([...selectedOptions, value]);
    }
    // Close the dropdown when a checkbox is clicked
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle clearing selected options
  const handleClearSelection = () => {
    onSelect([]);
  };

  useEffect(() => {
    // Close the dropdown when the user clicks outside of it
    function handleClickOutside(event) {
      if (isOpen && !event.target.closest('.dropdown-checkbox')) {
        setIsOpen(false);
      }
    }

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`dropdown-checkbox ${isOpen ? 'open' : ''}`}>
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOptions.length > 0 ? (
          <>
            <div className='selected-content'>{selectedOptions.join(', ')}</div>
            <button className="clear-button" onClick={handleClearSelection}>
              <AiOutlineClose />
            </button>
          </>
        ) : (
          <>
            {head}
            <span className="arrow-icon">{isOpen ? <IoChevronUp /> : <IoChevronDown /> }</span>
          </>
        )}
      </div>
      {isOpen && (
        <div className="options-list">
          <label style={{ color: 'white' }}>
            <input
              type="checkbox"
              checked={selectedOptions.length === options.length}
              onChange={handleSelectAll}
            />
            All
          </label>
          {options.map((option) => (
            <label key={option.value} style={{ color: 'white' }}>
              <input
                type="checkbox"
                value={option.value}
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownCheckboxBuilder;
