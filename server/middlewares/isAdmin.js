const isAdmin = () => (req,res,next) => {
  if(req.user && req.user.isAdmin){
    console.log(`ACCESS GRANTED to user ${req.user.username}`);
    next()
  }else{
    console.log(`ACCESS DENIED. Your are not admin`);
    res.status(400).json({message:"Your are not admin"});
  }
}

module.exports = isAdmin;