import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import './signupstyle.css'; 
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import baseURL from './api';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    universityname: '',
    degree: '',
    phonenumber: '',
    emailaddress: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        window.location.href = '/login';
      } else {
        const errorText = await response.text();
        setError(errorText);
        console.error('Signup failed:', errorText);
      }
    } catch (error) {
      setError('Error: ' + error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id='meow' className="section">
      <div className="hero-video">
        <video poster="" id="bgvid1" playsInline autoPlay muted loop preload="auto">
          <source src="tes.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="container">
        <div className="box">
          <h1 id='fontss' className="title">Sign Up</h1>
          {error && <p className="has-text-danger">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  id='dropshot'
                  className="input"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  id='dropshot'
                  className="input"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">First Name</label>
              <div className="control">
                <input
                  id='dropshot'
                  className="input"
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Last Name</label>
              <div className="control">
                <input
                  id='dropshot'
                  className="input"
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">University</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select id='dropshot'
                    name="universityname"
                    value={formData.universityname}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your University</option>
                    <option value="Lahore Garrison University">Lahore Garrison University</option>
                    <option value="University of Central Punjab">University of Central Punjab</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Degree</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select id='dropshot'
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your Degree</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Software Engineering">Software Engineering</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Phone Number</label>
              <div className="control">
                <input
                  id='dropshot'
                  className="input"
                  type="text"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Email Address</label>
              <div className="control">
                <input
                  id='dropshot'
                  className="input"
                  type="email"
                  name="emailaddress"
                  value={formData.emailaddress}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button id='dropshot2' className="button is-warning is-fullwidth" type="submit" disabled={loading}>
                  {loading ? <BeatLoader size={8} color="white" /> : 'Sign Up'}
                </button>
              </div>
            </div>
          </form>
          <p id='dropshot' className="has-text-centered">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
