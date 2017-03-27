var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  }
}