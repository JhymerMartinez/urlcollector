'use strict';

var mongoose = require('mongoose');   
var User = mongoose.model('user');
var service = require('../../config/tokenStrategies/tokenService.js');
var tokenConfig = require('../../config/token.js');

var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) 
        return err.errors[errName].message;
    }
  }
};




exports.emailSignup = function(req, res) {  
    console.log("dentro del server signup");

    var user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email : req.body.email,
      username:req.body.username,
      password : req.body.password

    });

    console.log(user.email);
    console.log(user.password);
    user.save(function(err){

        if(err){
          
            console.log(getErrorMessage(err))
          
        }else{

          return res
              .status(200)
              .send({token: service.createToken(user)});
        }
    });
};


exports.emailLogin = function(req, res) {  
    User.findOne({
          email: req.body.email.toLowerCase()
        }, 
        function(err, user) {
          if(err){
              console.log(getErrorMessage(err))
          }else{
              console.log(user);

             return res
                .status(200)
                .send({token: service.createToken(user)});
          }  
    });

   
};

exports.ensureAuthenticated = function(req, res, next) {  
  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "Tu petición no tiene cabecera de autorización"});
  }

  var token = req.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token, tokenConfig.TOKEN_SECRET);

  if(payload.exp <= moment().unix()) {
     return res
         .status(401)
        .send({message: "El token ha expirado"});
  }

  req.user = payload.sub;
  next();
}

