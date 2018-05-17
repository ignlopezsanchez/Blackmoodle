const Note   = require('../models/Note');
const Subject   = require('../models/Subject');

const isTeacherOrAuthor = () => (req, res, next) => {
  let idUser = req.user.id;
  let user = req.user;
  let idNote = req.params.idNote;
  let idSubject = req.params.idSubject;
  Note.findById(idNote).then(note => {
    Subject.findById(idSubject).then(subjects => {
      if (subjects.teacher.indexOf(idUser) != -1){
        console.log(`ACCESS GRANTED to user ${req.user.username}`);
        next()
      }
    
      else {
        console.log(`ACCESS DENIED. Your are not teacher of this subject`);
      }
    console.log(note)
    if (note._author.toString() === req.user.id){
      console.log(`ACCESS GRANTED to user ${req.user.username}`);
      next()
    } 
    
    else {
      console.log(`ACCESS DENIED. You are not the author`);
      res.status(400).json({message:"You should edit the note you have created or be a Teacher in this subject"});
    }
    } 
  )
  })     
};

module.exports = isTeacherOrAuthor;

