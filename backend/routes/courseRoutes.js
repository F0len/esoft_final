const express = require('express');

function createCourseRouter(courseController) {
  const router = express.Router();

  router.get('/', courseController.getAllCourses);
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
