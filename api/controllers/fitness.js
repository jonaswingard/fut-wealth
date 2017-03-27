var express = require('express');
var Fitness = require('../models/fitness');
var auth = require ('./authentication');
var router = express.Router();

router.get('/', auth.isAuthenticated, function(req, res, next) {
  Fitness.getAll().then(function (result) {
    res.send(result);
  });
});

router.get('/latest', auth.isAuthenticated, function(req, res, next) {
  Fitness.getAll(1).then(function (result) {
    res.send(result);
  });
});

module.exports = router;
