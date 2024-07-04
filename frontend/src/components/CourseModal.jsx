import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField
} from '@mui/material';

const CourseFormModal = ({ open, onClose, course, onSave }) => {
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    date_start: ''
  });

  useEffect(() => {
    if (course) {
      setFormState(course);
    } else {
      setFormState({
        name: '',
        description: '',
        date_start: ''
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = () => {
    onSave(formState);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {course ? 'Редактировать курс' : 'Добавить курс'}
        </Typography>
        <TextField
          label="Название курса"
          name="name"
          value={formState.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Описание"
          name="description"
          value={formState.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Дата начала"
          type="date"
          name="date_start"
          InputLabelProps={{ shrink: true }}
          value={formState.date_start}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Сохранить
        </Button>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default CourseFormModal;
