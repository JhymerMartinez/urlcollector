'use strict';

var mongoose = require('./config/mongoose');
var	express = require('./config/express');


var db = mongoose();
var app = express();
app.listen(9000);

console.log("Aplicacion escuchando en puerto 9000");




module.exports = app;