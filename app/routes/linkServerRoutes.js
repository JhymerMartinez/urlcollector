(function() {

  'use strict';

  var userCtrl = require('../controllers/userServerController.js');
  var linkCtrl = require('../controllers/linkServerController.js');
  var groupCtrl = require('../controllers/groupServerController.js');
  module.exports = function(app) {

    app.route('/link/save')
      .post(userCtrl.ensureAuthenticated, linkCtrl.saveLink, groupCtrl.saveGroup);

    app.route('/link/save/group')
      .post(userCtrl.ensureAuthenticated, linkCtrl.saveArrayLinks, groupCtrl.saveAllGroup);

    app.route('/link/get/:userId')
      .get(userCtrl.ensureAuthenticated, groupCtrl.getGroupLinks);

  };

})();
