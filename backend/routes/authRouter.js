const express = require('express');

function createAuthRouter(authController) {
  const router = express.Router();

  router.post('/login', authController.loginUser);
  router.post('/refresh-token', authController.refreshToken);

  return router;
}

module.exports = createAuthRouter;
