const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/notes', (req, res) => {
  const notesFilePath = path.join(__dirname, '../public/notes.html');
  res.sendFile(notesFilePath);
});

router.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../public/index.html');
  res.sendFile(indexPath);
});

module.exports = router;
