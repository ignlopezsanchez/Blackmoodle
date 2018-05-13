const Subject   = require('../models/Subject');

const isTeacher = () => (req, res, next) => {
  let idUser = req.user.id;
  let idSubject = req.params.idSubject;
  Subject.findById(idSubject).then(subjects => {
    if (subjects.teacher.indexOf(idUser) != -1){
      console.log(`ACCESS GRANTED to user ${req.user.username}`);
      next()
    }
  
    else {
      console.log(`ACCESS DENIED. Your are not teacher of this subject`);
      res.status(400).json({message:"Your are not teacher of this subject"});
    }
  })  
};


module.exports = isTeacher;