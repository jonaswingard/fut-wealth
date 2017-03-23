var express = require('express');
var Trending = require('../models/trending');
var auth = require ('./authentication');
var router = express.Router();

router.get('/', auth.isAuthenticated, function(req, res, next) {
  res.send(Trending.getAll());
});

module.exports = router;
