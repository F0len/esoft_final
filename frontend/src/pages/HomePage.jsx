import React from 'react';
import Navbar from '../components/Navbar';
import { Container, Typography } from '@mui/material';


const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Home Page
        </Typography>
        <Typography>
          This is a protected page. Only logged in users can access this page.
        </Typography>
        
      </Container>
    </div>
  );
};

export default HomePage;
