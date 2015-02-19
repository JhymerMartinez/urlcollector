var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var	mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(){

	var User= mongoose.model('user');

	  //Usar el método 'serializeUser' para serializar la id del usuario
	  passport.serializeUser(function(user, done) {
	    done(null, user.id);
	  });

	  //Usar el método 'deserializeUser' 
	  //para cargar el documento user
	  passport.deserializeUser(function(id, done) {
	    User.findOne({
	      _id: id
	    }, '-password', function(err, user) {
	      done(err, user);
	    });
	  });


  //Cargar los archivos de configuración de estrategias de Passport
  require('./loginStrategies/localStrategy.js')();




	
};

