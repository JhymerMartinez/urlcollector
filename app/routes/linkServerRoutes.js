(function() {

  'use strict';

  var userCtrl = require('../controllers/userServerController.js');
  var linkCtrl = require('../controllers/linkServerController.js');
  var groupCtrl = require('../controllers/groupServerController.js');
  var config = require('../config/config');

  module.exports = function(app) {

    app.route(config().baseApi + '/link/save')
      .post(userCtrl.ensureAuthenticated, linkCtrl.saveLink, groupCtrl.saveGroup);

    app.route(config().baseApi + '/link/delete')
      .post(userCtrl.ensureAuthenticated, linkCtrl.deleteLink);

    app.route(config().baseApi + '/link/get/:userId')
      .get(userCtrl.ensureAuthenticated, groupCtrl.getGroupLinks);

  };

}());
