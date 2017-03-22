var express = require('express');
var Rising = require('../models/rising');
var auth = require ('./authentication');
var router = express.Router();

router.get('/', auth.isAuthenticated, function(req, res, next) {
  res.send(Rising.getAll());
});

module.exports = router;
