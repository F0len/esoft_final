import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import moment from 'moment-timezone';

const AllCoursesList = ({ courses }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Запланирован':
        return 'info.main';
      case 'Идёт':
        return 'success.main';
      case 'Закончен':
        return 'warning.main';
      default:
        return 'text.secondary';
    }
  };

  return (
    <Grid container spacing={2}>
      {courses.map(course => (
        <Grid item xs={12} key={course.id}>
          <Card variant="outlined" sx={{ mb: 2, borderRadius: 2, boxShadow: 3, backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom color="primary.main">
                {course.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom sx={{ whiteSpace: 'pre-line' }}>
                {course.description}
              </Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <EventIcon color="action" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Дата старта: {moment(course.date_start).tz('Asia/Yekaterinburg').format('DD-MM-YYYY')}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <CheckCircleIcon color={getStatusColor(course.status).split('.')[0]} sx={{ mr: 1 }} />
                <Typography variant="body2" color={getStatusColor(course.status)}>
                  Статус: {course.status}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<TelegramIcon />}
                  href={course.telegram}
                  target="_blank"
                >
                  Записаться на курс
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AllCoursesList;