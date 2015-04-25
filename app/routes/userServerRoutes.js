'use strict';

//var passport = require('passport');
var	user = require('../controllers/userServerController.js');

module.exports = function(app){


  	app.route('/auth/signup')
     .post(user.emailSignup);

  	app.route('/auth/login')
		.post(user.emailLogin);

	  app.route('/private')
		.get(user.ensureAuthenticated,user.myFunction);



};
