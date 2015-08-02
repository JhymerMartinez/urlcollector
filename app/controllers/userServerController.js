(function(){

  'use strict';

  var mongoose = require('mongoose');
  var User = mongoose.model('User');
  var service = require('../services/token.js');
  var jwt = require('jwt-simple');
  var moment = require('moment');
  var config = require('../../config/config.js');

  // Crear un nuevo método controller manejador de errores
  var getErrorMessage = function(err) {
    // Definir la variable de error message
    var message = '';

    // Si un error interno de MongoDB ocurre obtener el mensaje de error
    if (err.code) {
      switch (err.code) {
        // Si un eror de index único ocurre configurar el mensaje de error
        case 11000:
        case 11001:
          message = 'Usuario ya existe';
          break;
        // Si un error general ocurre configurar el mensaje de error
        default:
          message = 'Se ha producido un error desconocido';
      }
    } else {
      // Grabar el primer mensaje de error de una lista de posibles errores
      for (var errName in err.errors) {
        if (err.errors[errName].message) message = err.errors[errName].message;
      }
    }

    // Devolver el mensaje de error
    return message;
  };

  exports.deleteUser = function(req, res){
    User.remove({ _id: req.body.id }, function(err) {
      if (!err) {
          return res
              .send({
                  message: 'Usuario eliminado correctamente'
              });
      }
      else {
         console.log('un error:',err);
      }
    });
  };

  exports.emailSignup = function(req, res) {
      var user = new User({
          firstName:req.body.firstName,
          lastName:req.body.lastName,
          email: req.body.email,
          username:req.body.username,
          password: req.body.password

      });

      user.save(function(err,user){
          if(err){
              console.log('un error:',err);
          }else{
              return res
                  .status(200)
                  .send({
                      token: service.createToken(user),
                      message: "Bienvenido "+user.firstName,
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

          if(!user){
            return res
              .status(500)
              .send({
                message:"Email o contraseña incorrectos"
              });
          }else{

              if(user.password == req.body.password){
                  return res
                  .status(200)
                  .send({
                          token: service.createToken(user)
                      });
              }else{
                res
                  .status(500)
                  .send({
                    message:"Contraseña incorrecta"
                  });
              }
          }
      });
  };

  //var newUser;

  exports.ensureAuthenticated = function(req, res, next) {

    console.log('debug auth:',  req.headers.authorization);

    if(!req.headers.authorization) {
      return res
        .status(403)
        .send({
              message: "No estas autorizado a entrar esta área."
          });
    }
    var token = req.headers.authorization.split(" ")[1];
    var payload = jwt.decode(token, config.TOKEN_SECRET);

    if(payload.exp <= moment().unix()) {
         return res
            .status(401)
            .send({
                message: "El token ha expirado"
            });
    }
    req.user = payload.sub;
    next();
  };

  exports.myFunction = function(req,res){

      User.findOne({
          _id:req.user
          },function(err, user) {
              if(!user){
                  console.log(err);
              }else{
                  res.json(user);
              }
          });
  };


})();
