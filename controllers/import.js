var express = require('express');
var jsdom = require('node-jsdom');
var Import = require('../models/import');
var router = express.Router();

const jquery = 'http://code.jquery.com/jquery.js';
const url = 'https://www.futbin.com/market/';

router.get('/', function(req, res, next) {
  res.send('this is fut! or? no...');
});

router.get('/rising', function(req, res, next) {
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

			Import.saveRising(items);

      res.send({ message: 'Items imported succesfully.' });
  	}
  );
});

module.exports = router;
