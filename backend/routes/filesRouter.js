const express = require('express');
const path = require('path');
const fs = require('fs');

function createFilesRouter(filesController,tokenService) {
  const router = express.Router();

  router.get('/', tokenService.authenticate, filesController.getAllFiles);
  router.get('/:id',tokenService.authenticate, filesController.getFileById);
  router.post('/upload',tokenService.authenticate, filesController.createLessonFile);
  router.put('/:id',tokenService.authenticate, filesController.updateFile);
  router.delete('/:id',tokenService.authenticate, filesController.deleteFile);
  router.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.resolve(__dirname, '..', 'uploads', filename);
    if (fs.existsSync(filePath)) {
      res.download(filePath, filename, (err) => {
        
      });
    } else {
     
    }
  });

  return router;
}

module.exports = createFilesRouter;
