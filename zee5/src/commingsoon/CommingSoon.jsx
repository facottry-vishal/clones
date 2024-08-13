import React from 'react'
import { Link } from 'react-router-dom';
import { BsEmojiSmile } from "react-icons/bs";
import './commingsoon.css'

function CommingSoon() {
  return (
    <div className='cs-container'>
        <div className="comming-soon-page">
          <div className="cs-icon"><BsEmojiSmile /></div>
          <h2>Hi, hope you are doing well.</h2>
          <h1>This feature is coming soon, stay tuned!</h1>
          <Link to='/'>Back To Home</Link>
        </div>
    </div>
  )
}

export default CommingSoon