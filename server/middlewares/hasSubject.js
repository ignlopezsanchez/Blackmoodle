
const hasSubject = () => (req, res, next) => {
  let user = req.user;
  let idSubject = req.params.idSubject;
      if (user.subjects.indexOf(idSubject) != -1){
        console.log(`ACCESS GRANTED to user ${req.user.username}`);
        next()
      }
    
      else {
        console.log(`ACCESS DENIED. No subject in this user`);
        res.status(400).json({message:"You should be in this subject"});
      }

};

module.exports = hasSubject;