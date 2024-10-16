import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


const HomePage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container 
      component="main" 
      maxWidth="100%" 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: isSmallScreen ? 'column' : 'row', 
        justifyContent: isSmallScreen ? 'center' : 'space-between', 
        alignItems: 'center', 
        textAlign: 'center',
        padding: isSmallScreen ? '2rem 0' : '0',
        position: 'relative',
        overflow: 'hidden'  
      }}
    >
      
      <video 
        autoPlay 
        loop 
        muted 
        style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          transform: 'translate(-50%, -50%)', 
          zIndex: 1 
        }}
      >
        <source src="TEST.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

     
      <Box 
        sx={{ 
          width: isSmallScreen ? '100%' : '50%', 
          padding: isSmallScreen ? '0 1rem' : '0 2rem', 
          marginTop: isSmallScreen ? '2rem' : '0',
          zIndex: 1  
        }}
      > 
        <img src="logo.png" alt="logo" style={{ maxWidth: '100%', height: 'auto' }} />
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            mb: 2, 
            fontFamily: '"Montserrat", sans-serif', 
        fontOpticalSizing: 'auto', 
        fontStyle: 'normal' 

          }}
        >
          Start Your Learning Journey With Us
        </Typography>
      </Box>
      <Box 
        sx={{ 
          width: isSmallScreen ? '100%' : '50%', 
          padding: isSmallScreen ? '0 1rem' : '0', 
          mt: isSmallScreen ? '2rem' : '0', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          zIndex: 1  
        }}
      >
        <Box sx={{ mb: 2, display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row' }}>
          <Link to="/login" style={{ textDecoration: 'none', marginBottom: isSmallScreen ? '1rem' : '0' }}>
            <Button 
              variant="contained" 
              sx={{ 
                mr: isSmallScreen ? 0 : 2, 
                bgcolor: '#ffffff', 
                color: '#000000',
                '&:hover': { bgcolor: '#fc686f' } ,
                fontFamily: '"Montserrat", sans-serif', 
        fontOpticalSizing: 'auto', 
        fontStyle: 'normal' 
                
              }}
            >
              Login
            </Button>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button 
              variant="contained" 
              sx={{ 
                bgcolor: '#ffffff', 
                color: '#000000',
                '&:hover': { bgcolor: '#fc686f' },
                fontFamily: '"Montserrat", sans-serif', 
        fontOpticalSizing: 'auto', 
        fontStyle: 'normal' 
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Box>
        <Box sx={{ mb: 2 }}>
        <Typography 
            variant="body2" 
            sx={{ color: '#000000', mr: 1,
            fontFamily: '"Montserrat", sans-serif', 
            fontOpticalSizing: 'auto', 
            fontStyle: 'normal' 
             }}
          >
           Website Developed By
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ color: '#000000', display: 'inline', mr: 1,
            fontFamily: '"Montserrat", sans-serif', 
            fontOpticalSizing: 'auto', 
            fontStyle: 'normal' 
             }}
          >
            Abdulrehman Arshad
          </Typography>
          |
          <Typography 
            variant="body2" 
            sx={{ color: '#000000', display: 'inline', ml: 1,
            fontFamily: '"Montserrat", sans-serif', 
            fontOpticalSizing: 'auto', 
            fontStyle: 'normal' 
             }}
          >
            Muhammad Waqas
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
