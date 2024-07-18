// CreateHomeworkDialog.js
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { createHomework } from '../services/api';

const CreateHomeworkDialog = ({ open, onClose, courseId }) => {
  const [homeworkData, setHomeworkData] = useState({
    task: '',
    deadline: '',
    form: '',
    course_id: courseId,
  });

  const handleChange = (e) => {
    setHomeworkData({ ...homeworkData, [e.target.name]: e.target.value });
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Homework</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="task"
          label="Task"
          fullWidth
          value={homeworkData.task}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="deadline"
          label="Deadline"
          type="date"
          fullWidth
          value={homeworkData.deadline}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          name="form"
          label="Form"
          fullWidth
          value={homeworkData.form}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateHomeworkDialog;