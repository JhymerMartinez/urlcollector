'use strict';

var mongoose = require('./config/mongoose');
var	express = require('./config/express');
//var	passport = require('./config/passport');


var db = mongoose();
var app = express();
//var passport = passport();





app.listen(9000);

console.log("Aplicacion escuchando en puerto 9000");




module.exports = app;