import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { getCourses } from '../services/api';
import AllCoursesList from '../components/AllCourseList';

const AllCoursePage = ({ role }) => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses', error);
    }
  };
  return (
    <>
      <Box sx={{ textAlign: 'center', mt: 4, ml:18, mr:18 }}>
      <Typography variant="h4" gutterBottom>
        Курсы
      </Typography>
      <AllCoursesList courses={courses}/>
      </Box>
    </>
  );
};

export default AllCoursePage;
