import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook, BsTwitter, BsApple } from 'react-icons/bs';
import './login.css';
import AuthS from '../auth'

function Login() {
  const [formData, setFormData] = useState({
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
      const credentials = {
        email: formData.email,
        password: formData.password,
      };

      const loginResult = await AuthS.login(credentials);

      if (loginResult) {
        console.log('Login successful');
        navigate('/');
      } else {
        console.error('Login failed');
        setError('Enter a valid email id and password');
      }
    } catch (error) {
      console.error('An error occurred', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <div className="su-head">
          <h2>Login to ZEE5</h2>
          <p>Login to continue enjoying uninterrupted video</p>
          <p>and personalized experience.</p>
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
          <hr className="line" />
          <span>or</span>
          <hr className="line" />
        </div>
        <div className="su-form">
          <form onSubmit={handleSubmit}>
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
              <div className="fp-sec">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            </div>
            <button type="submit">Login</button>
          </form>
          {error && <div className="error-message">{error}</div>} 
          <div className="g-log">
            <span>New to ZEE5?</span>
            <Link to="/signup">Register</Link>
          </div>
          <div className="demo-log">
            <p>Demo Account - admin@gmail.com</p>
            <p>Password - 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;