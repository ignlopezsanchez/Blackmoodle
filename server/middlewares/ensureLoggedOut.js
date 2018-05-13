const ensureLoggedOut = () => {
  return (req, res, next) => {
    if (!req.user) {
      console.log(`ACCESS GRANTED, no user.`);
      next();
    } else {
      console.log(`ACCESS DENIED. User is logged in, redirect!`);
      res.status(400).json({message:"You You should logout first"});    }
  };
};

module.exports = ensureLoggedOut;