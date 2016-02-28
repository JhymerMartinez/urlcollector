(function() {

	'use strict';

	var express = require('express');
	var session = require('express-session');
	var mongoose = require('mongoose');
	var morgan = require('morgan');
	var	compress = require('compression');
	var cors = require('cors');
	var bodyParser = require('body-parser');
	var methodOverride = require('method-override');
	var	flash = require('connect-flash');
	var path = require('path');

  //var	passport = require('passport');

	module.exports = function() {

		var app = express();

		app.use(morgan('dev'));
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({
			extended: true
		}));
		app.use(cors());

		//load app routes
		require('../routes/indexServerRoutes.js')(app);
		require('../routes/userServerRoutes.js')(app);
		require('../routes/linkServerRoutes.js')(app);
    require('../routes/groupServerRoutes.js')(app);

		process.on('uncaughtException', function(err) {
		  console.log(err);
		});

		return app;
	};

})();
