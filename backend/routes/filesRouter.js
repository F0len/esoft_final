const express = require('express');

function createFilesRouter(filesController) {
  const router = express.Router();

  router.get('/', filesController.getAllFiles);
  router.get('/:id', filesController.getFileById);
  router.post('/', filesController.createFile);
  router.put('/:id', filesController.updateFile);
  router.delete('/:id', filesController.deleteFile);

  return router;
}

module.exports = createFilesRouter;
