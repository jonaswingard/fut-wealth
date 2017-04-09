var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jsdom = require('node-jsdom');
const jquery = 'http://code.jquery.com/jquery.js';

var Trending = mongoose.model('Trending', new Schema({
    date: Date,
    items: [
	    {
	      title: String,
	      price: String,
				trend: String
	    }
    ]
}));

mongoose.Promise = global.Promise;

module.exports = {
  save: function (items) {
    var trending = new Trending({
      date: new Date(),
      items: items
    });

    return trending.save();
  },
  getAll: function (limit) {
    if (limit) {
      return Trending.find().sort({date: -1}).limit(limit);
    } else {
      return Trending.find().sort({date: -1});
    }
  },
  import: function () {
    return new Promise((resolve, reject) => {
      jsdom.env('https://www.futbin.com/market/',[jquery],
      	function (errors, window) {
      		const $ = window.$;
      		var rows = $('.row:eq(4) table:eq(0) tbody tr');

      		var items = rows.map(function () {
      			var item = $(this);
      			return {
      				title: item.find('a').text(),
      				price: item.find('td:eq(0)').children().remove().end().text().trim().replace(',',''),
      				trend: item.find('td:last').text().replace(/\s+/g, '')
      			};
      		}).toArray();

          resolve(items);
        }
      );
    });
  }
}
