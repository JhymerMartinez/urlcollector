'use strict';

var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose'); 					// mongoose for mongodb
var morgan = require('morgan'); 	
var	compress = require('compression');		
var bodyParser = require('body-parser'); 	
var methodOverride = require('method-override');
var	flash = require('connect-flash');
var	passport = require('passport');

module.exports = function(){
	
	var app = express(); 

	app.use(morgan('dev')); 										// log every request to the console
	app.use(bodyParser.urlencoded({
		extended:true
	})); 
	app.use(bodyParser.json()); 									// parse application/json
	app.use(methodOverride());
	app.use(session({
		saveUninitialized:true,
		resave:true,
		secret:'developmentSessionSecret'
	}));
	app.set('views','./app/views');
	app.set('view engine','ejs');
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	require('../app/routes/userServerRoutes.js')(app);
	require('../app/routes/indexServerRoutes.js')(app);

	app.use(express.static('./public'));

	return app;
};