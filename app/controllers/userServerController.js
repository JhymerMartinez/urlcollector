'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var service = require('../services/token.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../../config/config.js');

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
            console.log(err);
        }else{
            return res
                .status(200)
                .send({
                    token: service.createToken(user),
                    message: "Bienvenido "+user.firstName
                });
        }
    });
};


exports.emailLogin = function(req, res) {

    console.log(req.body);

    User.findOne({
        email: req.body.email.toLowerCase()
    },
    function(err, user) {

        if(!user){
          return res
            .status(500)
            .send({
              message:"Email o contraseña incorrectos"
            })
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
                })
            }
        }
    });
};

//var newUser;

exports.ensureAuthenticated = function(req, res, next) {

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



