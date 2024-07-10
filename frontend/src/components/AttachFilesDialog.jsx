import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { attachFileToLesson } from '../services/api';

const AttachFilesDialog = ({ lessonId }) => {
  const [open, setOpen] = useState(false);
  const [fileData, setFileData] = useState({
    name: '',
    id: '', // Сюда должен быть передан ID файла, например, после загрузки файла на сервер
  });

  const handleChange = (e) => {
    setFileData({ ...fileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    attachFileToLesson(lessonId, fileData)
      .then((response) => {
        console.log('File attached:', response.data);
        setOpen(false);
      })
      .catch((error) => {
        console.error('Error attaching file:', error);
      });
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Attach File
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Attach File</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="File Name"
            fullWidth
            value={fileData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="id"
            label="File ID"
            fullWidth
            value={fileData.id}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Attach
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AttachFilesDialog;
