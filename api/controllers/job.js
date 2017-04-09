var express = require('express');
var auth = require ('./authentication');
var router = express.Router();
var CronJob = require('cron').CronJob;
var Trending = require('../models/trending');
var Fitness = require('../models/fitness');

var job = new CronJob({
  cronTime: '00 05 * * * *',
  onTick: function() {
    Trending.import().then(function (items) {
      Trending.save(items);
    });

    Fitness.import().then(function (items) {
      Fitness.save(items);
    });
  },
  start: false,
});

router.get('/', auth.isAuthenticated, function(req, res, next) {
  var isRunning = typeof job.running !== 'undefined' && job.running;
  res.send('Job running: ' + isRunning );
});

router.get('/start', auth.isAuthenticated, function(req, res, next) {
  job.start()
  res.send('job successfully started');
});

router.get('/stop', auth.isAuthenticated, function(req, res, next) {
  job.stop()
  res.send('job successfully stopped');
});

module.exports = router;
