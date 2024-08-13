import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import Auth from '../auth'; // Import the Auth object
import { userDropcontent } from '../ConstentData';
function UserDropdownSelect({onClose}) {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = Auth.isAuthenticated();
  const navigate = useNavigate();

  const toggleUserDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleOptionClick = (path) => {
    // setIsOpen(false);
    onClose();
    navigate(path); 
  };

  const handleLogout = () => {
    Auth.logout();
    onClose();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null; // If not authenticated, don't render the modal dropdown
  }

  return (
    <div className={`Userdropdown ${isOpen ? 'active' : ''}`}>
      <div className="Userdropdown-toggle" onClick={toggleUserDropdown}>
        My Account {isOpen ? <IoChevronUp /> : <IoChevronDown />}
      </div>
      {isOpen && (
        <div className="Userdropdown-content">
          {userDropcontent.map((option) => (
            <div
              key={option.id}
              className="Userdropdown-link"
              onClick={() => {handleOptionClick(option.path)
              }}
            >
              {option.name}
            </div>
          ))}
          {isAuthenticated && (
            <div className="Userdropdown-link" onClick={handleLogout}>
              Log out
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDropdownSelect;
