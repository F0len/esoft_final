import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Предполагается, что вы используете react-router-dom для навигации

const ForbiddenPage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
       
        <Typography variant="h1" align="center" gutterBottom>
          Доступ запрещён
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          size="large"
        >
          На главную
        </Button>
      </Box>
    </Container>
  );
};

export default ForbiddenPage;