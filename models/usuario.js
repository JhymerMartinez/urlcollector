'use strict';

var mongoose = require('mongoose');


var usuario = mongoose.Schema({
	nombre  : String,
	apellido: String,
	usuario : String,
	email   : String,
	contrasenia: String
});


module.exports =  mongoose.model('usuario',usuario);