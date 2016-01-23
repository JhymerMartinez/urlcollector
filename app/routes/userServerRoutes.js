(function() {

  'use strict';

  //var passport = require('passport');
  var	userCtrl = require('../controllers/userServerController.js');

  module.exports = function(app) {

    	app.route('/auth/signin')
       .post(userCtrl.createUser);

    	app.route('/auth/login')
  		 .post(userCtrl.login);

      app.route('/user/delete')
       .post(userCtrl.ensureAuthenticated, userCtrl.deleteUser);

      app.route('/user/update')
        .post(userCtrl.ensureAuthenticated, userCtrl.updateUser);

  };

})();
