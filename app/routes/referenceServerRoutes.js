(function() {

  'use strict';

  var user = require('../controllers/userServerController.js');
  var reference = require('../controllers/referenceServerController.js');

  module.exports = function(app) {

    app.route('/private')
      .post(user.ensureAuthenticated,reference.myFunction1);

    app.route('/reference/save')
      .post(user.ensureAuthenticated, reference.saveReference);

  };

})();
