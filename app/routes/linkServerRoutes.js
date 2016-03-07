'use strict';

var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userServerController.js');
var linkCtrl = require('../controllers/linkServerController.js');
var groupCtrl = require('../controllers/groupServerController.js');
var config = require('../config/config');

router.route('/save')
  .post(userCtrl.ensureAuthenticated, linkCtrl.saveLink, groupCtrl.saveGroup);

router.route('/delete')
  .post(userCtrl.ensureAuthenticated, linkCtrl.deleteLink);

router.route('/get/:userId')
  .get(userCtrl.ensureAuthenticated, groupCtrl.getGroupLinks);

module.exports = router;
