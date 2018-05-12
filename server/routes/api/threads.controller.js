const express  = require('express');
const router   = express.Router();
const Thread   = require('../../models/Thread');
const User   = require('../../models/User');
const Subject   = require('../../models/Subject');
const Reply    = require('../../models/Reply');
const ensureLoggedIn = require('../../middlewares/ensureLoggedIn');
const _ = require('lodash')





//RETRIEVE ONE THREAD
router.get('/:id', ensureLoggedIn('/api/login'), (req, res, next) => {  
  Thread
    .findById(req.params.id)
    .populate('_author replies')
    .then( (err, thread) => {
      if (err)     { return res.status(500).json(err); }
      if (!thread) { return res.status(404).json(err); }

      return res.status(200).json(thread);
    });
});

//CREATE THREAD
router.post('/:id/new', ensureLoggedIn('/api/login'), (req, res, next) => {
  let idSubject = req.params.id;    
  const newThread = new Thread({
    _author: req.user._id,
    title: req.body.title,
    content: req.body.content
  })
  Subject
    .findByIdAndUpdate(idSubject, { $push: { threads:  newThread } }, {new: true})
      .then((subject) =>{
        newThread.save().then((thread) => {
          console.log(thread)
        return res.status(200).json(thread);
      })
        })
  .catch(err => {
    if (err)     { return res.status(500).json(err); }

    // return res.status(404).json(err);
}) 
});


//EDIT THREAD
router.put('/:id', ensureLoggedIn('/api/login'), (req, res, next) => {  
  let idThread = req.params.id;  

  const update = {
    _author: req.user._id,
    title: req.body.title,
    content: req.body.content
  }
  const p = _.pickBy(update, _.identity)

  Thread
    .findByIdAndUpdate(idThread, p, {new: true})
      .then((thread) =>{
        return res.status(200).json(thread);
        })
  .catch(err => {
    if (err)     { return res.status(500).json(err); }

    // return res.status(404).json(err);
}) 
});


//CREATE REPLY
router.post('/:id/reply', ensureLoggedIn('/api/login'), (req, res, next) => {    
  const newReply = new Reply({
    _author: req.user._id,
    content: req.body.content
  });
  Thread
    .findByIdAndUpdate(req.params.id, { $push: { replies:  newReply } }, {new: true})
      .then((thread) =>{
        newReply.save().then(() => {
          console.log(thread)
        return res.status(200).json(thread);
      })
        })
  .catch(err => {
    if (err)     { return res.status(500).json(err); }
    return res.status(404).json(err);
})  
});

//EDITE REPLY
router.put('/replies/:id', ensureLoggedIn('/api/login'), (req, res, next) => {    
  let id = req.params.id;
  const update = {
    _author: req.user._id,
    content: req.body.content
  };
  const p = _.pickBy(update, _.identity)

  Reply
    .findByIdAndUpdate(id, p, {new: true})
      .then((reply) =>{
        return res.status(200).json(reply);     
        })
  .catch(err => {
    if (err)     { return res.status(500).json(err); }
    return res.status(404).json(err);
})  
});




module.exports = router;