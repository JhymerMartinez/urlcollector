'use strict';

var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var config = require('../configs/config');
var favicon = require('serve-favicon');

module.exports = function() {

	var app = express();

  // Force use SSL
  var FORCE_HTTPS = process.env.FORCE_HTTPS === 'true' ? true : false;
  if (FORCE_HTTPS) {
    var enforce = require('express-sslify');
    app.use(enforce.HTTPS({trustProtoHeader: true}));
  }
	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(cors());
  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  app.use(express.static('../public'));
  app.use(favicon(path.join(__dirname, '..', '..',
    'public', 'images', 'favicon.ico')));

  // Apidocs
  app.use('/apidoc', express.static(path.join(__dirname, '../..', 'apidoc')));

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
