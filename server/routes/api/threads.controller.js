const express  = require('express');
const router   = express.Router();
const Thread   = require('../../models/Thread');
const User   = require('../../models/User');

const Subject   = require('../../models/Subject');

const Reply    = require('../../models/Reply');
const ensureLoggedIn = require('../../middlewares/ensureLoggedIn')





//RETRIEVE ONE THREAD
router.get('/:id', (req, res, next) => {  
  Thread
    .findById(req.params.id)
    .populate('_author replies')
    .then( (err, thread) => {
      if (err)     { return res.status(500).json(err); }
      if (!thread) { return res.status(404).json(err); }

      return res.status(200).json(thread);
    });
});



//CREATE REPLIES
router.post('/:id/replies', (req, res, next) => {

  const newReply = new Reply({
    _author: req.user._id,
    content: req.body.content
  });

  Thread
    .findById(req.params.id)
    .populate('_author replies._author')
    .then((err, thread) => {
      console.log(thread)

      if (err)     { return res.status(500).json(err); }
      if (!thread) { return res.status(404).json(err); }

      thread.replies.push(newReply);

      thread.save().then((err) => {
        if (err)          { return res.status(500).json(err); }
        if (thread.errors){ return res.status(400).json(thread); }

        return res.status(200).json(thread);
      });
  });
});

module.exports = router;