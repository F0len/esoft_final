import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import api from '../api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {login} from '../redux/authSlice'

const LoginForm = () => {
  const [login_, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/login', { login: login_, password });
      dispatch(login(response.data));
     
      const token = response.headers.getAuthorization();
      localStorage.setItem('token', token);
      navigate('/course');
    } catch (error) {
      console.error('Error logging in', error);
      alert('Failed to log in. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Login"
          variant="outlined"
          fullWidth
          margin="normal"
          value={login_}
          onChange={(e) => setLogin(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
