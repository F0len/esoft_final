const express = require('express');

function createHomeworkResponseRouter(homeworkResponseController, tokenService) {
  const router = express.Router();

  router.get('/my/:homeworkId', tokenService.authenticate, homeworkResponseController.getAllResponsesByUserIdAndHomeworkId);
  router.get('/homework/:homeworkId', tokenService.authenticate, homeworkResponseController.getAllResponsesByHomeworkId);
  router.post('/', tokenService.authenticate, homeworkResponseController.createResponse);
  router.put('/:id', tokenService.authenticate, homeworkResponseController.updateResponse);
  router.delete('/:id', tokenService.authenticate, homeworkResponseController.deleteResponse);

  return router;
}

module.exports = createHomeworkResponseRouter;
