const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
// const ThreadSchema = require('./Thread').schema;
// const DeadlineSchema = require('./Deadline').schema;



const SubjectSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  degree: {
    type: Schema.Types.ObjectId,
    required: [true, "Degree is required"],
    ref: 'Degree'
  },
  course: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: [true, "Course is required"]
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Deadline'
  }],
  teacher: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  threads: [{
    type: Schema.Types.ObjectId,
    ref: 'Thread'
  }],
  deadlines: [{
    type: Schema.Types.ObjectId,
    ref: 'Deadline'
  }],

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const Subject = mongoose.model('Subject', SubjectSchema);
module.exports = Subject;