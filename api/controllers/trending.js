var express = require('express');
var Trending = require('../models/trending');
var auth = require ('./authentication');
var router = express.Router();

router.get('/', auth.isAuthenticated, function(req, res, next) {
  Trending.getAll().then(function (result) {
    res.send(result);
  })

});

module.exports = router;
