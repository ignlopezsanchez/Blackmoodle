const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const DeadlineSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  _author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    required: [true, "Date is required"]
    },

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const Deadline = mongoose.model('Deadline', DeadlineSchema);
module.exports = Deadline;