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
//var	passport = require('passport');

module.exports = function(){
	
	var app = express(); 

	app.use(morgan('dev')); 										// log every request to the console
	app.use(bodyParser.json()); 
	app.use(bodyParser.urlencoded({
		extended:true
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
	app.set('views','./app/views');
	app.set('view engine','ejs');

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


	require('../app/routes/indexServerRoutes.js')(app);
	require('../app/routes/userServerRoutes.js')(app);

	app.use(express.static('./public'));
	
	process.on('uncaughtException', function(err) {
	    console.log(err);
	});

	return app;
};