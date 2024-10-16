// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import MainDashboard from './Components/MainDashboard';
import TopicPage from './Components/TopicPage';
import DegChange from './Components/DegChange';
import ChangePassword from './Components/ChangePassword';


const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/topic/:id" element={<TopicPage />} />
        <Route path="/settings" element={<DegChange />} />
        <Route path="/change-password" element={<ChangePassword />} />
        {/* Add other routes here if needed */}
      </Routes>
    </Router>

    
  );
};

export default App;
