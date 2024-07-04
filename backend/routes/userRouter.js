const express = require('express');

function createUserRouter(userController) {
  const router = express.Router();

  router.post('/', userController.addUser);
  router.put('/:id', userController.updateUser);
  router.delete('/:id', userController.deleteUser);
  router.get('/', userController.getAllUsers);
  router.get('/:login', userController.getUsersByLogin);

  return router;
}

module.exports = createUserRouter;
