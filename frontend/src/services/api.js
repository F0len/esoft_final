import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://127.0.0.1:8081/api/',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use((response) => {
  const token = response.headers['authorization'];
  if (token) {
    localStorage.setItem('token', token);
  }
  return response;
}, (error) => {
  
  if (error.response && error.response.status === 401) {
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export const apiLogin = (loginData) =>  api.post('/login', loginData);
export const apiRegister = (registeData) =>  api.post('/register', registeData);


export const getUsers = () =>  api.get('/users');
export const createUser = (userData) => api.post(`/users`, userData);
export const updateUser = (id,userData) => api.put(`/users/${id}`, userData);
export const updateUserWithoutRoles = (id,userData) => api.put(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);


export const createCourses = (coursesData) => api.post(`/courses`, coursesData);
export const updateCourses = (id,coursesData) => api.put(`/courses/${id}`, coursesData);
export const deleteCourses = (id) => api.delete(`/courses/${id}`);

export const getCoursesParticipants = (id) =>  api.get(`/courses/participants/${id}`);
export const getUserSmallInfo = () =>  api.get(`/users/small_info`);
export const addCoursesParticipants = (participantsData) => api.post(`/courses/participants`, participantsData);
export const deleteCoursesParticipants = (courseId,participantId) => api.delete(`/courses/participants/${courseId}/${participantId}`);

export const getCourses = () =>  api.get('/courses');
export const getMyCourses = () =>  api.get('/courses/my');
export const getCourseById = (id) => api.get(`/my/${id}`);

export const createLesson = (lessonData) => api.post('/lessons', lessonData);
export const createHomework = (homeworkData) => api.post('/homeworks', homeworkData);
export const deleteLesson = (id) => api.delete(`/lessons/${id}`);
export const deleteHomework = (id) => api.delete(`/homeworks/${id}`);

export const attachFileToLesson = (lessonId, fileData) => api.post(`/lesson-files/${lessonId}`, fileData);

export const getLessonById = (id) => api.get(`/lessons/${id}`);
export const getHomeworkById = (id) => api.get(`/homeworks/${id}`);
export const getLessonsByCourseId = (id) =>  api.get(`/courses/${id}/lesson`);
export const getHomeworkByCourseId =(id) =>   api.get(`/courses/${id}/homework`);

export const uploadFiles = (formData) => {
  return api.post('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const createHomeworkResponses = (homeworkResponsesData) => api.post('/homework-response', homeworkResponsesData);
export const getHomeworkResponsesById = (homeworkId ) => api.get(`/homework-response/my/${homeworkId}`);
export const getAllHomeworkResponsesById = (homeworkId ) => api.get(`/homework-response/homework/${homeworkId}`);
export const updateHomeworkResponse = (id,homeworkResponsesData) => api.put(`/homework-response/${id}`, homeworkResponsesData);
export const deleteHomeworkResponse = (id) => api.delete(`/homework-response/${id}`);
