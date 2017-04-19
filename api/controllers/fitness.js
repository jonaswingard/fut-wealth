var express = require('express');
var Fitness = require('../models/fitness');
var auth = require ('./authentication');
var router = express.Router();

router.get('/', auth.isAuthenticated, (req, res, next) => {
  Fitness.getAll().then(result => {
    res.send(result);
  });
});

router.get('/latest', auth.isAuthenticated, (req, res, next) => {
  Fitness.getAll(1).then(result => {
    res.send(result);
  });
});

module.exports = router;
