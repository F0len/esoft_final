const express = require('express');

function createUserRouter(userController, tokenService) {
  const router = express.Router();

  router.post('/',tokenService.authenticate, userController.addUser);
  router.put('/:id',tokenService.authenticate, userController.updateUser);
  router.put('/edit-profile/:id',tokenService.authenticate, userController.updateUserWithoutRoles);
  router.delete('/:id',tokenService.authenticate, userController.deleteUser);
  router.get('/',tokenService.authenticate, userController.getAllUsers);
  router.get('/small_info',tokenService.authenticate, userController.getAllUsersSmallInfo);
  router.get('/:login',tokenService.authenticate, userController.getUsersByLogin);

  return router;
}

module.exports = createUserRouter;
