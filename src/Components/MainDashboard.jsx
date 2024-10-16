import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  UnorderedList,
  ListItem,
  Collapse,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './Layout';
import './MainDashboard.css';
import baseURL from './api';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS for AOS

const MainDashboard = () => {
  const [userData, setUserData] = useState({});
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [hoveredSubject, setHoveredSubject] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []); // Run only once after initial render

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${baseURL}/user/userdata`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (location.state?.selectedSemester === null) {
      setSelectedSemester(null);
      setHoveredSubject(null);
      setShowWelcome(true);
    } else if (location.state?.selectedSemester) {
      setSelectedSemester(location.state.selectedSemester);
      setShowWelcome(false);
    }
  }, [location.state]);

  const handleMouseEnter = (subject) => {
    setHoveredSubject(subject);
    setShowWelcome(false);
  };

  const handleMouseLeave = () => {
    setHoveredSubject(null);
  };

  const handleTopicClick = (topic, index, subjectTopics) => {
    const youtubeLink = Array.isArray(topic.youtubeLink) ? topic.youtubeLink : [topic.youtubeLink];
    navigate(`/topic/${topic._id}`, {
      state: {
        topicName: topic.name,
        youtubeLink: youtubeLink,
        topicIndex: index,
        subjectTopics: subjectTopics
      }
    });
  };

  const renderTopics = (subjectId) => {
    const subjectTopics = userData.topics?.filter(topic => topic.subject === subjectId);
    return subjectTopics.map((topic, index) => (
      <ListItem key={topic._id} onClick={() => handleTopicClick(topic, index, subjectTopics)} className="topic-item">
        {topic.name}
      </ListItem>
    ));
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Layout isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
      <Box ml={isDrawerOpen ? '250px' : '0'} mt={4} p={4} className="main-dashboard">
        {showWelcome && (
          <Text fontSize="2xl" mb={8} className="welcome-message" textAlign="center">
            Welcome To Uni-Frame
            <br />
            <img data-aos="fade-up" id='imgg' src="me.png" alt="imgs" />
          </Text>
        )}
        {selectedSemester && (
          <Card  id='cardd'>
               <Text fontSize="xl" mb={2} className="semester-title">Semester {selectedSemester}</Text>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {userData.subjects?.filter(subject => subject.semester === selectedSemester).map(subject => (
              <Card
                key={subject._id}
                className="subject-card"
                onMouseEnter={() => handleMouseEnter(subject)}
                onMouseLeave={handleMouseLeave}
               
              >
                <CardHeader>
                  <Heading  size="md">{subject.name}</Heading>
                </CardHeader>
                <Collapse in={hoveredSubject === subject}>
                  <CardBody>
                    <UnorderedList className="topic-list">
                      {renderTopics(subject._id)}
                    </UnorderedList>
                  </CardBody>
                </Collapse>
              </Card>
            ))}
          </SimpleGrid>
          </Card>
        )}
      </Box>
    </Layout>
  );
};

export default MainDashboard;
