import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { apiLogin } from '../services/api';

const LoginForm = () => {
  const [login_, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiLogin({ login: login_, password });
      dispatch(login(response.data));
     
      const token = response.headers.getAuthorization();
      localStorage.setItem('token', token);
      navigate('/courses');
    } catch (error) {
      console.error('Error logging in', error);
      alert('Failed to log in. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Вход
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Логин"
          variant="outlined"
          fullWidth
          margin="normal"
          value={login_}
          onChange={(e) => setLogin(e.target.value)}
        />
        <TextField
          label="Пароль"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Войти
        </Button>
      </form>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        style={{ marginTop: '1rem' }}
        onClick={() => navigate('/register')}
      >
        Регистрация
      </Button>
    </Container>
  );
};

export default LoginForm;
