import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, Box, Button, List, ListItem, ListItemText, ListItemButton, IconButton } from '@mui/material';
import CreateLessonDialog from './CreateLessonDialog';
import CreateHomeworkDialog from './CreateHomeworkDialog';
import { getLessonsByCourseId, getHomeworkByCourseId, deleteHomework, deleteLesson } from '../services/api';
import LessonDetail from './LessonDetail';
import HomeworkDetail from './HomeworkDetail';
import HomeworkResponsesEdit from './HomeworkResponsesEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ru';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('ru'); // Установите русскую локализацию для moment

const localizer = momentLocalizer(moment);

const messages = {
  allDay: 'Весь день',
  previous: 'Предыдущий',
  next: 'Следующий',
  today: 'Сегодня',
  month: 'Месяц',
  week: 'Неделя',
  day: 'День',
  agenda: 'Повестка дня',
  date: 'Дата',
  time: 'Время',
  event: 'Событие',
  noEventsInRange: 'Нет событий в этом диапазоне',
};

const CourseDetail = ({ roles }) => {
  const { id } = useParams();

  const [items, setItems] = useState([]);
  const [view, setView] = useState('calendar');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openLessonDialog, setOpenLessonDialog] = useState(false);
  const [openHomeworkDialog, setOpenHomeworkDialog] = useState(false);
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
  useEffect(() => {
    

    fetchData();
  }, [id]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setView('detail');
  };

  const handleOpenLessonDialog = () => {
    setOpenLessonDialog(true);
  };

  const handleCloseLessonDialog = () => {
    fetchData();
    setOpenLessonDialog(false);
  };

  const handleOpenHomeworkDialog = () => {
    setOpenHomeworkDialog(true);
  };

  const handleCloseHomeworkDialog = () => {
    fetchData();
    setOpenHomeworkDialog(false);
  };

  const handleDelete = async (itemId, itemType) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот элемент?')) {
      return;
    }

    try {
      if (itemType === 'lesson') {
        await deleteLesson(itemId);
      } else if (itemType === 'homework') {
        await deleteHomework(itemId);
      } else {
        console.error('Unsupported item type:', itemType);
        return;
      }

      setItems(items.filter(item => item.id !== itemId));
      setSelectedItem(null);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const canEditResponses = ['teacher', 'admin'].some(role => roles.includes(role));

  const events = items.map(item => ({
    id: item.id,
    title: item.name,
    start: new Date(item.scheduled_date),
    end: new Date(item.scheduled_date),
    type: item.type,
  }));

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
        <Button variant="contained" onClick={() => setView('calendar')}>Календарь</Button>
        <List>
          {items.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                backgroundColor: item.type === 'homework' ? '#f5f5f5' : '#e3f2fd',
                mb: 1,
                borderRadius: 1,
              }}
            >
              <ListItemButton onClick={() => handleItemClick(item)} sx={{ flexGrow: 1 }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
              {['teacher', 'admin'].some(role => roles.includes(role))&& 
              <>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id, item.type)}>
                <DeleteIcon />
              </IconButton>
              </>}
              
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        {['teacher', 'admin'].some(role => roles.includes(role)) && (
          <Box sx={{ marginBottom: 2 }}>
            <Button variant="contained" onClick={handleOpenLessonDialog} sx={{ marginRight: 1 }}>
              Создать лекцию
            </Button>
            <Button variant="contained" onClick={handleOpenHomeworkDialog}>
              Создать домашнее задание
            </Button>
          </Box>
        )}
        {view === 'calendar' ? (
          <Calendar
          culture="ru"
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={handleItemClick}
            messages={messages}
          />
        ) : selectedItem ? (
          selectedItem.type === 'lesson' ? (
            <LessonDetail selectedItem={selectedItem} />
          ) : selectedItem.type === 'homework' ? (
            view === 'detail' ? (
              <HomeworkDetail
                selectedItem={selectedItem}
                onEditResponses={() => setView('edit')}
                roles={roles}
              />
            ) : (
              canEditResponses ? (
                <HomeworkResponsesEdit
                  homeworkId={selectedItem.id}
                  onBack={() => setView('detail')}
                />
              ) : (
                <Typography variant="h6">У вас нет прав на редактирование ответов</Typography>
              )
            )
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