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



/*

	// route to test if the user is logged in or not
	app.get('/loggedin', function(req, res) {
	  res.send(req.isAuthenticated() ? req.user : '0');
	});

	// route to log in
	app.post('/login', passport.authenticate('local'), function (req,res) {
	  res.send(req.user);
	  //res.redirect('/admin');
	});

	// route to log out
	app.post('/logout', function(req, res){
	  req.logOut();
	  res.send(200);
	});

*/

	//app.get('/prueba',user.auth,user.read);





};