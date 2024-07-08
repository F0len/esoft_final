import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import CourseForm from '../components/CourseForm';
import ParticipantsModal from '../components/ParticipantsModal';
import moment from 'moment-timezone';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

};
const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [openCourseForm, setOpenCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [openParticipants, setOpenParticipants] = useState(false);
  console.log(openParticipants);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses', error);
    }
  };

  const handleCreateOrEditCourse = async (course) => {
    if (editingCourse) {
      await axios.put(`http://127.0.0.1:3000/api/courses/${editingCourse.id}`, course);
    } else {
      await axios.post('http://127.0.0.1:3000/api/courses', course);
    }
    fetchCourses();
    setOpenCourseForm(false);
    setEditingCourse(null);
  };

  const handleDeleteCourse = async (id) => {
    await axios.delete(`http://127.0.0.1:3000/api/courses/${id}`);
    fetchCourses();
  };
  const handleClose = () => {
    setOpenParticipants(false);
  };

  return (
    <Container>
      <Typography variant="h4">Курсы</Typography>
      <Button variant="contained" onClick={() => setOpenCourseForm(true)}>Создать курс</Button>
      {courses.map(course => (
        <Accordion key={course.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{course.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{course.description}</Typography>
            <Typography>Дата старта: {moment(course.date_start).tz('Asia/Yekaterinburg').format('DD-MM-YYYY')}</Typography>
            <Typography>Статус: {course.status}</Typography>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="outlined" onClick={() => { setEditingCourse(course); setOpenCourseForm(true); }}>Изменить</Button>
              <Button variant="contained" color="error" onClick={() => handleDeleteCourse(course.id)}>Удалить</Button>
              <Button variant="outlined" onClick={() => { setSelectedCourse(course); setOpenParticipants(true); }}>Участники курса</Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
      <Modal open={openCourseForm} onClose={() => { setOpenCourseForm(false); setEditingCourse(null); }}>
        <Box sx={modalStyle}>
          <CourseForm course={editingCourse} onSubmit={handleCreateOrEditCourse} />
        </Box>
      </Modal>
      <Modal open={openParticipants} onClose={handleClose}>
        <Box sx={modalStyle}>
          <ParticipantsModal course={selectedCourse} />
        </Box>

      </Modal>
    </Container>
  );
};

export default CoursePage;
