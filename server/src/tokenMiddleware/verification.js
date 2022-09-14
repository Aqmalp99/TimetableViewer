const jwt = require('jsonwebtoken');


module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']; //Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({error:"Null token"});

  // second argument should be TOKEN_SECRET
  jwt.verify(token, "asdasda23424fcbakcdjbaca", (error, user) => {
    if (error) return res.status(403).json({error : error.message});
    req.user = user;
    next();
  });
}