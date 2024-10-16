import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './changepasswordstyle.css'; 
import 'bulma/css/bulma.min.css';
import baseURL from './api';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${baseURL}/user/update-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      if (response.ok) {
        setSuccess('Password updated successfully');
        setError('');
      } else {
        const result = await response.json();
        setError(result.message || 'Failed to update password');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <section className="section">
      <div className="hero-video">
        <video poster="" id="bgvid1" playsInline autoPlay muted loop preload="auto">
          <source src="tes.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="container">
        <div className="box">
          <h1 id='fontss' className="title">Change Password</h1>
          {error && <p className="has-text-danger">{error}</p>}
          {success && <p className="has-text-success">{success}</p>}
          <form onSubmit={handlePasswordChange}>
            <div className="field">
              <label className="label">Current Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">New Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Confirm New Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-warning is-fullwidth" type="submit">
                  Change Password
                </button>
              </div>
            </div>
          </form>
          <br/>
          <p className="has-text-centered">
          <button className="button is-warning is-fullwidth" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
            
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
