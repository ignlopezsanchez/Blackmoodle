const express = require('express');
const router = express.Router();
const Deadline = require('../../models/Deadline');
const Note = require('../../models/Note');
const User = require('../../models/User');
const Degree = require('../../models/Degree');
const Subject = require('../../models/Subject');
const _ = require('lodash')
const ensureLoggedIn = require('../../middlewares/ensureLoggedIn');
const ensureLoggedOut = require('../../middlewares/ensureLoggedOut');
const hasSubject = require('../../middlewares/hasSubject')
const uploadCloud = require("../../config/cloudinary.js");



//RETRIEVE ALL SUBJECTS. QUITO EL INSURELOGGEDIN PORQUE ES LLAMADA EN EL PROCESO DE REGISTRO DEL USUARIO.
router.get('/', (req, res, next) => {  
  Subject
    .find({})
    .populate('degree')
    .then(subjects => {
      // if (!subjects) { return res.status(404).json(err); }
      return res.status(200).json(subjects);
    })
    .catch(err =>{
      if (err)     { return res.status(500).json(err); }

    })
});


//RETRIEVE ONE SUBJECT PROFILE
router.get('/:idSubject', [ensureLoggedIn(), hasSubject()], (req, res, next) => {  
  let idSubject = req.params.idSubject;
  Subject
    .findById(idSubject)
    .populate('threads degree teacher')
    .then(subject => {
      // if (!subject) { return res.status(404).json(err); }

      return res.status(200).json(subject);
    })
    .catch(err =>{
      if (err) { return res.status(500).json(err); }
    })
});

//LEAVE ONE SUBJECT
router.post('/:idSubject', [ensureLoggedIn(), hasSubject()], (req, res, next) => { 
  let idSubject = req.params.idSubject; 
  User
    .findById(req.user.id)
    .then(user => {
      console.log(user.subjects);
      user.subjects.forEach((e, i) => {
        if (e.toString() === idSubject){
          user.subjects.splice(i, 1)
        }
        user.save();
      });      
      return res.status(200).json(user);
    })
    .catch(err =>{
      if (err)     { return res.status(500).json(err); }
    })
});

module.exports = router;