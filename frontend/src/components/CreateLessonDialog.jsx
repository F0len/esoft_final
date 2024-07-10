import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { createLesson } from '../services/api';

const CreateLessonDialog = ({ courseId }) => {
  const [open, setOpen] = useState(false);
  const [lessonData, setLessonData] = useState({
    name: '',
    description: '',
    scheduled_date: '',
    time: '',
    course_id: courseId,
  });

  const handleChange = (e) => {
    setLessonData({ ...lessonData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    createLesson(lessonData)
      .then((response) => {
        console.log('Lesson created:', response.data);
        setOpen(false);
      })
      .catch((error) => {
        console.error('Error creating lesson:', error);
      });
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Create Lesson
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Lesson</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            value={lessonData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            value={lessonData.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="scheduled_date"
            label="Scheduled Date"
            type="date"
            fullWidth
            value={lessonData.scheduled_date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="time"
            label="Time"
            type="time"
            fullWidth
            value={lessonData.time}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateLessonDialog;
