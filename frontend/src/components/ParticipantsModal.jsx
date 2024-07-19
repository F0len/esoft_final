import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, TextField, Box, Autocomplete } from '@mui/material';
import { getCoursesParticipants, addCoursesParticipants, getUserSmallInfo, deleteCoursesParticipants } from '../services/api';

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
      const response = await getCoursesParticipants(course.id);
      setParticipants(response.data);
    } catch (error) {
      console.error('Ошибка при получении участников:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getUserSmallInfo();
      setUsers(response.data);
    } catch (error) {
      console.error('Ошибка при получении пользователей:', error);
    }
  };

  const handleAddParticipant = async () => {
    if (selectedUser) {
      try {
        await addCoursesParticipants({
          user_id: selectedUser.id,
          course_id: course.id
        });
        setParticipants([...participants, selectedUser]);
        setSelectedUser(null);
      } catch (error) {
        console.error('Ошибка при добавлении участника:', error);
      }
    }
  };

  const handleRemoveParticipant = async (participantId) => {
    try {
      await deleteCoursesParticipants(course.id, participantId);
      setParticipants(participants.filter(p => p.id !== participantId));
    } catch (error) {
      console.error('Ошибка при удалении участника:', error);
    }
  };
  

  return (
    <Box sx={{ width: 400 }}>
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
