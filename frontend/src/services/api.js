import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getMyCourses = () => api.get('/courses/my');
export const getCourseById = (id) => api.get(`/my/${id}`);
export const createLesson = (lessonData) => api.post('/lessons', lessonData);
export const createHomework = (homeworkData) => api.post('/homeworks', homeworkData);
export const attachFileToLesson = (lessonId, fileData) => api.post(`/lesson-files/${lessonId}`, fileData);
export const getLessonById = (id) => api.get(`/lessons/${id}`);
export const getHomeworkById = (id) => api.get(`/homeworks/${id}`);
export const getLessonsByCourseId = (id) =>  api.get(`/courses/${id}/lesson`);
export const getHomeworkByCourseId =(id) =>   api.get(`/courses/${id}/homework`);

