const User   = require('../models/User');
const Subject   = require('../models/Subject');

const isInCommonSubject = () => (req, res, next) => {
  let idUser = req.user.id;
  let idThread = req.params.idThread;
  let idSubject = req.params.idSubject;
  User.findById(idUser).then(user =>{
    if (user.subjects.indexOf(idSubject) === -1){
        console.log(`ACCESS DENIED. No subject in this user`);
        res.status(400).json({message:"No subject in this user"});
    }
    user.subjects.forEach(e => {
      if (e.toString() === idSubject){
        Subject.findById(idSubject).then((subjects) => {
          subjects.threads.forEach(d => {
            if (d.toString() === idThread){
              console.log(`ACCESS GRANTED to user ${req.user.username}`);
              next()
            }
            else {
              console.log(`ACCESS DENIED. No thread in this subject`);
              res.status(400).json({message:"No thread in this subject"});
            }
          })     
        })
      }
    })   
  })
};

module.exports = isInCommonSubject;