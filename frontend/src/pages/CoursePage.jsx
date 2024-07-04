import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Button
} from '@mui/material';
import CourseCard from '../components/CourseCard';
import CourseFormModal from '../components/CourseModal';

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/api/courses').then((response) => {
      setCourses(response.data);
    });
  }, []);

  const handleAddCourse = (course) => {
    axios.post('http://127.0.0.1:3000/api/courses', course).then((response) => {
      setCourses([...courses, response.data]);
    });
  };

  const handleDeleteCourse = (id) => {
    axios.delete(`http://127.0.0.1:3000/api/courses/${id}`).then(() => {
      setCourses(courses.filter(course => course.id !== id));
    });
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setModalOpen(true);
  };

  const handleSaveCourse = (course) => {
    if (course.id) {
      axios.put(`http://127.0.0.1:3000/api/courses/${course.id}`, course).then((response) => {
        setCourses(courses.map(c => (c.id === course.id ? response.data : c)));
      });
    } else {
      handleAddCourse(course);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="div" gutterBottom>
        Курсы
      </Typography>
      {courses.map(course => (
        <CourseCard
          key={course.id}
          course={course}
          onDelete={handleDeleteCourse}
          onEdit={handleEditCourse}
        />
      ))}
      <Button onClick={() => setModalOpen(true)}>Добавить курс</Button>
      <CourseFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingCourse(null);
        }}
        course={editingCourse}
        onSave={handleSaveCourse}
      />
    </Container>
  );
};

export default CoursePage;

