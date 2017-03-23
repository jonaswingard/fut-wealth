var express = require('express');
var jsdom = require('node-jsdom');
var Trending = require('../models/trending');
var Fitness = require('../models/fitness');
var auth = require ('./authentication');
var router = express.Router();

const jquery = 'http://code.jquery.com/jquery.js';

router.get('/', function(req, res, next) {
  res.send('this is fut! or? no...');
});

router.post('/trending', auth.isAuthenticated, function(req, res, next) {
  jsdom.env('https://www.futbin.com/market/',[jquery],
  	function (errors, window) {
  		const $ = window.$;
  		var rows = $('.row:eq(4) table:eq(0) tbody tr');

  		var items = rows.map(function () {
  			var item = $(this);
  			return {
  				name: item.find('a').text(),
  				price: item.find('td:eq(0)').children().remove().end().text().trim(),
  				trend: item.find('td:last').text().replace(/\s+/g, '')
  			};
  		}).toArray();

			Trending.save(items);

      res.send({
        message: items.length + ' items imported succesfully.',
        items: Trending.getAll()
      });
  	}
  );
});

router.get('/fitness', function(req, res, next) {
  jsdom.env('https://www.futbin.com/consumables/Fitness',[jquery],
  	function (errors, window) {
  		const $ = window.$;
  		var rows = $('.cons_list_header_ps4').parent().find('tbody tr');

  		var items = rows.map(function () {
  			var item = $(this);
  			return {
  				title: item.find('td:eq(0)').text().replace(/\s+/g, ''),
  				price: item.find('td:eq(1)').text().replace(/\s+/g, '')
  			};
  		}).toArray();

			Fitness.save(items).then(function () {
        // res.send({
        //   message: items.length + ' items imported succesfully.',
        //   items: Fitness.getAll()
        // });
        res.send('ok');
      });
  	}
  );
});

module.exports = router;
