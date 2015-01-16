'use strict';

var mongoose = require('mongoose');


var user = mongoose.Schema({
	name  : String,
	lastName: String,
	username : String,
	email   : String,
	password: String
});


module.exports =  mongoose.model('user',user);