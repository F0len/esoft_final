import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLessonById } from '../services/api';
import { Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import AttachFilesDialog from './AttachFilesDialog';

const LessonDetail = ({ role }) => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLessonById(id)
      .then((response) => {
        setLesson(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4">{lesson.name}</Typography>
      <Typography variant="body1">{lesson.description}</Typography>
      <Typography variant="body2">Scheduled Date: {lesson.scheduled_date}</Typography>
      <Typography variant="body2">Time: {lesson.time}</Typography>
      <List>
        <Typography variant="h6">Attached Files</Typography>
        {lesson.files.map((file) => (
          <ListItem key={file.id}>
            <ListItemText primary={file.name} />
          </ListItem>
        ))}
      </List>
      {(role === 'teacher' || role === 'admin') && <AttachFilesDialog lessonId={lesson.id} />}
    </div>
  );
};

export default LessonDetail;
