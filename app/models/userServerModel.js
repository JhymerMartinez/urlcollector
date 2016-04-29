'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var async = require('async');
var Schema = mongoose.Schema;
var MessageService = require('../services/message.js');

var UserSchema = mongoose.Schema({

  name: {
    type: String,
    trim: true,
    required: [true, MessageService.users.userNameRequired],
  },
	email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, MessageService.users.userEmailRequired],
    // Validate email
    match: [
      /.+\@.+\..+/,
      MessageService.users.userEmailInvalid
    ]
  },
	password: {
  	type: String,
    required: MessageService.users.userPasswordRequired,
  	//Validate password length
  	validate: [
  		function(password) {
    		return password && password.length > 6;
      },
      MessageService.users.userPasswordLength
    ]
	},
  salt: {
    type: String
  },
  created: {
  	type: Date,
  	//For default
  	default: Date.now
  },
  groups: [{
    type: Schema.ObjectId,
    ref: 'Group'
  }]

});

/*
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
*/

//Middleware pre-save for hash the password
UserSchema.pre('save', function(done) {

  var self = this;

  async.waterfall([
    function testUniqueEmail(next) {
      var data = {
        query: {
          email: self.email
        },
        name: 'email',
        message: MessageService.users.userEmailUnique
      };

      testUnique(self, data, next);

    },

  ], function onFinish(error) {
    if (error) {
      done(error);
    } else {
      comparePassword(self, done);
    }
  });

});

// If exists in DB
function testUnique(self, data, next) {
  self.model('User').findOne(data.query, function(error, results) {
    if (error) {
      // Done callback
      return next(error);
    } else if (results) {
      self.invalidate(data.name);
      // Done callback
      return next(new Error(data.message));
    } else {
      // Next callback
      return next();
    }

  });
}

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

function processHashPassword(password, self) {
  return crypto.pbkdf2Sync(password, self.salt, 10000, 64).toString('base64'); //jshint ignore: line
}

module.exports =  mongoose.model('User',UserSchema);
