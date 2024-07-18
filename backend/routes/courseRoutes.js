const express = require('express');

function createCourseRouter(courseController,tokenService) {
  const router = express.Router();

  router.get('/:id/lesson', tokenService.authenticate, courseController.getCourseLessonById);
  router.get('/:id/homework', tokenService.authenticate ,courseController.getCourseHomeworkById);
  router.get('/',tokenService.authenticate, courseController.getAllCourses);
  router.get('/my', tokenService.authenticate ,courseController.getCourseUserById);
  router.get('/:id',tokenService.authenticate, courseController.getCourseById);
 
  router.post('/',tokenService.authenticate, courseController.createCourse);
  router.put('/:id',tokenService.authenticate, courseController.updateCourse);
  router.delete('/:id',tokenService.authenticate, courseController.deleteCourse);
  router.get('/participants/:id',tokenService.authenticate, courseController.getUserCourseById);
  router.post('/participants', tokenService.authenticate,courseController.createUserCourse);
  router.delete('/participants/:course_id/:user_id',tokenService.authenticate, courseController.deleteUserCourse);
  
  return router;
}

module.exports = createCourseRouter;
