(function() {

	'use strict';

	var express = require('express');
	var session = require('express-session');
	var mongoose = require('mongoose'); 					// mongoose for mongodb
	var morgan = require('morgan');
	var	compress = require('compression');
	var cors = require('cors');
	var bodyParser = require('body-parser');
	var methodOverride = require('method-override');
	var	flash = require('connect-flash');
	var path = require('path');

  //Loading config
  var config = require('../config/config');

  //var	passport = require('passport');

	module.exports = function() {

		var app = express();

		app.use(morgan('dev')); 										// log every request to the console
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({
			extended: true
		}));
		app.use(cors()); 								// parse application/json
		//app.use(methodOverride());

		/*

		app.use(session({
			saveUninitialized:true,
			resave:true,
			secret:'developmentSessionSecret'
		}));

		 */
		//app.set('views', path.join(__dirname, '../', 'views'));
		//app.set('view engine', config().views.engine);

	/*
		app.use(function(req, res, next) {
	    	res.setHeader('Access-Control-Allow-Origin', '*');
	    	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	    	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	    	next();
		});
	*/
		//app.use(flash());
		//app.use(passport.initialize());
		//app.use(passport.session());

		//load app routes
		require('../routes/indexServerRoutes.js')(app);
		require('../routes/userServerRoutes.js')(app);
		require('../routes/linkServerRoutes.js')(app);

		//app.use(express.static(path.join(__dirname, '../../', 'public')));

		process.on('uncaughtException', function(err) {
		  console.log(err);
		});

		return app;
	};

})();
