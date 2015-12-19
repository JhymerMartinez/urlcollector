(function() {

  'use strict';

  var userCtrl = require('../controllers/userServerController.js');
  var linkCtrl = require('../controllers/linkServerController.js');

  module.exports = function(app) {

    app.route('/private')
      .post(userCtrl.ensureAuthenticated,linkCtrl.myFunction1);

    app.route('/link/save')
      .post(userCtrl.ensureAuthenticated, linkCtrl.saveLink);

  };

})();
