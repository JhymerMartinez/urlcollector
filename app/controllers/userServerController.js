'use strict';

var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var MessageService = require('../services/messages.js');
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
  user.save(function(error, user) {
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
  UserModel.findOne({
      email: req.body.email.toLowerCase()
    },
    function(err, user) {
      if (err) {
        ResponseService.responseGeneric(res,
          500,
          MessageService.GlobalErrors.serverErrorUnknown);
      } else {
        if (!user) {
          ResponseService.responseGeneric(res,
            500,
            MessageService.Controllers.userNotExist);
        } else {
          if (UserModel.authenticate(user, req.body.password)) {
            ResponseService.resposeToken(res, user);
          } else {
            ResponseService.responseGeneric(res,
              500,
              MessageService.Controllers.userInvalidPassword);
          }
        }
      }
    });
};

exports.deleteUser = function(req, res) {
  UserModel.remove({
    _id: req.body.id
  }, function(error) {
    ResponseService.handleError(error,
      MessageService.Controllers.userDeleted,
      res);
  });
};

exports.updateUserInfo = function(req, res) {
  var userdata = {
    firstName: req.body.firstName ? req.body.firstName : '',
    lastName: req.body.lastName ? req.body.lastName : '',
    email: req.body.email ? req.body.email : ''
  };
  UserModel.findByIdAndUpdate(req.body.id, userdata, {
      runValidators: true
    },
    function(error, user) {
      ResponseService.handleError(error,
        MessageService.Controllers.userUpdateOK,
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
      MessageService.Controllers.userUnauthorized);
  }
  try {
    //Decode token
    var payload = jwt.decode(token, config().tokenSecret);
    if (payload.exp <= moment().unix()) {
      ResponseService.responseGeneric(res,
        401,
        MessageService.Controllers.userTokenExpired);
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
