'use strict';

var TokenService = require('./token.js');

exports.getErrorMessage = getErrorMessage;

exports.resposeToken = function(res, user) {
  var userData = {
    id: user._id,
    name: user.name,
    email: user.email
  };
  return res
    .status(200)
    .send({
      token: TokenService.createToken(user),
      user: userData
    });
};

exports.responseGeneric = function(res, statusCode, message) {
  return res
    .status(statusCode)
    .send({
      message: message
    });
};

exports.handleError = function(error, message, res) {
  if (error) {
    return res
      .send({
        message: getErrorMessage(error)
      });
  } else {
    return res
      .status(200)
      .send({
        message: message
      });
  }
};

function getErrorMessage(err) {
  var message = '';
  // Internal errors in MongoDB
  if (err.code) {
    switch (err.code) {
      // Index error
      case 11000:
      case 11001:
        message = err.message;
        break;
      default:
        message = 'UnknownError';
    }
  } else {
    if (err.errors) {
      // Get the first error message of errors list
      for (var errName in err.errors) {
        if (err.errors[errName].message) {
          message = err.errors[errName].message;
        }
      }
    } else {
      message = err.message;
    }
  }
  return message;
}
