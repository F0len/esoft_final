import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { updateUserWithoutRoles } from '../services/api';

const UserProfile = ({ user, onSave }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (field, value) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    await updateUserWithoutRoles(user.id,editedUser);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
      Редактировать профиль
      </Typography>
      <TextField
        label="Имя"
        fullWidth
        margin="normal"
        value={editedUser.name || ''}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <TextField
        label="Логин"
        fullWidth
        margin="normal"
        value={editedUser.login || ''}
        onChange={(e) => handleChange('login', e.target.value)}
      />
      <TextField
        label="Пароль"
        fullWidth
        margin="normal"
        value={editedUser.password || ''}
        onChange={(e) => handleChange('password', e.target.value)}
      />
      <TextField
        label="Telegram"
        fullWidth
        margin="normal"
        value={editedUser.telegram || ''}
        onChange={(e) => handleChange('telegram', e.target.value)}
      />
      <Button
        color='primary'
        variant="contained"
        onClick={handleSave}
        style={{ marginTop: '20px' }}
      >
        Сохранить
      </Button>
    </Container>
  );
};

export default UserProfile;
