const util = require('util');
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DataStore {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async read() {
    try {
      const data = await readFileAsync(this.filePath, 'utf8');
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
    }
  }

  async write(data) {
    await writeFileAsync(this.filePath, JSON.stringify(data, null, 2));
  }

  async getAllNotes() {
    const notes = await this.read();
    return Array.isArray(notes) ? notes : [];
  }

  async addNewNote(note) {
    if (!note.title || !note.text) {
      throw new Error("Cannot be blank");
    }

    const newNote = { ...note, id: uuidv1() };

    const notes = await this.getAllNotes();
    notes.push(newNote);

    await this.write(notes);

    return newNote;
  }

  async deleteNoteById(id) {
    const notes = await this.getAllNotes();
    const updatedNotes = notes.filter((note) => note.id !== id);
    await this.write(updatedNotes);
  }
}

module.exports = new DataStore('db/db.json');
