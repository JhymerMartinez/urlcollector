'use strict';

var mongoose = require('./libs/mongoose');
var express = require('./libs/express');
//Loading config
var config = require('./configs/config');

var db = mongoose();
var app = express();
var port = process.env.PORT ?
  process.env.PORT : config().serverPort;
app.listen(port, function() {
  console.log('Application listening on port: ', port);
});

module.exports = app;
