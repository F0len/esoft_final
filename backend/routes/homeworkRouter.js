const express = require('express');

function createHomeworkRouter(homeworkController,tokenService) {
  const router = express.Router();

  router.get('/',tokenService.authenticate, homeworkController.getAllHomeworks);
  router.get('/:id',tokenService.authenticate, homeworkController.getHomeworkById);
  router.post('/',tokenService.authenticate, homeworkController.createHomework);
  router.put('/:id',tokenService.authenticate, homeworkController.updateHomework);
  router.delete('/:id',tokenService.authenticate, homeworkController.deleteHomework);

  return router;
}

module.exports = createHomeworkRouter;
