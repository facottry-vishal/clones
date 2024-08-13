import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile';

function Profile() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [editingProfile, setEditingProfile] = useState(false);
  useEffect(() => {
    // Retrieve the name and email from sessionStorage
    const storedUserName = sessionStorage.getItem('userInfoN');
    const storedUserEmail = sessionStorage.getItem('userInfoE');
    // Update the state with the retrieved name & email
    if (storedUserName && storedUserEmail) {
      setUserName(storedUserName);
      setUserEmail(storedUserEmail);
    }
  }, []);
  // get the first later of User 
  const getFirstLetter = () => {
    if (userName) {
      return userName.charAt(0).toUpperCase();
    }
    return '';
  };

  const toggleEditing = () => {
    setEditingProfile(!editingProfile);
  };

  return (
    <div className='profile-details'>
      {editingProfile ? (
        <EditProfile goBack={toggleEditing} />
      ) : (
        <>
      <div className="profile-picture">
        <div className="profile-letter">{getFirstLetter()}</div>
      </div>
      <div className="profile-info">
        <h1 className='u-name'>{userName}</h1>
        <h3 className='u-email'>{userEmail}</h3>
        <span style={{cursor:'pointer'}} onClick={toggleEditing}>Edit profile</span>
      </div>
     </>
     )}
    </div>
  );
}

export default Profile