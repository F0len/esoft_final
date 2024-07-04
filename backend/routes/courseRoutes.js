const express = require('express');

function createCourseRouter(courseController) {
  const router = express.Router();

  router.get('/', courseController.getAllCourses);
  router.get('/:id', courseController.getCourseById);
  router.post('/', courseController.createCourse);
  router.put('/:id', courseController.updateCourse);
  router.delete('/:id', courseController.deleteCourse);

  return router;
}

module.exports = createCourseRouter;
