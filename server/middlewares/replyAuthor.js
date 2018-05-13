const Reply   = require('../models/Reply');

const replyAuthor = () => (req, res, next) => {
  let user = req.user;
  let idReply = req.params.idReply;
  Reply.findById(idReply).then(reply => {
    if (reply._author.toString() === req.user.id){
      console.log(`ACCESS GRANTED to user ${req.user.username}`);
      next()
    } 
    else {
      console.log(`ACCESS DENIED. You are not the author`);
      res.status(400).json({message:"You should edit the reply you have created"});
    }
  })     
};

module.exports = replyAuthor;