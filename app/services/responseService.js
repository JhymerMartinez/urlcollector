'use strict';

var TokenService = require('./tokenService.js');
var MessageService = require('./messageService.js');
var _ = require('lodash');
var Q = require('q');

var exports = {
  responseGeneric: responseGeneric,
  resposeTokenOrUser: resposeTokenOrUser,
  resposeUserData: resposeUserData,
  handleResponse: handleResponse
};

function resposeTokenOrUser(res, user, onlyUserData) {
  var dataToSend = {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      created: user.created
    }
  };
  if (!onlyUserData) {
    dataToSend.token = TokenService.createToken(user);
  }
  return res
    .status(200)
    .send(dataToSend);
}

function resposeUserData(res, user) {
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
}

function handleResponse(error, data, response, onSuccess, onError) {
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
}

function responseGeneric(response, statusCode, message) {
  debugger;
  var obj = {};
  if (_.isObject(message)) {
    obj = message;
  }
  if (_.isString(message)) {
    obj = {
      message: message
    };
  }

  response
    .status(statusCode)
    .send(obj);
}

module.exports = exports;
