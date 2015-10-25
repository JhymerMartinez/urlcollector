(function() {

  'use strict';

  var mongoose = require('./config/mongoose');
  var	express = require('./config/express');
  //var	passport = require('./config/passport');

  var db = mongoose();
  var app = express();
  //var passport = passport();
  app.listen(8000, function() {
    console.log('Application listening on port 8000');
  });

  module.exports = app;

})();
