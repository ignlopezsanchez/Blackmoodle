const User   = require('../models/User');
const Subject   = require('../models/Subject');

const isInCommonSubject = () => (req, res, next) => {
  let idUser = req.user.id;
  let idThread = req.params.idThread;
  console.log("del params" + idThread)
  let idSubject = req.params.idSubject;
  User.findById(idUser).then(user =>{
    if (user.subjects.indexOf(idSubject) === -1){
        console.log(`ACCESS DENIED. No subject in this user`);
        res.status(400).json({message:"No subject in this user"});
    }
    return Promise.All(user.subjects.map(e => {
      if (e.toString() === idSubject){        
        Subject.findById(idSubject).then((subjects) => {
          return Promise.All(subjects.threads.map(d => {
            console.log("del array "  + d.toString());
            if (d.toString() === idThread){
              console.log(`ACCESS GRANTED to user ${req.user.username}`);
              next()
            }
            else {
              console.log("en el final " + d.toString());
              console.log("en el final 2  " + idThread);
              console.log(`ACCESS DENIED. No thread in this subject`);
            }
          })).then().catch(err => console.log(err))
        })
      }
    })).then().catch(err => console.log(err))   
  })
};

module.exports = isInCommonSubject;

