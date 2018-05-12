const express = require('express');
const router = express.Router();
const Note = require('../../models/Note');
const Subject = require('../../models/Subject');
const _ = require('lodash')
const ensureLoggedIn = require('../../middlewares/ensureLoggedIn');
const uploadCloud = require("../../config/cloudinary.js");



//CREATE NOTE
router.post('/:id/new', [ensureLoggedIn('/api/login'),uploadCloud.single("file")], (req, res, next) => {    
  let idSubject = req.params.id;
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



//EDIT NOTE
router.put('/:id', ensureLoggedIn('/api/login'), (req, res, next) => {    
  let id = req.params.id;
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
  const p = _.pickBy(update, _.identity)
  Note
    .findByIdAndUpdate(id, p, {new: true})
      .then((notes) =>{
        return res.status(200).json(notes);
      })       
  .catch(err => {
    if (err)     { return res.status(500).json(err); }
    // return res.status(404).json(err);
});
});

module.exports = router;

