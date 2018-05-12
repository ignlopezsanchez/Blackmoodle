const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const NoteSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },

  url: {
    type: String,
    required: [true, "url is required"]

  },
  _author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;