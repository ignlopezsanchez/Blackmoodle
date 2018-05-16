const express  = require('express');
const router   = express.Router();
const Thread   = require('../../models/Thread');
const User   = require('../../models/User');
const Subject   = require('../../models/Subject');
const Reply    = require('../../models/Reply');
const ensureLoggedIn = require('../../middlewares/ensureLoggedIn');
const ensureLoggedOut = require('../../middlewares/ensureLoggedOut');
const threadAuthor = require('../../middlewares/threadAuthor');
const replyAuthor = require('../../middlewares/replyAuthor');

const isInCommonSubject = require('../../middlewares/isInCommonSubject');
const hasSubject = require('../../middlewares/hasSubject');


const _ = require('lodash')



//CREATE THREAD
router.post('/:idSubject/new', [ensureLoggedIn(),hasSubject()], (req, res, next) => { 
  let idSubject = req.params.idSubject;    
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

//RETRIEVE ONE THREAD
router.get('/:idSubject/:idThread', [ensureLoggedIn(), isInCommonSubject()], (req, res, next) => {  
  let idThread = req.params.idThread;
  Thread
    .findById(idThread)
    .populate('_author')
    .populate({
      path: 'replies',
      model: 'Reply', 
        populate:{
          path: '_author', 
          model:'User'
        },

    }) 
    .exec( (err, thread) => {
      if (err)     { return res.status(500).json(err); }
      if (!thread) { return res.status(404).json(err); }
      return res.status(200).json(thread);
    });
});



//EDIT THREAD
router.put('/:idThread', [ensureLoggedIn(), threadAuthor()], (req, res, next) => {  
  let idThread = req.params.idThread;  

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
router.post('/:idSubject/:idThread/reply', [ensureLoggedIn(),hasSubject()], (req, res, next) => {    
  let idThread = req.params.idThread;
  const newReply = new Reply({
    _author: req.user._id,
    content: req.body.content
  });
  Thread
    .findByIdAndUpdate(idThread, { $push: { replies:  newReply } }, {new: true})
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

//EDIT REPLY
router.put('/replies/:idReply', [ensureLoggedIn(), replyAuthor()], (req, res, next) => { 
  console.log(req.body)   
  let idReply = req.params.idReply;
  const update = {
    _author: req.user._id,
    content: req.body.content
  };
  const p = _.pickBy(update, _.identity)

  Reply
    .findByIdAndUpdate(idReply, p, {new: true})
      .then((reply) =>{
        return res.status(200).json(reply);     
        })
  .catch(err => {
    if (err)     { return res.status(500).json(err); }
    return res.status(404).json(err);
})  
});




module.exports = router;