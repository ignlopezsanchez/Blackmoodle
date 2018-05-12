const express = require('express');
const router = express.Router();
const Deadline = require('../../models/Deadline');
const Subject = require('../../models/Subject');
const _ = require('lodash')
const ensureLoggedIn = require('../../middlewares/ensureLoggedIn');
const uploadCloud = require("../../config/cloudinary.js");



//CREATE DEADLINE
router.post('/:id/deadlines', ensureLoggedIn('/api/login'), (req, res, next) => {    
  const newDeadline = new Deadline({
    _author: req.user._id,
    name: req.body.name,
    date: req.body.date
  });
  Subject
    .findByIdAndUpdate(req.params.id, { $push: { deadlines:  newDeadline } }, {new: true})
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

//EDIT DEADLINE
router.put('/deadlines/:id', ensureLoggedIn('/api/login'), (req, res, next) => {    
  let id = req.params.id;
  const update = {
    _author: req.user._id,
    name: req.body.name,
    date: req.body.date
  };
  const p = _.pickBy(update, _.identity)
  Deadline
    .findByIdAndUpdate(id, p, {new: true})
      .then((deadlines) =>{
        return res.status(200).json(deadlines);
      })       
  .catch(err => {
    if (err)     { return res.status(500).json(err); }
    // return res.status(404).json(err);
});
});


module.exports = router;

