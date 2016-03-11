'use strict';

var express = require('express');
var router = express.Router();
//var passport = require('passport');
var	userCtrl = require('../controllers/userServerController.js');
var config = require('../config/config');

router.route('/delete')
  .post(userCtrl.ensureAuthenticated, userCtrl.deleteUser);

router.route('/update')
  .post(userCtrl.ensureAuthenticated, userCtrl.updateUserInfo);

module.exports = router;
