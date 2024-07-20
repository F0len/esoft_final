const express = require('express');

function createAuthRouter(authController) {
  const router = express.Router();

  router.post('/login', authController.loginUser);
  router.post('/register', authController.registerUser);
  return router;
}

module.exports = createAuthRouter;
