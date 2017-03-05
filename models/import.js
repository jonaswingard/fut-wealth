var low = require('lowdb');
const db = low('fut.json')

db.defaults({ rising: { items: [] } })
	.write();

exports.saveRising = function (items) {
  console.log('saving using model');
  db.get('rising.items')
  .push({
    players: items,
    date: new Date()
  })
  .write();
};
