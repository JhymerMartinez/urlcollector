'use strict';

var config = require('../../../app/config/config.js');
var mongoose = require('mongoose');

before(function (done) {

  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove();
    }
    return done();
  }

  clearDB();
});

after(function (done) {
  mongoose.disconnect();
  done();
});
