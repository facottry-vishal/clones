import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../auth'; // Import the Auth object

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Auth.logout(); // Call the logout function from Auth
    // Navigate to the home page
    navigate('/');
  };

  return (
    <div onClick={handleLogout}>
   Logout
    </div>
  );
}

export default Logout;
