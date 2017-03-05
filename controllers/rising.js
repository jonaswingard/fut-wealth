var express = require('express');
var Rising = require('../models/rising');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send(Rising.getAll());
});

module.exports = router;
