const express = require('express');

const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware.js');
const { getUser, editUser, deleteUser } = require('../service/infoService.js');

router.get('/me', authMiddleware, getUser);
router.patch('/me', authMiddleware, editUser);
router.delete('/me', authMiddleware, deleteUser);

module.exports = {
  infoRouter: router,
};
