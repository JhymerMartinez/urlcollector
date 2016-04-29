'use strict';

var request = require('supertest');
var async = require('async');
var data = require('../data/data.js');
var utils = require('../utils/utils.js');
var MessageService = require('../../../app/services/message.js');

var server;

before(function() {
  server = require('../../../app/server.js');
  request = request(server);
});

describe('Create user', function() {

  it('User valid', function(done) {
    async.waterfall([
      function sendUser(next) {
        request
          .post('/api/users/sign_up')
          .send(data.api.users.signup.userOK)
          .end(next);
      },
      function assertions(res) {
        var body = res.body;
        expect(body.token).to.exist;
        expect(body.token.split('.')[0]).to.equal(data.api.users.signin.token);
        expect(body.user.id).to.exist;
        expect(body.user.email).to.equal(data.api.users.signup.userOK.email);
        expect(body.user.name).to.equal(data.api.users.signup.userOK.name);
        expect(body.user.email).to.equal(data.api.users.signup.userOK.email);
        done();
      }
    ], done);
  });

  it('Validate Name field blank', function(done) {
    async.waterfall([
      function sendUser(next) {
        request
          .post('/api/users/sign_up')
          .send(data.api.users.signup.userBlankVName)
          .end(next);
      },
      function assertions(res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(MessageService.users.userNameRequired);
        done();
      }
    ], done);
  });

  it('Validate Name field null', function(done) {
    async.waterfall([
      function sendUser(next) {
        request
          .post('/api/users/sign_up')
          .send(data.api.users.signup.userNullName)
          .end(next);
      },
      function assertions(res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(MessageService.users.userNameRequired);
        done();
      }
    ], done);
  });

  it('Validate Email field blank', function(done) {
    async.waterfall([
      function sendUser(next) {
        request
          .post('/api/users/sign_up')
          .send(data.api.users.signup.userBlankEmail)
          .end(next);
      },
      function assertions(res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(MessageService.users.userEmailRequired);
        done();
      }
    ], done);
  });

  it('Validate Email field null', function(done) {
    async.waterfall([
      function sendUser(next) {
        request
          .post('/api/users/sign_up')
          .send(data.api.users.signup.userNullEmail)
          .end(next);
      },
      function assertions(res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(MessageService.users.userEmailRequired);
        done();
      }
    ], done);
  });

  it('Validate email exists', function(done) {
    async.waterfall([
      function sendUser(next) {
        request
          .post('/api/users/sign_up')
          .send(data.api.users.signup.userOK)
          .end(next);
      },
      function sendUser2(res, next) {
        request
          .post('/api/users/sign_up')
          .send(data.api.users.signup.userOK)
          .end(next);
      },
      function assertions(res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(MessageService.users.userEmailUnique);
        done();
      }
    ], done);
  });

  it('Validate email invalid', function(done) {
    async.waterfall([
      function sendUser(next) {
        request
          .post('/api/users/sign_up')
          .send(data.api.users.signup.userInvalidEmail)
          .end(next);
      },
      function assertions(res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(MessageService.users.userEmailInvalid);
        done();
      }
    ], done);
  });

  it('Validate Password field blank', function(done) {
    async.waterfall([
      function sendUser(next) {
        request
          .post('/api/users/sign_up')
          .send(data.api.users.signup.userBlankPass)
          .end(next);
      },
      function assertions(res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(MessageService.users.userPasswordRequired);
        done();
      }
    ], done);
  });

  it('Validate Password field null', function(done) {
    async.waterfall([
      function sendUser(next) {
        request
          .post('/api/users/sign_up')
          .send(data.api.users.signup.userNullPass)
          .end(next);
      },
      function assertions(res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(MessageService.users.userPasswordRequired);
        done();
      }
    ], done);
  });

  it('Validate Password length', function(done) {
    async.waterfall([
      function sendUser(next) {
        request
          .post('/api/users/sign_up')
          .send(data.api.users.signup.userShortPass)
          .end(next);
      },
      function assertions(res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(MessageService.users.userPasswordLength);
        done();
      }
    ], done);
  });

  it('Login user', function(done) {
    async.waterfall([
      function registerUser(next) {
        request
          .post('/api/users/sign_up')
          .send(data.api.users.signup.userOK)
          .end(next);
      },
      function sendUser(res, next) {
        request
          .post('/api/users/sign_in')
          .send(data.api.users.signin.user)
          .end(next);
      },
      function assertions(res) {
        var body = res.body;
        expect(body.token).to.exist;
        expect(body.token.split('.')[0]).to.equal(data.api.users.signin.token);
        expect(body.user.id).to.exist;
        expect(body.user.email).to.equal(data.api.users.signup.userOK.email);
        expect(body.user.name).to.equal(data.api.users.signup.userOK.name);
        expect(body.user.email).to.equal(data.api.users.signup.userOK.email);
        done();
      }
    ], done);
  });

});


describe('Update user info', function() {

  it('Change name', function(done) {
    async.waterfall([
      function registerUser(next) {
        request
          .post('/api/users/sign_up')
          .send(data.api.users.signup.userOK)
          .end(next);
      },
      function updateInfo(res, next) {
        var user = res.body.user;
        request
          .put('/api/users/update/' + user.id)
          .set('Authorization', res.body.token)
          .send(data.api.users.update.userUpdated)
          .end(next);
      },
      function assertions(res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(MessageService.users.userUpdateOK);
        done();
      }
    ], done);
  });

});
