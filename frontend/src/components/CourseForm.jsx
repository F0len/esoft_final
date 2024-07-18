import React, { useState, useEffect } from 'react';
import { Button, TextField, Select, MenuItem, Box, Typography, FormControl, InputLabel} from '@mui/material';
import moment from 'moment-timezone';

const CourseForm = ({ course, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date_start, setStartDate] = useState('');
  const [status, setStatus] = useState('');
  const [telegram, setTelegram] = useState('');

  useEffect(() => {
    if (course) {
      setName(course.name);
      setDescription(course.description);
      setStartDate(moment(course.date_start).tz('Asia/Yekaterinburg').format('YYYY-MM-DD'));
      setStatus(course.status);
      setTelegram(course.telegram);
    }
  }, [course]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: name, description: description, date_start:date_start, status:status, telegram: telegram });
  };

  return (
    <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 1, boxShadow: 3 }}>
      <Typography variant="h6" mb={2}>{course ? 'Редактировать курс' : 'Создать курс'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Название курса"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Дата старта"
          type="date"
          value={date_start}
          sx={{ mb: 2 }}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          label="Телеграм для связи"
          value={telegram}
          sx={{ mb: 2 }}
          onChange={(e) => setTelegram(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth required>
          <InputLabel>Статус</InputLabel>
          <Select
            value={status}
            label="Статус"
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            margin="normal"
            displayEmpty
            required
          >
            <MenuItem value="Запланирован">Запланирован</MenuItem>
            <MenuItem value="Идёт">Идёт</MenuItem>
            <MenuItem value="Закончен">Закончен</MenuItem>
          </Select>
        </FormControl>
  
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button type="submit" variant="contained">Сохранить</Button>
        </Box>
      </form>
    </Box>
  );
  
};

export default CourseForm;
