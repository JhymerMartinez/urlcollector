(function() {

  'use strict';

  var mongoose = require('mongoose');
  var crypto = require('crypto');
  var MessageService = require('../services/messages.js');

  var UserSchema = mongoose.Schema({

    firstName: {
      type: String,
      required: MessageService.Models.firstNameRequired,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
  	email: {
      type: String,
      trim: true,
      // Validte email
      match: [
        /.+\@.+\..+/,
        MessageService.Models.invalidEmail
      ]
    },
    username: {
	    type: String,
	    unique: true,
	    required: MessageService.Models.usenameRequired,
	    trim: true
  	},
  	password: {
    	type: String,
    	//Validate password length
    	validate: [
    		function(password) {
      		return password && password.length > 6;
        },
        MessageService.Models.passwordLength
      ]
  	},
    salt: {
      type: String
    },
    created: {
    	type: Date,
    	//For default
    	default: Date.now
    }
  });

  //Configure the virtual property 'fullname'
  UserSchema.virtual('fullName')
    .get(function() {
      return this.firstName + ' ' + this.lastName;
    })
    .set(function(fullName) {
      var splitName = fullName.split(' ');
      this.firstName = splitName[0] || '';
      this.lastName = splitName[1] || '';
    });

  //Middleware pre-save for hash the password
  UserSchema.pre('save', function(done) {
    if (this.password) {
      this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
      this.password = this.hashPassword(this.password);
    }

    done();
  });

  //Crear un método instancia para hashing una contraseña
  UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
  };

  //Crear un método instancia para autentificar usuario
  UserSchema.statics.authenticate = function(user, loginPassword) {

    var passwordHash;

    if (loginPassword) {
      this.salt = user.salt;
      passwordHash = this.processHashPassword(loginPassword);
    }
    return user.password === passwordHash;
  };

  //Crear un método instancia para hashing una contraseña
  UserSchema.statics.processHashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
  };

  //Encontrar posibles username no usados
  UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;

    //Añadir un sufijo 'username'
    var possibleUsername = username + (suffix || '');

    //Usar el método 'findOne' del model 'User' para
    //encontrar un username único disponible
    _this.findOne({
      username: possibleUsername
    }, function(err, user) {
      //Si ocurre un error llama al callback con un valor null,
      //en otro caso encuentra un username disponible único
      if (!err) {
        //si un username único disponible fue encontrado llama
        //al método callback, en otro caso llama al método
        //'findUniqueUsername' de nuevo con un nuevo sufijo
        if (!user) {
          callback(possibleUsername);
        } else {
          return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
        }
      } else {
        callback(null);
      }
    });
  };

  //Configura el 'UserSchema' para usar getters y virtuals
  //cuando se transforme a JSON
  UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
  });

  module.exports =  mongoose.model('User',UserSchema);

})();
