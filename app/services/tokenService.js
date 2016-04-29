'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../configs/config.js');

exports.createToken = function(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix(),
  };

  var tokenSecret = process.env.TOKEN_SECRET ?
    process.env.TOKEN_SECRET : config().tokenSecret;

  return jwt.encode(payload, tokenSecret);
};
