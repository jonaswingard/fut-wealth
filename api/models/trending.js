var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  getAll: function () {
    return Trending.find().sort({date: -1});
  }
}
