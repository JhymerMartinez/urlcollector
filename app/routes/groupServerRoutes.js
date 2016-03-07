'use strict';

var express = require('express');
var router = express.Router();
var linkCtrl = require('../controllers/linkServerController.js');
var groupCtrl = require('../controllers/groupServerController.js');
var userCtrl = require('../controllers/userServerController.js');
var config = require('../config/config');

router.route('/save')
  .post(userCtrl.ensureAuthenticated, linkCtrl.saveArrayLinks, groupCtrl.saveAllGroup);

router.route('/update/name')
  .post(userCtrl.ensureAuthenticated, groupCtrl.updateGroupName);

router.route('/delete')
  .post(userCtrl.ensureAuthenticated, groupCtrl.deleteGroup);

module.exports = router;
