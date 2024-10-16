import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Box, Paper } from '@mui/material';
import Layout from './Layout';
import 'bulma/css/bulma.min.css'; 
import './TopicPage.css';

const TopicPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { topicName, youtubeLink, topicIndex, subjectTopics } = location.state || {};
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavigation = (newIndex) => {
    const newTopic = subjectTopics[newIndex];
    const newYoutubeLink = Array.isArray(newTopic.youtubeLink) ? newTopic.youtubeLink : [newTopic.youtubeLink];
    navigate(`/topic/${newTopic._id}`, {
      state: {
        topicName: newTopic.name,
        youtubeLink: newYoutubeLink,
        topicIndex: newIndex,
        subjectTopics: subjectTopics
      }
    });
  };

  const nextTopic = () => {
    if (topicIndex < subjectTopics.length - 1) {
      handleNavigation(topicIndex + 1);
    }
  };

  const prevTopic = () => {
    if (topicIndex > 0) {
      handleNavigation(topicIndex - 1);
    }
  };

  return (
    <Layout isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
      <Box className="centered-container">
        <Paper id="zz" elevation={3} className="content-container">
          <Typography id="kk" variant="h4" align="center">{topicName}</Typography>
          <br/>
          {Array.isArray(youtubeLink) && youtubeLink.length > 0 ? (
            youtubeLink.map((link, index) => {
              const videoId = extractYouTubeVideoId(link);
              return videoId ? (
                <Box key={index} mb={2} className="video-container">
                  
                  <iframe
                    title={`${topicName}_${index}`}
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Box>
              ) : (
                <Typography key={index} variant="body1" color="error" align="center">
                  Invalid YouTube link: {link}
                </Typography>
              );
            })
          ) : (
            <Typography variant="body1" align="center">No videos available for this topic.</Typography>
          )}
          <Box className="navigation-buttons">
            <button 
              className="button is-warning" 
              onClick={prevTopic} 
              disabled={topicIndex === 0}
            >
              Previous Topic
            </button>
            <button id='btt'
              className="button is-warning" 
              onClick={nextTopic} 
              disabled={topicIndex === subjectTopics.length - 1}
            >
              Next Topic
            </button>
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
};

export default TopicPage;

// Helper function to extract YouTube video ID from the YouTube link
const extractYouTubeVideoId = (link) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=))([^#&?]*).*/;
  const match = link.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};
