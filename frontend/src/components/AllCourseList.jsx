import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import moment from 'moment-timezone';

const AllCoursesList = ({ courses }) => {
  return (
    <div>
      {courses.map(course => (
        <Card key={course.id} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {course.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {course.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Дата старта: {moment(course.date_start).tz('Asia/Yekaterinburg').format('DD-MM-YYYY')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Статус: {course.status}
            </Typography>
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<TelegramIcon />}
                href={course.telegram}
                target="_blank"
              >
                Телеграм
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AllCoursesList;
