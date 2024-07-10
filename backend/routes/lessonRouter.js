const express = require('express');

function createLessonRouter(lessonController) {
  const router = express.Router();

  router.get('/', lessonController.getAllLessons);
  router.get('/:id', lessonController.getLessonById);
  router.post('/', lessonController.createLesson);
  router.put('/:id', lessonController.updateLesson);
  router.delete('/:id', lessonController.deleteLesson);

  return router;
}

module.exports = createLessonRouter;
