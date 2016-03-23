'use strict';

var express = require('express');
var	userCtrl = require('../controllers/userServerController.js');
var router = express.Router();

router.route('/signin')
  .post(userCtrl.createUser);

router.route('/delete')
  .post(userCtrl.ensureAuthenticated, userCtrl.deleteUser);

router.route('/update')
  .post(userCtrl.ensureAuthenticated, userCtrl.updateUserInfo);

module.exports = router;
