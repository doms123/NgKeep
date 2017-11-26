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

const showNotes = (payload, callback) => {
    Note.find(payload).exec(callback);
}

const showNotesPinned = (payload, callback) => {
    Note.find(payload).exec(callback);
}

const pinnedNotes = (payload, callback) => {
    Note.update(payload, { $set: { pin: 'true' }}, callback);
};

const unpinnedNotes = (payload, callback) => {
    Note.update(payload, { $set: { pin: 'false' }}, callback);
};

const deleteNotes = (payload, callback) => {
    Note.remove(payload, callback);
};

module.exports = {Note, addNote, showNotes, showNotesPinned, pinnedNotes, unpinnedNotes, deleteNotes};