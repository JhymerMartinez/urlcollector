(function() {

  'use strict';

  var mongoose = require('./lib/mongoose');
  var	express = require('./lib/express');
  //Loading config
  var config = require('./lib/config');
  //var	passport = require('./config/passport');

  var db = mongoose();
  var app = express();
  //var passport = passport();
  app.listen(config().serverPort, function() {
    console.log('Application listening on port 8000');
  });

  module.exports = app;

})();
