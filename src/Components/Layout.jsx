import React, { useState, useEffect } from 'react';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import DrawerComponent from './DrawerComponent';
import { Dropdown } from 'react-bootstrap';
import { SettingsIcon } from '@chakra-ui/icons';
import './Layout.css';
import baseURL from './api';
import 'aos/dist/aos.css'; 
import AOS from 'aos';

const JWT_TOKEN_KEY = 'jwtToken';

const Layout = ({ children, isDrawerOpen, toggleDrawer }) => {
  const [userData, setUserData] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []); 
  // Run only once after initial render
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem(JWT_TOKEN_KEY);
        const response = await fetch(`${baseURL}/user/userdata`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      localStorage.removeItem(JWT_TOKEN_KEY);
      navigate('/');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handlePasswordChangeNavigate = () => {
    navigate('/change-password');
  };

  const handleSignOut = () => {
    localStorage.removeItem(JWT_TOKEN_KEY);
    navigate('/');
  };

  const handleSettingsNavigate = () => {
    navigate('/settings');
  };

  const handleSemesterClick = (semester) => {
    navigate('/dashboard', { state: { selectedSemester: semester } });
    toggleDrawer(); // Close the drawer when a semester is clicked
  };

  return (
    <div id='mm'>
      <video poster="" id="bgvid" playsInline autoPlay muted loop preload="auto">
        <source src="/TEST.mp4" type="video/mp4" />
      </video>
      <Flex data-aos="fade-down"  as="nav" className="top-bar" align="center" justify="space-between" wrap="wrap">
        <IconButton icon={<HamburgerIcon />} onClick={toggleDrawer} />
        <img src="/logo.png" alt="logo" id='logol' />
        <Box flex="1" textAlign="right">
          {!isMobile && (
            <>
              <Text className="info-text">{userData.university && `University: ${userData.university.name}`}</Text>
              <Text className="info-text">{userData.degree && `Degree: ${userData.degree.name}`}</Text>
            </>
          )}
          <Dropdown id='ol' align="end">
            <Dropdown.Toggle as={IconButton} variant="link" className="p-0">
              <SettingsIcon />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item id='in' onClick={handleSettingsNavigate}>Change Degree</Dropdown.Item>
              <Dropdown.Item id='in' onClick={handlePasswordChangeNavigate}>Change Password</Dropdown.Item>
              <Dropdown.Item id='in' onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Box>
      </Flex>
      <DrawerComponent 
        userData={userData} 
        handleSemesterClick={handleSemesterClick} 
        isOpen={isDrawerOpen} 
        toggleDrawer={toggleDrawer}
        isMobile={isMobile}
      />
      <Box className="main-content">
        {children}
      </Box>
    </div>
  );
};

export default Layout;
