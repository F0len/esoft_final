import React, { useEffect, useState } from 'react';
import { getMyCourses } from '../services/api';
import { List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { Grid, Card, CardContent, CardActions, Button, Typography, IconButton, Box } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyCourses()
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Мои курсы
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {courses.map((course) => (
          <Grid item xs={12} key={course.id} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '100%', maxWidth: 800, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {course.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  component={Link}
                  to={`/my-courses/${course.id}`}
                  endIcon={<ArrowForward />}
                >
                  Перейти к курсу
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseList;
