const Note   = require('../models/Note');

const noteAuthor = () => (req, res, next) => {
  let user = req.user;
  let idNote = req.params.idNote;
  Note.findById(idNote).then(note => {
    console.log(note)
    if (note._author.toString() === req.user.id){
      console.log(`ACCESS GRANTED to user ${req.user.username}`);
      next()
    } 
    else {
      console.log(`ACCESS DENIED. You are not the author`);
      res.status(400).json({message:"You should edit the note you have created"});
    }
  })     
};

module.exports = noteAuthor;