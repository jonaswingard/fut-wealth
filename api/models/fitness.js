var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jsdom = require('node-jsdom');
const jquery = 'http://code.jquery.com/jquery.js';


var Fitness = mongoose.model('Fitness', new Schema({
    date: Date,
    items: [
      {
        title: String,
        price: Number
      }
    ]
}));

mongoose.Promise = global.Promise;

module.exports = {
  save: function (items) {
    var fitness = new Fitness({
      date: new Date(),
      items: items
    });

    return fitness.save();
  },
  getAll: function (limit) {
    if (limit) {
      return Fitness.find().sort({date: -1}).limit(limit);
    } else {
      return Fitness.find().sort({date: -1});
    }
  },
  import: function () {
    return new Promise((resolve, reject) => {
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

    			resolve(items);
      	}
      );
    });
  }
}
