const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const ReplySchema = require('./Reply').schema;


const ThreadSchema = new Schema({
  _author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  content: {
    type: String,
    required: [true, "Content is required"]
  },
  date: {
    type: Date,
    default: Date.now
  },
  replies:  [{
    type: Schema.Types.ObjectId,
    ref: 'Reply'
  }],
});

const Thread = mongoose.model('Thread', ThreadSchema);
module.exports = Thread;