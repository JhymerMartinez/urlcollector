(function() {

  'use strict';

  //var passport = require('passport');
  var	user = require('../controllers/userServerController.js');

  module.exports = function(app) {

    	app.route('/auth/signin')
       .post(user.createUser);

    	app.route('/auth/login')
  		 .post(user.login);

      app.route('/user/delete')
       .post(user.ensureAuthenticated, user.deleteUser);

       app.route('/user/update')
        .post(user.ensureAuthenticated, user.updateUser);

  };

})();
