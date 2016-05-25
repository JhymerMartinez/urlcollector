'use strict';

var TokenService = require('./tokenService.js');
var MessageService = require('./messageService.js');
var _ = require('lodash');

exports.responseGeneric = responseGeneric;

exports.resposeTokenOrUser = function(res, user, onlyUserData) {
  var dataToSend = {
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  };
  if (!onlyUserData) {
    dataToSend.token = TokenService.createToken(user);
  }
  return res
    .status(200)
    .send(dataToSend);
};

exports.resposeUserData = function(res, user) {
  var userData = {
    id: user._id,
    name: user.name,
    email: user.email
  };
  return res
    .status(200)
    .send({
      user: userData
    });
};

exports.handleResponse = function(error, data, response, onSuccess, onError) {
  if (error) {
    if (!onError) {
      return response
        .status(400)
        .send({
          message: MessageService.global.commonRequestError,
          details: error
        });
    } else {
      if (_.isString(onError)) {
        return response
          .status(400)
          .send({
            message: onError,
            details: error
          });
      } else {
        onError(error);
      }
    }
  } else {
    if (_.isString(onSuccess)) {
      responseGeneric(response, 200, onSuccess);
    } else {
      onSuccess(data);
    }
  }
};

function responseGeneric(res, statusCode, message) {
  return res
    .status(statusCode)
    .send({
      message: message
    });
}
