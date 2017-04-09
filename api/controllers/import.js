var express = require('express');
var Trending = require('../models/trending');
var Fitness = require('../models/fitness');
var auth = require ('./authentication');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('this is fut! or? no...');
});

router.post('/trending', auth.isAuthenticated, function(req, res, next) {
  Trending.import().then(function (items) {
    Trending.save(items).then(function () {
      res.send('ok');
    });
  });
});

router.post('/fitness', auth.isAuthenticated, function(req, res, next) {
  Fitness.import().then(function (items) {
    Fitness.save(items).then(function () {
      res.send('ok');
    });
  });
});

module.exports = router;
