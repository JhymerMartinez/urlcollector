'use strict';

var express = require('express');
var router = express.Router();
var	userCtrl = require('../controllers/userServerController.js');

router.route('/signin')
  .post(userCtrl.createUser);

router.route('/delete')
  .post(userCtrl.ensureAuthenticated, userCtrl.deleteUser);

router.route('/update')
  .post(userCtrl.ensureAuthenticated, userCtrl.updateUserInfo);

module.exports = router;
