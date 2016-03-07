'use strict';

var express = require('express');
var router = express.Router();

//var passport = require('passport');
var	userCtrl = require('../controllers/userServerController.js');
var config = require('../config/config');

router.route('/signin')
  .post(userCtrl.createUser);

router.route('/login')
  .post(userCtrl.login);

module.exports = router;
