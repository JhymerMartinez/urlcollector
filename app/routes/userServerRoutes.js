(function() {

  'use strict';

  //var passport = require('passport');
  var	userCtrl = require('../controllers/userServerController.js');
  var config = require('../config/config');

  module.exports = function(app) {

      app.route(config().baseApi + '/auth/signin')
        .post(userCtrl.createUser);

      app.route(config().baseApi + '/auth/login')
        .post(userCtrl.login);

      app.route(config().baseApi + '/user/delete')
        .post(userCtrl.ensureAuthenticated, userCtrl.deleteUser);

      app.route(config().baseApi + '/user/update')
        .post(userCtrl.ensureAuthenticated, userCtrl.updateUser);

  };

})();
