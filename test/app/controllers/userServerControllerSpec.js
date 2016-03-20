'use strict';

var request = require('supertest');
var async = require('async');
var mocks = require('../data/mocks.js');
var MessageService = require('../../../app/services/messages.js');

var server;

before(function(){
  server = require('../../../app/server.js');
  request = request(server);
});

describe('User Authentication', function() {

  it('Register user valid', function(done) {
    async.waterfall([
      function sendUser(next){
        request
          .post('/api/user/signin')
          .send(mocks.api.auth.signin.userOK)
          .end(next);
      },
      function assertions(res){
          var body = res.body;
          expect(body.user.username).to.equal('test');
          expect(body.user.email).to.equal('test@urlcollector.com');
          done();
        }
    ],done);
  });

  it('Should be Email unique', function(done) {
    async.waterfall([
      function sendUser(next){
        request
          .post('/api/user/signin')
          .send(mocks.api.auth.signin.userPartialEmail)
          .end(next);
      },
      function assertions(res){
          var body = res.body;
          expect(body.message).to.equal(MessageService.Models.userEmailUnique);
          done();
        }
    ],done);
  });

  it('Should be Username unique', function(done) {
    async.waterfall([
      function sendUser(next){
        request
          .post('/api/user/signin')
          .send(mocks.api.auth.signin.userPartialUsername)
          .end(next);
      },
      function assertions(res){
          var body = res.body;
          expect(body.message).to.equal(MessageService.Models.userUsernameUnique);
          done();
        }
    ],done);
  });
/*
  it('Login user', function(done) {
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
  */
});
