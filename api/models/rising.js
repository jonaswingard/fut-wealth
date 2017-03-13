var low = require('lowdb');
const db = low('db/fut.json');

db.defaults({ rising: { items: [] } })
	.write();

exports.save = function (items) {
  db.get('rising.items')
  .push({
    players: items,
    date: new Date()
  })
  .write();
};

exports.getAll = function () {
  return db.get('rising.items')
  .value();
};
