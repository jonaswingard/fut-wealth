var express = require('express');
var Trending = require('../models/trending');
var auth = require ('./authentication');
var router = express.Router();

router.get('/', auth.isAuthenticated, (req, res, next) => {
  Trending.getAll().then(result => {
    res.send(result);
  });
});

router.get('/latest', auth.isAuthenticated, (req, res, next) => {
  Trending.getAll(1).then(result => {
    res.send(result);
  });
});

router.get('/clean', auth.isAuthenticated, (req, res, next) => {
  Trending.clean().then(result => {
    res.send(result);
  });
});

module.exports = router;
