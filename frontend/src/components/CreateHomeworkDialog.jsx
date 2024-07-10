import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { createHomework } from '../services/api';

const CreateHomeworkDialog = ({ courseId }) => {
  const [open, setOpen] = useState(false);
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
        setOpen(false);
      })
      .catch((error) => {
        console.error('Error creating homework:', error);
      });
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Create Homework
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
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

export default CreateHomeworkDialog;
