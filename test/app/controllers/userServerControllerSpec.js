'use strict';

var request = require('supertest');
var async = require('async');
var mocks = require('../data/mocks.js');

var server;

before(function(){
  server = require('../../../app/server.js');
  request = request(server);
});

describe('User Authentication', function() {

  it('Create user', function(done) {
    async.waterfall([
      function sendUser(next){
        request
          .post('/api/auth/signin')
          .send(mocks.api.auth.signin.user)
          .end(next);
      },
      function assertions(res){
          var body = res.body;
          expect(body.user.username).to.equal('jhymermartinez');
          expect(body.user.email).to.equal('jh_martinez_1991@outlook.com');
          done();
        }
    ],done);
  });
});
