const express = require('express');
const router = express.Router();
const Deadline = require('../../models/Deadline');
const Note = require('../../models/Note');
const User = require('../../models/User');
const Degree = require('../../models/Degree');
const Subject = require('../../models/Subject');
const _ = require('lodash')
const ensureLoggedIn = require('../../middlewares/ensureLoggedIn');
const uploadCloud = require("../../config/cloudinary.js");





//RETRIEVE ONE SUBJECT PROFILE
router.get('/:id', ensureLoggedIn('/api/login'), (req, res, next) => {  
  Subject
    .findById(req.params.id)
    .populate('threads degree teacher')
    .then((err, thread) => {
      if (err)     { return res.status(500).json(err); }
      if (!thread) { return res.status(404).json(err); }

      return res.status(200).json(thread);
    });
});






module.exports = router;

