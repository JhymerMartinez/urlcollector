(function() {

  'use strict';

  var mongoose = require('mongoose');
  var User = mongoose.model('User');
  var TokenService = require('../services/token.js');
  var MessageService = require('../services/messages.js');
  var jwt = require('jwt-simple');
  var moment = require('moment');
  var config = require('../lib/config.js');

  exports.deleteUser = function(req, res) {
    User.remove({_id: req.body.id}, function(error) {
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

  exports.emailSignup = function(req, res) {
    var user = new User({
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

  exports.emailLogin = function(req, res) {
      User.findOne({
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
            if (User.authenticate(user, req.body.password)) {
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

    if (!req.headers.authorization) {
      return res
        .status(403)
        .send({
          message: MessageService.Controllers.userUnauthorized
        });

    }

    var token = req.headers.authorization.split('.')[1];
    var payload = jwt.decode(req.headers.authorization, config().tokenSecret);

    if (payload.exp <= moment().unix()) {
     return res
        .status(401)
        .send({
            message: MessageService.Controllers.userTokenExpired
        });
    }
    req.user = payload.sub;
    next();
  };

  exports.myFunction = function(req, res) {

    User.findOne({
      id: req.user
    }, function(err, user) {
          if (!user) {
            console.log(err);
          } else {
            res.json(user);
          }
      });
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
