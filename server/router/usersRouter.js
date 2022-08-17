const express = require('express');

const router = express.Router();
const { registerUser, loginUser, getMe } = require('../service/usersService.js');
const { checkAuth } = require('../middleware/checkAuth');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', checkAuth, getMe);
module.exports = {
  usersRouter: router,
};
