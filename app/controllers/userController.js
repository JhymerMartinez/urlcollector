'use strict';

var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var MessageService = require('../services/messageService.js');
var ResponseService = require('../services/responseService.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var _ = require('lodash');
var Q = require('q');
var config = require('../configs/config.js');
var exports = {
  signUp: signUp,
  signIn: signIn,
  deleteUser: deleteUser,
  getUser: getUser,
  changePassword: changePassword,
  updateUser: updateUser,
  ensureAuthenticated: ensureAuthenticated
};

function signUp(req, res) {

  saveUser(req).then(function (user) {

    if (user) {
      responseTokenOrUserData(user, req, res);
    } else {
      ResponseService.responseGeneric(res, 400, MessageService.users.userEmailNotFound);
    }
  }, function (error) {
    onError(error, res);
  });

}

/**
 * @api {post} /sign_in Login de usuario
 * @apiVersion 0.0.1
 * @apiName signIn
 * @apiGroup Usuario
 *
 * @apiSuccess {user} user Datos del usuario.
 * @apiSuccess {token} token  Token de acceso a APIs restringidas
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "user": {
 *        "id": "5beb36759373911500f692d7",
 *        "name": "jhon",
 *        "email": "jhon@test.com",
 *        "created": "2018-11-13T20:39:17.886Z"
 *      },
 *    "token": "ZrU3Lyr2osrAYvAynzNWw-mWEzQlNA_qOrivMOc95Ak"
 *    }
 */

function signIn(req, res) {

  findUser(req).then(function (user) {

    if (user) {
      responseTokenOrUserData(user, req, res);
    } else {
      ResponseService.responseGeneric(res, 400, MessageService.users.userEmailNotFound);
    }
  }, function (error) {
    onError(error, res);
  });
}

function deleteUser(req, res) {

  removeUser(req).then(function (result) {

    if (result) {
      ResponseService.responseGeneric(res, 200, MessageService.users.userDeleted);
    } else {
      ResponseService.responseGeneric(res, 400, MessageService.users.userIdInvalid);
    }
  }, function (error) {
    onError(error, res);
  });
}

function updateUser(req, res) {

  findAndUpdateUser(req, res).then(function (user) {

    if (user) {
      var dataToSend = {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          created: user.created
        },
        message: MessageService.users.userUpdateOK
      };
      ResponseService.responseGeneric(res, 200, dataToSend);
    } else {
      ResponseService.responseGeneric(res, 400, MessageService.users.userNotExist);
    }
  }, function (error) {
    onError(error, res);
  });
}

function onError(error, res) {

  var customObj = {
    message: MessageService.global.commonRequestError,
    details: error
  };
  ResponseService.responseGeneric(res, 400, customObj);
}

function getUser(req, res) {

  findUserById(req, res).then(function (user) {

    if (user) {
      var data = {
        user: user
      };
      var dataToSend = {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          created: user.created
        }
      };
      ResponseService.responseGeneric(res, 200, data);
    } else {
      ResponseService.responseGeneric(res, 400, MessageService.users.userIdInvalid);
    }
  }, function (error) {
    ResponseService.responseGeneric(res, 400, MessageService.users.userNotExist);
  });
}

function changePassword(req, res) {

}

function ensureAuthenticated(req, res, next) {
  //get token from client
  var token = req.headers.authorization ||
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'];
  if (!token) {
    ResponseService.responseGeneric(res, 403, MessageService.users.userUnauthorized);
  }
  try {
    //Decode token
    var payload = jwt.decode(token, config().tokenSecret);
    if (payload.exp <= moment().unix()) {
      ResponseService.responseGeneric(res, 401, MessageService.users.userTokenExpired);
    }
    //Assign 'payload.sub' (user id) to 'req' Object
    req.user = payload.sub;
    next();
  } catch (e) {
    ResponseService.responseGeneric(res, 500, e.message);
  }
}

function findUser(req) {
  var email = req.body.email;
  email = email && _.isString(email) ? email.toLowerCase() : '';
  var dbData = {
    email: email
  };
  return Q.Promise(function (resolve, reject) {
    UserModel.findOne(dbData, function findSuccess(err, user) {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

function findUserById(req) {
  return Q.Promise(function (resolve, reject) {
    UserModel.findById(req.params.id, function findSuccess(err, user) {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

function removeUser(req) {
  var params = req.params || {};
  var userData = {
    _id: params.id
  };
  return Q.Promise(function (resolve, reject) {
    UserModel.remove(userData, function removeSuccess(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function findAndUpdateUser(req) {
  var body = req.body || {};
  var userData = {
    name: body.name,
    email: body.email
  };
  var dbOptions = {
    runValidators: true
  };
  return Q.Promise(function (resolve, reject) {
    UserModel.findByIdAndUpdate(req.params.id, userData, dbOptions,
      function findSuccess(error, user) {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      });
  });
}

function saveUser(req) {
  return Q.Promise(function (resolve, reject) {
    var body = req.body || {};
    var user = new UserModel({
      name: body.name,
      email: body.email,
      password: body.password
    });
    user.save(function saveSuccess(error, user) {

      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
}

function responseTokenOrUserData(user, req, res) {
  if (UserModel.authenticate(user, req.body.password)) {
    ResponseService.resposeTokenOrUser(res, user);
  } else {
    ResponseService.responseGeneric(res, 400, MessageService.users.userInvalidPassword);
  }
}

module.exports = exports;
