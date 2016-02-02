(function() {

  'use strict';

  var userCtrl = require('../controllers/userServerController.js');
  var linkCtrl = require('../controllers/linkServerController.js');
  var groupCtrl = require('../controllers/groupServerController.js');
  var config = require('../config/config');

  module.exports = function(app) {

    app.route(config().baseApi + '/link/save')
      .post(userCtrl.ensureAuthenticated, linkCtrl.saveLink, groupCtrl.saveGroup);

    app.route(config().baseApi + '/link/save/group')
      .post(userCtrl.ensureAuthenticated, linkCtrl.saveArrayLinks, groupCtrl.saveAllGroup);

    app.route(config().baseApi + '/link/update/group')
      .post(userCtrl.ensureAuthenticated, groupCtrl.updateGroupName);

    app.route(config().baseApi + '/link/get/:userId')
      .get(userCtrl.ensureAuthenticated, groupCtrl.getGroupLinks);

  };

})();
