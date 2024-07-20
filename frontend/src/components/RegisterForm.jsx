import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { apiRegister } from '../services/api';

const RegisterForm = () => {
  const [login, setUsername] = useState('');
  const [name, setFullName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    try {
      const response = await apiRegister({ login, name, telegram, password });
    
      alert('Успешная регистрация, войдите в аккаунт');
      navigate('/login');
    } catch (error) {
      console.error('Error registering', error);
      alert('Ошибка при регистрации');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Регистрация
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Логин"
          variant="outlined"
          fullWidth
          margin="normal"
          value={login}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="ФИО"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          label="Телеграмм"
          variant="outlined"
          fullWidth
          margin="normal"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
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
        <TextField
          label="Подтверждение пароля"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Регистрация
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          style={{ marginTop: '1rem' }}
          onClick={() => navigate('/login')}
        >
          Вход
        </Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
