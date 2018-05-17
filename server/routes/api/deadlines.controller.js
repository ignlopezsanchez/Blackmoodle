const express = require('express');
const router = express.Router();
const Deadline = require('../../models/Deadline');
const Subject = require('../../models/Subject');
const _ = require('lodash')
const ensureLoggedIn = require('../../middlewares/ensureLoggedIn');
const ensureLoggedOut = require('../../middlewares/ensureLoggedOut');
const isTeacher = require('../../middlewares/isTeacher');
const uploadCloud = require("../../config/cloudinary.js");



//CREATE DEADLINE
router.post('/:idSubject/new', [ensureLoggedIn(), isTeacher()], (req, res, next) => {  
  let idSubject = req.params.idSubject;  
  const newDeadline = new Deadline({
    _author: req.user._id,
    name: req.body.name,
    date: req.body.date
  });
  Subject
    .findByIdAndUpdate(idSubject, { $push: { deadlines:  newDeadline } }, {new: true})
    .populate('deadlines')
      .then((subject) =>{
        newDeadline.save().then(() => {
        return res.status(200).json(subject);
      })
        })
  .catch(err => {
    if (err)     { return res.status(500).json(err); }

    // return res.status(404).json(err);
});
});

//DELETE DEADLINE
router.delete('/:idSubject/:idDeadline', [ensureLoggedIn(), isTeacher()], (req, res, next) => { 
  let idSubject = req.params.idSubject;
  let idDeadline = req.params.idDeadline;
  Subject.findByIdAndUpdate(idSubject, { $pull: { deadlines:  idDeadline } }).then(subject => {
    Deadline
    .findByIdAndRemove(idDeadline)
      .then((deadlines) =>{
        return res.status(200).json(deadlines);
      }) 

  })     
  .catch(err => {
    if (err)     { return res.status(500).json(err); }
    // return res.status(404).json(err);
});
});


//EDIT DEADLINE
router.put('/:idSubject/:idDeadline', [ensureLoggedIn(), isTeacher()], (req, res, next) => {    
  let idDeadline = req.params.idDeadline;
  const update = {
    _author: req.user._id,
    name: req.body.name,
    date: req.body.date
  };
  const p = _.pickBy(update, _.identity)
  Deadline
    .findByIdAndUpdate(idDeadline, p, {new: true})
      .then((deadlines) =>{
        return res.status(200).json(deadlines);
      })       
  .catch(err => {
    if (err)     { return res.status(500).json(err); }
    // return res.status(404).json(err);
});
});


module.exports = router;

