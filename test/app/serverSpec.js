'use strict';

var request = require('supertest');
var async = require('async');
var mocks = require('./data/mocks.js');
var utils = require('./utils/utils.js');//important

var server;

before(function(){
  server = require('../../app/server.js');
  request = request(server);
});

describe('Start server', function() {
  it.only('Should exist', function (done) {
    expect(server).to.exist;
    done();
   });
});
