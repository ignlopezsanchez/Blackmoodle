const express  = require('express');
const router   = express.Router();
const Thread   = require('../../models/Thread');
const User   = require('../../models/User');

const Subject   = require('../../models/Subject');

const Reply    = require('../../models/Reply');
const ensureLoggedIn = require('../../middlewares/ensureLoggedIn')





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


//CREATE REPLIES
router.post('/:id/replies', ensureLoggedIn('/api/login'), (req, res, next) => {    
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





module.exports = router;