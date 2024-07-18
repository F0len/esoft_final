import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, Box, Button, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import CreateLessonDialog from './CreateLessonDialog';
import CreateHomeworkDialog from './CreateHomeworkDialog';
import { getLessonsByCourseId, getHomeworkByCourseId } from '../services/api';

const CourseDetail = ({ role }) => {
  const { id } = useParams();
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openLessonDialog, setOpenLessonDialog] = useState(false);

  const [openHomeworkDialog, setOpenHomeworkDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lessonsResponse, homeworkResponse] = await Promise.all([
          getLessonsByCourseId(id),
          getHomeworkByCourseId(id),
        ]);

        const lessons = lessonsResponse.data.map(lesson => ({ ...lesson, type: 'lesson' }));
        const homework = homeworkResponse.data.map(hw => ({ ...hw, type: 'homework' }));

        const combinedItems = [...lessons, ...homework].sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date));
        
        setItems(combinedItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleOpenLessonDialog = () => {
    setOpenLessonDialog(true);
  };

  const handleCloseLessonDialog = () => {
    setOpenLessonDialog(false);
  };

  const handleOpenHomeworkDialog = () => {
    setOpenHomeworkDialog(true);
  };

  const handleCloseHomeworkDialog = () => {
    setOpenHomeworkDialog(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          width: '300px',
          flexShrink: 0,
          borderRight: '1px solid #ddd',
          height: '100vh',
          overflowY: 'auto',
          p: 2,
        }}
      >
      
        <List>
          {items.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton onClick={() => handleItemClick(item)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
          {['teacher', 'admin'].includes(role) && (
          <Box sx={{ marginBottom: 2 }}>
            <Button variant="contained" onClick={handleOpenLessonDialog} sx={{ marginRight: 1 }}>
              Создать лекцию
            </Button>
            <Button variant="contained" onClick={handleOpenHomeworkDialog}>
              Создать домашнее задание
            </Button>
          </Box>
        )}
        {selectedItem ? (
          <Box>
            <Typography variant="h4">{selectedItem.name}</Typography>
            <Typography variant="body1">{selectedItem.description}</Typography>
            <Typography variant="body2">Время начала: {new Date(selectedItem.scheduled_date).toLocaleString()}</Typography>
            {selectedItem.type === 'lesson' && (
              <>
                <Typography variant="h6">Запись лекции:</Typography>
                <Box sx={{ width: '100%', height: '300px', border: '1px solid black', marginBottom: '16px' }}>
                  Тут плеер с видео
                </Box>
              </>
            )}
            <Typography variant="h6">Прикреплённые файлы:</Typography>
            <Box>
              {selectedItem.files && selectedItem.files.map((file, index) => (
                <Button variant="outlined" key={index} sx={{ marginBottom: '8px' }}>{file.name}</Button>
              ))}
            </Box>
          </Box>
        ) : (
          <Typography variant="h6">Выберите лекцию или задание из меню</Typography>
        )}
      </Box>

      <CreateLessonDialog open={openLessonDialog} onClose={handleCloseLessonDialog} courseId={id} />
      <CreateHomeworkDialog open={openHomeworkDialog} onClose={handleCloseHomeworkDialog} courseId={id} />
    </Box>
  );
};

export default CourseDetail;