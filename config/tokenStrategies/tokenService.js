var jwt = require('jwt-simple');  
var moment = require('moment');  
var tokenConfig = require('../token.js');

exports.createToken = function(user) {  
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };
  return jwt.encode(payload, tokenConfig.TOKEN_SECRET);
};