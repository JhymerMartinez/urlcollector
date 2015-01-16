'use strict';

var mongoose = require('mongoose');

module.exports = function(){
	//conexion a bd
	var db = mongoose.connect('mongodb://localhost:27017/urlcollector'); 	
	db.connection.on('open', function () {
	  console.log('Conexion exitososa a mongodb');
	});
	db.connection.on('error', function (err) {
	  console.log('Mongoose error ' + err);
	});

	require('../app/models/userServerModel.js');
	return db;
};