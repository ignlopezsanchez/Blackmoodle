const Thread   = require('../models/Thread');

const threadAuthor = () => (req, res, next) => {
  let user = req.user;
  let idThread = req.params.idThread;
  Thread.findById(idThread).then(thread => {
    if (thread._author.toString() === req.user.id){
      console.log(`ACCESS GRANTED to user ${req.user.username}`);
      next()
    } 
    else {
      console.log(`ACCESS DENIED. You are not the author`);
      res.status(400).json({message:"You should edit the threads you have created"});
    }
  })     
};

module.exports = threadAuthor;