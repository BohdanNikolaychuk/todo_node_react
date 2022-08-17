const express = require('express');

const router = express.Router();
const {
  getUserNotes,
  createUserNote,
  getNote,
  editNote,
  editNoteValue,
  deleteUserNoteById,
} = require('../service/notesService.js');

const { authMiddleware } = require('../middleware/authMiddleware');
const { checkAuth } = require('../middleware/checkAuth');
router.get('/get', checkAuth, getUserNotes);
router.post('/', checkAuth, createUserNote);
router.get('/:id', checkAuth, getNote);
router.put('/:id', checkAuth, editNote);
router.patch('/:id', checkAuth, editNoteValue);
router.delete('/:id', checkAuth, deleteUserNoteById);

module.exports = {
  notesRouter: router,
};
