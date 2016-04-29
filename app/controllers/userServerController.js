'use strict';

var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var MessageService = require('../services/message.js');
var ResponseService = require('../services/response.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config/config.js');

exports.signUp = function(req, res) {
  var user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function saveSuccess(error, user) {
    if (error) {
      return res
        .send({
          message: ResponseService.getErrorMessage(error)
        });
    } else {
      ResponseService.resposeToken(res, user);
    }
  });
};

exports.signIn = function(req, res) {
  var data = {
    email: req.body.email.toLowerCase()
  };
  UserModel.findOne(data,
    function findSuccess(err, user) {
      if (err) {
        ResponseService.responseGeneric(res,
          500,
          MessageService.global.serverErrorUnknown);
      } else {
        if (!user) {
          ResponseService.responseGeneric(res,
            500,
            MessageService.users.userNotExist);
        } else {
          if (UserModel.authenticate(user, req.body.password)) {
            ResponseService.resposeToken(res, user);
          } else {
            ResponseService.responseGeneric(res,
              500,
              MessageService.users.userInvalidPassword);
          }
        }
      }
    });
};

exports.delete = function(req, res) {
  UserModel.remove({
    _id: req.body.id
  }, function(error) {
    ResponseService.handleError(error,
      MessageService.users.userDeleted,
      res);
  });
};

exports.update = function(req, res) {
  var userData = {
    firstName: req.body.firstName,
    email: req.body.email
  };
  var options = {
    runValidators: true
  };
  UserModel.findByIdAndUpdate(req.params.id,
    userData,
    options,
    function findSuccess(error, user) {
      ResponseService.handleError(error,
        MessageService.users.userUpdateOK,
        res);
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
    ResponseService.responseGeneric(res,
      403,
      MessageService.users.userUnauthorized);
  }
  try {
    //Decode token
    var payload = jwt.decode(token, config().tokenSecret);
    if (payload.exp <= moment().unix()) {
      ResponseService.responseGeneric(res,
        401,
        MessageService.users.userTokenExpired);
    }
    //Assign 'payload.sub' (user id) to 'req' Object
    req.user = payload.sub;
    next();
  } catch (e) {
    ResponseService.responseGeneric(res,
      500,
      e.message);
  }
};
