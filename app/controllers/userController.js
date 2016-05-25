'use strict';

var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var MessageService = require('../services/messageService.js');
var ResponseService = require('../services/responseService.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../configs/config.js');

exports.signUp = function(req, res) {
  var user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function saveSuccess(error, user) {
    ResponseService.handleResponse(error, user, res,
      function onSuccess() {
        ResponseService.resposeTokenOrUser(res, user);
      });
  });
};

exports.signIn = function(req, res) {
  var dbData = {
    email: req.body.email.toLowerCase()
  };
  UserModel.findOne(dbData, function findSuccess(err, user) {
    ResponseService.handleResponse(err, user, res,
      function onSuccess(userData) {
        // If user exist
        if (userData) {
          // If password is correct
          if (UserModel.authenticate(user, req.body.password)) {
            ResponseService.resposeTokenOrUser(res, user);
          } else {
            ResponseService.responseGeneric(res, 400,
              MessageService.users.userInvalidPassword);
          }
        } else {
          ResponseService.responseGeneric(res, 400,
              MessageService.users.userEmailNotFound);
        }

      },
      MessageService.users.userNotExist);
  });
};

exports.delete = function(req, res) {
  var userData = {
     _id: req.params.id
  };
  UserModel.remove(userData,
    function removeSuccess(error, result) {
      ResponseService.handleResponse(error, result, res,
        MessageService.users.userDeleted,
        MessageService.users.userIdInvalid);
  });
};

exports.update = function(req, res) {
  var userData = {
    firstName: req.body.firstName,
    email: req.body.email
  };
  var dbOptions = {
    runValidators: true
  };
  UserModel.findByIdAndUpdate(req.params.id, userData, dbOptions,
    function findSuccess(error, user) {
      ResponseService.handleResponse(error, user, res,
        MessageService.users.userUpdateOK,
        MessageService.users.userIdInvalid);
    });
};

exports.getUser = function(req, res) {
  UserModel.findById(req.params.id, function findSuccess(error, user) {
      ResponseService.handleResponse(error, user, res,
        function onSuccess() {
          return res
            .status(200)
            .send({
              user: user
            });
        },
        MessageService.users.userIdInvalid);
    });
};

exports.changePassword = function(req, res) {

};

exports.ensureAuthenticated = function(req, res, next) {
  //get token from client
  var token = req.headers.authorization ||
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'];
  if (!token) {
    ResponseService.responseGeneric(res, 403,
      MessageService.users.userUnauthorized);
  }
  try {
    //Decode token
    var payload = jwt.decode(token, config().tokenSecret);
    if (payload.exp <= moment().unix()) {
      ResponseService.responseGeneric(res, 401,
        MessageService.users.userTokenExpired);
    }
    //Assign 'payload.sub' (user id) to 'req' Object
    req.user = payload.sub;
    next();
  } catch (e) {
    ResponseService.responseGeneric(res, 500, e.message);
  }
};
