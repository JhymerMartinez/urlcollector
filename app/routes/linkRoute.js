'use strict';

var express = require('express');
var groupCtrl = require('../controllers/groupController.js');
var userCtrl = require('../controllers/userController.js');
var linkCtrl = require('../controllers/linkController.js');
var router = express.Router();

router.route('/create')
  .post(userCtrl.ensureAuthenticated, linkCtrl.saveLink, groupCtrl.saveGroup);

router.route('/delete/:id')
  .delete(userCtrl.ensureAuthenticated, linkCtrl.deleteLink);

router.route('/get/:id')
  .get(userCtrl.ensureAuthenticated, groupCtrl.getGroupLinks);

router.route('/update/:id')
  .put(userCtrl.ensureAuthenticated, linkCtrl.updateLink);

module.exports = router;
