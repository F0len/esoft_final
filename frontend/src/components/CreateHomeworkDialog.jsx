// CreateHomeworkDialog.js
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,Typography, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createHomework } from '../services/api';

const CreateHomeworkDialog = ({ open, onClose, courseId }) => {
  const [homeworkData, setHomeworkData] = useState({
    task: '',
    deadline: '',
    form: '[]',
    course_id: courseId,
    scheduled_date: '',
    name: ''
  });

  const handleQuillChange = (value) => {
    handleChange({ target: { name: 'task', value } });
  };

  const handleChange = (e) => {
    setHomeworkData({ ...homeworkData, [e.target.name]: e.target.value });
  };

  const handleFormChange = (index, e) => {
    const formArray = JSON.parse(homeworkData.form);
    formArray[index][e.target.name] = e.target.value;
    setHomeworkData({ ...homeworkData, form: JSON.stringify(formArray) });
  };

  const addFormField = () => {
    const formArray = JSON.parse(homeworkData.form);
    formArray.push({ label: '', type: 'text' });
    setHomeworkData({ ...homeworkData, form: JSON.stringify(formArray) });
  };

  const removeFormField = (index) => {
    const formArray = JSON.parse(homeworkData.form);
    formArray.splice(index, 1);
    setHomeworkData({ ...homeworkData, form: JSON.stringify(formArray) });
  };

  const handleSubmit = () => {
    createHomework(homeworkData)
      .then((response) => {
        console.log('Homework created:', response.data);
        onClose();
      })
      .catch((error) => {
        console.error('Error creating homework:', error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Создать домашнее задание</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Название"
          fullWidth
          value={homeworkData.name}
          onChange={handleChange}
        />
        <ReactQuill
          theme="snow"
          value={homeworkData.task}
          onChange={handleQuillChange}
          style={{ marginBottom: '16px', width: '100%' }}
        />
        <TextField
          margin="dense"
          name="scheduled_date"
          label="Дата начала доступа"
          type="date"
          fullWidth
          value={homeworkData.scheduled_date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          name="deadline"
          label="Дедлайн"
          type="date"
          fullWidth
          value={homeworkData.deadline}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Typography variant="h6">Форма ответа</Typography>
        {JSON.parse(homeworkData.form).map((field, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <TextField
              margin="dense"
              name="label"
              label="Название поля"
              value={field.label}
              onChange={(e) => handleFormChange(index, e)}
              style={{ marginRight: '8px' }}
            />
            <FormControl style={{ marginRight: '8px', minWidth: '120px' }}>
              <InputLabel>Тип поля</InputLabel>
              <Select
                name="type"
                label = "Тип поля"
                value={field.type}
                onChange={(e) => handleFormChange(index, e)}
              >
                <MenuItem value="text">Текст</MenuItem>
                <MenuItem value="number">Число</MenuItem>
              </Select>
            </FormControl>
            <IconButton onClick={() => removeFormField(index)} color="error">
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <Button onClick={addFormField} color="primary" startIcon={<AddIcon />}>
          Добавить поле
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Закрыть
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateHomeworkDialog;
