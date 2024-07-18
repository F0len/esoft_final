import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { createLesson, uploadFiles } from '../services/api';

const CreateLessonDialog = ({ open, onClose, courseId }) => {
  const [lessonData, setLessonData] = useState({
    name: '',
    description: '',
    scheduled_date: '',
    time: '',
    course_id: courseId
  });
  const [video, setVideo] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData({ ...lessonData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'video') {
      setVideo(files.length ? files[0] : null);
    } else if (name === 'files') {
      setFiles(Array.from(files)); // Преобразование FileList в массив
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    // Создание лекции
    createLesson(lessonData)
      .then((response) => {
        const lessonId = response.data.id;

        const filesFormData = new FormData();
        filesFormData.append('lessonId', lessonId);
        if (video) {
          filesFormData.append('video', video);
        }
        files.forEach((file, index) => {
          filesFormData.append(`files`, file);
        });

        return uploadFiles(filesFormData);
      })
      .then((response) => {
        console.log('Files uploaded and associated with lesson:', response.data);
        onClose();
      })
      .catch((error) => {
        console.error('Error creating lesson or uploading files:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Создать лекцию</DialogTitle>
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
        <Typography variant="subtitle1" gutterBottom>
          Загрузить видео:
        </Typography>
        <Button variant="contained" component="label">
        Загрузить видео
          <input
            type="file"
            accept="video/*"
            name="video"
            onChange={handleFileChange}
            hidden
          />
        </Button>
        {video && (
          <Typography variant="body2" gutterBottom>
            Выбранное видео: {video.name}
          </Typography>
        )}
        <Typography variant="subtitle1" gutterBottom>
          Загрузить дополнительные файлы:
        </Typography>
        <Button variant="contained" component="label">
        Загрузить дополнительные файлы
          <input
            type="file"
            multiple
            name="files"
            onChange={handleFileChange}
            hidden
          />
        </Button>
        {files.length > 0 && (
          <List dense>
            {files.map((file, index) => (
              <ListItem key={index}>
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Закрыть
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Сохранить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateLessonDialog;