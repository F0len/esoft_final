const express = require('express');

function createCourseRouter(courseController,tokenService) {
  const router = express.Router();

  router.get('/:id/lesson', tokenService.authenticate ,courseController.getCourseLessonById);
  router.get('/', courseController.getAllCourses);
  router.get('/my', tokenService.authenticate ,courseController.getCourseUserById);
  router.get('/:id', courseController.getCourseById);
 
  router.post('/', courseController.createCourse);
  router.put('/:id', courseController.updateCourse);
  router.delete('/:id', courseController.deleteCourse);
  router.get('/participants/:id', courseController.getUserCourseById);
  router.post('/participants', courseController.createUserCourse);
  router.delete('/participants/:course_id/:user_id', courseController.deleteUserCourse);
  

  return router;
}

module.exports = createCourseRouter;
