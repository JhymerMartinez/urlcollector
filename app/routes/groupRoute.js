'use strict';

var express = require('express');
var linkCtrl = require('../controllers/linkController.js');
var groupCtrl = require('../controllers/groupController.js');
var userCtrl = require('../controllers/userController.js');
var router = express.Router();

router.route('/save')
  .post(userCtrl.ensureAuthenticated, linkCtrl.saveArrayLinks, groupCtrl.saveAllGroup);

router.route('/update/name')
  .post(userCtrl.ensureAuthenticated, groupCtrl.updateGroupName);

router.route('/delete')
  .post(userCtrl.ensureAuthenticated, groupCtrl.deleteGroup);

module.exports = router;
