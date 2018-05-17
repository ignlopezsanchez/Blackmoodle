const express = require('express');
const router = express.Router();
const Note = require('../../models/Note');
const Subject = require('../../models/Subject');
const _ = require('lodash')
const ensureLoggedIn = require('../../middlewares/ensureLoggedIn');
const ensureLoggedOut = require('../../middlewares/ensureLoggedOut');
const hasSubject = require('../../middlewares/hasSubject');
const noteAuthor = require('../../middlewares/noteAuthor');
const isTeacherOrAuthor = require('../../middlewares/isTeacherOrAuthor');
const uploadCloud = require("../../config/cloudinary.js");



//CREATE NOTE
router.post('/:idSubject/new', [ensureLoggedIn(),uploadCloud.single("file"), hasSubject()], (req, res, next) => {    
  let idSubject = req.params.idSubject;
  if (req.file){
    url = req.file.url
}
else {
    url = "";
}
  const newNote = new Note({
    _author: req.user._id,
    name: req.body.name,
    url: url
  });
  Subject
    .findByIdAndUpdate(idSubject, { $push: { notes:  newNote } }, {new: true})
      .then((subject) =>{
        newNote.save().then(() => {
        return res.status(200).json(subject);
      })
        })
  .catch(err => {
    if (err)     { return res.status(500).json(err); }

    // return res.status(404).json(err);
}); 
});

//DELETE NOTE
router.delete('/:idSubject/:idNote', [ensureLoggedIn(), isTeacherOrAuthor()], (req, res, next) => { 
  let idSubject = req.params.idSubject;
  let idNote = req.params.idNote;
  Subject.findByIdAndUpdate(idSubject, { $pull: { notes:  idNote } }).then(subject => {
    Note
    .findByIdAndRemove(idNote)
      .then((notes) =>{
        return res.status(200).json(notes);
      }) 

  })     
  .catch(err => {
    if (err)     { return res.status(500).json(err); }
    // return res.status(404).json(err);
});
});


//EDIT NOTE
router.put('/:idNote', [ensureLoggedIn(),uploadCloud.single("file"), noteAuthor()], (req, res, next) => {    
  let idNote = req.params.idNote;
  if (req.file){
    url = req.file.url
}
else {
    url = "";
}
  const update = {
    _author: req.user._id,
    name: req.body.name,
    url: url
  };
  console.log(update)
  const p = _.pickBy(update, _.identity)
  Note
    .findByIdAndUpdate(idNote, p, {new: true})
      .then((notes) =>{
        return res.status(200).json(notes);
      })       
  .catch(err => {
    if (err)     { return res.status(500).json(err); }
    // return res.status(404).json(err);
});
});

module.exports = router;

