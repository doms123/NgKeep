const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    note: String,
    pin: String,
    file: String,
    user_id: String,
    date_added: {
        type: Date, 
        default: Date.now 
    },
    post_date: String
});

const Note = mongoose.model('Note', NoteSchema);

const addNote = (newNote, callback) => {
    newNote.save(callback);
};

const showNotes = (callback) => {
    Note.find(callback);
}

module.exports = { Note, addNote, showNotes};