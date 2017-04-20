var passport = require('passport');

exports.isAuthenticated = function (req, res, next) {
  return next();
  if (req.isAuthenticated()) {
    return next();
  }
  res.send(401);
};
