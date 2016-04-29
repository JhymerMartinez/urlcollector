'use strict';

var express = require('express');
var	userCtrl = require('../controllers/userServerController.js');
var router = express.Router();

router.route('/sign_in')
  .post(userCtrl.signIn);

router.route('/sign_up')
  .post(userCtrl.signUp);

router.route('/delete')
  .post(userCtrl.ensureAuthenticated, userCtrl.delete);

router.route('/update/:id')
  .put(userCtrl.ensureAuthenticated, userCtrl.update);

module.exports = router;
