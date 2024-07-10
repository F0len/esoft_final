const express = require('express');

function createHomeworkRouter(homeworkController) {
  const router = express.Router();

  router.get('/', homeworkController.getAllHomeworks);
  router.get('/:id', homeworkController.getHomeworkById);
  router.post('/', homeworkController.createHomework);
  router.put('/:id', homeworkController.updateHomework);
  router.delete('/:id', homeworkController.deleteHomework);

  return router;
}

module.exports = createHomeworkRouter;
