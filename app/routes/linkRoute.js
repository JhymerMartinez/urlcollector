'use strict';

var express = require('express');
var groupCtrl = require('../controllers/groupController.js');
var userCtrl = require('../controllers/userController.js');
var linkCtrl = require('../controllers/linkController.js');
var router = express.Router();

router.route('/save')
  .post(userCtrl.ensureAuthenticated, linkCtrl.saveLink, groupCtrl.saveGroup);

router.route('/delete')
  .post(userCtrl.ensureAuthenticated, linkCtrl.deleteLink);

router.route('/get/:userId')
  .get(userCtrl.ensureAuthenticated, groupCtrl.getGroupLinks);

module.exports = router;
