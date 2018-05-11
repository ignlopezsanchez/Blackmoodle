const express = require('express');
const router = express.Router();
const Thread = require('../../models/Thread');
const User = require('../../models/User');
const Degree = require('../../models/Degree');
const Subject = require('../../models/Subject');
const ensureLoggedIn = require('../../middlewares/ensureLoggedIn')




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

//CREATE THREAD
router.post('/:id', ensureLoggedIn('/api/login'), (req, res, next) => {    
  const newThread = new Thread({
    _author: req.user._id,
    title: req.body.title,
    content: req.body.content
  })
  Subject
    .findByIdAndUpdate(req.params.id, { $push: { threads:  newThread } }, {new: true})
      .then((subject) =>{
        newThread.save().then(() => {
          console.log(subject)
        return res.status(200).json(subject);
      })
        })
  .catch(err => {
    if (err)     { return res.status(500).json(err); }

    // return res.status(404).json(err);
})

  
});

module.exports = router;

