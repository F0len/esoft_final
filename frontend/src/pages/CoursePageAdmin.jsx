import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getCourses,createCourses, updateCourses, deleteCourses } from '../services/api';
import CourseForm from '../components/CourseForm';
import ParticipantsModal from '../components/ParticipantsModal';
import moment from 'moment-timezone';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

};
const CoursePageAdmin = () => {
  const [courses, setCourses] = useState([]);
  const [openCourseForm, setOpenCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [openParticipants, setOpenParticipants] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);

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

  const handleCreateOrEditCourse = async (course) => {
    if (editingCourse) {
      await updateCourses(editingCourse.id, course)
    } else {
      await createCourses(course);
    }
    fetchCourses();
    setOpenCourseForm(false);
    setEditingCourse(null);
  };

  const handleDeleteCourse = async (id) => {
    await deleteCourses(id);
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
            <Typography>Телеграм: {course.telegram}</Typography>
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

export default CoursePageAdmin;
