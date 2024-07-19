import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, Box, Button, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import CreateLessonDialog from './CreateLessonDialog';
import CreateHomeworkDialog from './CreateHomeworkDialog';
import { getLessonsByCourseId, getHomeworkByCourseId } from '../services/api';
import LessonDetail from './LessonDetail';
import HomeworkDetail from './HomeworkDetail';


const CourseDetail = ({ role }) => {
  const { id } = useParams();

  const [items, setItems] = useState([]);
  console.log(items);
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
          selectedItem.type === 'lesson' ? (
            <LessonDetail selectedItem={selectedItem} />
          ) : selectedItem.type === 'homework' ? (
            <HomeworkDetail selectedItem={selectedItem} />
          ) : (
            <Typography variant="h6">Тип элемента не поддерживается</Typography>
          )
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