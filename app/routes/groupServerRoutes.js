'use strict';

var express = require('express');
var linkCtrl = require('../controllers/linkServerController.js');
var groupCtrl = require('../controllers/groupServerController.js');
var userCtrl = require('../controllers/userServerController.js');
var router = express.Router();

router.route('/save')
  .post(userCtrl.ensureAuthenticated, linkCtrl.saveArrayLinks, groupCtrl.saveAllGroup);

router.route('/update/name')
  .post(userCtrl.ensureAuthenticated, groupCtrl.updateGroupName);

router.route('/delete')
  .post(userCtrl.ensureAuthenticated, groupCtrl.deleteGroup);

module.exports = router;
