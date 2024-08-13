import React, { useState } from 'react';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
 import { FcGoogle } from 'react-icons/fc';
import { BsFacebook, BsTwitter, BsApple } from 'react-icons/bs';
import AuthS from '../auth';
function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      // Call the signup function from AuthS
      const signupResult = await AuthS.signup(newUser);

      if (signupResult) {
        console.log('Signup successful');
        navigate('/login'); // Redirect to the login page after successful signup
      } else {
        console.error('Signup failed');
        setError('This user is already registered');
      }
    } catch (error) {
      console.error('An error occurred', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form">
      <div className="su-head">
        <h2>Create a new account</h2>
        <p>Create an account to continue enjoying</p>
        <p>uninterrupted video and personalized experience</p>
      </div>
      <div className="social-su">
        <div className="so-icon">
          <FcGoogle />
        </div>
        <div className="so-icon">
          <BsFacebook />
        </div>
        <div className="so-icon">
          <BsTwitter />
        </div>
        <div className="so-icon">
          <BsApple />
        </div>
      </div>
      <div className="devider">
          <hr class="line" />
          <span>or</span>
          <hr class="line" />
        </div>
      <div className="su-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <div className="cb-sec">
            <input
              type="checkbox"
              className='checkbox-btn'
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
            />
            <span className="checkbox-text">
              By proceeding you agree to our Terms of Services & Privacy Policy.
            </span>
            </div>
          </div>
          <button type="submit">Create Account</button>
        </form>
        <div className="g-log">
          <span>Already registered?</span> 
        <Link to="/login">Login</Link>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Signup;
