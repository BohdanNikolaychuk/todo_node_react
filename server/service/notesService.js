const Note = require('../models/Notes.js');

async function createUserNote(req, res, next) {
  try {
    const { text } = req.body;

    if (!text) {
      res.status(400).json({ massage: 'Without text' });
    }

    const notes = new Note({
      text,
      userId: req.user.userId,
    });

    notes.save();

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ massage: 'Server Error' });
  }
}

async function getUserNotes(req, res, next) {
  try {
    const notes = await Note.find({ userId: req.user.userId }, '-__v');
    res.json(notes);
  } catch (err) {
    return res.status(500).json({ massage: 'Server Error' });
  }
}

async function getNote(req, res, next) {
  try {
    const _id = req.params.id;
    console.log(_id);
    if (!_id) {
      res.status(400).json({ massage: 'error' });
    }
    const note = await Note.findOne({ _id });

    if (!note) {
      res.status(400).json({ massage: 'error' });
    }

    if (note.userId !== req.user.userId) {
      res.status(400).json({ massage: 'Not valide id' });
    }

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ massage: 'error' });
  }
}

async function editNote(req, res, next) {
  try {
    const _id = req.params.id;
    const { text } = req.body;

    if (!_id) {
      res.status(400).json({ massage: 'id is not provided' });
    }

    const note = await Note.findOne({ _id });

    if (!note) {
      res.status(400).json({ massage: 'There is no note with such id' });
    }

    if (note.userId !== req.user.userId) {
      res.status(400).json({ massage: 'Forbidden' });
    }

    const newNote = await Note.findByIdAndUpdate(_id, { text });

    res.status(200).json(newNote);
  } catch (err) {
    res.status(500).json(err.massage);
  }
}

async function editNoteValue(req, res, next) {
  try {
    const _id = req.params.id;

    if (!_id) {
      res.status(400).json({ massage: 'id is not provided' });
    }

    const note = await Note.findOne({ _id });

    if (!note) {
      res.status(400).json({ massage: 'There is no note with such id' });
    }

    if (note.userId !== req.user.userId) {
      res.status(400).json({ massage: 'Forbidden' });
    }

    await Note.findByIdAndUpdate(_id, { completed: !note.completed });

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json(err.massage);
  }
}

async function deleteUserNoteById(req, res, next) {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(400).json({ massage: 'id is not provided' });
    }

    const note = await Note.findOne({ _id });

    if (!note) {
      return res.status(400).json({ massage: 'There is no note with such id' });
    }

    if (note.userId !== req.user.userId) {
      return res.status(400).json({ massage: 'You try delete not your notes' });
    }

    await Note.findByIdAndDelete(_id);

    return res.status(200).json({ message: 'Success' });
  } catch (err) {
    res.status(500).json({ massage: 'Server Error' });
  }
}

module.exports = {
  getUserNotes,
  createUserNote,
  getNote,
  editNote,
  editNoteValue,
  deleteUserNoteById,
};
