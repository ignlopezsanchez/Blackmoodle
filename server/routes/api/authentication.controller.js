const express = require('express');
const router  = express.Router();
const User = require('../../models/User');
const Subject = require('../../models/Subject');

const _ = require('lodash')

const bcryptSalt = 10;
const bcrypt = require('bcrypt');
const ensureLoggedIn = require('../../middlewares/ensureLoggedIn');
const ensureLoggedOut = require('../../middlewares/ensureLoggedOut')

const uploadCloud = require("../../config/cloudinary.js");


const logInPromise = (user, req) => new Promise((resolve,reject) => {
    req.login(user, (err) => {
        if (err) return reject('Something went wrong');
        resolve(user);
      });
});  


/* GET home page */
router.post('/signup', [uploadCloud.single("file"), ensureLoggedOut()], (req, res, next) => {
    const {username, email, password, subjects, birthDate, isTeacher} = req.body;
    console.log(req.body)
        if (req.file){
            photo = req.file.url
        }
        else {
            photo = "http://res.cloudinary.com/ignlopezsanchez/image/upload/v1525951910/Project2/1525951909994.jpg";
        }
    if (!username || !password) {
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }
  
    User.findOne({ username })
    .then( user => {
        if(user) throw new Error('The username already exists');
        
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        const theUser = new User({
          username,
          password: hashPass,
          email,
          subjects,
          photo,
          birthDate,
          isTeacher
        });
        if (theUser.isTeacher) { return theUser.save().then( user => {
            return Promise.all( user.subjects.map(e => {
                Subject.findByIdAndUpdate(e.toString(), {$push: { teacher: user._id}} , {new:true}).then()
            })).then(() => logInPromise(user,req))
            
        })}
        else {
            theUser.save().then(user => {
                logInPromise(user,req)})
        }
    })
    .then(user => res.status(200).json(user))
    .catch(e => res.status(500).json({message:e.message}));
});

router.post('/login', ensureLoggedOut(), (req, res, next) => {
    const {username, password} = req.body;
  
    if (!username || !password) {
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }

    User.findOne({ username })
    .then( user => {
        if(!user) throw new Error('The username does not exist');
        if(!bcrypt.compareSync(password, user.password)) throw new Error('The password is not correct');
        return logInPromise(user,req);    
    })
    .then(user => res.status(200).json(user))
    .catch(e => res.status(500).json({message:e.message}));

});


router.get('/loggedin', (req, res) => {
    if(req.user){
        return res.status(200).json(req.user);
    }else{
        return res.status(400).json({message:"You should loggin first"});
    }
});

router.get('/logout', ensureLoggedIn(), (req, res) => {
    if(req.user){
        req.logout();
        return res.status(200).json({message:"User logged out"});
    }else{
        return res.status(400).json({message:"You should loggin first"});
    }
});

// Retrive PERSONAL PROFILE
router.get("/profile", ensureLoggedIn(), (req, res) => {
  
    let idUser = req.user.id;
    User.findById(idUser)
      .populate({
          path: 'subjects',
          model: 'Subject', 
          populate:{
              path: 'degree', 
              model:'Degree'
            }
        })  
      .then(object => res.json(object))
      .catch(e => next(e));
  });
  
  //CRUD --- edit profile
router.put("/profile", [uploadCloud.single("file"), ensureLoggedIn()] ,(req, res) => {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    let id = req.user.id;
    const {username, email, password, subjects, birthDate} = req.body;
    const hashPass = bcrypt.hashSync(password, salt);
    if (req.file){
        var photo = req.file.url;
        var editUser = {username, email, password: hashPass, photo, birthDate};
    }
    else{
        var editUser = {username, email, password: hashPass, birthDate, subjects};
        }
      
    
    User.findByIdAndUpdate(id, editUser,{ new: true })
    .then(object => res.json(object))
      .catch(e => next(e));
    });
module.exports = router;








  