import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, TextField, Box, Autocomplete } from '@mui/material';

const ParticipantsModal = ({ course }) => {
  const [participants, setParticipants] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (course) {
      fetchParticipants();
    }
    fetchUsers();
  }, [course]);

  const fetchParticipants = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/courses/participants/${course.id}`);
      if (!response.ok) {
        throw new Error('Ошибка при получении участников');
      }
      const data = await response.json();
      setParticipants(data);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/api/users/small_info');
      if (!response.ok) {
        throw new Error('Ошибка при получении пользователей');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  
  const handleAddParticipant = async () => {
    if (selectedUser) {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/courses/participants', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: selectedUser.id,
            course_id: course.id
          })
        });
        if (!response.ok) {
          throw new Error('Ошибка при добавлении участника');
        }
        setParticipants([...participants, selectedUser]);
        setSelectedUser(null);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
  };
  
  const handleRemoveParticipant = async (participantId) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/courses/participants/${course.id}/${participantId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Ошибка при удалении участника');
      }
      setParticipants(participants.filter(p => p.id !== participantId));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  

  return (
    <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 1, boxShadow: 3, width: 400, maxHeight: '80vh', overflowY: 'auto' }}>
      <List sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
        {participants.map(participant => (
          <ListItem key={participant.id}>
            <ListItemText primary={participant.name} />
            <Button onClick={() => handleRemoveParticipant(participant.id)}>Удалить</Button>
          </ListItem>
        ))}
      </List>
      <Autocomplete
        options={users}
        getOptionLabel={(option) => option.name}
        value={selectedUser}
        onChange={(event, newValue) => setSelectedUser(newValue)}
        renderInput={(params) => <TextField {...params} label="Выберите пользователя" fullWidth margin="normal" />}
      />
      <Button onClick={handleAddParticipant} variant="contained" disabled={!selectedUser}>
        Добавить
      </Button>
    </Box>
  );
};

export default ParticipantsModal;
