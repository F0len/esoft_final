import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, Box, Button, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import CreateLessonDialog from './CreateLessonDialog';
import CreateHomeworkDialog from './CreateHomeworkDialog';

const lectures = [
  { id: 1, title: 'Лекция 1. Построение маршрутов в node.js', description: 'Описание лекции...', time: '11.07.2024 15:00 МСК' },
  { id: 2, title: 'Лекция 2. Построение...', description: 'Описание лекции 2...', time: '12.07.2024 15:00 МСК' },
];

const CourseDetail = ({ role }) => {
  const { id } = useParams();
  const [course, setCourse] = useState(lectures);
  const [loading, setLoading] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          width: '200px',
          flexShrink: 0,
          borderRight: '1px solid #ddd',
          height: '100vh',
          overflowY: 'auto',
          p: 2,
        }}
      >
        <List>
          {lectures.map((lecture) => (
            <ListItem key={lecture.id} disablePadding>
              <ListItemButton onClick={() => handleLectureClick(lecture)}>
                <ListItemText primary={lecture.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        {selectedLecture ? (
          <Box>
            <Typography variant="h4">{selectedLecture.title}</Typography>
            <Typography variant="body1">{selectedLecture.description}</Typography>
            <Typography variant="body2">Время начала: {selectedLecture.time}</Typography>
            <Typography variant="h6">Запись лекции:</Typography>
            <Box sx={{ width: '100%', height: '300px', border: '1px solid black', marginBottom: '16px' }}>
              Тут плеер с видео
            </Box>
            <Typography variant="h6">Прикреплённые файлы:</Typography>
            <Box>
              <Button variant="outlined" sx={{ marginBottom: '8px' }}>Название файла 1</Button>
              <Button variant="outlined" sx={{ marginBottom: '8px' }}>Название файла 2</Button>
              <Button variant="outlined" sx={{ marginBottom: '8px' }}>Название файла 3</Button>
            </Box>
          </Box>
        ) : (
          <Typography variant="h6">Выберите лекцию из меню</Typography>
        )}
      </Box>
    </Box>
  );
};

export default CourseDetail;
