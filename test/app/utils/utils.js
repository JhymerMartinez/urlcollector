'use strict';

var config = require('../../../app/configs/config.js');
var mongoose = require('mongoose');
var _ = require('lodash');

beforeEach(function (done) {
  clearDB(done);
});

after(function (done) {
  mongoose.disconnect();
  done();
});

function clearDB(done) {
  _.forEach(mongoose.connection.collections, function(e, i){
    mongoose.connection.collections[e.name].remove();
  });
  return done();
}
