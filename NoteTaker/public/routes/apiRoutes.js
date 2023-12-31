const express = require('express');
const router = express.Router();
const database = require('../db/database');

router.get('/notes', (req, res) => {
  database
    .getAllNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

router.post('/notes', (req, res) => {
  const newNote = req.body;
  database
    .addNewNote(newNote)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  database
    .deleteNoteById(noteId)
    .then(() => res.json({ message: 'Note deleted successfully' }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
