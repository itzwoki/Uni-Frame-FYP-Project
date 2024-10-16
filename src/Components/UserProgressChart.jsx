import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import baseURL from './api';

const UserProgressChart = () => {
  const [completionData, setCompletionData] = useState([]);

  useEffect(() => {
    const fetchCompletionData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`${baseURL}/api/user/subjects/completion`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched Completion Data:', data); 
        setCompletionData(data);
      } catch (error) {
        console.error('Error fetching completion data:', error);
      }
    };

    fetchCompletionData();
  }, []);

  console.log('Completion Data for Chart:', completionData); 

  // Modify completionData to include completion status for each subject
  const dataWithCompletionStatus = completionData.map(subject => ({
    ...subject,
    completionStatus: subject.completionRate > 0 ? "Completed" : "Not Completed"  // Assuming completionRate > 0 indicates completion
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={dataWithCompletionStatus} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="subject" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Change dataKey to completionStatus */}
        <Bar dataKey="completionStatus" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UserProgressChart;
