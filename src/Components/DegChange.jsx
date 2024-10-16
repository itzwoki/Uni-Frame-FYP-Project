import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './degchange.css'; 
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import baseURL from './api';


const DegChange = () => {
  const [universityName, setUniversityName] = useState('');
  const [degree, setDegree] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch(`${baseURL}/user/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ universityname: universityName, degree }),
    });

    if (response.ok) {
      alert('Degree Changed successfully');
      navigate('/dashboard');
    } else {
      alert('Failed to update settings');
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
          <h1  id='fontss' className="title">Update Your Information</h1>
          <div className="field">
            <label className="label">University Name</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  name="universityname"
                  value={universityName}
                  onChange={(e) => setUniversityName(e.target.value)}
                  required
                >
                  <option id='fonts' value="">Select your University</option>
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
                <select
                  name="degree"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  required
                >
                  <option value="">Select your Degree</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Software Engineering">Software Engineering</option>
                </select>
              </div>
            </div>
          </div>
          <br/>
          <div className="field">
            <div className="control">
              <button className="button is-warning is-fullwidth" type="button" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
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

export default DegChange;
