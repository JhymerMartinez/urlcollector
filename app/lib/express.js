'use strict';

var express = require('express');
var router = express.Router();
var session = require('express-session');
var mongoose = require('mongoose');
var morgan = require('morgan');
var	compress = require('compression');
var cors = require('cors');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var	flash = require('connect-flash');
var path = require('path');
var config = require('../config/config');

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
  var index = require('../routes/indexRoute.js');
  var user = require('../routes/userRoute.js');
  var group = require('../routes/groupRoute.js');
  var link = require('../routes/linkRoute.js');

  app.use('/', index);
  app.use(config().baseApi + '/users', user);
  app.use(config().baseApi + '/groups', group);
  app.use(config().baseApi + '/links', link);

	process.on('uncaughtException', function(err) {
	  console.log(err);
	});

	return app;
};
