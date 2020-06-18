const jwt = require('jsonwebtoken');
const hidden = require('./var');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = hidden.jwtSecret;

  if(token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ error: "Access Denied" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    })
  } else {
    res.status(403).json({ message: "You shall not pass!" });
  }
};