var jsdom = require('node-jsdom');

const jquery = 'http://code.jquery.com/jquery.js',
	url = 'https://www.futbin.com/market/';



jsdom.env(url,[jquery],
	function (errors, window) {
		const $ = window.$;
		var rows = $('.row:eq(4) table:eq(0) tbody tr');

		//var row = rows.eq(0);
		//console.log(row.find('a').text());

		var items = rows.map(function () {
			var item = $(this);
			return {
				name: item.find('a').text(),
				price: item.find('td:eq(0)').children().remove().end().text().trim(),
				trend: item.find('td:last').text().replace(/\s+/g, '')
			};
		});


		console.log(items[1]);

		//rows.each(function (row) {
			//var name = $(row).find('a');
			//console.log(name);
		//});

	}
);

