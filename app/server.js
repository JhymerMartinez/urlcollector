(function() {

  'use strict';

  var mongoose = require('./lib/mongoose');
  var	express = require('./lib/express');
  //Loading config
  var config = require('./lib/config');

  var db = mongoose();
  var app = express();
  app.listen(config().serverPort, function() {
    console.log('Application listening on port 5000');
  });

  module.exports = app;

})();
