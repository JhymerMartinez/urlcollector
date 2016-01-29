(function() {

  'use strict';

  var mongoose = require('./lib/mongoose');
  var	express = require('./lib/express');
  //Loading config
  var config = require('./config/config');

  var db = mongoose();
  var app = express();
  app.listen(process.env.PORT || config().serverPort, function() {
    console.log('Application listening on port: ',
      process.env.PORT || config().serverPort);
  });

  module.exports = app;

})();
