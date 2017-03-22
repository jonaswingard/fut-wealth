var express = require('express');
var jsdom = require('node-jsdom');
var Rising = require('../models/rising');
var auth = require ('./authentication');
var router = express.Router();

const jquery = 'http://code.jquery.com/jquery.js';
const url = 'https://www.futbin.com/market/';

router.get('/', function(req, res, next) {
  res.send('this is fut! or? no...');
});

router.post('/rising', auth.isAuthenticated, function(req, res, next) {
  jsdom.env(url,[jquery],
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

			Rising.save(items);

      res.send({
        message: items.length + ' items imported succesfully.',
        items: Rising.getAll()
      });
  	}
  );
});

module.exports = router;
