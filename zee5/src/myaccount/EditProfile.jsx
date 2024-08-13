import React,{useState} from 'react'
function EditProfile({ goBack }) {
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  const handleUserNameChange = (e) => {
    setNewUserName(e.target.value);
  };

  const handleUserEmailChange = (e) => {
    setNewUserEmail(e.target.value);
  };

  const handleSave = () => {
    // Save the updated user information to sessionStorage or your backend
    sessionStorage.setItem('userInfoN', newUserName);
    sessionStorage.setItem('userInfoE', newUserEmail);

    // Go back to the profile view
    goBack();
  };
  return (
   <div className="edit-profile-container">
      <div className="edit-profile-section">
      
      <h1>Edit Profile</h1>
      <hr className='tab-item-hr' />
      <div className="edit-profile">
      <label style={{color:'white'}} htmlFor="newUserName">Name:</label>
      <input
        type="text"
        id="newUserName"
        value={newUserName}
        onChange={handleUserNameChange}
      />
      <label style={{color:'white'}} htmlFor="newUserEmail">Address:</label>
      <input
        type="text"
        id="newUserAddress"
      />
       <label style={{color:'white'}} htmlFor="newUserEmail">Phone No:</label>
      <input
        type="number"
        id="newUserNumber"
      />
      <label style={{color:'white'}} htmlFor="newUserPimg">Profile Image:</label>
      <input
        type="file"
        id="newUserEmail"
       
      />
      </div>
      <div className="ep-btn-con">
      <button className='gep-btn' onClick={goBack}>Go back to profile</button>
      <button className='ep-btn' >Save Changes</button> 
      {/* onClick={handleSave} */}
      </div>
    
      </div>
   </div>
  )
}

export default EditProfile