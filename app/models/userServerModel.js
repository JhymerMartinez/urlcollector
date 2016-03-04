(function() {

  'use strict';

  var mongoose = require('mongoose');
  var crypto = require('crypto');
  var MessageService = require('../services/messages.js');

  var UserSchema = mongoose.Schema({

    firstName: {
      type: String,
      required: MessageService.Models.userFirstNameRequired,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
  	email: {
      type: String,
      trim: true,
      unique: true,
      // Validate email
      match: [
        /.+\@.+\..+/,
        MessageService.Models.userInvalidEmail
      ]
    },
    username: {
	    type: String,
	    unique: true,
	    required: MessageService.Models.userUsenameRequired,
	    trim: true
  	},
  	password: {
    	type: String,
      required: MessageService.Models.userPasswordRequired,
    	//Validate password length
    	validate: [
    		function(password) {
      		return password && password.length > 6;
        },
        MessageService.Models.userPasswordLength
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

  //Middleware pre-update for hash the password
  UserSchema.pre('update', function(done) {
    if (this.password) {
      this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
      this.password = this.hashPassword(this.password);
    }

    done();
  });

  //Instance method for password hashing
  UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
  };

  //Instance method for authenticate user
  UserSchema.statics.authenticate = function(user, loginPassword) {

    var passwordHash;

    if (loginPassword) {
      this.salt = user.salt;
      passwordHash = this.processHashPassword(loginPassword);
    }
    return user.password === passwordHash;
  };

  UserSchema.statics.processHashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
  };

  //Find 'usernames' unused
  UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;

    //'username' suffix
    var possibleUsername = username + (suffix || '');

    _this.findOne({
      username: possibleUsername
    }, function(err, user) {
      if (!err) {
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

  //Configure 'UserSchema' for use getters and virtuals
  //when convert to JSON
  UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
  });

  module.exports =  mongoose.model('User',UserSchema);

}());
