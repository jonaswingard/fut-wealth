var express = require('express');
var Trending = require('../models/trending');
var Fitness = require('../models/fitness');
var auth = require ('./authentication');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.send('this is fut! or? no...');
});

router.post('/trending', auth.isAuthenticated, (req, res, next) => {
  Trending.import().then(items => {
    Trending.save(items).then(() => {
      res.send('ok');
    });
  });
});

router.post('/fitness', auth.isAuthenticated, (req, res, next) => {
  Fitness.import().then(items => {
    Fitness.save(items).then(() => {
      res.send('ok');
    });
  });
});

module.exports = router;
