'use strict';

var express = require('express');
var	userCtrl = require('../controllers/userServerController.js');
var router = express.Router();

router.route('/login')
  .post(userCtrl.login);

module.exports = router;
