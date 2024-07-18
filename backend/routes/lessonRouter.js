const express = require('express');

function createLessonRouter(lessonController,tokenService) {
  const router = express.Router();

  router.get('/',tokenService.authenticate,lessonController.getAllLessons);
  router.get('/:id',tokenService.authenticate, lessonController.getLessonById);
  router.post('/',tokenService.authenticate, lessonController.createLesson);
  router.put('/:id',tokenService.authenticate, lessonController.updateLesson);
  router.delete('/:id',tokenService.authenticate, lessonController.deleteLesson);

  return router;
}

module.exports = createLessonRouter;
