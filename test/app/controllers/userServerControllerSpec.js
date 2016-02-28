'use strict';

var request = require('supertest');
var async = require('async');
var mocks = require('../data/mocks.js');

var server;

before(function(){
  server = require('../../../app/server.js');
  request = request(server);
});
/*
describe('User Authentication', function() {
  it.only('Login OK', function(done) {
    async.waterfall([
      function sendUser(next) {
        request
          .post('/api/auth/login')
          .send(mocks.api.auth.login.user)
          .expect(200)
          .end(next);
      },
      function assertions(res) {
        var token = res.body.token;
        var result = token.split('.');
        expect(result[0]).to.equal(mocks.api.auth.login.token);
        done();
      }
    ], done);
  });
});
*/
