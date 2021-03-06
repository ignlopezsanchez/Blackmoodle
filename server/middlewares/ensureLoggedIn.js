const ensureLoggedIn = () => (req, res, next) => {
  if (req.user) {
    console.log(`ACCESS GRANTED to user ${req.user.username}`);
    next();
  } else {
    console.log(`ACCESS DENIED. No user, redirect!`);
    res.status(400).json({message:"You should loggin first"});
  }
};

module.exports = ensureLoggedIn;