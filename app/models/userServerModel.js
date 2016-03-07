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
  comparePassword(this, done);
});

//Middleware pre-update for hash the password
UserSchema.pre('update', function(done) {
  comparePassword(this, done);
});

//Instance method for authenticate user
UserSchema.statics.authenticate = function(user, loginPassword) {

  var passwordHash;

  if (loginPassword) {
    this.salt = user.salt;
    passwordHash = processHashPassword(loginPassword, this);
  }
  return user.password === passwordHash;
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
        return callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      return callback(null);
    }
  });
};

//Configure 'UserSchema' for use getters and virtuals
//when convert to JSON
UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

function comparePassword(self, done) {
  if (self.password) {
    self.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    self.password = processHashPassword(self.password, self);
  }
  done();
}


function processHashPassword(password, self){
  return crypto.pbkdf2Sync(password, self.salt, 10000, 64).toString('base64'); //jshint ignore: line
}

module.exports =  mongoose.model('User',UserSchema);
