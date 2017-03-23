var low = require('lowdb');
const db = low('db/fut.json');

db.defaults({ trending: { items: [] } })
	.write();

exports.save = function (items) {
  db.get('trending.items')
  .push({
    players: items,
    date: new Date()
  })
  .write();
};

exports.getAll = function () {
  return db.get('trending.items')
		.sortBy('date')
		.reverse()
  	.value();
};

exports.foobar = function () {
	console.log('foobar');
}
