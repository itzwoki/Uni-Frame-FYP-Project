import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import 'bulma/css/bulma.min.css';
import './loginpage.css';
import baseURL from './api';

const JWT_TOKEN_KEY = 'jwtToken';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem(JWT_TOKEN_KEY, token);
        navigate('/dashboard');
      } else {
        const errorText = await response.text();
        setLoginError(errorText);
        setShowToast(true);
        console.error('Login failed:', errorText);
      }
    } catch (error) {
      setLoginError('Server error. Please try again later.');
      setShowToast(true);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000); // Hide toast after 3 seconds
      return () => clearTimeout(timer); // Clear timeout if component unmounts
    }
  }, [showToast]);

  return (
    <section className="section">
      <div className="hero-video">
        <video id="bgvid1" playsInline autoPlay muted loop preload="auto">
          <source src="tes.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="container">
        <div className="box">
          <h1 id='fontss' className="title has-text-centered">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label id='fonts' className="label">Username</label>
              <div className="control">
                <input
                  id='fonts'
                  className="input"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label id='fonts' className="label">Password</label>
              <div className="control">
                <input
                  id='fonts'
                  className="input"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button id='fonts' className={`button is-warning is-fullwidth ${loading ? 'is-loading' : ''}`} type="submit" disabled={loading}>
                  Login
                </button>
              </div>
            </div>
          </form>
          <div className="field">
            <p id='fonts' className="has-text-centered">Don't have an account? 
              <Link to="/signup"> Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      {loginError && (
        <div className={`toast ${showToast ? 'show' : ''}`}>
          {loginError}
        </div>
      )}
    </section>
  );
};

export default LoginPage;

