'use strict';

exports.message = function(req, res) {
  res.render('index', {
		title: 'UrlCollector',
    header: 'UrlCollector API',
    version: '0.1',
		status: 'Working'
	});
};
