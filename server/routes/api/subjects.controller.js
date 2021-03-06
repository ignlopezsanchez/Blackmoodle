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
const hasSubject = require('../../middlewares/hasSubject');
const isAdmin = require('../../middlewares/isAdmin');
const uploadCloud = require("../../config/cloudinary.js");

//RETRIEVE ALL DEGREES
router.get('/degrees', (req, res, next) => {  
  Degree
    .find({})
    .then(degrees => {
      return res.status(200).json(degrees);
    })
    .catch(err =>{
      if (err)     { return res.status(500).json(err); }

    })
});

//RETRIEVE ALL SUBJECTS. QUITO EL INSURELOGGEDIN PORQUE ES LLAMADA EN EL PROCESO DE REGISTRO DEL USUARIO.
router.get('/', (req, res, next) => {  
  Subject
    .find({})
    .select({
      'degree': 1,
      'name': 1,
      'course': 1
    })
    .populate('degree', 'name')
    .then(subjects => {
      // if (!subjects) { return res.status(404).json(err); }
      return res.status(200).json(subjects);
    })
    .catch(err =>{
      if (err)     { return res.status(500).json(err); }

    })
});
//CREATE ONE SUBJECT
router.post('/new', [ensureLoggedIn(), isAdmin()], (req, res, next) => { 

Degree.findOne({ 'name': req.body.degree }).then(degree => {
  let idDegree = degree.id;
  const newSubject = new Subject({
    name: req.body.name,
    degree: idDegree,
    course: req.body.course,
    notes: [],
    teacher: [],
    threads: [],
    deadlines: [], 
  });
  newSubject.save().then((subject) => {
    return res.status(200).json(subject);
  })
})
  
  
});

//RETRIEVE ONE SUBJECT PROFILE
router.get('/:idSubject', [ensureLoggedIn(), hasSubject()], (req, res, next) => {  
  let idSubject = req.params.idSubject;
  Subject
    .findById(idSubject)
    .populate('degree teacher deadlines')
    .populate({
      path: 'threads',
      model: 'Thread', 
        populate:[{
          path: '_author', 
          model:'User'
        },
        {
          path: 'replies', 
          model:'Reply'
        }],

    })
    .populate({
      path: 'notes',
      model: 'Note', 
        populate:[{
          path: '_author', 
          model:'User'
        }],

    })
    .then(subject => {
      subject.threads.sort((a, b) => {
        return b.updated_at - a.updated_at
      })
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
