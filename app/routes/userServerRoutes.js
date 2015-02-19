'use strict';

var passport = require('passport');
var	user = require('../controllers/userServerController.js');

module.exports = function(app){

	//Configurar las rutas 'signup'
  	app.route('/signup')
     .get(user.renderSignup)
     .post(user.signup);
  	
  	app.route('/login')
     	.get(user.renderSignin)
		.post(passport.authenticate('local', {
	       successRedirect: '/#!/admin',
	       failureRedirect: '/signin',
	       failureFlash: true
     }));

	app.route('/logout')
		.get(user.logout);

     app.route('/api/data')
	     .get(function(req,res){
	     		res.send({a:'valor1',b:'valor2'});
	     	}
	     );


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