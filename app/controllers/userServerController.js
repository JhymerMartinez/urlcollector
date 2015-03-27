'use strict';

var mongoose = require('mongoose');   
var User = mongoose.model('user');
var service = require('../services/token.js');
var jwt = require('jwt-simple');  
var moment = require('moment');  
var config = require('../../config/config.js');

exports.emailSignup = function(req, res) {  
    var user = new User({
        email: req.body.email, 
        password: req.body.password
    });

    user.save(function(err,user){
        if(err){
            console.log(err);
        }else{
            return res
                .status(200)
                .send({
                    token: service.createToken(user)
                });
        }
    });
};


exports.emailLogin = function(req, res) {  
    User.findOne({email: req.body.email.toLowerCase()},
     function(err, user) {
        if(err){
            console.log(err);
        }else{

            if(user.password == req.body.password){
                return res
                .status(200)
                .send({token: service.createToken(user)});
            }else{
                console.log("contraseña");
            }


           
        }
    });
};


exports.ensureAuthenticated = function(req, res, next) {  

    console.log(req.headers);

  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "Tu petición no tiene cabecera de autorización"});
  }
    var token = req.headers.authorization.split(" ")[1];
    var payload = jwt.decode(token, config.TOKEN_SECRET);

    if(payload.exp <= moment().unix()) {
         return res
            .status(401)
            .send({message: "El token ha expirado"});
    }

    req.user = payload.sub;
    next();
}

exports.myFunction = function(req,res){
    res.json({
        nombre:'Jhymer',
        apellido:'Martinez'
    });
}