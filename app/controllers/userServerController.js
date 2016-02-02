(function() {

  'use strict';

  var mongoose = require('mongoose');
  var UserModel = mongoose.model('User');
  var TokenService = require('../services/token.js');
  var MessageService = require('../services/messages.js');
  var jwt = require('jwt-simple');
  var moment = require('moment');
  var config = require('../config/config.js');

  exports.deleteUser = function(req, res) {
    UserModel.remove({_id: req.body.id}, function(error) {
      if (error) {
        return res
          .send({
            message: getErrorMessage(error)
          });
      } else {
        return res
          .status(200)
          .send({
              message: MessageService.Controllers.userDeleted
          });
      }
    });
  };

  exports.createUser = function(req, res) {
    var user = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    user.save(function(error, user) {
      if (error) {
        return res
          .send({
            message: getErrorMessage(error)
          });
      } else {
        return res
          .status(200)
          .send({
            token: TokenService.createToken(user),
            message: 'Welcome ' + user.firstName,
            user: user
          });
      }
    });
  };

  exports.updateUser = function(req, res) {

    UserModel.findById(req.body.id, function(error, user) {
      if (error) {
        return res.send({
          message: getErrorMessage(error)
        });
      } else {
        //Change specific information
        if (req.body.firstName && req.body.firstName !== user.firstName) {
          user.firstName = req.body.firstName;
        }

        if (req.body.lastName && req.body.lastName !== user.lastName) {
          user.lastName = req.body.lastName;
        }

        if (req.body.email && req.body.email !== user.email) {
          user.email = req.body.email;
        }

        if (req.body.password) {
          user.password = req.body.password;
        }

        user.save(function(error, user) {
          if (error) {
            return res.send({
              message: getErrorMessage(error)
            });
          } else {
            return res.status(200)
              .send({
              message: MessageService.Controllers.userUpdateOK
            });
          }
        });
      }
    });
  };

  exports.login = function(req, res) {
      UserModel.findOne({
          email: req.body.email.toLowerCase()
      },
      function(err, user) {
          if (!user) {
            return res
              .status(500)
              .send({
                message: MessageService.Controllers.userNotExist
              });
          } else {
            if (UserModel.authenticate(user, req.body.password)) {
              return res
                .status(200)
                .send({
                  token: TokenService.createToken(user)
                });
            } else {
              return res
                .status(500)
                .send({
                  message: MessageService.Controllers.userInvalidPassword
                });
            }
          }
      });
  };

  exports.ensureAuthenticated = function(req, res, next) {

    //get token from client
    var token = req.headers.authorization ||
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'];

    if (!token) {
      return res
        .status(403)
        .send({
          message: MessageService.Controllers.userUnauthorized
        });

    }
    try {
      //Decode token
      var payload = jwt.decode(token, config().tokenSecret);

      if (payload.exp <= moment().unix()) {
       return res
          .status(401)
          .send({
            message: MessageService.Controllers.userTokenExpired
          });
      }

      //Assign 'payload.sub' (user id) to 'req' Object
      req.user = payload.sub;
      next();
    } catch (e) {
      return res
        .status(500)
        .send({
          message: MessageService.GlobalErrors.serverErrorUnknown
        });
    }

  };

  // Crear un nuevo método controller manejador de errores
  function getErrorMessage(err) {
    // Definir la variable de error message
    var message = '';

    // Si un error interno de MongoDB ocurre obtener el mensaje de error
    if (err.code) {
      switch (err.code) {
        // Si un eror de index único ocurre configurar el mensaje de error
        case 11000:
        case 11001:
          message = MessageService.Controllers.userExists;
          break;
        // Si un error general ocurre configurar el mensaje de error
        default:
          message = MessageService.Controllers.userUnknownError;
      }
    } else {
      // Grabar el primer mensaje de error de una lista de posibles errores
      for (var errName in err.errors) {
        if (err.errors[errName].message) {
          message = err.errors[errName].message;
        }
      }
    }

    // Devolver el mensaje de error
    return message;
  }

})();
