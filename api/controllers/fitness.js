var express = require('express');
var Fitness = require('../models/fitness');
var auth = require ('./authentication');
var router = express.Router();

router.get('/', function(req, res, next) {
  Fitness.getAll().then(function (result) {
    res.send(result);
  });
});

module.exports = router;
