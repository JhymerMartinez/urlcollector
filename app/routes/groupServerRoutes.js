(function() {

  'use strict';

  var userCtrl = require('../controllers/userServerController.js');
  var linkCtrl = require('../controllers/linkServerController.js');
  var groupCtrl = require('../controllers/groupServerController.js');
  var config = require('../config/config');

  module.exports = function(app) {

    app.route(config().baseApi + '/group/save')
      .post(userCtrl.ensureAuthenticated, linkCtrl.saveArrayLinks, groupCtrl.saveAllGroup);

    app.route(config().baseApi + '/group/update/name')
      .post(userCtrl.ensureAuthenticated, groupCtrl.updateGroupName);

    app.route(config().baseApi + '/group/delete')
      .post(userCtrl.ensureAuthenticated, groupCtrl.deleteGroup);

  };

}());
