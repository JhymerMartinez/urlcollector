'use strict';

var User = require('mongoose').model('user'),
	passport = require('passport');

var getErrorMessage = function(err){
	var message = '';
	if(err.code){
		switch(err.code){
			case 11000:
			case 11001:
				message = 'Usuario ya existe';
				break;
			default:
				message = 'se ha producido un error';
		}
	}else{
		for(var errName in err.errors){
			if(err.errors[errName].message){
				message = err.errors[errName].message;	
			} 
		}
	}
	return message;
};

// Crear un nuevo método controller que renderiza la página signin
exports.renderSignin = function(req, res, next) {
  // Si el usuario no está conectado renderizar la página signin, en otro caso redireccionar 
  // al usuario de vuelta a la página principal de la aplicación
  if (!req.user) {
    // Usa el objeto 'response' para renderizar la página signin
    res.render('login', {
      // Configurar la variable title de la página
      title: 'Ingreso',
      // Configurar la variable del mensaje flash
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    return res.redirect('/#!/admin');
  }
};



// Crear un nuevo método controller que renderiza la página signup
exports.renderSignup = function(req, res, next) {
  // Si el usuario no está conectado renderizar la página signin, 
  // en otro caso redireccionar al usuario de vuelta a la página principal de la aplicación
  if (!req.user) {
    // Usa el objeto 'response' para renderizar la página signup
    res.render('signup', {

      // Configurar la variable title de la página
      title: 'Regístrese',
      // Configurar la variable del mensaje flash
      messages: req.flash('error')
    });
  } else {
    return res.redirect('/#!/admin');
  }
};


// Crear un nuevo método controller que crea nuevos users 'regular'
exports.signup = function(req, res, next) {
  // Si user no está conectado, crear y hacer login a un nuevo usuario, 
  // en otro caso redireccionar el user de vuelta a la página de la aplicación principal
  if (!req.user) {
    // Crear una nueva instancia del modelo 'User'
    var user = new User(req.body);
    var message = null;

    // Configurar la propiedad user provider
    user.provider = 'local';

    // Intenta salvar el nuevo documento user
    user.save(function(err) {
      // Si ocurre un error, usa el mensaje flash para reportar el error
      if (err) {
        // Usa el método de manejo de errores para obtener el mensaje de error
        var message = getErrorMessage(err);

        // Configura los mensajes flash
        req.flash('error', message);

        // Redirecciona al usuario de vuelta a la página signup
        return res.redirect('/signup');
      }

      // Si el usuario fue creado de modo correcto usa el método 'login' de Passport para hacer login
      req.login(user, function(err) {
        // Si ocurre un error de login moverse al siguiente middleware
        if (err) return next(err);
        
        // Redireccionar al usuario de vuelta a la página de la aplicación principal
        return res.redirect('/#!/admin');
      });
    });
  } else {
    return res.redirect('/');
  }
};



exports.logout = function(req, res) {
  // Usa el método 'logout' de Passport para hacer logout
  req.logout();
       
  // Redirecciona al usuario de vuelta a la página de la aplicación principal
  res.redirect('/');
};
/*

exports.read = function(req,res){
	res.json(req.user);
};


// Define a middleware function to be used for every secured routes
exports.auth = function(req, res, next){
  if (!req.isAuthenticated()) 
  	res.send(401);
  else
  	next();
};

*/