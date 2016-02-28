(function() {

  'use strict';

  var mongoose = require('./lib/mongoose');
  var express = require('./lib/express');
  //Loading config
  var config = require('./config/config');

  var db = mongoose();
  var app = express();
  var port = process.env.NODE_PORT ?
    process.env.NODE_PORT : config().serverPort;
  app.listen(port, function() {
    console.log('Application listening on port: ', port);
  });

  module.exports = app;

})();
